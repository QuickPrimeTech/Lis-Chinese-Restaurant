// /app/api/revalidate/route.ts (Next.js App Router)
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { path, secret } = await req.json();

    // 1. Verify the secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid secret" },
        { status: 401 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { revalidated: false, message: "No path provided" },
        { status: 400 }
      );
    }

    // 2. Revalidate the given path
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, path });
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Error revalidating" },
      { status: 500 }
    );
  }
}
