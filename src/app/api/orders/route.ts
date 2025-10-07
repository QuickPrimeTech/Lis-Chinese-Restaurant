import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
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
    } = body;

    // ✅ Insert into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          order_id: orderId,
          name: customerName,
          email,
          phone,
          items,
          total,
          payment_method: paymentMethod,
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          special_instructions: specialInstructions,
          user_id: process.env.USER_ID,
        },
      ])
      .select();

    if (error) throw error;

    // ✅ Then trigger notification API
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/notifications/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
