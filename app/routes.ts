import type { RouteConfig, RouteConfigEntry } from "@react-router/dev/routes";
import { LOCALES } from "./lib/site-manifest";

/**
 * Locale-prefixed route tree. English is unprefixed; every other locale gets a
 * first segment. The same components render both languages, so a product page
 * can never drift from its translation.
 *
 * Explicit ids are required because a route file appears in more than one tree;
 * React Router identifies routes by id, not by path.
 */
function localeTree(locale: string): RouteConfigEntry {
  const path = locale === "en" ? "/" : `/${locale}`;
  return {
    id: `site-layout-${locale}`,
    path,
    file: "routes/site-layout.tsx",
    children: [
      { id: `home-${locale}`, index: true, file: "routes/home.tsx" },
      { id: `lumo-${locale}`, path: "lumo", file: "routes/lumo.tsx" },
      {
        id: `userscripts-${locale}`,
        path: "userscripts",
        file: "routes/userscripts.tsx",
      },
      {
        id: `posters-${locale}`,
        path: "posters",
        file: "routes/posters.tsx",
      },
      {
        id: `docs-${locale}`,
        path: "docs",
        file: "routes/docs-layout.tsx",
        children: [
          {
            id: `docs-index-${locale}`,
            index: true,
            file: "routes/docs-index.tsx",
          },
          {
            id: `docs-product-${locale}`,
            path: ":product",
            file: "routes/docs-article.tsx",
          },
          {
            id: `docs-article-${locale}`,
            path: ":product/:slug",
            file: "routes/docs-article.tsx",
          },
        ],
      },
      {
        id: `lumo-privacy-${locale}`,
        path: "lumo/privacy",
        file: "routes/lumo-privacy.tsx",
      },
      {
        id: `userscripts-privacy-${locale}`,
        path: "userscripts/privacy",
        file: "routes/userscripts-privacy.tsx",
      },
      {
        id: `not-found-page-${locale}`,
        path: "404",
        file: "routes/not-found.tsx",
      },
      { id: `not-found-${locale}`, path: "*", file: "routes/not-found.tsx" },
    ],
  };
}

export default LOCALES.map((locale) => localeTree(locale)) satisfies RouteConfig;
