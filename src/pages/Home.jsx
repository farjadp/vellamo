import { Link } from "react-router-dom";
import { HOME, PROBLEM } from "../content.js";
import { Hero, TiltCard } from "../components/Sections.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  SectionDivider,
  IconFatigue,
  IconCorrosion,
  IconIce,
} from "../components/Graphics.jsx";

const PROBLEM_ICONS = {
  fatigue: IconFatigue,
  corrosion: IconCorrosion,
  ice: IconIce,
};

/** Compact glimpse of the problem — full story lives on the Product page. */
function ProblemGlimpse() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <Reveal>
          <p className="eyebrow uppercase">{HOME.glimpse.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-vellamo-ice md:text-5xl">
            {PROBLEM.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg">{PROBLEM.intro}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROBLEM.columns.map((col, i) => {
            const Icon = PROBLEM_ICONS[col.key];
            return (
              <Reveal key={col.key} delay={i * 130}>
                <TiltCard className="h-full p-8">
                  <div
                    className="float-bob inline-block"
                    style={{ animationDelay: `${i * 1.2}s` }}
                  >
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-vellamo-ice">
                    {col.title}
                  </h3>
                  <p className="mt-2">{col.text}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={220}>
          <Link
            to="/product"
            className="group mt-12 inline-flex items-center gap-2 font-semibold text-vellamo-teal"
          >
            {HOME.glimpse.link}
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** Teaser cards linking to the inner pages. */
function Explore() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-[-12%] top-1/3 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--vellamo-teal)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <Reveal>
          <p className="eyebrow uppercase">{HOME.explore.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-vellamo-ice md:text-5xl">
            {HOME.explore.title}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {HOME.explore.cards.map((card, i) => (
            <Reveal key={card.key} delay={i * 110}>
              <Link to={card.to} className="group block h-full">
                <TiltCard className="h-full p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-vellamo-ice">
                      {card.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-xl text-vellamo-teal transition-transform group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-3">{card.text}</p>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Slim closing CTA band — the full form lives on the Contact page. */
function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--vellamo-teal)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-8 md:pb-36">
        <Reveal>
          <div className="glass-strong glow-teal rounded-3xl p-10 text-center md:p-16">
            <h2 className="text-3xl font-bold text-vellamo-ice md:text-4xl">
              {HOME.ctaBand.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl">{HOME.ctaBand.text}</p>
            <Link
              to="/contact"
              className="glow-teal mt-8 inline-block rounded-xl bg-vellamo-teal px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.04]"
            >
              {HOME.ctaBand.button}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Home: hero + compact teasers. Full sections live on the inner pages. */
export default function Home() {
  return (
    <>
      <Hero />
      <ProblemGlimpse />
      <SectionDivider />
      <Explore />
      <CtaBand />
    </>
  );
}
