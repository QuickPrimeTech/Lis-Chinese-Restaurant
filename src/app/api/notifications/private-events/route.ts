// @/app/api/notification/orders/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { OwnerConfirmationEmail } from "@/email-templates/private-events/owner";
import { CustomerConfirmationEmail } from "@/email-templates/private-events/customer";
import { site } from "@/config/site-config";
import { delay } from "@/lib/api";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { email } = body;

    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`, // ✅ verified sender
      to: site.emails.events, // owner inbox
      bcc: [site.emails.backup],
      subject: "You've received a private event inquiry🎉",
      react: OwnerConfirmationEmail({
        ...body,
      }),
    });

    await delay(600);

    // Send email to backup email
    const { error: backupError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`, // ✅ verified sender
      to: site.emails.backup, // owner inbox
      subject: "You've received a private event inquiry🎉",
      react: OwnerConfirmationEmail({
        ...body,
      }),
    });

    if (ownerError || backupError) {
      return NextResponse.json(
        { error: ownerError?.message || backupError?.message },
        { status: 500 },
      );
    }

    await delay(600);

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
      return NextResponse.json(
        { error: customerError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
