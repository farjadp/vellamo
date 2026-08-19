import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabase.js";

/**
 * Posts: live from Supabase if configured, otherwise the given locale's
 * static fallback (Supabase content isn't localized yet).
 */
export function usePublicPosts(fallbackPosts) {
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data || data.length === 0) return;
        const mapped = data.map((p) => ({
          key: p.slug || `post-${p.id}`,
          tag: p.tag,
          date: p.date,
          title: p.title,
          excerpt: p.excerpt,
          slug: p.slug,
          body: p.body,
        }));
        setPosts(mapped);
      });
  }, []);

  return { posts, loading };
}

export function usePublicPost(slug, fallbackPosts) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    const fallback = fallbackPosts?.find((p) => p.key === slug);
    if (!isSupabaseConfigured) {
      setPost(fallback || null);
      setLoading(false);
      return;
    }
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (!error && data) {
          setPost({
            key: data.slug,
            tag: data.tag,
            date: data.date,
            title: data.title,
            excerpt: data.excerpt,
            slug: data.slug,
            body: data.body,
          });
        } else {
          setPost(fallback || null);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { post, loading };
}
