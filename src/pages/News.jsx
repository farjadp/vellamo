import { NEWS_PAGE } from "../content.js";
import { PageHeader } from "../components/Sections.jsx";
import Reveal from "../components/Reveal.jsx";

/** News & knowledge base page — placeholder posts until real articles exist. */
export default function News() {
  return (
    <>
      <PageHeader title={NEWS_PAGE.title} intro={NEWS_PAGE.intro} />
      <section className="bg-vellamo-ice">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid gap-6 sm:grid-cols-2">
            {NEWS_PAGE.posts.map((post, i) => (
              <Reveal key={post.key} delay={i * 100}>
                <article className="h-full rounded-xl bg-white p-8 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-vellamo-ice px-3 py-1 font-medium text-vellamo-teal">
                      {post.tag}
                    </span>
                    <span className="text-vellamo-gray/70">{post.date}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-vellamo-blue">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm">{post.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
