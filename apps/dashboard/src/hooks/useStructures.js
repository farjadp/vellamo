import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";

/** List of structures, each with its latest condition snapshot attached. */
export function useStructures() {
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data: rows, error } = await supabase
        .from("structures")
        .select("*")
        .eq("active", true)
        .order("name");
      if (error || !rows) {
        setLoading(false);
        return;
      }

      const withCondition = await Promise.all(
        rows.map(async (structure) => {
          const { data: snapshot } = await supabase
            .from("condition_snapshots")
            .select("status, remaining_life_pct, summary, computed_at")
            .eq("structure_id", structure.id)
            .order("computed_at", { ascending: false })
            .limit(1)
            .maybeSingle();
          return { ...structure, condition: snapshot || null };
        })
      );

      if (!cancelled) {
        setStructures(withCondition);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { structures, loading };
}
