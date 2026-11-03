import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { GithubIcon } from "@/components/brand/icons";
import { BrandMark, Wordmark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SITE_ROUTES, stripLocale } from "@/lib/site-manifest";
import { productCtaForPath } from "@/lib/product-cta";
import { cn } from "@/lib/utils";
import { LanguageMenu } from "./language-menu";
import { SearchTrigger } from "./search-trigger";
import { ThemeMenu } from "./theme-menu";
import { MobileNav } from "./mobile-nav";
import { LocaleLink, LocaleNavLink } from "./locale-link";

function navClass(active: boolean): string {
  return cn(
    "inline-flex h-10 items-center rounded-control px-3 text-sm font-medium transition-colors",
    active
      ? "text-foreground"
      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
  );
}

function ProductMenuItem({
  href,
  variant,
  name,
  tagline,
}: {
  href: string;
  variant: "lumo" | "userscripts";
  name: string;
  tagline: string;
}) {
  return (
    <DropdownMenuItem asChild className="p-0">
      <LocaleLink
        to={href}
        className="group flex cursor-pointer select-none items-center gap-3 rounded-control px-2.5 py-2.5 text-left outline-none transition-colors hover:bg-accent focus-visible:bg-accent data-[highlighted]:bg-accent"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-border bg-card shadow-surface transition-colors group-hover:border-input group-data-[highlighted]:border-input">
          <BrandMark variant={variant} className="h-5 w-5" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium leading-5 text-foreground">
            {name}
          </span>
          <span className="truncate text-xs leading-5 text-muted-foreground transition-colors group-hover:text-foreground/70 group-data-[highlighted]:text-foreground/70">
            {tagline}
          </span>
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-data-[highlighted]:translate-x-0 group-data-[highlighted]:opacity-100" />
      </LocaleLink>
    </DropdownMenuItem>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const productsActive = path.startsWith("/lumo") || path.startsWith("/userscripts");
  const productCta = productCtaForPath(location.pathname);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "glass-strong border-b border-border shadow-surface"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <LocaleLink
            to={SITE_ROUTES.home}
            className="flex shrink-0 items-center gap-2.5 rounded-control px-1 py-1"
            aria-label={t("common.brand")}
          >
            <BrandMark className="h-8 w-8" />
            <Wordmark />
          </LocaleLink>

          <nav
            aria-label={t("a11y.primaryNav")}
            className="hidden items-center gap-0.5 lg:flex"
          >
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    navClass(productsActive),
                    "group gap-1 data-[state=open]:bg-accent/60 data-[state=open]:text-foreground",
                  )}
                >
                  {t("common.products")}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="w-[17rem] min-w-0 p-1.5"
              >
                <div className="grid gap-0.5">
                  <ProductMenuItem
                    href={SITE_ROUTES.lumo}
                    variant="lumo"
                    name={t("nav.productLumoName")}
                    tagline={t("nav.productLumoTagline")}
                  />
                  <ProductMenuItem
                    href={SITE_ROUTES.userscripts}
                    variant="userscripts"
                    name={t("nav.productUserscriptsName")}
                    tagline={t("nav.productUserscriptsTagline")}
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <LocaleNavLink
              to={SITE_ROUTES.docs}
              className={navClass(path.startsWith(SITE_ROUTES.docs))}
            >
              {t("common.docs")}
            </LocaleNavLink>
          </nav>
        </div>

        <div className="flex min-w-0 items-center gap-1">
          <SearchTrigger />
          <div className="hidden items-center gap-0.5 md:flex">
            <ThemeMenu modal={false} />
            <LanguageMenu modal={false} />
          </div>
          {productCta ? (
            <>
              <a
                href={productCta.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t(productCta.repoAriaKey)}
                className="hidden h-9 w-9 items-center justify-center rounded-control text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
                <LocaleLink to={productCta.installHref}>
                  {t(productCta.installLabelKey)}
                  <ArrowRight className="h-3.5 w-3.5" />
                </LocaleLink>
              </Button>
            </>
          ) : null}
          <MobileNav>
            <Button
              variant="ghost"
              size="iconSm"
              className="lg:hidden"
              aria-label={t("common.openMenu")}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
