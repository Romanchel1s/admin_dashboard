// src/api/supabaseClient.d.ts
declare module "../api/supabaseClient" {
    import { SupabaseClient } from "@supabase/supabase-js";
    const supabase: SupabaseClient;
    export default supabase;
  }
  