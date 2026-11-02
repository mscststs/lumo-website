import i18next from "i18next";
import { en } from "./resources/en";
import { zh } from "./resources/zh";
import { LOCALE_META, type Locale } from "@/lib/site-manifest";

type I18nInstance = ReturnType<typeof i18next.createInstance>;

const instances = new Map<Locale, I18nInstance>();

/**
 * One synchronous i18next instance per locale.
 *
 * Resources are bundled, so `initAsync: false` makes initialisation
 * synchronous. That matters for pre-rendering: the Chinese HTML must contain
 * Chinese copy at build time, not after hydration. A shared global instance
 * would make the last rendered locale leak into every prerendered page.
 */
export function getI18n(locale: Locale): I18nInstance {
  const existing = instances.get(locale);
  if (existing) return existing;

  const instance = i18next.createInstance();
  void instance.init({
    lng: locale,
    fallbackLng: "en",
    supportedLngs: ["en", "zh"],
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    interpolation: { escapeValue: false },
    initAsync: false,
    returnNull: false,
  });
  instances.set(locale, instance);
  return instance;
}

/** Translate outside React (route `meta`, tests, structured data). */
export function translate(
  locale: Locale,
  key: string,
  options?: Record<string, unknown>,
): string {
  return getI18n(locale).t(key, options) as string;
}

export function htmlLang(locale: Locale): string {
  return LOCALE_META[locale].htmlLang;
}
