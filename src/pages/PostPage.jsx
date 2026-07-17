import { useParams, Link } from "react-router-dom";
import { usePublicPost } from "../hooks/usePublicPosts.js";
import { PageHeader } from "../components/Sections.jsx";
import Reveal from "../components/Reveal.jsx";

/** Individual article / knowledge-base post. */
export default function PostPage() {
  const { slug } = useParams();
  const { post, loading } = usePublicPost(slug);

  if (loading) {
    return (
      <section className="pt-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-vellamo-ice/60">Loading…</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="pt-28">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="text-3xl font-bold text-vellamo-ice">Not found</h1>
          <p className="mt-2 text-vellamo-ice/60">
            That article doesn't exist or isn't published yet.
          </p>
          <Link to="/news" className="mt-6 inline-block text-vellamo-teal hover:underline">
            Back to news
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader title={post.title} intro={post.excerpt} />
      <section>
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-8">
          <Reveal>
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-3 text-sm text-vellamo-ice/50">
                <span className="rounded-full border border-vellamo-teal/30 bg-vellamo-teal/10 px-3 py-1 font-medium text-vellamo-teal">
                  {post.tag}
                </span>
                <span>{post.date}</span>
              </div>
              <article className="prose prose-invert mt-8 max-w-none whitespace-pre-line text-vellamo-ice/85">
                {post.body}
              </article>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
