import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { I18nextProvider } from "react-i18next";
import { useLocation } from "react-router";
import { getI18n } from "./translate";
import { writeLocalePreference } from "./detect";
import { getLocale, LOCALE_META, type Locale } from "@/lib/site-manifest";

const LocaleContext = createContext<Locale>("en");

/**
 * Locale is a property of the URL, not of storage.
 *
 * The provider reads the locale straight from `useLocation()`, so it cannot
 * disagree with the address bar: a component rendered anywhere under the router
 * — including inside a portal, a sheet or a dropdown — resolves links with the
 * language the visitor is actually reading. There is no `locale` prop to pass
 * and no chance of a stale one.
 *
 * The i18next instance is selected synchronously, so the same tree renders
 * correctly during pre-render and after hydration.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const locale = getLocale(location.pathname);
  const i18n = useMemo(() => getI18n(locale), [locale]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = LOCALE_META[locale].htmlLang;
    root.dir = "ltr";
    // A rendered locale is an explicit signal, whether it came from the menu or
    // from someone opening a shared `/zh/...` link. Storing it only affects the
    // root entry point: deep links are never rewritten by preference.
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
