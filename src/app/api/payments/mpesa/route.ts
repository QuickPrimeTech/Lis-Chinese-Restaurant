import { NextResponse } from "next/server";
import { sendStk } from "@/lib/payments/mpesa";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { amount, phoneNumber } = await req.json();

    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { error: "Missing phoneNumber or amount" },
        { status: 400 }
      );
    }

    const publicId = randomUUID();
    const userId = process.env.USER_ID;

    if (!userId) {
      throw new Error("USER_ID is not set in environment variables");
    }

    // Send STK push
    const stkData = await sendStk(amount, phoneNumber, publicId);
    const checkoutRequestId = stkData.CheckoutRequestID;

    if (!checkoutRequestId) {
      const errorMsg =
        stkData.errorMessage || "Safaricom did not return CheckoutRequestID";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // Insert the payment into Supabase
    const { error } = await supabase.from("payments").insert([
      {
        checkout_request_id: checkoutRequestId,
        phone: phoneNumber,
        amount,
        public_id: publicId,
        user_id: userId,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("DB insert error:", error);
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
