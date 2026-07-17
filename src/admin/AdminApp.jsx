import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from "./useAuth";
import AdminLayout from "./AdminLayout.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import SEOPage from "./SEOPage.jsx";
import PostsPage from "./PostsPage.jsx";
import TeamPage from "./TeamPage.jsx";
import MessagesPage from "./MessagesPage.jsx";

function ProtectedRoutes({ session }) {
  if (session === undefined) {
    return (
      <div className="flex h-screen items-center justify-center text-vellamo-ice/70">
        Loading…
      </div>
    );
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="seo" element={<SEOPage />} />
        <Route path="posts/*" element={<PostsPage />} />
        <Route path="team/*" element={<TeamPage />} />
        <Route path="messages" element={<MessagesPage />} />
      </Routes>
    </AdminLayout>
  );
}

/** Admin app mounted at /admin. Lazy-loaded to keep admin JS out of the public bundle. */
export default function AdminApp() {
  const { session, setSession } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login onSession={setSession} />} />
        <Route path="*" element={<ProtectedRoutes session={session} />} />
      </Routes>
    </BrowserRouter>
  );
}
