import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";

export function useAuth() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) =>
      setSession(s)
    );
    return () => listener?.subscription?.unsubscribe();
  }, []);

  return { session, setSession };
}

export async function signIn(email, password) {
  if (!supabase) return { error: "Supabase is not configured." };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}
