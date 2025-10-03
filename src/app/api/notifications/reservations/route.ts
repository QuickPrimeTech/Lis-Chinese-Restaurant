import { site } from "@/config/site-config";
// @/app/api/notification/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { OwnerConfirmationEmail } from "@/email-templates/reservations/owner";
import { CustomerConfirmationEmail } from "@/email-templates/reservations/customer";
import { ReservationFormValues } from "@/schemas/reservations";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body: ReservationFormValues = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      guests,
      diningPreference,
      occasion,
      requests,
    } = body;

    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`, // ✅ verified sender
      to: [site.emails.reservations], // owner inbox
      subject: "New Reservation Booked 🎉",
      react: OwnerConfirmationEmail({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        date: date,
        time: time,
        guests: guests,
        diningPreference: diningPreference,
        occasion: occasion,
        requests: requests,
      }),
    });

    if (ownerError) {
      console.log(ownerError);
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    // 2. Send confirmation to customer
    const { error: customerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.reservations}>`,
      to: [email],
      subject: `We've received your Reservation ${firstName} ${lastName} 🎉`,
      react: CustomerConfirmationEmail({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        date: date,
        time: time,
        guests: guests,
        diningPreference: diningPreference,
        occasion: occasion,
        requests: requests,
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
