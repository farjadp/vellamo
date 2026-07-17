import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV, FOOTER } from "../content.js";
import { Logo, LogoMark } from "./Graphics.jsx";

/** Scroll to top on route change (but respect in-page anchor navigation). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-vellamo-blue ${
      isActive ? "text-vellamo-blue" : "text-vellamo-gray"
    }`;
  return (
    <header className="sticky top-0 z-50 border-b border-vellamo-blue/10 bg-white/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3"
        aria-label="Main navigation"
      >
        <Link to="/" aria-label="vellamo — home">
          <Logo tone="dark" size={32} />
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {NAV.links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="rounded-lg bg-vellamo-teal px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {NAV.cta}
          </Link>
        </div>
        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            {open ? (
              <>
                <line x1="6" y1="6" x2="20" y2="20" stroke="var(--vellamo-blue)" strokeWidth="2" strokeLinecap="round" />
                <line x1="20" y1="6" x2="6" y2="20" stroke="var(--vellamo-blue)" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="22" y2="8" stroke="var(--vellamo-blue)" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="13" x2="22" y2="13" stroke="var(--vellamo-blue)" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="18" x2="22" y2="18" stroke="var(--vellamo-blue)" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-vellamo-blue/10 bg-white px-5 pb-5 pt-2 md:hidden">
          {NAV.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-vellamo-gray hover:text-vellamo-blue"
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block rounded-lg bg-vellamo-teal px-4 py-2 text-sm font-semibold text-white"
          >
            {NAV.cta}
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-vellamo-ice/10 bg-vellamo-blue pb-10 pt-14 text-vellamo-ice">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Logo tone="light" size={30} />
            <p className="mt-5 text-sm text-vellamo-ice/70">{FOOTER.boilerplate}</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
            {NAV.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-vellamo-ice/70 transition-colors hover:text-vellamo-ice"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-start gap-3 border-t border-vellamo-ice/10 pt-6 text-xs text-vellamo-ice/50 md:flex-row md:items-center md:justify-between">
          <p>{FOOTER.copyright}</p>
          <div aria-hidden="true">
            <LogoMark size={22} tone="light" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Shared page shell: sticky nav, routed page content, footer. */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
