// @/app/api/notification/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { OwnerConfirmationEmail } from "@/email-templates/contact/owner";
import { CustomerConfirmationEmail } from "@/email-templates/contact/customer";
import { site } from "@/config/site-config";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, inquiryType, message } = body;

    const ownerPayload = {
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      phoneNumber: phone,
      inquiryType,
      message,
    };
    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`, // ✅ verified sender
      to: site.emails.inquiries, // owner inbox
      subject: "📩 New Customer Inquiry Received",
      react: OwnerConfirmationEmail(ownerPayload),
    });

    const { error: backupError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`, // ✅ verified sender
      to: site.emails.backup, // owner inbox
      subject: "📩 New Customer Inquiry Received",
      react: OwnerConfirmationEmail(ownerPayload),
    });

    if (ownerError || backupError) {
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    // 2. Send confirmation to customer
    const { error: customerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.inquiries}>`,
      to: [email],
      subject: `✅ We received your ${inquiryType} inquiry`,
      react: CustomerConfirmationEmail({
        customerName: `${firstName} ${lastName}`,
        inquiryType,
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
