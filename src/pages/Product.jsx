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
      <SectionDivider />
      <Solution />
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <Reveal>
            <p className="eyebrow uppercase">how you get it</p>
            <h2 className="mt-3 text-3xl font-bold text-vellamo-ice md:text-5xl">
              {PRODUCT_PAGE.delivery.title}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PRODUCT_PAGE.delivery.items.map((item, i) => (
              <Reveal key={item.key} delay={i * 130}>
                <div className="glass card-hover h-full rounded-2xl p-8">
                  <span className="stat-figure text-sm text-vellamo-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-vellamo-ice">
                    {item.title}
                  </h3>
                  <p className="mt-2">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute right-[-15%] top-1/4 h-96 w-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--vellamo-teal)" }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <Reveal>
            <p className="eyebrow uppercase">pricing</p>
            <h2 className="mt-3 text-3xl font-bold text-vellamo-ice md:text-5xl">
              {PRODUCT_PAGE.pricing.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg">{PRODUCT_PAGE.pricing.note}</p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {PRODUCT_PAGE.pricing.items.map((item, i) => (
              <Reveal key={item.key} delay={i * 130}>
                <div className="glass card-hover h-full rounded-2xl p-9">
                  <p className="stat-figure text-4xl text-vellamo-ice md:text-5xl">
                    {item.figure}
                  </p>
                  <p className="mt-1 text-sm font-medium text-vellamo-teal">
                    {item.label}
                  </p>
                  <p className="mt-3">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-14">
              <Link
                to="/contact"
                className="glow-teal inline-block rounded-xl bg-vellamo-teal px-7 py-3.5 font-semibold text-white transition-transform hover:scale-[1.04]"
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
