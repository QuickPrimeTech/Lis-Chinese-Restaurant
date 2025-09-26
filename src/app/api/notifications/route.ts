import { Resend } from "resend";
import { NextResponse } from "next/server";
import { ContactEmailTemplate } from "@/email-templates/contact/owner";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // ✅ use verified sender
      to: ["quickprimetech@gmail.com"],
      subject: "Your Reservation is Confirmed 🎉",
      react: ContactEmailTemplate({
        customerName: "John Smith",
        customerEmail: "john.smith@email.com",
        phoneNumber: "+254 123 456 789",
        inquiryType: "Table Reservation",
        message:
          "Hello, I would like to make a reservation for 4 people this Saturday evening at 7 PM. Do you have availability? Also, do you have any vegetarian options on your menu? Thank you for your time.",
        submissionDate: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }), // ✅ correctly closed here
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
