// @/app/api/payments/callback/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    // ✅ Step 1: Extract identifiers
    const requestUrl = new URL(req.url);
    const uniqueId = requestUrl.searchParams.get("unique_id");
    const userId = process.env.USER_ID;

    if (!uniqueId || !userId) {
      console.error("Missing unique_id or USER_ID in callback request");
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Missing identifiers" },
        { status: 400 }
      );
    }

    // ✅ Step 2: Parse callback body
    let body;
    try {
      body = await req.json();
    } catch (jsonErr) {
      console.error("Failed to parse JSON body:", jsonErr);
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const callback = body?.Body?.stkCallback;
    if (!callback) {
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Invalid callback structure" },
        { status: 400 }
      );
    }

    const checkoutRequestId = callback?.CheckoutRequestID;
    const resultCode = callback?.ResultCode;
    const resultDesc = callback?.ResultDesc;

    if (!checkoutRequestId) {
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Missing CheckoutRequestID" },
        { status: 400 }
      );
    }

    // ✅ Step 3: Determine payment status
    const newStatus = resultCode === 0 ? "success" : "failed";

    // ✅ Step 4: Update the payment record by its ID
    const { data: paymentRecord, error: updateError } = await supabase
      .from("payments")
      .update({ status: newStatus })
      .eq("id", uniqueId)
      .eq("user_id", userId)
      .select("id, order_id, user_id, amount, status")
      .maybeSingle();

    if (updateError || !paymentRecord) {
      console.error("❌ Failed to update payment:", updateError);
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Failed to update payment" },
        { status: 500 }
      );
    }

    // ✅ Step 5: If payment failed, stop here
    if (newStatus !== "success") {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accept" });
    }

    // ✅ Step 6: Fetch corresponding order
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", paymentRecord.order_id)
      .maybeSingle();

    if (orderError || !orderData) {
      console.error("❌ Failed to fetch related order:", orderError);
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Failed to fetch related order" },
        { status: 500 }
      );
    }

    // ✅ Step 7: Update order status to "success"
    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({ status: "success" })
      .eq("id", paymentRecord.order_id);

    if (orderUpdateError) {
      console.error("❌ Failed to update order status:", orderUpdateError);
      return NextResponse.json(
        { ResultCode: 1, ResultDesc: "Failed to update order status" },
        { status: 500 }
      );
    }

    // ✅ Step 8: Notify via email
    try {
      // Destructure and rename only when needed
      const {
        items,
        total,
        phone,
        email,
        name: customerName,
        id: orderId,
        payment_method: paymentMethod,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        special_instructions: specialInstructions,
      } = orderData;

      const payload = {
        items,
        total,
        phone,
        email,
        customerName,
        orderId,
        paymentMethod,
        pickupDate,
        pickupTime,
        specialInstructions,
      };
      const notifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!notifyRes.ok) {
        const msg = await notifyRes.text();
      }
    } catch (notifyErr) {
      console.error("💥 Error calling notifications endpoint:", notifyErr);
    }

    // ✅ Step 9: Respond back to M-Pesa
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accept" });
  } catch (err) {
    console.error("💥 Unhandled callback error:", err);
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: "Server error" },
      { status: 500 }
    );
  }
}
