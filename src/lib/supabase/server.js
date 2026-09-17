import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client for anonymous read access (retrieval)
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase URL or Anon key missing in environment.");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Server-side Admin Client with Service Role Key (for RAG ingestion, writes, uploads)
export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase Service Role Key or URL missing in environment.");
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
