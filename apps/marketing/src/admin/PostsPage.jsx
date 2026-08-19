import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams, Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../supabase.js";
import { supaError } from "../supabase.js";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dateInputValue(d) {
  if (!d) return "";
  const date = new Date(d);
  return date.toISOString().split("T")[0];
}

function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        setLoading(false);
        if (err) {
          console.error(err);
          return;
        }
        setPosts(data || []);
      });
  }, []);

  const togglePublish = async (post) => {
    const { error } = await supabase
      .from("posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    if (!error) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p))
      );
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this article permanently?")) return;
    await supabase.from("posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-vellamo-ice">Articles</h1>
        <button
          onClick={() => navigate("/admin/posts/new")}
          className="glow-teal rounded-xl bg-vellamo-teal px-5 py-2.5 text-sm font-semibold text-white"
        >
          + New article
        </button>
      </div>
      {loading && <p className="mt-6 text-vellamo-ice/60">Loading…</p>}
      <div className="mt-6 grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass card-hover flex flex-col justify-between gap-4 rounded-2xl p-5 md:flex-row md:items-center"
          >
            <div>
              <h2 className="font-semibold text-vellamo-ice">{post.title}</h2>
              <p className="text-sm text-vellamo-ice/50">
                {post.slug} · {post.date} · {post.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => togglePublish(post)}
                className="rounded-lg border border-vellamo-ice/15 px-3 py-1.5 text-sm hover:bg-vellamo-ice/5"
              >
                {post.published ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                className="rounded-lg border border-vellamo-teal/30 px-3 py-1.5 text-sm text-vellamo-teal hover:bg-vellamo-teal/10"
              >
                Edit
              </button>
              <button
                onClick={() => remove(post.id)}
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

function PostEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [post, setPost] = useState({
    slug: "",
    title: "",
    tag: "Article",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    body: "",
    published: false,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew || !isSupabaseConfigured) return;
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: err }) => {
        if (err) {
          setError(supaError(err));
          return;
        }
        setPost({ ...data, date: data.date || data.created_at });
      });
  }, [id]);

  const update = (field, value) => setPost((p) => ({ ...p, [field]: value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...post,
      date: post.date || new Date().toISOString().split("T")[0],
      slug: post.slug || slugify(post.title),
      updated_at: new Date().toISOString(),
    };
    const { error: err } = isNew
      ? await supabase.from("posts").insert(payload)
      : await supabase.from("posts").update(payload).eq("id", id);
    setSaving(false);
    if (err) {
      setError(supaError(err));
      return;
    }
    navigate("/admin/posts");
  };

  if (!isSupabaseConfigured) {
    return <p className="text-vellamo-ice/60">Supabase not configured.</p>;
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          to="/admin/posts"
          className="text-sm text-vellamo-ice/60 hover:text-vellamo-ice"
        >
          ← Articles
        </Link>
      </div>
      <h1 className="mt-4 text-3xl font-bold text-vellamo-ice">
        {isNew ? "New article" : "Edit article"}
      </h1>
      {error && <p className="mt-4 text-red-200">{error}</p>}
      <form onSubmit={save} className="mt-6 grid gap-5">
        <label className="block text-sm">
          <span className="text-vellamo-ice/80">Title</span>
          <input
            value={post.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className="input-admin mt-1"
          />
        </label>
        <div className="grid gap-5 md:grid-cols-3">
          <label className="block text-sm">
            <span className="text-vellamo-ice/80">Slug</span>
            <input
              value={post.slug}
              onChange={(e) => update("slug", e.target.value)}
              onBlur={() => {
                if (!post.slug && post.title) update("slug", slugify(post.title));
              }}
              required
              className="input-admin mt-1"
            />
          </label>
          <label className="block text-sm">
            <span className="text-vellamo-ice/80">Tag</span>
            <input
              value={post.tag}
              onChange={(e) => update("tag", e.target.value)}
              required
              className="input-admin mt-1"
            />
          </label>
          <label className="block text-sm">
            <span className="text-vellamo-ice/80">Date</span>
            <input
              type="date"
              value={dateInputValue(post.date)}
              onChange={(e) => update("date", e.target.value)}
              required
              className="input-admin mt-1"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="text-vellamo-ice/80">Excerpt</span>
          <textarea
            rows={3}
            value={post.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            required
            className="input-admin mt-1"
          />
        </label>
        <label className="block text-sm">
          <span className="text-vellamo-ice/80">Body (Markdown supported)</span>
          <textarea
            rows={14}
            value={post.body}
            onChange={(e) => update("body", e.target.value)}
            required
            className="input-admin mt-1 font-mono text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={post.published}
            onChange={(e) => update("published", e.target.checked)}
            className="h-4 w-4 accent-vellamo-teal"
          />
          <span className="text-vellamo-ice/80">Publish immediately</span>
        </label>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="glow-teal rounded-xl bg-vellamo-teal px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : isNew ? "Create article" : "Save changes"}
          </button>
          <Link
            to="/admin/posts"
            className="rounded-xl border border-vellamo-ice/15 px-6 py-3 text-sm font-semibold text-vellamo-ice/80 hover:text-vellamo-ice"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}

export default function PostsPage() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="new" element={<PostEditor />} />
      <Route path="edit/:id" element={<PostEditor />} />
    </Routes>
  );
}
