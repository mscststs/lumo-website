import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import {
  Braces,
  FileText,
  Home,
  Languages,
  LayoutGrid,
  Layers,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GithubIcon } from "@/components/brand/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { useSearch } from "./search-provider";
import { useLocale } from "@/lib/i18n";
import { useLocaleHref, useLocaleNavigate } from "./locale-link";
import {
  docPath,
  LOCALE_META,
  PRIVACY_PATHS,
  SITE_ROUTES,
  switchLocaleHref,
  type DocCategory,
} from "@/lib/site-manifest";
import { getAllSearchResults, searchDocs } from "@/content/docs";
import { LINKS } from "@/lib/site";

const CATEGORY_ICON: Record<DocCategory, LucideIcon> = {
  start: Rocket,
  platform: Layers,
  products: LayoutGrid,
  engineering: Wrench,
  design: Palette,
};

export function CommandPalette() {
  const { t } = useTranslation();
  const { open, setOpen } = useSearch();
  const locale = useLocale();
  const location = useLocation();
  const go = useLocaleNavigate();
  const href = useLocaleHref();
  const [query, setQuery] = useState("");

  const otherLocale = locale === "en" ? "zh" : "en";
  const normalized = query.trim().toLowerCase();

  const pages = useMemo(
    () =>
      [
        { key: "home", label: t("common.brand"), href: SITE_ROUTES.home, icon: Home },
        {
          key: "lumo",
          label: t("nav.productLumoName"),
          href: SITE_ROUTES.lumo,
          icon: Sparkles,
        },
        {
          key: "userscripts",
          label: t("nav.productUserscriptsName"),
          href: SITE_ROUTES.userscripts,
          icon: Braces,
        },
        {
          key: "docs",
          label: t("common.docs"),
          href: SITE_ROUTES.docs,
          icon: FileText,
        },
        {
          key: "lumo-privacy",
          label: t("footer.lumoPrivacy"),
          href: PRIVACY_PATHS.lumo,
          icon: ShieldCheck,
        },
        {
          key: "userscripts-privacy",
          label: t("footer.userscriptsPrivacy"),
          href: PRIVACY_PATHS.userscripts,
          icon: ShieldCheck,
        },
      ] as const,
    [t],
  );

  /** Close the palette, then navigate to a locale-agnostic target. */
  const run = useCallback(
    (target: string) => {
      setOpen(false);
      setQuery("");
      go(target);
    },
    [go, setOpen],
  );

  const filteredPages = useMemo(() => {
    if (!normalized) return pages;
    return pages.filter((page) =>
      `${page.label} ${page.key} ${page.href}`.toLowerCase().includes(normalized),
    );
  }, [normalized, pages]);

  const filteredDocs = useMemo(() => {
    if (!normalized) return getAllSearchResults(locale);
    return searchDocs(locale, query, 8);
  }, [locale, normalized, query]);

  const actions = useMemo(
    () =>
      [
        {
          key: "language",
          label:
            otherLocale === "zh"
              ? t("language.switchToZh")
              : t("language.switchToEn"),
          keywords: `${LOCALE_META[otherLocale].nativeLabel} language locale`,
          icon: Languages,
          run: () => run(switchLocaleHref(location, otherLocale)),
        },
        {
          key: "github",
          label: "GitHub",
          keywords: "github source repository code",
          icon: GithubIcon,
          run: () => {
            setOpen(false);
            window.open(LINKS.githubOrg, "_blank", "noopener,noreferrer");
          },
        },
        {
          key: "docs-index",
          label: t("docs.allDocs"),
          keywords: "documentation docs index",
          icon: FileText,
          run: () => run(SITE_ROUTES.docs),
        },
      ] as const,
    [location, otherLocale, run, setOpen, t],
  );

  const filteredActions = useMemo(() => {
    if (!normalized) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.keywords}`.toLowerCase().includes(normalized),
    );
  }, [actions, normalized]);

  const hasResults =
    filteredPages.length > 0 || filteredDocs.length > 0 || filteredActions.length > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <DialogContent showClose={false} className="max-w-xl overflow-hidden p-0">
        <DialogTitle className="sr-only">{t("common.search")}</DialogTitle>
        <DialogDescription className="sr-only">
          {t("common.searchHint")}
        </DialogDescription>
        <Command shouldFilter={false} loop label={t("common.search")}>
          <CommandInput
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder={t("common.searchHint")}
            aria-label={t("common.search")}
          />
          <CommandList label={t("common.search")}>
            {!hasResults ? (
              <CommandEmpty>{t("docs.searchEmpty")}</CommandEmpty>
            ) : null}

            {filteredPages.length > 0 ? (
              <CommandGroup heading={t("common.quickLinks")}>
                {filteredPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <CommandItem
                      key={page.key}
                      value={`page ${page.key} ${page.label}`}
                      onSelect={() => run(page.href)}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{page.label}</span>
                      <CommandShortcut>{href(page.href)}</CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}

            {filteredPages.length > 0 && filteredDocs.length > 0 ? (
              <CommandSeparator />
            ) : null}

            {filteredDocs.length > 0 ? (
              <CommandGroup heading={t("docs.title")}>
                {filteredDocs.map((doc) => {
                  const Icon = CATEGORY_ICON[doc.category];
                  return (
                    <CommandItem
                      key={doc.slug}
                      value={`doc ${doc.slug} ${doc.title}`}
                      onSelect={() => run(docPath(locale, doc.slug))}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate">{doc.title}</span>
                        <span className="truncate text-xs text-muted-foreground">
                          {doc.heading ?? doc.description}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}

            {filteredActions.length > 0 &&
            (filteredPages.length > 0 || filteredDocs.length > 0) ? (
              <CommandSeparator />
            ) : null}

            {filteredActions.length > 0 ? (
              <CommandGroup heading={t("common.actions")}>
                {filteredActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <CommandItem
                      key={action.key}
                      value={`action ${action.key} ${action.label}`}
                      onSelect={action.run}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{action.label}</span>
                      {action.key === "github" ? (
                        <CommandShortcut>↗</CommandShortcut>
                      ) : null}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
          </CommandList>

          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 text-2xs text-muted-foreground">
            <span className="truncate">{t("docs.searchHint")}</span>
            <span className="flex shrink-0 items-center gap-1.5">
              <Kbd>↑↓</Kbd>
              <Kbd>↵</Kbd>
              <Kbd>esc</Kbd>
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
