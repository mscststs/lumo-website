import { useCallback } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useNavigate,
  type LinkProps,
  type NavigateOptions,
  type NavLinkProps,
  type To,
} from "react-router";
import { useLocale } from "@/lib/i18n";
import { localePath, hasLocalePrefix, type Locale } from "@/lib/site-manifest";

/**
 * Locale-aware navigation primitives.
 *
 * Every internal link is written in its locale-agnostic form (`/lumo`,
 * `/docs/lumo/mcp`) and prefixed here, at the edge, with the locale of the current
 * URL. Three properties follow from that single rule:
 *
 *  1. A page cannot link into the wrong language: there is no call site that
 *     could forget a prefix, because no call site stores one.
 *  2. Content stays translatable: docs text, route data and CTA objects carry
 *     `/docs/lumo/chat`, not `/zh/docs/lumo/chat`, so moving a page or adding
 *     a locale never edits prose.
 *  3. It is idempotent: a path that already carries a prefix is normalized
 *     instead of being prefixed twice.
 *
 * External URLs (`https:`, `mailto:`), protocol-relative URLs (`//cdn`), hash
 * anchors (`#install`) and relative paths are passed through untouched.
 */
function localizeTo(to: To, locale: Locale): To {
  if (typeof to === "string") {
    if (!to.startsWith("/") || to.startsWith("//")) return to;
    // An explicitly localized target is respected: this is what makes
    // cross-language links (the language menu, `hreflang` previews) possible
    // without a second, unlocalized navigation primitive.
    return hasLocalePrefix(to) ? to : localePath(locale, to);
  }
  if (!to || typeof to !== "object" || to.pathname == null) return to;
  return {
    ...to,
    pathname: hasLocalePrefix(to.pathname)
      ? to.pathname
      : localePath(locale, to.pathname),
  };
}

/** `Link` that resolves `to` against the locale in the current URL. */
export function LocaleLink({ to, ...props }: LinkProps) {
  const locale = useLocale();
  return <RouterLink to={localizeTo(to, locale)} {...props} />;
}

/** `NavLink` with the same locale resolution and active-state semantics. */
export function LocaleNavLink({ to, ...props }: NavLinkProps) {
  const locale = useLocale();
  return <RouterNavLink to={localizeTo(to, locale)} {...props} />;
}

/** `useNavigate` that prefixes internal targets with the active locale. */
export function useLocaleNavigate() {
  const locale = useLocale();
  const navigate = useNavigate();
  return useCallback(
    (to: To, options?: NavigateOptions) => navigate(localizeTo(to, locale), options),
    [locale, navigate],
  );
}

/**
 * The localization function for non-`<Link>` use cases: metadata, canonical
 * URLs, programmatic `href` attributes and tests.
 */
export function useLocaleHref() {
  const locale = useLocale();
  return useCallback((path: string) => localePath(locale, path), [locale]);
}
