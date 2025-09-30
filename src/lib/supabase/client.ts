// @/lib/supabase/client.ts

import { createClient } from "@supabase/supabase-js";

// init supabase client (public anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
