import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // ✅ use verified sender
      to: ["quickprimetech@gmail.com"],
      subject: "Your Reservation is Confirmed 🎉",
      react: EmailTemplate({
        firstName: "John",
        restaurantName: "Lis Chinese Restaurant",
        date: "October 5, 2025",
        time: "7:30 PM",
        guests: 4,
        specialRequest: "Window seat if possible",
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
