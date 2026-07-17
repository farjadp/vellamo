import { lazy, Suspense, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../supabase.js";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
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
import { usePublicTeam } from "../hooks/usePublicTeam.js";
import {
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

// Loaded lazily so three.js stays out of the main bundle
const Hero3D = lazy(() => import("./Hero3D.jsx"));

/* ------------------------------ primitives -------------------------------- */

/** 3D-tilting glass card that follows the cursor. */
export function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      className={`glass card-hover rounded-2xl ${className}`}
    >
      <div style={{ transform: "translateZ(24px)" }}>{children}</div>
    </motion.div>
  );
}

/** Section heading with a teal eyebrow label. */
function SectionHeading({ eyebrow, title, intro }) {
  return (
    <Reveal>
      <p className="eyebrow uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-vellamo-ice md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-lg">{intro}</p>}
    </Reveal>
  );
}

/** Word-by-word staggered headline. */
function StaggeredHeadline({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: 0.25 + i * 0.12,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </h1>
  );
}

/** Compact header used at the top of the sub-pages. */
export function PageHeader({ title, intro }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--vellamo-teal)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-24 md:pb-20 md:pt-32">
        <Reveal>
          <h1 className="text-4xl font-bold text-vellamo-ice md:text-6xl">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-lg">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- hero ----------------------------------- */

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px]">
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5"
      >
        <motion.p
          className="eyebrow uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          structural health monitoring · finland
        </motion.p>
        <StaggeredHeadline
          text={HERO.headline}
          className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] text-vellamo-ice md:text-7xl"
        />
        <motion.p
          className="mt-6 max-w-xl text-lg text-vellamo-ice/85 md:text-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {HERO.subheadline}
        </motion.p>
        <motion.p
          className="mt-4 max-w-xl text-vellamo-ice/60"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          {HERO.supporting}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Link
            to="/contact"
            className="glow-teal rounded-xl bg-vellamo-teal px-7 py-3.5 font-semibold text-white transition-transform hover:scale-[1.04]"
          >
            {HERO.primaryCta}
          </Link>
          <Link
            to="/product"
            className="glass rounded-xl px-7 py-3.5 font-semibold text-vellamo-ice transition-colors hover:border-vellamo-teal/60"
          >
            {HERO.secondaryCta}
          </Link>
        </motion.div>
      </motion.div>
      {/* scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-vellamo-ice/30 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-vellamo-teal" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------- problem --------------------------------- */

const PROBLEM_ICONS = {
  fatigue: IconFatigue,
  corrosion: IconCorrosion,
  ice: IconIce,
};

export function Problem() {
  return (
    <section id={PROBLEM.id} className="relative scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <SectionHeading
          eyebrow="the problem"
          title={PROBLEM.title}
          intro={PROBLEM.intro}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROBLEM.columns.map((col, i) => {
            const Icon = PROBLEM_ICONS[col.key];
            return (
              <Reveal key={col.key} delay={i * 130}>
                <TiltCard className="h-full p-8">
                  <div className="float-bob inline-block" style={{ animationDelay: `${i * 1.2}s` }}>
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {PROBLEM.stats.map((stat, i) => (
            <Reveal key={stat.figure} delay={i * 130}>
              <div className="glass card-hover relative overflow-hidden rounded-2xl p-9">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-15 blur-2xl"
                  style={{ background: "var(--vellamo-teal)" }}
                  aria-hidden="true"
                />
                <p className="stat-figure text-4xl text-vellamo-ice md:text-5xl">
                  {stat.figure}
                </p>
                <p className="mt-3">{stat.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <p className="mt-12 max-w-3xl border-l-2 border-vellamo-teal pl-6 text-vellamo-ice/80">
            {PROBLEM.reality}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- solution -------------------------------- */

const SOLUTION_ICONS = {
  sense: IconSense,
  model: IconModel,
  act: IconAct,
};

export function Solution() {
  return (
    <section id={SOLUTION.id} className="relative scroll-mt-20 overflow-hidden">
      <div
        className="pointer-events-none absolute left-[-10%] top-1/3 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--vellamo-teal)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <SectionHeading
          eyebrow="the solution"
          title={SOLUTION.title}
          intro={SOLUTION.intro}
        />
        {/* Sense → Model → Act with animated connecting line */}
        <div className="relative mt-14">
          <svg
            className="absolute left-0 right-0 top-10 hidden h-1 w-full md:block"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.line
              x1="8"
              y1="0.5"
              x2="92"
              y2="0.5"
              stroke="var(--vellamo-teal)"
              strokeWidth="0.3"
              strokeDasharray="1.2 1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.4 }}
            />
          </svg>
          <div className="grid gap-6 md:grid-cols-3">
            {SOLUTION.steps.map((step, i) => {
              const Icon = SOLUTION_ICONS[step.key];
              return (
                <Reveal key={step.key} delay={i * 180}>
                  <TiltCard className="relative h-full p-8">
                    <div className="sensor-pulse inline-flex h-12 w-12 items-center justify-center rounded-full border border-vellamo-teal/40 bg-vellamo-teal/10">
                      <span className="stat-figure text-sm text-vellamo-teal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-5">
                      <Icon />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-vellamo-ice">
                      {step.title}
                    </h3>
                    <p className="mt-2">{step.text}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
        {/* three answers */}
        <Reveal delay={150}>
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-vellamo-ice">
              {SOLUTION.answers.title}
            </h3>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {SOLUTION.answers.items.map((item, i) => (
                <motion.li
                  key={item}
                  className="glass card-hover flex items-start gap-3 rounded-2xl p-5"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                >
                  <span className="stat-figure mt-0.5 text-sm text-vellamo-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-vellamo-ice">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
        {/* product quote */}
        <Reveal delay={200}>
          <figure className="glass-strong glow-teal mt-16 rounded-2xl border-l-4 border-vellamo-teal p-8 md:p-12">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="sensor-pulse h-2.5 w-2.5 rounded-full bg-vellamo-teal" />
              <span className="text-xs font-medium uppercase tracking-widest text-vellamo-teal">
                live condition
              </span>
            </div>
            <blockquote className="mt-4 text-2xl font-medium text-vellamo-ice md:text-3xl">
              {SOLUTION.quote.text}
            </blockquote>
            <figcaption className="mt-3 text-sm">
              {SOLUTION.quote.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ why finland ------------------------------- */

export function WhyFinland() {
  return (
    <section id={WHY_FINLAND.id} className="relative scroll-mt-20 overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-2 md:py-32">
        <div>
          <SectionHeading eyebrow="why finland · why ice" title={WHY_FINLAND.title} />
          {WHY_FINLAND.paragraphs.map((p, i) => (
            <Reveal key={p.slice(0, 24)} delay={120 + i * 100}>
              <p className="mt-5">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="flex justify-center">
          <motion.div
            className="glass rounded-3xl p-10"
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
          >
            <BalticMotif />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- who for --------------------------------- */

const WHO_ICONS = {
  ports: IconPort,
  wind: IconWind,
  shipyards: IconShip,
  insurers: IconShield,
};

export function WhoFor() {
  return (
    <section id={WHO_FOR.id} className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <SectionHeading eyebrow="who it serves" title={WHO_FOR.title} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHO_FOR.cards.map((card, i) => {
            const Icon = WHO_ICONS[card.key];
            return (
              <Reveal key={card.key} delay={i * 110}>
                <TiltCard className="h-full p-7">
                  <Icon />
                  <h3 className="mt-4 text-lg font-semibold text-vellamo-ice">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm">{card.text}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- team ----------------------------------- */

export function TeamSection() {
  const { members } = usePublicTeam();
  return (
    <section id={TEAM.id} className="relative scroll-mt-20 overflow-hidden">
      <div
        className="pointer-events-none absolute right-[-10%] top-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--vellamo-blue)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <SectionHeading eyebrow="the crew" title={TEAM.title} intro={TEAM.intro} />
        <Reveal delay={150}>
          <p className="mt-6 max-w-3xl border-l-2 border-vellamo-teal pl-6 text-vellamo-ice/80">
            {TEAM.why}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <Reveal key={member.key} delay={i * 110}>
              <TiltCard className="h-full p-7">
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="h-[72px] w-[72px] rounded-full object-cover ring-2 ring-vellamo-teal/40"
                  />
                ) : (
                  <AvatarIcon accent={i % 2 === 1} />
                )}
                <h3 className="mt-4 text-lg font-semibold text-vellamo-ice">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-vellamo-teal">
                  {member.role}
                </p>
                <p className="mt-2 text-sm">{member.bio}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- contact --------------------------------- */

export function ContactSection() {
  const [status, setStatus] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    const data = Object.fromEntries(new FormData(event.target).entries());

    if (isSupabaseConfigured) {
      const { error } = await supabase.from("messages").insert({
        name: data.name,
        email: data.email,
        organization: data.organization || "",
        message: data.message,
      });
      if (error) {
        setStatus("error");
        console.error(error);
        return;
      }
    } else {
      // Demo fallback: no backend configured yet
      console.log("Contact form submitted:", data);
    }

    setStatus("ok");
    event.target.reset();
  };

  const inputClasses =
    "w-full rounded-xl border border-vellamo-ice/15 bg-vellamo-ice/5 px-4 py-3.5 text-vellamo-ice placeholder-vellamo-ice/40 transition-colors focus:border-vellamo-teal focus:outline-none focus:ring-1 focus:ring-vellamo-teal";

  return (
    <section id={CONTACT.id} className="relative scroll-mt-20 overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--vellamo-teal)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="start here" title={CONTACT.title} intro={CONTACT.intro} />
            <Reveal delay={200}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-8 inline-flex items-center gap-2 text-lg font-semibold text-vellamo-teal hover:underline"
              >
                <span className="sensor-pulse h-2 w-2 rounded-full bg-vellamo-teal" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </Reveal>
          </div>
          <Reveal delay={180}>
            <form
              onSubmit={handleSubmit}
              className="glass-strong grid gap-4 rounded-3xl p-8"
              aria-label="Contact form"
            >
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
              {status === "ok" && (
                <p className="rounded-lg border border-vellamo-teal/30 bg-vellamo-teal/10 px-4 py-3 text-sm text-vellamo-teal">
                  Thanks — your message has been sent. We'll be in touch.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="glow-teal justify-self-start rounded-xl bg-vellamo-teal px-7 py-3.5 font-semibold text-white"
              >
                {CONTACT.form.submit}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
