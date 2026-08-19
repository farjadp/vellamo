import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth, signOut } from "./useAuth.js";
import Login from "./pages/Login.jsx";
import StructuresList from "./pages/StructuresList.jsx";
import StructureDetail from "./pages/StructureDetail.jsx";

function Shell({ children, onSignOut }) {
  return (
    <>
      <header className="border-b border-vellamo-ice/10 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/" className="font-bold text-vellamo-ice">
            vellamo <span className="text-vellamo-teal">condition</span>
          </Link>
          <button
            onClick={onSignOut}
            className="text-sm text-vellamo-ice/50 hover:text-vellamo-ice"
          >
            Sign out
          </button>
        </div>
      </header>
      {children}
    </>
  );
}

export default function App() {
  const { session, setSession } = useAuth();

  if (session === undefined) return null; // resolving

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            session ? <Navigate to="/" replace /> : <Login onSession={setSession} />
          }
        />
        <Route
          path="/*"
          element={
            session ? (
              <Shell onSignOut={handleSignOut}>
                <Routes>
                  <Route path="/" element={<StructuresList />} />
                  <Route path="/structures/:key" element={<StructureDetail />} />
                </Routes>
              </Shell>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
