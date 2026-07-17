import { ABOUT_PAGE } from "../content.js";
import { PageHeader, WhyFinland } from "../components/Sections.jsx";
import { BalticMotif, SectionDivider } from "../components/Graphics.jsx";
import Reveal from "../components/Reveal.jsx";

/** About page: company story, name origin, and the Finland/ice angle. */
export default function About() {
  return (
    <>
      <PageHeader title={ABOUT_PAGE.title} />
      <section>
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <div>
              {ABOUT_PAGE.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 first:mt-0 text-lg">
                  {p}
                </p>
              ))}
              <blockquote className="glass-strong glow-teal mt-8 rounded-2xl border-l-4 border-vellamo-teal p-6 text-lg font-medium text-vellamo-ice">
                {ABOUT_PAGE.elevator}
              </blockquote>
            </div>
          </Reveal>
          <Reveal delay={150} className="flex justify-center">
            <div className="glass float-bob rounded-3xl p-10">
              <BalticMotif />
            </div>
          </Reveal>
        </div>
      </section>
      <SectionDivider />
      <WhyFinland />
    </>
  );
}
