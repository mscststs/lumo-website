import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import {
  ArrowRight,
  FileText,
  Rocket,
  Shield,
} from "lucide-react";
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
import { useLocalePath } from "@/lib/i18n/use-path";
import { LINKS } from "@/lib/site";
import { stripLocale } from "@/lib/site-manifest";
import { cn } from "@/lib/utils";
import { LanguageMenu } from "./language-menu";
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
      <Link
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
      </Link>
    </SheetClose>
  );
}

export function MobileNav({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const localize = useLocalePath();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const { openSearch } = useSearch();
  const [open, setOpen] = useState(false);

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
              <Link
                to={localize("/lumo")}
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
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to={localize("/userscripts")}
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
              </Link>
            </SheetClose>
          </div>

          <div className="mt-3 grid gap-0.5">
            <MobileLink
              to={localize("/docs")}
              icon={FileText}
              label={t("common.docs")}
              active={path.startsWith("/docs")}
            />
            <MobileLink
              to={localize("/changelog")}
              icon={Rocket}
              label={t("common.changelog")}
              active={path.startsWith("/changelog")}
            />
            <MobileLink
              to={localize("/privacy")}
              icon={Shield}
              label={t("common.privacy")}
              active={path.startsWith("/privacy")}
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

          <div className="mt-3 flex flex-col gap-2">
            <SheetClose asChild>
              <Button asChild size="lg" className="w-full">
                <Link to={`${localize("/lumo")}#install`}>
                  {t("nav.installLumo")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <a
                href={LINKS.githubOrg}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-control border border-border text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </SheetClose>
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
