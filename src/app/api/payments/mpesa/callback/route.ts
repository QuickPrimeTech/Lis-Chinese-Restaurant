import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  console.log("📩 Incoming M-Pesa callback received");

  try {
    // ✅ Step 1: Extract identifiers
    const requestUrl = new URL(req.url);
    const publicId = requestUrl.searchParams.get("public_id");
    const userId = process.env.USER_ID;

    console.log("🔍 Callback identifiers:", { publicId, userId });

    if (!publicId || !userId) {
      console.error("❌ Missing public_id or USER_ID in callback request");
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Missing identifiers" },
        { status: 400 }
      );
    }

    // ✅ Step 2: Parse body safely
    let body;
    try {
      body = await req.json();
    } catch (jsonErr) {
      console.error("❌ Failed to parse JSON body:", jsonErr);
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.log("📦 Full callback body:", JSON.stringify(body, null, 2));

    // ✅ Step 3: Extract STK callback data
    const callback = body?.Body?.stkCallback;
    if (!callback) {
      console.error("❌ Missing stkCallback inside Body");
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Invalid callback structure" },
        { status: 400 }
      );
    }

    const checkoutRequestId = callback?.CheckoutRequestID;
    const resultCode = callback?.ResultCode;
    const resultDesc = callback?.ResultDesc;

    console.log("🧾 Callback details:", {
      checkoutRequestId,
      resultCode,
      resultDesc,
    });

    if (!checkoutRequestId) {
      console.error("❌ Callback missing CheckoutRequestID");
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Missing CheckoutRequestID" },
        { status: 400 }
      );
    }

    // ✅ Step 4: Determine status
    const newStatus = resultCode === 0 ? "success" : "failed";
    console.log(`⚙️ Updating payment status to "${newStatus}" for`, {
      publicId,
      userId,
    });

    // ✅ Step 5: Update Supabase
    const { error, data } = await supabase
      .from("payments")
      .update({ status: newStatus })
      .eq("public_id", publicId)
      .eq("user_id", userId)
      .select();

    if (error) {
      console.error("❌ Supabase update error:", error);
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Failed to update payment" },
        { status: 500 }
      );
    }

    console.log("✅ Supabase update success:", data);

    // ✅ Step 6: Respond to M-Pesa callback
    console.log("✅ Callback processing completed successfully.");
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accept" });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred during callback processing.";
    console.error("💥 Callback error caught in outer try/catch:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
