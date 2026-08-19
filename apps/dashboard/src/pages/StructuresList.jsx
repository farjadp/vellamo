import { Link } from "react-router-dom";
import { useStructures } from "../hooks/useStructures.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function StructuresList() {
  const { structures, loading } = useStructures();

  if (loading) {
    return <p className="p-8 text-vellamo-ice/60">Loading…</p>;
  }

  if (structures.length === 0) {
    return (
      <div className="p-8">
        <p className="text-vellamo-ice/60">
          No structures yet. Run the simulator to seed demo data:
        </p>
        <code className="mt-2 block rounded-lg bg-black/30 px-4 py-3 text-sm text-vellamo-teal">
          npm run sim
        </code>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold text-vellamo-ice">Your structures</h1>
      <p className="mt-1 text-sm text-vellamo-ice/60">
        Live condition, updated as new sensor data comes in.
      </p>
      <div className="mt-8 grid gap-4">
        {structures.map((s) => (
          <Link
            key={s.key}
            to={`/structures/${s.key}`}
            className="glass flex items-center justify-between rounded-2xl p-6 transition-colors hover:border-vellamo-teal/40"
          >
            <div>
              <h2 className="text-lg font-semibold text-vellamo-ice">{s.name}</h2>
              <p className="text-sm text-vellamo-ice/50">{s.location}</p>
              {s.condition?.summary && (
                <p className="mt-2 text-sm text-vellamo-ice/70">{s.condition.summary}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge status={s.condition?.status || "healthy"} />
              <span className="text-sm text-vellamo-ice/50">
                {s.condition ? `${s.condition.remaining_life_pct}% remaining life` : "no data yet"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
