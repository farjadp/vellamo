import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../supabase.js";
import { supaError } from "../supabase.js";

const defaultRoutes = [
  { pathname: "/", title: "vellamo — Guardian beneath the surface" },
  { pathname: "/product", title: "Product — vellamo" },
  { pathname: "/team", title: "Team — vellamo" },
  { pathname: "/about", title: "About — vellamo" },
  { pathname: "/news", title: "News & knowledge — vellamo" },
  { pathname: "/contact", title: "Contact — vellamo" },
];

export default function SEOPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    supabase
      .from("seo_settings")
      .select("*")
      .then(({ data, error: err }) => {
        setLoading(false);
        if (err) {
          setError(supaError(err));
          return;
        }
        const map = new Map((data || []).map((d) => [d.pathname, d]));
        // ensure the default routes exist in the list
        const merged = defaultRoutes.map((r) => ({
          ...r,
          description: "",
          og_title: "",
          og_description: "",
          keywords: "",
          ...map.get(r.pathname),
        }));
        setItems(merged);
      });
  }, []);

  const update = (pathname, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.pathname === pathname ? { ...item, [field]: value } : item
      )
    );
  };

  const save = async (item) => {
    if (!isSupabaseConfigured) return;
    setSaving(true);
    setMessage("");
    setError("");
    const { error: err } = await supabase.from("seo_settings").upsert(
      {
        pathname: item.pathname,
        title: item.title,
        description: item.description,
        og_title: item.og_title,
        og_description: item.og_description,
        keywords: item.keywords,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "pathname" }
    );
    setSaving(false);
    if (err) {
      setError(supaError(err));
      return;
    }
    setMessage(`Saved SEO for ${item.pathname}`);
    setTimeout(() => setMessage(""), 2000);
  };

  if (!isSupabaseConfigured) {
    return (
      <p className="text-vellamo-ice/60">
        Configure Supabase in <code>.env.local</code> to edit SEO.
      </p>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-vellamo-ice">SEO settings</h1>
      <p className="mt-2 text-vellamo-ice/60">
        Edit title, description and social metadata for each page.
      </p>
      {message && <p className="mt-4 text-vellamo-teal">{message}</p>}
      {error && <p className="mt-4 text-red-200">{error}</p>}
      <div className="mt-8 grid gap-6">
        {items.map((item) => (
          <div key={item.pathname} className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-vellamo-ice">{item.pathname}</h2>
              <button
                onClick={() => save(item)}
                disabled={saving}
                className="rounded-lg bg-vellamo-teal px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="text-vellamo-ice/80">Title</span>
                <input
                  value={item.title || ""}
                  onChange={(e) => update(item.pathname, "title", e.target.value)}
                  className="input-admin mt-1"
                />
              </label>
              <label className="block text-sm">
                <span className="text-vellamo-ice/80">Keywords (comma separated)</span>
                <input
                  value={item.keywords || ""}
                  onChange={(e) => update(item.pathname, "keywords", e.target.value)}
                  className="input-admin mt-1"
                />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="text-vellamo-ice/80">Description</span>
                <textarea
                  rows={2}
                  value={item.description || ""}
                  onChange={(e) => update(item.pathname, "description", e.target.value)}
                  className="input-admin mt-1"
                />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="text-vellamo-ice/80">OG Title</span>
                <input
                  value={item.og_title || ""}
                  onChange={(e) => update(item.pathname, "og_title", e.target.value)}
                  className="input-admin mt-1"
                />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="text-vellamo-ice/80">OG Description</span>
                <textarea
                  rows={2}
                  value={item.og_description || ""}
                  onChange={(e) => update(item.pathname, "og_description", e.target.value)}
                  className="input-admin mt-1"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
