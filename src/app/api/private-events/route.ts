import { supabase } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { serverPrivateEventsFormValues } from "@/schemas/private-event";
import { ZodError } from "zod";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validate incoming data
    const result = serverPrivateEventsFormValues.safeParse(body);

    if (!result.success) {
      const zodError = result.error as ZodError;
      const errors = zodError.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json({ success: false, errors }, { status: 400 });
    }
    const {
      budget,
      company,
      date,
      details,
      email,
      eventType,
      firstName,
      lastName,
      phone,
      guests,
    } = result.data;

    // You can replace this with actual Supabase auth logic later
    const userId = process.env.USER_ID;

    const { error } = await supabase.from("private_events").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company,
        budget,
        additional_details: details,
        event_date: date,
        event_type: eventType,
        guests,
        user_id: userId,
      },
    ]);

    // ✅ Handle Supabase error
    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Database insertion failed",
          details: error.message,
        },
        { status: 500 }
      );
    }
    //Sending email notification to the user
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/private-events`,
      result.data
    );
    if (res.status !== 200) {
      return NextResponse.json(
        {
          success: true,
          message: "There was an error sending the email notification!",
        },
        { status: 403 }
      );
    }
    // ✅ Success
    return NextResponse.json(
      {
        success: true,
        message: "Event inquiry received successfully!",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Server Error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
        details: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
