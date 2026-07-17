import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabase.js";
import { supaError } from "../supabase.js";

const commonPlatforms = [
  "LinkedIn",
  "X",
  "Twitter",
  "Instagram",
  "Facebook",
  "YouTube",
  "GitHub",
  "BlueSky",
  "Website",
];

export default function SocialLinksPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data, error: err }) => {
        setLoading(false);
        if (err) {
          setError(supaError(err));
          return;
        }
        setLinks(data || []);
      });
  }, []);

  const update = (id, field, value) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const add = () => {
    setLinks((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, platform: "", url: "", display_order: prev.length, active: true, isNew: true },
    ]);
  };

  const remove = async (id) => {
    if (!confirm("Delete this link?")) return;
    if (String(id).startsWith("new-")) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    await supabase.from("social_links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const save = async () => {
    if (!isSupabaseConfigured) return;
    setSaving(true);
    setError("");
    setMessage("");

    const newItems = links.filter((l) => l.isNew);
    const existingItems = links.filter((l) => !l.isNew);

    if (newItems.length > 0) {
      const inserts = newItems.map((l) => ({
        platform: l.platform,
        url: l.url,
        display_order: Number(l.display_order) || 0,
        active: l.active,
      }));
      const { error: insertErr } = await supabase.from("social_links").insert(inserts);
      if (insertErr) {
        setSaving(false);
        setError(supaError(insertErr));
        return;
      }
    }

    for (const l of existingItems) {
      const { error: updateErr } = await supabase
        .from("social_links")
        .update({
          platform: l.platform,
          url: l.url,
          display_order: Number(l.display_order) || 0,
          active: l.active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", l.id);
      if (updateErr) {
        setSaving(false);
        setError(supaError(updateErr));
        return;
      }
    }

    const { data } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });
    setLinks(data || []);
    setSaving(false);
    setMessage("Saved.");
    setTimeout(() => setMessage(""), 2000);
  };

  if (!isSupabaseConfigured) {
    return <p className="text-vellamo-ice/60">Supabase not configured.</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-vellamo-ice">Social links</h1>
        <button
          onClick={add}
          className="glow-teal rounded-xl bg-vellamo-teal px-5 py-2.5 text-sm font-semibold text-white"
        >
          + Add link
        </button>
      </div>
      <p className="mt-2 text-vellamo-ice/60">
        These links appear in the website footer.
      </p>
      {message && <p className="mt-4 text-vellamo-teal">{message}</p>}
      {error && <p className="mt-4 text-red-200">{error}</p>}
      {loading && <p className="mt-6 text-vellamo-ice/60">Loading…</p>}
      <div className="mt-6 grid gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center"
          >
            <div className="grid flex-1 gap-4 sm:grid-cols-3">
              <label className="block text-sm">
                <span className="text-vellamo-ice/80">Platform</span>
                <input
                  list="platform-suggestions"
                  value={link.platform}
                  onChange={(e) => update(link.id, "platform", e.target.value)}
                  className="input-admin mt-1"
                  placeholder="e.g. LinkedIn"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-vellamo-ice/80">URL</span>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => update(link.id, "url", e.target.value)}
                  className="input-admin mt-1"
                  placeholder="https://..."
                />
              </label>
            </div>
            <div className="flex items-center gap-3">
              <label className="block text-sm">
                <span className="text-vellamo-ice/80">Order</span>
                <input
                  type="number"
                  value={link.display_order}
                  onChange={(e) => update(link.id, "display_order", e.target.value)}
                  className="input-admin mt-1 w-20"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={link.active}
                  onChange={(e) => update(link.id, "active", e.target.checked)}
                  className="h-4 w-4 accent-vellamo-teal"
                />
                <span className="text-vellamo-ice/80">Active</span>
              </label>
              <button
                onClick={() => remove(link.id)}
                className="rounded-lg border border-red-400/30 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <datalist id="platform-suggestions">
        {commonPlatforms.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
      {links.length > 0 && (
        <button
          onClick={save}
          disabled={saving}
          className="glow-teal mt-6 rounded-xl bg-vellamo-teal px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      )}
    </>
  );
}
