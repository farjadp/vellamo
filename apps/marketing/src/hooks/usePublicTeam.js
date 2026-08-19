import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabase.js";

/**
 * Team members: live from Supabase if configured, otherwise the given
 * locale's static fallback (Supabase content isn't localized yet, so the
 * live data — when present — is only shown as-is regardless of locale).
 */
export function usePublicTeam(fallbackMembers) {
  const [members, setMembers] = useState(fallbackMembers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase
      .from("team_members")
      .select("*")
      .eq("public", true)
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data || data.length === 0) return;
        setMembers(
          data.map((m) => ({
            key: m.key,
            name: m.name,
            role: m.role,
            bio: m.bio,
            photo_url: m.photo_url,
          }))
        );
      });
  }, []);

  return { members, loading };
}
