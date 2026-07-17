import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../supabase.js";
import { supaError } from "../supabase.js";

export default function Dashboard() {
  const [counts, setCounts] = useState({ posts: 0, team: 0, messages: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    (async () => {
      const [{ count: posts }, { count: team }, { count: messages }] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("messages").select("id", { count: "exact", head: true }),
      ]);
      if (posts === null || team === null || messages === null) return;
      setCounts({ posts, team, messages });
    })();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-6 text-red-200">
        <h2 className="font-semibold">Supabase not configured</h2>
        <p className="mt-2 text-sm">
          Add <code className="rounded bg-black/20 px-1">VITE_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-black/20 px-1">VITE_SUPABASE_ANON_KEY</code> to{" "}
          <code className="rounded bg-black/20 px-1">.env.local</code>.
        </p>
      </div>
    );
  }

  const cards = [
    { label: "Articles", value: counts.posts, to: "/admin/posts", color: "text-vellamo-teal" },
    { label: "Team members", value: counts.team, to: "/admin/team", color: "text-vellamo-ice" },
    { label: "Unread messages", value: counts.messages, to: "/admin/messages", color: "text-amber-300" },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-vellamo-ice">Dashboard</h1>
      {error && <p className="mt-4 text-red-200">{error}</p>}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="glass card-hover rounded-2xl p-7"
          >
            <p className="text-sm font-medium text-vellamo-ice/60">{c.label}</p>
            <p className={`stat-figure mt-2 text-4xl ${c.color}`}>{c.value}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
