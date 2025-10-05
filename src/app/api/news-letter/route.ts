// app/api/news-letter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/schemas/newsletterSchema";
import { supabase } from "@/lib/supabase/server";

const user_id = process.env.USER_ID!; // fixed user ID for all newsletter signups

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request body
    const body = await req.json();

    // ✅ Step 1: Validate input with Zod
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          errorType: "INVALID_EMAIL_FORMAT",
          message: "Please provide a valid email address.",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // ✅ Step 2: Check for duplicate email
    const { data: existing, error: fetchError } = await supabase
      .from("newsletter")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError);
      return NextResponse.json(
        {
          errorType: "NETWORK_ISSUE",
          message: "Network issue while checking for existing email.",
          details: fetchError.message,
        },
        { status: 503 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          errorType: "DUPLICATE_EMAIL",
          message: "This email is already subscribed to the newsletter.",
        },
        { status: 409 }
      );
    }

    // ✅ Step 3: Insert email into Supabase
    const { error: insertError } = await supabase
      .from("newsletter")
      .insert([{ email, user_id }]);

    if (insertError) {
      console.error(
        "Supabase insert error:",
        JSON.stringify(insertError, null, 2)
      );

      // Differentiate insertion errors
      if (insertError.message.includes("duplicate key")) {
        return NextResponse.json(
          {
            errorType: "DUPLICATE_EMAIL",
            message: "This email has already been subscribed.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          errorType: "INSERTION_ERROR",
          message:
            "An error occurred while adding your email. Please try again.",
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    // ✅ Step 4: Return success
    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully!",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Unexpected error:", err);

    // ✅ Step 5: Catch network or unexpected server issues
    if (err instanceof TypeError && err.message.includes("fetch")) {
      return NextResponse.json(
        {
          errorType: "NETWORK_ISSUE",
          message: "Network error occurred while processing your request.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        errorType: "UNKNOWN_ERROR",
        message:
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message?: string }).message ?? "Something went wrong."
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
