import { ABOUT_PAGE } from "../content.js";
import { PageHeader, WhyFinland } from "../components/Sections.jsx";
import { BalticMotif, SectionDivider } from "../components/Graphics.jsx";
import Reveal from "../components/Reveal.jsx";

/** About page: company story, name origin, and the Finland/ice angle. */
export default function About() {
  return (
    <>
      <PageHeader title={ABOUT_PAGE.title} />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <div>
              {ABOUT_PAGE.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 first:mt-0 text-lg">
                  {p}
                </p>
              ))}
              <blockquote className="mt-8 rounded-xl border-l-4 border-vellamo-teal bg-vellamo-ice p-6 text-lg font-medium text-vellamo-blue">
                {ABOUT_PAGE.elevator}
              </blockquote>
            </div>
          </Reveal>
          <Reveal delay={150} className="flex justify-center">
            <BalticMotif />
          </Reveal>
        </div>
      </section>
      <SectionDivider />
      <WhyFinland />
    </>
  );
}
