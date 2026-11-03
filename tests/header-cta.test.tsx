import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site/site-header";
import { SearchProvider } from "@/components/site/search-provider";
import { LocaleProvider } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n/translate";
import { productCtaForPath } from "@/lib/product-cta";
import { LINKS } from "@/lib/site";
import { LOCALES } from "@/lib/site-manifest";
import { ThemeProvider } from "@/lib/theme";

function renderHeaderAt(pathname: string) {
  const locale = pathname.startsWith("/zh") ? "zh" : "en";
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <LocaleProvider>
        <I18nextProvider i18n={getI18n(locale)}>
          <ThemeProvider>
            <SearchProvider>
              <SiteHeader />
            </SearchProvider>
          </ThemeProvider>
        </I18nextProvider>
      </LocaleProvider>
    </MemoryRouter>,
  );
}

function hrefs(container: HTMLElement): string[] {
  return [...container.querySelectorAll<HTMLAnchorElement>("a[href]")].map(
    (anchor) => anchor.getAttribute("href") ?? "",
  );
}

describe("product CTA resolution", () => {
  it("only owns the landing page, not its sub-pages", () => {
    expect(productCtaForPath("/lumo")?.repo).toBe(LINKS.lumoRepo);
    expect(productCtaForPath("/zh/userscripts")?.repo).toBe(LINKS.userscriptsRepo);
    expect(productCtaForPath("/lumo/")?.repo).toBe(LINKS.lumoRepo);
    expect(productCtaForPath("/lumo/privacy")).toBeNull();
    expect(productCtaForPath("/userscripts/privacy")).toBeNull();
  });

  it("leaves site-level pages without a product", () => {
    for (const pathname of ["/", "/zh", "/docs", "/docs/mcp", "/404"]) {
      expect(productCtaForPath(pathname), pathname).toBeNull();
    }
  });
});

describe("header product actions", () => {
  it("hides GitHub and install on site-level pages", () => {
    for (const pathname of ["/", "/zh", "/docs/mcp", "/lumo/privacy"]) {
      const { container, unmount } = renderHeaderAt(pathname);
      const rendered = hrefs(container);
      expect(rendered.some((href) => href.includes("github.com")), pathname).toBe(false);
      expect(rendered.some((href) => href.includes("#install")), pathname).toBe(false);
      unmount();
    }
  });

  for (const locale of LOCALES) {
    const prefix = locale === "zh" ? "/zh" : "";

    it(`links GitHub and install to the active product (${locale})`, () => {
      const lumo = renderHeaderAt(`${prefix}/lumo`);
      expect(hrefs(lumo.container)).toEqual(
        expect.arrayContaining([LINKS.lumoRepo, `${prefix}/lumo#install`]),
      );
      lumo.unmount();

      const userscripts = renderHeaderAt(`${prefix}/userscripts`);
      expect(hrefs(userscripts.container)).toEqual(
        expect.arrayContaining([
          LINKS.userscriptsRepo,
          `${prefix}/userscripts#install`,
        ]),
      );
      userscripts.unmount();
    });
  }
});
