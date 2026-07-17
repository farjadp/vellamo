import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabase.js";
import { TEAM } from "../content.js";

export function usePublicTeam() {
  const [members, setMembers] = useState(TEAM.members);
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
