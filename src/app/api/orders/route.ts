// @/app/api/order/route.ts

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { OwnerConfirmationEmail } from "@/email-templates/orders/owner";
import { CustomerConfirmationEmail } from "@/email-templates/orders/customer";
import { site } from "@/config/site-config";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log(body);

    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`, // ✅ verified sender
      to: [site.emails.orders], // owner inbox
      subject: "📩 New Customer Inquiry Received",
      react: OwnerConfirmationEmail({
        customerName,
        email,
        phone,
        total,
        orderId,
        paymentMethod,
        pickupDate,
        pickupTime,
        specialInstructions,
        items,
      }),
    });

    if (ownerError) {
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    // 2. Send confirmation to customer
    const { error: customerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.orders}>`,
      to: [email],
      subject: `We received your Order 🎉`,
      react: CustomerConfirmationEmail({
        customerName,
        email,
        phone,
        total,
        orderId,
        paymentMethod,
        pickupDate,
        pickupTime,
        specialInstructions,
        items,
      }),
    });

    if (customerError) {
      return NextResponse.json({ error: customerError }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
