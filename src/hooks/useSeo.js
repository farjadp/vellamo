import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../supabase.js";

const defaults = {
  title: "vellamo — Guardian beneath the surface",
  description:
    "Vellamo is a Finland-based structural health monitoring company for marine and port infrastructure — built for ice and cold water.",
};

export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isSupabaseConfigured) {
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
  }, [pathname]);
}

function updateMeta(title, description) {
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", description);
}
