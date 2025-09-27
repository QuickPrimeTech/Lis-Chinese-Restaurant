// @/app/api/notification/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { CustomerConfirmationEmail } from "@/email-templates/reservations/customer";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: "QuickPrimeTech <reservations@quickprimetech.com>", // ✅ verified sender
      to: ["quickprimetech@gmail.com"], // owner inbox
      subject: "📩 New Customer Inquiry Received",
      react: CustomerConfirmationEmail({
        firstName: "Derick",
        lastName: "Kibiwott",
        email: "kibiwottderick@gmail.com",
        phone: "0717448835",
        date: new Date(),
        time: "3:30PM",
        guests: "8+",
        diningPreference: "outdoors",
      }),
    });

    if (ownerError) {
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
