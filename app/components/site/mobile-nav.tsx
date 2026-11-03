import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { ArrowRight, FileText, Shield } from "lucide-react";
import { BrandMark, Wordmark } from "@/components/brand/brand-mark";
import { GithubIcon } from "@/components/brand/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PRIVACY_PATHS, SITE_ROUTES, stripLocale } from "@/lib/site-manifest";
import { productCtaForPath } from "@/lib/product-cta";
import { cn } from "@/lib/utils";
import { LanguageMenu } from "./language-menu";
import { LocaleLink } from "./locale-link";
import { useSearch } from "./search-provider";
import { ThemeMenu } from "./theme-menu";

function MobileLink({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: typeof FileText;
  label: string;
  active?: boolean;
}) {
  return (
    <SheetClose asChild>
      <LocaleLink
        to={to}
        className={cn(
          "flex items-center gap-3 rounded-control px-3 py-3 text-sm font-medium transition-colors",
          active
            ? "bg-accent text-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {label}
        <ArrowRight className="ml-auto h-4 w-4 shrink-0 opacity-40" />
      </LocaleLink>
    </SheetClose>
  );
}

export function MobileNav({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const { openSearch } = useSearch();
  const [open, setOpen] = useState(false);
  const productCta = productCtaForPath(location.pathname);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="sr-only">{t("common.menu")}</SheetTitle>
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-8 w-8" />
            <Wordmark />
          </div>
        </SheetHeader>

        <SheetBody className="flex flex-col gap-1 px-3 py-4">
          <div className="grid gap-1">
            <SheetClose asChild>
              <LocaleLink
                to={SITE_ROUTES.lumo}
                className="flex items-start gap-3 rounded-card border border-border bg-card p-3.5 shadow-surface transition-colors hover:bg-accent"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-border bg-background">
                  <BrandMark variant="lumo" className="h-6 w-6" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold">{t("nav.productLumoName")}</span>
                  <span className="text-xs text-muted-foreground">
                    {t("nav.productLumoTagline")}
                  </span>
                </span>
              </LocaleLink>
            </SheetClose>
            <SheetClose asChild>
              <LocaleLink
                to={SITE_ROUTES.userscripts}
                className="flex items-start gap-3 rounded-card border border-border bg-card p-3.5 shadow-surface transition-colors hover:bg-accent"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-border bg-background">
                  <BrandMark variant="userscripts" className="h-6 w-6" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold">
                    {t("nav.productUserscriptsName")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t("nav.productUserscriptsTagline")}
                  </span>
                </span>
              </LocaleLink>
            </SheetClose>
          </div>

          <div className="mt-3 grid gap-0.5">
            <MobileLink
              to={SITE_ROUTES.docs}
              icon={FileText}
              label={t("common.docs")}
              active={path.startsWith("/docs")}
            />
            <MobileLink
              to={PRIVACY_PATHS.lumo}
              icon={Shield}
              label={t("footer.lumoPrivacy")}
              active={path === PRIVACY_PATHS.lumo}
            />
            <MobileLink
              to={PRIVACY_PATHS.userscripts}
              icon={Shield}
              label={t("footer.userscriptsPrivacy")}
              active={path === PRIVACY_PATHS.userscripts}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 rounded-card border border-border bg-card p-2">
            <div className="flex items-center gap-1">
              <ThemeMenu />
              <LanguageMenu />
            </div>
            <SheetClose asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={openSearch}
                className="gap-1.5"
              >
                {t("common.search")}
              </Button>
            </SheetClose>
          </div>

          {productCta ? (
            <div className="mt-3 flex flex-col gap-2">
              <SheetClose asChild>
                <Button asChild size="lg" className="w-full">
                  <LocaleLink to={productCta.installHref}>
                    {t(productCta.installLabelKey)}
                    <ArrowRight className="h-4 w-4" />
                  </LocaleLink>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <a
                  href={productCta.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t(productCta.repoAriaKey)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-control border border-border text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                  {t("common.github")}
                </a>
              </SheetClose>
            </div>
          ) : null}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
