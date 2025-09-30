import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const requestUrl = new URL(req.url);
    const publicId = requestUrl.searchParams.get("public_id");
    const userId = process.env.USER_ID;

    if (!publicId || !userId) {
      console.error("Callback missing public_id or USER_ID");
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Missing identifiers" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const callback = body?.Body?.stkCallback;
    const checkoutRequestId = callback?.CheckoutRequestID;
    const resultCode = callback?.ResultCode;

    if (!checkoutRequestId) {
      console.error("M-Pesa callback missing CheckoutRequestID.");
      return NextResponse.json(
        { error: "Missing CheckoutRequestID" },
        { status: 400 }
      );
    }

    const newStatus = resultCode === 0 ? "success" : "failed";

    const { error } = await supabase
      .from("payments")
      .update({ status: newStatus })
      .eq("public_id", publicId)
      .eq("user_id", userId);

    if (error) {
      console.error("DB update error:", error);
      return NextResponse.json(
        { error: "Failed to update payment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accept" });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred during callback processing.";
    console.error("Callback error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
