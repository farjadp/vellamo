import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabase.js";

export function useSocialLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase
      .from("social_links")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) return;
        setLinks(data);
      });
  }, []);

  return { links, loading };
}
