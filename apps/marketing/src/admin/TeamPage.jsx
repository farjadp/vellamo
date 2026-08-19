import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../supabase.js";
import { supaError } from "../supabase.js";

function TeamList() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => setMembers(data || []));
  }, []);

  const remove = async (id) => {
    if (!confirm("Remove this team member?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-vellamo-ice">Team</h1>
        <button
          onClick={() => navigate("/admin/team/new")}
          className="glow-teal rounded-xl bg-vellamo-teal px-5 py-2.5 text-sm font-semibold text-white"
        >
          + New member
        </button>
      </div>
      <div className="mt-6 grid gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="glass card-hover flex items-center justify-between gap-4 rounded-2xl p-5"
          >
            <div className="flex items-center gap-4">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-vellamo-teal/40"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-vellamo-ice/10 text-xs text-vellamo-ice/60">
                  no photo
                </div>
              )}
              <div>
                <h2 className="font-semibold text-vellamo-ice">
                  {member.name} · {member.role}
                </h2>
                <p className="text-sm text-vellamo-ice/50">
                  {member.public ? "Public" : "Hidden"} · order {member.display_order}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/team/edit/${member.id}`)}
                className="rounded-lg border border-vellamo-teal/30 px-3 py-1.5 text-sm text-vellamo-teal hover:bg-vellamo-teal/10"
              >
                Edit
              </button>
              <button
                onClick={() => remove(member.id)}
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

function TeamEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const fileRef = useRef();
  const [member, setMember] = useState({
    key: "",
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    display_order: 0,
    public: true,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew || !isSupabaseConfigured) return;
    supabase
      .from("team_members")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: err }) => {
        if (err) setError(supaError(err));
        else if (data) setMember(data);
      });
  }, [id]);

  const update = (field, value) => setMember((m) => ({ ...m, [field]: value }));

  const uploadPhoto = async (file) => {
    if (!file || !supabase) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `team/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (upErr) {
      setUploading(false);
      setError(supaError(upErr));
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    update("photo_url", data.publicUrl);
    setUploading(false);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...member,
      key: member.key || member.name.toLowerCase().replace(/\s+/g, "-"),
      display_order: Number(member.display_order) || 0,
      updated_at: new Date().toISOString(),
    };
    const { error: err } = isNew
      ? await supabase.from("team_members").insert(payload)
      : await supabase.from("team_members").update(payload).eq("id", id);
    setSaving(false);
    if (err) {
      setError(supaError(err));
      return;
    }
    navigate("/admin/team");
  };

  if (!isSupabaseConfigured) return <p className="text-vellamo-ice/60">Supabase not configured.</p>;

  return (
    <>
      <Link
        to="/admin/team"
        className="text-sm text-vellamo-ice/60 hover:text-vellamo-ice"
      >
        ← Team
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-vellamo-ice">
        {isNew ? "New team member" : "Edit team member"}
      </h1>
      {error && <p className="mt-4 text-red-200">{error}</p>}
      <form onSubmit={save} className="mt-6 grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm">
            <span className="text-vellamo-ice/80">Name</span>
            <input
              value={member.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className="input-admin mt-1"
            />
          </label>
          <label className="block text-sm">
            <span className="text-vellamo-ice/80">Role</span>
            <input
              value={member.role}
              onChange={(e) => update("role", e.target.value)}
              required
              className="input-admin mt-1"
            />
          </label>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm">
            <span className="text-vellamo-ice/80">Machine key</span>
            <input
              value={member.key}
              onChange={(e) => update("key", e.target.value)}
              className="input-admin mt-1"
            />
          </label>
          <label className="block text-sm">
            <span className="text-vellamo-ice/80">Display order</span>
            <input
              type="number"
              value={member.display_order}
              onChange={(e) => update("display_order", e.target.value)}
              className="input-admin mt-1"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="text-vellamo-ice/80">Bio</span>
          <textarea
            rows={6}
            value={member.bio}
            onChange={(e) => update("bio", e.target.value)}
            required
            className="input-admin mt-1"
          />
        </label>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm font-medium text-vellamo-ice/80">Photo</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {member.photo_url ? (
              <img
                src={member.photo_url}
                alt="preview"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-vellamo-teal/40"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vellamo-ice/10 text-xs text-vellamo-ice/60">
                no photo
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadPhoto(file);
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-lg border border-vellamo-teal/30 px-4 py-2 text-sm font-medium text-vellamo-teal hover:bg-vellamo-teal/10 disabled:opacity-60"
            >
              {uploading ? "Uploading…" : member.photo_url ? "Change photo" : "Upload photo"}
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={member.public}
            onChange={(e) => update("public", e.target.checked)}
            className="h-4 w-4 accent-vellamo-teal"
          />
          <span className="text-vellamo-ice/80">Visible on website</span>
        </label>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="glow-teal rounded-xl bg-vellamo-teal px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : isNew ? "Create member" : "Save changes"}
          </button>
          <Link
            to="/admin/team"
            className="rounded-xl border border-vellamo-ice/15 px-6 py-3 text-sm font-semibold text-vellamo-ice/80 hover:text-vellamo-ice"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}

export default function TeamPage() {
  return (
    <Routes>
      <Route path="/" element={<TeamList />} />
      <Route path="new" element={<TeamEditor />} />
      <Route path="edit/:id" element={<TeamEditor />} />
    </Routes>
  );
}
