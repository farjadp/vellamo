const STYLES = {
  healthy: "bg-vellamo-teal/10 border-vellamo-teal/30 text-vellamo-teal",
  watch: "bg-vellamo-amber/10 border-vellamo-amber/30 text-vellamo-amber",
  attention: "bg-vellamo-red/10 border-vellamo-red/30 text-red-300",
};

const LABELS = {
  healthy: "Healthy",
  watch: "Watch",
  attention: "Needs attention",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES.healthy;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status] || status}
    </span>
  );
}
