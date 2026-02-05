// @/app/api/notification/contact/route.ts

import { site } from "@/config/site-config";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { CustomerConfirmationEmail } from "@/email-templates/reservations/customer";
import { ReservationFormValues } from "@/schemas/reservations";
import { supabase } from "@/lib/supabase/server"; // adjust import if needed
import { OwnerConfirmationEmail } from "@/email-templates/reservations/owner";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const branchId = process.env.BRANCH_ID!;

  if (!branchId) {
    return NextResponse.json(
      { error: "Branch ID is not configured." },
      { status: 403 },
    );
  }

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

    // Insert reservation into Supabase
    const { error: dbError } = await supabase.from("reservations").insert([
      {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        date: new Date(date).toISOString().split("T")[0], // keep only YYYY-MM-DD
        time, // must be in "HH:MM:SS" format for Postgres TIME
        guests: parseInt(guests, 10),
        status: "pending",
        dining_preference: diningPreference,
        occasion,
        requests,
        branch_id: branchId, // or however you link the restaurant
      },
    ]);

    if (dbError) {
      console.error("DB Error:", dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    const ownerPayload = {
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
    };

    // 1. Send email to owner
    const { error: ownerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`,
      to: [site.emails.reservations, site.emails.backup],
      subject: "New Reservation Booked 🎉",
      react: OwnerConfirmationEmail(ownerPayload),
    });

    //Send email to the backup email
    const { error: backupError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`,
      to: site.emails.backup,
      subject: "New Reservation Booked 🎉",
      react: OwnerConfirmationEmail(ownerPayload),
    });

    if (ownerError || backupError) {
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    // 2. Send confirmation to customer
    const { error: customerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.reservations}>`,
      to: [email],
      subject: `We've received your Reservation ${firstName} ${lastName} 🎉`,
      react: CustomerConfirmationEmail({
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
