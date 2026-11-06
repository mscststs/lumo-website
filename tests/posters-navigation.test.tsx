import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SearchProvider } from "@/components/site/search-provider";
import { LocaleProvider } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n/translate";
import { LOCALES } from "@/lib/site-manifest";
import { ThemeProvider } from "@/lib/theme";

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

function posterHrefs(container: HTMLElement): string[] {
  return [...container.querySelectorAll<HTMLAnchorElement>("a[href]")]
    .map((anchor) => anchor.getAttribute("href") ?? "")
    .filter((href) => href.endsWith("/posters"));
}

describe("poster entry point", () => {
  for (const locale of LOCALES) {
    const prefix = locale === "zh" ? "/zh" : "";

    it(`lives in the footer only (${locale})`, () => {
      const header = renderAt(`${prefix}/lumo`, <SiteHeader />);
      expect(posterHrefs(header.container)).toEqual([]);
      header.unmount();

      const footer = renderAt(`${prefix}/lumo`, <SiteFooter />);
      expect(posterHrefs(footer.container)).toEqual([`${prefix}/posters`]);
      footer.unmount();
    });
  }
});
