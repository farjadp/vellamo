import { createContext, useContext, useMemo } from "react";
import en from "../content/en.js";
import fi from "../content/fi.js";
import sv from "../content/sv.js";

export const LOCALES = { en, fi, sv };
export const LOCALE_ORDER = ["en", "fi", "sv"];
export const LOCALE_LABELS = { en: "EN", fi: "FI", sv: "SV" };
export const LOCALE_NAMES = { en: "English", fi: "Suomi", sv: "Svenska" };
// Path prefix per locale — English is unprefixed (default locale at "/").
export const LOCALE_PREFIX = { en: "", fi: "/fi", sv: "/sv" };

/** Build a locale-prefixed path from a root-relative path like "/team". */
export function buildLocalePath(locale, path) {
  const prefix = LOCALE_PREFIX[locale] ?? "";
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

/** Strip the current locale's prefix off a pathname, back to a root-relative path. */
export function stripLocalePrefix(pathname, locale) {
  const prefix = LOCALE_PREFIX[locale] ?? "";
  if (!prefix) return pathname;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

const LocaleContext = createContext(null);

/** Wraps a locale's routed subtree: provides content + path-building helpers. */
export function LocaleProvider({ locale, children }) {
  const value = useMemo(() => {
    const prefix = LOCALE_PREFIX[locale] ?? "";
    return {
      locale,
      prefix,
      content: LOCALES[locale] ?? LOCALES.en,
      path: (p) => buildLocalePath(locale, p),
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/** { locale, prefix, content, path(p) } for the currently routed locale. */
export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale() must be used within a <LocaleProvider>.");
  }
  return ctx;
}

/** Shortcut: just the current locale's content object. */
export function useContent() {
  return useLocale().content;
}
