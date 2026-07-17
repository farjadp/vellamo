import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "./useAuth.js";
import { Logo } from "../components/Graphics.jsx";

const nav = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/seo", label: "SEO" },
  { to: "/admin/posts", label: "Articles" },
  { to: "/admin/team", label: "Team" },
  { to: "/admin/messages", label: "Messages" },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const doSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="glass-strong z-20 flex shrink-0 flex-col justify-between border-r border-vellamo-ice/10 p-5 md:w-60">
        <div>
          <NavLink to="/" className="inline-block">
            <Logo tone="light" size={28} />
          </NavLink>
          <nav className="mt-8 grid gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-vellamo-teal/20 text-vellamo-teal"
                      : "text-vellamo-ice/70 hover:bg-vellamo-ice/5 hover:text-vellamo-ice"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          type="button"
          onClick={doSignOut}
          className="mt-6 rounded-lg border border-vellamo-ice/15 px-4 py-2.5 text-left text-sm font-medium text-vellamo-ice/70 hover:text-vellamo-ice"
        >
          Sign out
        </button>
      </aside>
      <main className="min-h-screen flex-1 overflow-y-auto p-5 md:p-10">
        {children}
      </main>
    </div>
  );
}
