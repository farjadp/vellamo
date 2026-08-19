import { Link, useParams } from "react-router-dom";
import { useStructureDetail } from "../hooks/useStructureDetail.js";
import StatusBadge from "../components/StatusBadge.jsx";
import Sparkline from "../components/Sparkline.jsx";

export default function StructureDetail() {
  const { key } = useParams();
  const { data, loading } = useStructureDetail(key);

  if (loading) return <p className="p-8 text-vellamo-ice/60">Loading…</p>;
  if (!data) return <p className="p-8 text-vellamo-ice/60">Not found.</p>;

  const { structure, sensors, history, alerts } = data;
  const latest = history[history.length - 1];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link to="/" className="text-sm text-vellamo-teal hover:underline">
        ← All structures
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vellamo-ice">{structure.name}</h1>
          <p className="text-sm text-vellamo-ice/50">{structure.location}</p>
        </div>
        <StatusBadge status={latest?.status || "healthy"} />
      </div>

      <div className="glass mt-6 rounded-2xl p-6">
        <div className="flex items-baseline gap-3">
          <span className="stat-figure text-4xl font-bold text-vellamo-ice">
            {latest ? `${latest.remaining_life_pct}%` : "—"}
          </span>
          <span className="text-sm text-vellamo-ice/50">estimated remaining life</span>
        </div>
        <p className="mt-3 text-vellamo-ice/70">{latest?.summary || "No condition data yet."}</p>
        <div className="mt-4">
          <Sparkline
            points={history.map((h) => ({ value: Number(h.remaining_life_pct) }))}
            width={640}
            height={80}
          />
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-vellamo-ice">Sensors</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {sensors.map((sensor) => {
          const last = sensor.readings[sensor.readings.length - 1];
          return (
            <div key={sensor.id} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-vellamo-ice">
                  {sensor.key.replace(/-/g, " ")}
                </span>
                <span className="text-xs uppercase tracking-wide text-vellamo-ice/40">
                  {sensor.sensor_type}
                </span>
              </div>
              <div className="mt-2 text-2xl font-semibold text-vellamo-ice">
                {last ? Number(last.value).toFixed(2) : "—"}
                <span className="ml-1 text-sm font-normal text-vellamo-ice/40">{sensor.unit}</span>
              </div>
              <div className="mt-3">
                <Sparkline points={sensor.readings} width={260} height={48} />
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-vellamo-ice">Alerts</h2>
      {alerts.length === 0 ? (
        <p className="mt-3 text-sm text-vellamo-ice/50">No alerts raised.</p>
      ) : (
        <div className="mt-4 grid gap-2">
          {alerts.map((a) => (
            <div
              key={a.id}
              className={`glass flex items-center justify-between rounded-xl p-4 text-sm ${
                a.severity === "critical" ? "border-vellamo-red/30" : "border-vellamo-amber/30"
              }`}
            >
              <span className="text-vellamo-ice/80">{a.message}</span>
              <span className="text-vellamo-ice/40">
                {new Date(a.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
