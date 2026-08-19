import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn } from "./useAuth.js";
import { supaError } from "../supabase.js";

export default function Login({ onSession }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || "");
  const [password, setPassword] = useState(import.meta.env.VITE_ADMIN_PASSWORD || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(supaError(err));
      return;
    }
    onSession(data.session);
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={handle}
        className="glass-strong w-full max-w-md rounded-3xl p-8 md:p-10"
      >
        <h1 className="text-2xl font-bold text-vellamo-ice">vellamo admin</h1>
        <p className="mt-2 text-sm text-vellamo-ice/60">
          Sign in to manage SEO, articles, team and messages.
        </p>
        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
        <div className="mt-6 grid gap-4">
          <label className="block">
            <span className="text-sm font-medium text-vellamo-ice/80">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-admin mt-1"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-vellamo-ice/80">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-admin mt-1"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="glow-teal mt-2 rounded-xl bg-vellamo-teal px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
