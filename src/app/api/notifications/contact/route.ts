// @/app/api/notification/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { OwnerConfirmationEmail } from "@/email-templates/contact/owner";
import { CustomerConfirmationEmail } from "@/email-templates/contact/customer";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, inquiryType, message } = body;

    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: "QuickPrimeTech <system@quickprimetech.com>", // ✅ verified sender
      to: ["quickprimetech@gmail.com"], // owner inbox
      subject: "📩 New Customer Inquiry Received",
      react: OwnerConfirmationEmail({
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        phoneNumber: phone,
        inquiryType,
        message,
      }),
    });

    if (ownerError) {
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    // 2. Send confirmation to customer
    const { error: customerError } = await resend.emails.send({
      from: "QuickPrimeTech <support@quickprimetech.com>",
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
