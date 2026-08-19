import { Link } from "react-router-dom";
import { useContent, useLocale } from "../i18n/LocaleContext.jsx";
import Reveal from "../components/Reveal.jsx";
import { LogoMark } from "../components/Graphics.jsx";

/** 404 page — shown for any route that doesn't match, styled to match the rest of the site. */
export default function NotFound() {
  const { NOT_FOUND } = useContent();
  const { path } = useLocale();
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--vellamo-teal)" }}
        aria-hidden="true"
      />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center px-5 pb-24 pt-32 text-center md:pt-40">
        <Reveal>
          <div className="mx-auto mb-8 opacity-70">
            <LogoMark size={40} tone="light" />
          </div>
          <p className="text-sm font-medium uppercase tracking-widest text-vellamo-teal">
            {NOT_FOUND.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-vellamo-ice md:text-6xl">
            {NOT_FOUND.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-vellamo-ice/70">
            {NOT_FOUND.text}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={path("/")}
              className="glow-teal rounded-xl bg-vellamo-teal px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.05]"
            >
              {NOT_FOUND.home}
            </Link>
            <Link
              to={path("/contact")}
              className="rounded-xl border border-vellamo-ice/15 px-6 py-3 text-sm font-medium text-vellamo-ice/80 transition-colors hover:border-vellamo-teal/40 hover:text-vellamo-teal"
            >
              {NOT_FOUND.contact}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
