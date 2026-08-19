import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../supabase.js";
import { useLocale } from "../i18n/LocaleContext.jsx";

export function useSeo() {
  const { pathname } = useLocation();
  const { locale, content } = useLocale();
  const defaults = content.SITE;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    // SEO overrides are only ever stored/read in English for now — the
    // Supabase-driven SEO editor doesn't have per-locale fields yet.
    if (!isSupabaseConfigured || locale !== "en") {
      updateMeta(defaults.title, defaults.description);
      return;
    }
    supabase
      .from("seo_settings")
      .select("title, description")
      .eq("pathname", pathname)
      .single()
      .then(({ data }) => {
        updateMeta(
          data?.title || defaults.title,
          data?.description || defaults.description
        );
      })
      .catch(() => updateMeta(defaults.title, defaults.description));
  }, [pathname, locale, defaults.title, defaults.description]);
}

function updateMeta(title, description) {
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", description);
}
