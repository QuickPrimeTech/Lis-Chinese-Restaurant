import { NextResponse } from "next/server";
import { sendStk } from "@/lib/payments/mpesa";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { phoneNumber, items } = await req.json();

    if (!phoneNumber || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Missing phoneNumber or items" },
        { status: 400 }
      );
    }

    // Convert string IDs to numbers for matching
    const ids = items.map((item) => Number(item.id));

    // 1️⃣ Fetch prices in one efficient DB query
    const { data: menuItems, error: fetchError } = await supabase
      .from("menu_items")
      .select("id, price")
      .in("id", ids);

    if (fetchError || !menuItems) {
      console.error("Error fetching menu prices:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch menu item prices" },
        { status: 500 }
      );
    }

    // ⚡ Create a price lookup map for O(1) access (much faster than find())
    const priceMap = new Map<number, number>();
    for (const m of menuItems) priceMap.set(m.id, m.price);

    // 2️⃣ Compute total efficiently
    const totalAmount =
      1.18 *
      items.reduce((sum: number, item) => {
        const price = priceMap.get(Number(item.id));
        return price ? sum + price * item.quantity : sum;
      }, 0);

    if (totalAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 }
      );
    }

    const publicId = randomUUID();
    const userId = process.env.USER_ID;

    if (!userId) throw new Error("USER_ID is not set in environment variables");

    // 3️⃣ Send STK push
    const stkData = await sendStk(totalAmount, phoneNumber, publicId);
    const checkoutRequestId = stkData.CheckoutRequestID;

    if (!checkoutRequestId) {
      const errorMsg =
        stkData.errorMessage || "Safaricom did not return CheckoutRequestID";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // 4️⃣ Record payment in Supabase
    const { error: insertError } = await supabase.from("payments").insert([
      {
        checkout_request_id: checkoutRequestId,
        phone: phoneNumber,
        amount: totalAmount, // ✅ use consistent column name
        public_id: publicId,
        user_id: userId,
        status: "pending",
      },
    ]);

    if (insertError) {
      console.error("DB insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save payment" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { public_id: publicId, checkoutRequestId },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred during STK push initiation.";
    console.error("STK Error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
