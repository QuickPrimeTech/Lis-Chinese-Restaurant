// @/app/api/notification/orders/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { OwnerConfirmationEmail } from "@/email-templates/private-events/owner";
import { CustomerConfirmationEmail } from "@/email-templates/private-events/customer";
import { site } from "@/config/site-config";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { email } = body;

    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`, // ✅ verified sender
      to: [site.emails.events], // owner inbox
      subject: "You've received a private event inquiry🎉",
      react: OwnerConfirmationEmail({
        ...body,
      }),
    });

    if (ownerError) {
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    // 2. Send confirmation to customer
    const { error: customerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.events}>`,
      to: [email],
      subject: `We received your Private event inquiry 🎉`,
      react: CustomerConfirmationEmail({
        ...body,
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
