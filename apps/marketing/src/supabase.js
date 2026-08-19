import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && key && url.startsWith("http"));

export const supabase = isSupabaseConfigured
  ? createClient(url, key)
  : null;

/** Helper: give a human error string from a Supabase error object. */
export function supaError(error) {
  if (!error) return null;
  if (typeof error === "string") return error;
  return error.message || error.error_description || "Something went wrong.";
}
