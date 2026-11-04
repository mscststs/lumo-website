import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { InlineText } from "@/components/docs/inline-text";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SearchProvider } from "@/components/site/search-provider";
import { getDocs } from "@/content/docs";
import { LocaleProvider } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n/translate";
import {
  DOC_PRODUCTS,
  docSlugs,
  LOCALES,
  type DocProduct,
} from "@/lib/site-manifest";
import { ThemeProvider } from "@/lib/theme";

/** Every internal href rendered by the app, in document order. */
function internalHrefs(container: HTMLElement): string[] {
  return [...container.querySelectorAll<HTMLAnchorElement>("a[href]")]
    .map((anchor) => anchor.getAttribute("href") ?? "")
    .filter((href) => href.startsWith("/") && !href.startsWith("//"));
}

function renderAt(pathname: string, node: React.ReactNode) {
  const locale = pathname.startsWith("/zh") ? "zh" : "en";
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <LocaleProvider>
        <I18nextProvider i18n={getI18n(locale)}>
          <ThemeProvider>
            <SearchProvider>{node}</SearchProvider>
          </ThemeProvider>
        </I18nextProvider>
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe("locale-aware navigation", () => {
  for (const locale of LOCALES) {
    const prefix = locale === "zh" ? "/zh" : "";

    it(`prefixes every header link with the URL locale (${locale})`, () => {
      const { container } = renderAt(`${prefix}/lumo`, <SiteHeader />);
      const hrefs = internalHrefs(container);
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        if (locale === "zh") {
          expect(href).toMatch(/^\/zh(\/|$)/);
        } else {
          expect(href).not.toMatch(/^\/zh(\/|$)/);
        }
      }
    });

    it(`prefixes every footer link with the URL locale (${locale})`, () => {
      const { container } = renderAt(`${prefix}/docs/lumo/mcp`, <SiteFooter />);
      for (const href of internalHrefs(container)) {
        if (locale === "zh") {
          expect(href).toMatch(/^\/zh(\/|$)/);
        } else {
          expect(href).not.toMatch(/^\/zh(\/|$)/);
        }
      }
    });

    it(`prefixes every docs sidebar link with the URL locale (${locale})`, () => {
      const { container } = renderAt(
        `${prefix}/docs/lumo/mcp`,
        <DocsSidebar product="lumo" />,
      );
      const hrefs = internalHrefs(container);
      expect(hrefs.some((href) => href.endsWith("/docs/lumo/mcp"))).toBe(true);
      for (const href of hrefs) {
        if (locale === "zh") {
          expect(href).toMatch(/^\/zh(\/|$)/);
        } else {
          expect(href).not.toMatch(/^\/zh(\/|$)/);
        }
      }
    });
  }

  it("resolves a locale-agnostic markdown link to the active locale", () => {
    const { container, unmount } = renderAt(
      "/zh/docs/lumo/mcp",
      <InlineText text="See [the agent loop](/docs/lumo/chat)." />,
    );
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "/zh/docs/lumo/chat",
    );
    unmount();

    renderAt(
      "/docs/lumo/mcp",
      <InlineText text="See [the agent loop](/docs/lumo/chat)." />,
    );
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "/docs/lumo/chat",
    );
    void container;
  });

  it("keeps an explicitly localized target intact", () => {
    renderAt(
      "/docs/lumo/mcp",
      <InlineText text="Read [the Chinese page](/zh/docs/lumo/mcp)." />,
    );
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "/zh/docs/lumo/mcp",
    );
  });
});

describe("content link hygiene", () => {
  it("never stores a locale prefix inside translated content", () => {
    for (const locale of LOCALES) {
      for (const product of DOC_PRODUCTS) {
        for (const article of getDocs(locale, product)) {
          expect(JSON.stringify(article), `${product}/${article.slug}`).not.toMatch(
            /\]\(\/zh\//,
          );
        }
      }
    }
  });

  it("only links to documents that exist", () => {
    for (const locale of LOCALES) {
      for (const product of DOC_PRODUCTS) {
        for (const article of getDocs(locale, product)) {
          for (const match of JSON.stringify(article).matchAll(
            /\]\((\/[^)]+)\)/g,
          )) {
            const href = match[1] ?? "";
            // Privacy pages are valid internal targets too; only docs links
            // need to resolve to a product-scoped article.
            if (!href.startsWith("/docs/")) continue;
            const [hrefProduct, slug] = href
              .replace(/^\/docs\//, "")
              .split("/");
            expect(DOC_PRODUCTS, `${product}/${article.slug} → ${href}`).toContain(
              hrefProduct,
            );
            if (slug) {
              expect(
                docSlugs(hrefProduct as DocProduct),
                `${product}/${article.slug} → ${href}`,
              ).toContain(slug);
            }
          }
        }
      }
    }
  });

  it("does not hardcode a locale prefix in app source", () => {
    const sources = [
      "app/components/site/site-header.tsx",
      "app/components/site/site-footer.tsx",
      "app/components/site/mobile-nav.tsx",
      "app/components/site/command-palette.tsx",
      "app/routes/home.tsx",
      "app/routes/lumo.tsx",
      "app/routes/userscripts.tsx",
      "app/routes/docs-index.tsx",
      "app/routes/docs-article.tsx",
      "app/routes/lumo-privacy.tsx",
      "app/routes/userscripts-privacy.tsx",
      "app/components/privacy/privacy-page.tsx",
      "app/routes/not-found.tsx",
    ];
    for (const file of sources) {
      const source = readFileSync(resolve(process.cwd(), file), "utf8");
      expect(source, file).not.toMatch(/["'`]\/zh\//);
    }
  });
});
