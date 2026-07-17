import { Link } from "react-router-dom";
import { PRODUCT_PAGE, NAV } from "../content.js";
import {
  PageHeader,
  Problem,
  Solution,
  WhoFor,
} from "../components/Sections.jsx";
import { SectionDivider } from "../components/Graphics.jsx";
import Reveal from "../components/Reveal.jsx";

/** Product page: the problem, the Sense → Model → Act flow, and delivery. */
export default function Product() {
  return (
    <>
      <PageHeader title={PRODUCT_PAGE.title} intro={PRODUCT_PAGE.intro} />
      <Problem />
      <SectionDivider className="bg-vellamo-ice" />
      <Solution />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl font-bold text-vellamo-blue md:text-4xl">
              {PRODUCT_PAGE.delivery.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {PRODUCT_PAGE.delivery.items.map((item, i) => (
              <Reveal key={item.key} delay={i * 120}>
                <div className="h-full rounded-xl bg-vellamo-ice p-8">
                  <span className="stat-figure text-sm text-vellamo-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-vellamo-blue">
                    {item.title}
                  </h3>
                  <p className="mt-2">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-14">
              <Link
                to="/contact"
                className="inline-block rounded-lg bg-vellamo-teal px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                {NAV.cta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <WhoFor />
    </>
  );
}
