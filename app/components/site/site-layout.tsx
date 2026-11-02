import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MotionConfig } from "motion/react";
import { Outlet, useLocation } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/lib/i18n";
import { getLocale } from "@/lib/site-manifest";
import { ThemeProvider } from "@/lib/theme";
import { CommandPalette } from "./command-palette";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SearchProvider } from "./search-provider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-control focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-float"
    >
      {t("a11y.skip")}
    </a>
  );
}

export function SiteLayout() {
  const location = useLocation();
  const locale = getLocale(location.pathname);

  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider>
        <SearchProvider>
          <TooltipProvider delayDuration={320}>
            <MotionConfig reducedMotion="user">
              <ScrollProgress />
              <SkipLink />
              <SiteHeader />
              <main
                id="main"
                key={location.pathname}
                className="min-h-[60vh] animate-in fade-in pt-16 duration-300 motion-reduce:animate-none"
              >
                <Outlet />
              </main>
              <SiteFooter />
              <CommandPalette />
            </MotionConfig>
          </TooltipProvider>
        </SearchProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
