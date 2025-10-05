import { site } from "@/config/site-config";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";
import { CareerConfirmationEmail } from "@/email-templates/careers/customer";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      dateOfBirth,
      position,
      experience,
      previousEmployment,
      skills,
      languages,
      startDate,
      hoursPerWeek,
      resumeUrl, // already uploaded to supabase storage
      coverLetter,
      references,
    } = body;

    // ✅ Insert into Supabase
    const { error: dbError } = await supabase.from("careers").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        date_of_birth: dateOfBirth,
        position,
        experience,
        previous_employment: previousEmployment,
        skills,
        languages,
        start_date: startDate,
        hours_per_week: hoursPerWeek,
        resume_url: resumeUrl,
        cover_letter: coverLetter,
        references,
      },
    ]);

    if (dbError) {
      console.error("DB Error:", dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // ✅ Send confirmation email to applicant
    const { error: customerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.careers}>`,
      to: [email],
      subject: `Application Received - ${position} 🎉`,
      react: CareerConfirmationEmail({
        firstName,
        lastName,
        position,
      }),
    });

    if (customerError) {
      console.error(customerError);
      return NextResponse.json({ error: customerError }, { status: 500 });
    }

    // ✅ Send notification to HR/Owner
    const { error: ownerError } = await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`,
      to: [site.emails.careers],
      subject: `New Career Application - ${firstName} ${lastName}`,
      text: `A new application was submitted for ${position}. Applicant: ${firstName} ${lastName}, Email: ${email}, Phone: ${phone}.`,
    });

    if (ownerError) {
      console.error(ownerError);
      return NextResponse.json({ error: ownerError }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
