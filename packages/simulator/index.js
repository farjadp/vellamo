// ---------------------------------------------------------------------------
// Synthetic sensor-data generator + a simple statistical "digital twin".
//
// There's no real hardware yet, so this stands in for it: each run adds one
// new reading per sensor, then recomputes each structure's condition with
// a plain z-score threshold model (not real fluid-structure-interaction /
// fatigue physics — see Mission Control for that as a separate, later task).
//
// Run once by hand (`npm run sim` from repo root), or on a schedule — a cron
// job / Supabase Edge Function calling this on an interval is the natural
// next step once this is proven out.
// ---------------------------------------------------------------------------
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env.local") });

import { STRUCTURES } from "./seed.js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Create packages/simulator/.env.local (see .env.example)."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

/** Box-Muller: one standard-normal sample. */
function gaussian() {
  const u1 = Math.random() || 1e-9;
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

async function ensureSeeded() {
  for (const s of STRUCTURES) {
    let { data: structure } = await supabase
      .from("structures")
      .select("id")
      .eq("key", s.key)
      .maybeSingle();

    if (!structure) {
      const { data, error } = await supabase
        .from("structures")
        .insert({
          key: s.key,
          name: s.name,
          structure_type: s.structure_type,
          location: s.location,
          commissioned_on: s.commissioned_on,
        })
        .select("id")
        .single();
      if (error) throw error;
      structure = data;
      console.log(`seeded structure: ${s.name}`);
    }

    for (const sensor of s.sensors) {
      const { data: existing } = await supabase
        .from("sensors")
        .select("id")
        .eq("structure_id", structure.id)
        .eq("key", sensor.key)
        .maybeSingle();

      if (!existing) {
        const { error } = await supabase.from("sensors").insert({
          structure_id: structure.id,
          key: sensor.key,
          sensor_type: sensor.sensor_type,
          unit: sensor.unit,
          baseline_mean: sensor.baseline_mean,
          baseline_stddev: sensor.baseline_stddev,
          drift_per_reading: sensor.drift_per_reading || 0,
        });
        if (error) throw error;
        console.log(`  seeded sensor: ${s.name} / ${sensor.key}`);
      }
    }
  }
}

async function tickSensor(sensor) {
  const { count } = await supabase
    .from("sensor_readings")
    .select("id", { count: "exact", head: true })
    .eq("sensor_id", sensor.id);

  const tick = count || 0;
  const drift = Number(sensor.drift_per_reading) * tick;
  const value =
    Number(sensor.baseline_mean) + drift + gaussian() * Number(sensor.baseline_stddev);

  const { error } = await supabase
    .from("sensor_readings")
    .insert({ sensor_id: sensor.id, value });
  if (error) throw error;

  const z = Math.abs(value - Number(sensor.baseline_mean)) / Number(sensor.baseline_stddev);
  return { sensor, value, z };
}

function statusFor(maxZ, warnZ, alertZ) {
  if (maxZ >= alertZ) return "attention";
  if (maxZ >= warnZ) return "watch";
  return "healthy";
}

async function tickStructure(structure) {
  const { data: sensors, error } = await supabase
    .from("sensors")
    .select("*")
    .eq("structure_id", structure.id)
    .eq("active", true);
  if (error) throw error;

  const results = [];
  for (const sensor of sensors) {
    results.push(await tickSensor(sensor));
  }

  let worst = { z: 0, sensor: null };
  let status = "healthy";
  for (const r of results) {
    const sensorStatus = statusFor(r.z, Number(r.sensor.warn_z), Number(r.sensor.alert_z));
    if (sensorStatus === "attention") status = "attention";
    else if (sensorStatus === "watch" && status !== "attention") status = "watch";
    if (r.z > worst.z) worst = r;
  }

  // Remaining life drifts down slowly, faster while any sensor is degraded —
  // a synthetic stand-in for a real cumulative-fatigue model.
  const { data: lastSnapshot } = await supabase
    .from("condition_snapshots")
    .select("remaining_life_pct")
    .eq("structure_id", structure.id)
    .order("computed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const previousLife = lastSnapshot ? Number(lastSnapshot.remaining_life_pct) : 100;
  const decay = status === "attention" ? 0.6 : status === "watch" ? 0.2 : 0.02;
  const remainingLife = Math.max(0, Math.round((previousLife - decay) * 100) / 100);

  const summary =
    status === "healthy"
      ? "All sensors nominal."
      : `${worst.sensor.key.replace(/-/g, " ")} reading ${worst.z.toFixed(1)}σ from baseline — ${
          status === "attention" ? "schedule an inspection" : "keep watching"
        }.`;

  const { error: snapErr } = await supabase.from("condition_snapshots").insert({
    structure_id: structure.id,
    status,
    remaining_life_pct: remainingLife,
    summary,
  });
  if (snapErr) throw snapErr;

  if (status !== "healthy") {
    await supabase.from("alerts").insert({
      structure_id: structure.id,
      sensor_id: worst.sensor.id,
      severity: status === "attention" ? "critical" : "warning",
      message: summary,
    });
  }

  console.log(
    `${structure.name}: ${status} · remaining life ${remainingLife}% · ${summary}`
  );
}

async function main() {
  await ensureSeeded();

  const { data: structures, error } = await supabase
    .from("structures")
    .select("id, name")
    .eq("active", true);
  if (error) throw error;

  for (const structure of structures) {
    await tickStructure(structure);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
