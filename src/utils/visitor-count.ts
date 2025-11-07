"use server";

import { supabase } from "@/lib/supabase/server";

export async function getVisitorCount(page = "/payment-pending") {
  // Step 1: Ensure row exists
  await supabase
    .from("visitor_count")
    .upsert({ page, count: 0 }, { onConflict: "page", ignoreDuplicates: true });

  // Step 2: Increment and return new count
  const { data, error } = await supabase.rpc("increment_visitor_count", {
    page_name: page,
  });

  if (error) {
    console.error("Error incrementing visitor count:", error);
    return 0;
  }

  return data;
}
