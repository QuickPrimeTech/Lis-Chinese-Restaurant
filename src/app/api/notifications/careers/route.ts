// @/app/api/careers/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { serverApplicationSchema } from "@/schemas/career-schema";
import { supabase } from "@/lib/supabase/server";
import { CustomerConfirmationEmail } from "@/email-templates/careers/customer";
import { OwnerConfirmationEmail } from "@/email-templates/careers/owner";
import { site } from "@/config/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = serverApplicationSchema.parse(body);

    // ✅ Prepare data for insertion (map reserved keywords safely)
    const insertData = {
      first_name: parsed.firstName,
      last_name: parsed.lastName,
      email: parsed.email,
      phone: parsed.phone,
      address: parsed.address,
      date_of_birth: parsed.dateOfBirth,
      position: parsed.position,
      experience: parsed.experience,
      previous_employment: parsed.previousEmployment,
      skills: parsed.skills ?? [],
      languages: parsed.languages ?? [],
      start_date: parsed.startDate,
      hours_per_week: parsed.hoursPerWeek,
      cover_letter: parsed.coverLetter,
      references: parsed.references || null, // reserved keyword but valid when quoted
      cv_url: parsed.cvUrl ?? null,
    };

    // ✅ Insert into correct table
    const { error } = await supabase
      .from("careers-applications")
      .insert([insertData])
      .select();

    if (error) throw error;

    // inside POST handler
    await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.system}>`,
      to: `${site.emails.careers}`,
      subject: `New Job Application: ${parsed.firstName} ${parsed.lastName}`,
      react: OwnerConfirmationEmail({
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        email: parsed.email,
        phone: parsed.phone,
        address: parsed.address,
        dateOfBirth: parsed.dateOfBirth,
        position: parsed.position,
        experience: parsed.experience,
        previousEmployment: parsed.previousEmployment,
        skills: parsed.skills,
        languages: parsed.languages,
        startDate: parsed.startDate,
        hoursPerWeek: parsed.hoursPerWeek,
        coverLetter: parsed.coverLetter,
        references: parsed.references,
        cvUrl: parsed.cvUrl ?? "",
      }),
    });

    // ✅ Send confirmation to applicant
    await resend.emails.send({
      from: `${site.restaurant.name} <${site.emails.careers}>`,
      to: parsed.email,
      subject: "We’ve received your application!",
      react: CustomerConfirmationEmail({
        firstName: parsed.firstName,
        position: parsed.position,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Application submission failed:", err);

    return NextResponse.json(
      { error: err.message || "Failed to submit application" },
      { status: 400 }
    );
  }
}
