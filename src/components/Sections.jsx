import { Link } from "react-router-dom";
import {
  HERO,
  PROBLEM,
  SOLUTION,
  WHY_FINLAND,
  WHO_FOR,
  TEAM,
  CONTACT,
} from "../content.js";
import Reveal from "./Reveal.jsx";
import {
  HeroBackdrop,
  BalticMotif,
  IconFatigue,
  IconCorrosion,
  IconIce,
  IconSense,
  IconModel,
  IconAct,
  IconPort,
  IconWind,
  IconShip,
  IconShield,
  AvatarIcon,
} from "./Graphics.jsx";

/* ------------------------- shared page header ----------------------------- */

/** Compact blue header used at the top of the sub-pages. */
export function PageHeader({ title, intro }) {
  return (
    <section className="relative bg-vellamo-blue text-vellamo-ice">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <Reveal>
          <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-lg text-vellamo-ice/80">{intro}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- hero ---------------------------------- */

export function Hero() {
  return (
    <section id="top" className="relative bg-vellamo-blue text-vellamo-ice">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-6xl px-5 py-28 md:py-40">
        <Reveal>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
            {HERO.headline}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-xl text-lg text-vellamo-ice/90 md:text-xl">
            {HERO.subheadline}
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-4 max-w-xl text-base text-vellamo-ice/70">
            {HERO.supporting}
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-lg bg-vellamo-teal px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {HERO.primaryCta}
            </Link>
            <a
              href="#solution"
              className="rounded-lg border border-vellamo-ice/40 px-6 py-3 font-semibold text-vellamo-ice transition-colors hover:border-vellamo-ice hover:bg-vellamo-ice/10"
            >
              {HERO.secondaryCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- problem -------------------------------- */

const PROBLEM_ICONS = {
  fatigue: IconFatigue,
  corrosion: IconCorrosion,
  ice: IconIce,
};

export function Problem() {
  return (
    <section id={PROBLEM.id} className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-bold text-vellamo-blue md:text-4xl">
            {PROBLEM.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg">{PROBLEM.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {PROBLEM.columns.map((col, i) => {
            const Icon = PROBLEM_ICONS[col.key];
            return (
              <Reveal key={col.key} delay={i * 120}>
                <div>
                  <Icon />
                  <h3 className="mt-4 text-xl font-semibold text-vellamo-blue">
                    {col.title}
                  </h3>
                  <p className="mt-2">{col.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {PROBLEM.stats.map((stat, i) => (
            <Reveal key={stat.figure} delay={i * 120}>
              <div className="rounded-xl bg-vellamo-ice p-8">
                <p className="stat-figure text-3xl text-vellamo-blue md:text-4xl">
                  {stat.figure}
                </p>
                <p className="mt-3">{stat.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- solution ------------------------------- */

const SOLUTION_ICONS = {
  sense: IconSense,
  model: IconModel,
  act: IconAct,
};

export function Solution() {
  return (
    <section id={SOLUTION.id} className="scroll-mt-20 bg-vellamo-ice">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-bold text-vellamo-blue md:text-4xl">
            {SOLUTION.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg">{SOLUTION.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SOLUTION.steps.map((step, i) => {
            const Icon = SOLUTION_ICONS[step.key];
            return (
              <Reveal key={step.key} delay={i * 120}>
                <div className="relative h-full rounded-xl bg-white p-8 shadow-sm">
                  <span className="stat-figure text-sm text-vellamo-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3">
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-vellamo-blue">
                    {step.title}
                  </h3>
                  <p className="mt-2">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={200}>
          <figure className="mt-14 rounded-xl border-l-4 border-vellamo-teal bg-white p-8 shadow-sm md:p-10">
            <blockquote className="text-xl font-medium text-vellamo-blue md:text-2xl">
              {SOLUTION.quote.text}
            </blockquote>
            <figcaption className="mt-3 text-sm">{SOLUTION.quote.caption}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ why finland ------------------------------ */

export function WhyFinland() {
  return (
    <section id={WHY_FINLAND.id} className="scroll-mt-20 bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <div>
            <h2 className="text-3xl font-bold text-vellamo-blue md:text-4xl">
              {WHY_FINLAND.title}
            </h2>
            {WHY_FINLAND.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150} className="flex justify-center">
          <BalticMotif />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- who for -------------------------------- */

const WHO_ICONS = {
  ports: IconPort,
  wind: IconWind,
  shipyards: IconShip,
  insurers: IconShield,
};

export function WhoFor() {
  return (
    <section id={WHO_FOR.id} className="scroll-mt-20 bg-vellamo-ice">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-bold text-vellamo-blue md:text-4xl">
            {WHO_FOR.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHO_FOR.cards.map((card, i) => {
            const Icon = WHO_ICONS[card.key];
            return (
              <Reveal key={card.key} delay={i * 100}>
                <div className="h-full rounded-xl bg-white p-7 shadow-sm">
                  <Icon />
                  <h3 className="mt-4 text-lg font-semibold text-vellamo-blue">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm">{card.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- team ---------------------------------- */

export function TeamSection() {
  return (
    <section id={TEAM.id} className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-bold text-vellamo-blue md:text-4xl">
            {TEAM.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg">{TEAM.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.members.map((member, i) => (
            <Reveal key={member.key} delay={i * 100}>
              <div className="h-full rounded-xl border border-vellamo-blue/10 p-7">
                {/* PLACEHOLDER: replace <AvatarIcon /> with the team member's
                    photo (e.g. <img src="..." alt={member.name} className="
                    h-[72px] w-[72px] rounded-full object-cover" />) when real
                    photos are available. */}
                <AvatarIcon accent={i % 2 === 1} />
                <h3 className="mt-4 font-semibold text-vellamo-blue">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-vellamo-teal">{member.role}</p>
                <p className="mt-2 text-sm">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- contact -------------------------------- */

export function ContactSection() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Front-end only for now — no backend submission logic yet.
    console.log("Contact form submitted:", data);
    event.target.reset();
  };

  const inputClasses =
    "w-full rounded-lg border border-vellamo-ice/30 bg-white/10 px-4 py-3 text-vellamo-ice placeholder-vellamo-ice/50 focus:border-vellamo-teal focus:outline-none focus:ring-1 focus:ring-vellamo-teal";

  return (
    <section id={CONTACT.id} className="scroll-mt-20 bg-vellamo-blue text-vellamo-ice">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">{CONTACT.title}</h2>
              <p className="mt-4 max-w-md text-vellamo-ice/80">{CONTACT.intro}</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-6 inline-block font-semibold text-vellamo-teal hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">{CONTACT.form.name}</span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={CONTACT.form.name}
                    className={inputClasses}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">{CONTACT.form.email}</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={CONTACT.form.email}
                    className={inputClasses}
                  />
                </label>
              </div>
              <label className="block">
                <span className="sr-only">{CONTACT.form.organization}</span>
                <input
                  name="organization"
                  type="text"
                  placeholder={CONTACT.form.organization}
                  className={inputClasses}
                />
              </label>
              <label className="block">
                <span className="sr-only">{CONTACT.form.message}</span>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder={CONTACT.form.message}
                  className={inputClasses}
                />
              </label>
              <button
                type="submit"
                className="justify-self-start rounded-lg bg-vellamo-teal px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                {CONTACT.form.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
