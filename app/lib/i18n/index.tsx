import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { I18nextProvider } from "react-i18next";
import { getI18n } from "./translate";
import { writeLocalePreference } from "./detect";
import { LOCALE_META, type Locale } from "@/lib/site-manifest";

const LocaleContext = createContext<Locale>("en");

/**
 * Locale is a property of the URL, not of storage.
 *
 * The provider selects a locale-specific i18next instance synchronously, so the
 * same tree renders correctly on the server (pre-render) and on the client.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const i18n = useMemo(() => getI18n(locale), [locale]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = LOCALE_META[locale].htmlLang;
    root.dir = "ltr";
    // A rendered locale is an explicit signal, whether it came from the menu or
    // from someone opening a shared `/zh/...` link. Storing it makes later root
    // visits land in the same language instead of re-guessing.
    writeLocalePreference(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
