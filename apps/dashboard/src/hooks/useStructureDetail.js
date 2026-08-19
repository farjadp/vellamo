import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";

/** One structure with its sensors (+ recent readings), history, and alerts. */
export function useStructureDetail(key) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!key) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      const { data: structure } = await supabase
        .from("structures")
        .select("*")
        .eq("key", key)
        .single();
      if (!structure) {
        setLoading(false);
        return;
      }

      const [{ data: sensors }, { data: history }, { data: alerts }] = await Promise.all([
        supabase.from("sensors").select("*").eq("structure_id", structure.id),
        supabase
          .from("condition_snapshots")
          .select("*")
          .eq("structure_id", structure.id)
          .order("computed_at", { ascending: true })
          .limit(200),
        supabase
          .from("alerts")
          .select("*, sensors(key)")
          .eq("structure_id", structure.id)
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      const sensorsWithReadings = await Promise.all(
        (sensors || []).map(async (sensor) => {
          const { data: readings } = await supabase
            .from("sensor_readings")
            .select("recorded_at, value")
            .eq("sensor_id", sensor.id)
            .order("recorded_at", { ascending: true })
            .limit(200);
          return { ...sensor, readings: readings || [] };
        })
      );

      if (!cancelled) {
        setData({
          structure,
          sensors: sensorsWithReadings,
          history: history || [],
          alerts: alerts || [],
        });
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [key]);

  return { data, loading };
}
