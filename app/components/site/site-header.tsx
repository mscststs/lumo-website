import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router";
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
import { useLocalePath } from "@/lib/i18n/use-path";
import { LINKS } from "@/lib/site";
import { stripLocale } from "@/lib/site-manifest";
import { cn } from "@/lib/utils";
import { LanguageMenu } from "./language-menu";
import { SearchTrigger } from "./search-trigger";
import { ThemeMenu } from "./theme-menu";
import { MobileNav } from "./mobile-nav";

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
  description,
}: {
  href: string;
  variant: "lumo" | "userscripts";
  name: string;
  tagline: string;
  description: string;
}) {
  return (
    <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
      <Link
        to={href}
        className="group flex h-full flex-col gap-3 rounded-card p-4 transition-colors hover:bg-accent/70 focus-visible:bg-accent/70"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-control border border-border bg-card shadow-surface">
              <BrandMark variant={variant} className="h-6 w-6" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{name}</span>
              <span className="text-xs text-muted-foreground">{tagline}</span>
            </span>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </Link>
    </DropdownMenuItem>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const localize = useLocalePath();
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
          <Link
            to={localize("/")}
            className="flex shrink-0 items-center gap-2.5 rounded-control px-1 py-1"
            aria-label={t("common.brand")}
          >
            <BrandMark className="h-8 w-8" />
            <Wordmark />
          </Link>

          <nav
            aria-label={t("a11y.primaryNav")}
            className="hidden items-center gap-0.5 lg:flex"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(navClass(productsActive), "gap-1")}
                >
                  {t("common.products")}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="mt-1 w-[min(92vw,38rem)] p-2"
              >
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  <ProductMenuItem
                    href={localize("/lumo")}
                    variant="lumo"
                    name={t("nav.productLumoName")}
                    tagline={t("nav.productLumoTagline")}
                    description={t("nav.productLumoDescription")}
                  />
                  <ProductMenuItem
                    href={localize("/userscripts")}
                    variant="userscripts"
                    name={t("nav.productUserscriptsName")}
                    tagline={t("nav.productUserscriptsTagline")}
                    description={t("nav.productUserscriptsDescription")}
                  />
                </div>
                <div className="mt-1 flex items-center justify-between rounded-control border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                  <span>{t("nav.productsTitle")}</span>
                  <Link
                    to={localize("/docs")}
                    className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
                  >
                    {t("common.docs")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink to={localize("/docs")} className={navClass(path.startsWith("/docs"))}>
              {t("common.docs")}
            </NavLink>
            <NavLink
              to={localize("/changelog")}
              className={navClass(path.startsWith("/changelog"))}
            >
              {t("common.changelog")}
            </NavLink>
          </nav>
        </div>

        <div className="flex min-w-0 items-center gap-1">
          <SearchTrigger />
          <div className="hidden items-center gap-0.5 md:flex">
            <ThemeMenu />
            <LanguageMenu />
          </div>
          <a
            href={LINKS.githubOrg}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={t("a11y.github")}
            className="hidden h-9 w-9 items-center justify-center rounded-control text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
            <Link to={`${localize("/lumo")}#install`}>
              {t("nav.installLumo")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
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
