import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Layers,
  Palette,
  Rocket,
  Search,
  Terminal,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getDocs, getDocsByCategory } from "@/content/docs";
import { useSearch } from "@/components/site/search-provider";
import { Eyebrow } from "@/components/site/section-heading";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Kbd } from "@/components/ui/kbd";
import { useLocale } from "@/lib/i18n";
import { useLocalePath } from "@/lib/i18n/use-path";
import { formatDate } from "@/lib/format";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { docPath, getLocale, localePath, type DocCategory } from "@/lib/site-manifest";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<DocCategory, LucideIcon> = {
  start: Rocket,
  platform: Layers,
  products: BookOpen,
  engineering: Wrench,
  design: Palette,
};

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, "/docs"),
    title: translate(locale, "seo.docs.title"),
    description: translate(locale, "seo.docs.description"),
  });
}

export default function DocsIndexPage() {
  const { t } = useTranslation();
  const locale = useLocale();
  const localize = useLocalePath();
  const { openSearch } = useSearch();
  const groups = getDocsByCategory(locale);
  const docs = getDocs(locale);

  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <div className="stage stage-neutral relative overflow-hidden p-6 sm:p-10">
          <Aurora tone="neutral" />
          <div className="stage-grid" aria-hidden="true" />
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-center">
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <Eyebrow>{t("docs.breadcrumb")}</Eyebrow>
              <h1 className="text-balance text-display-md font-semibold text-foreground">
                {t("docs.title")}
              </h1>
              <p className="text-pretty text-base leading-7 text-muted-foreground">
                {t("docs.description")}
              </p>
              <button
                type="button"
                onClick={openSearch}
                className="mt-2 flex h-12 w-full max-w-md items-center gap-3 rounded-control border border-border bg-card/80 px-4 text-sm text-muted-foreground shadow-surface transition-colors hover:border-input hover:text-foreground"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 text-left">
                  {t("docs.searchPlaceholder")}
                </span>
                <Kbd>⌘K</Kbd>
              </button>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{t("docs.statsBilingual")}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{t("docs.statsSearch")}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{t("docs.staticPreRendered")}</span>
              </div>
            </div>

            <div className="hidden w-full max-w-xs justify-self-end rounded-card border border-border bg-card/70 p-4 shadow-card backdrop-blur lg:block">
              <div className="flex items-center gap-2 border-b border-border pb-3 text-[11px] font-medium text-muted-foreground">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono">docs/index</span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {groups.map((group) => (
                  <div
                    key={group.category}
                    className="flex items-center gap-2 text-[11px] text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-foreground/25" />
                    {t(`docs.categories.${group.category}`)}
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-3 font-mono text-[9px] leading-5 text-muted-foreground">
                <p>⌘K search</p>
                <p>EN / 中文</p>
                <p className="text-success">{t("docs.staticPreRendered")}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <section>
        <h2 className="text-sm font-semibold text-foreground">
          {t("docs.featured")}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const Icon = CATEGORY_ICON[group.category];
            const first = group.articles[0];
            return (
              <Reveal key={group.category}>
                <Link
                  to={
                    first
                      ? docPath(locale, first.slug)
                      : localize("/docs")
                  }
                  className="group flex h-full flex-col gap-3 rounded-card border border-border bg-card p-5 shadow-surface transition-colors hover:border-primary/25"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-muted/50 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(`docs.categories.${group.category}`)}
                    </h3>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {t(`docs.categoryDescriptions.${group.category}`)}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                    {first?.title}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground">
            {t("docs.allDocs")}
          </h2>
          <span className="text-xs text-muted-foreground">
            {t("docs.articles")}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {docs.map((article) => (
            <Reveal key={article.slug}>
              <Link
                to={docPath(locale, article.slug)}
                className={cn(
                  "group flex h-full flex-col gap-2 rounded-card border border-border bg-card p-5 shadow-surface transition-colors hover:border-primary/25",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {t(`docs.categories.${article.category}`)}
                  </span>
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {article.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {article.description}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-2 text-[11px] text-muted-foreground">
                  <span>{t("docs.minRead", { minutes: article.readingMinutes })}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{formatDate(article.updated, locale)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
