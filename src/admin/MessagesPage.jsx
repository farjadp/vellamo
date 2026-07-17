import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../supabase.js";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setMessages(data || []));
  }, []);

  const markRead = async (id, read) => {
    await supabase.from("messages").update({ read }).eq("id", id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read } : m))
    );
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  if (!isSupabaseConfigured) {
    return <p className="text-vellamo-ice/60">Supabase not configured.</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-vellamo-ice">Messages</h1>
      <p className="mt-2 text-vellamo-ice/60">
        Contact form submissions from the website.
      </p>
      {messages.length === 0 && (
        <p className="mt-8 text-vellamo-ice/50">No messages yet.</p>
      )}
      <div className="mt-8 grid gap-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`glass rounded-2xl p-5 ${m.read ? "opacity-70" : "border-l-4 border-l-vellamo-teal"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold text-vellamo-ice">
                {m.name} · {m.email}
              </h2>
              <span className="text-xs text-vellamo-ice/50">
                {new Date(m.created_at).toLocaleString()}
              </span>
            </div>
            {m.organization && (
              <p className="text-sm text-vellamo-ice/50">{m.organization}</p>
            )}
            <p className="mt-3 whitespace-pre-line">{m.message}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => markRead(m.id, !m.read)}
                className="rounded-lg border border-vellamo-ice/15 px-3 py-1.5 text-sm hover:bg-vellamo-ice/5"
              >
                {m.read ? "Mark unread" : "Mark read"}
              </button>
              <button
                onClick={() => remove(m.id)}
                className="rounded-lg border border-red-400/30 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
