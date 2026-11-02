import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, GitBranch, Sparkles } from "lucide-react";
import { getChangelog, type ChangelogProduct } from "@/content/changelog";
import { Eyebrow } from "@/components/site/section-heading";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n";
import { useLocalePath } from "@/lib/i18n/use-path";
import { formatDate } from "@/lib/format";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { LINKS } from "@/lib/site";
import { getLocale, localePath, type Locale } from "@/lib/site-manifest";
import { cn } from "@/lib/utils";

type Filter = "all" | ChangelogProduct;

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, "/changelog"),
    title: translate(locale, "seo.changelog.title"),
    description: translate(locale, "seo.changelog.description"),
  });
}

const PRODUCT_BADGE: Record<ChangelogProduct, "accent" | "success" | "outline"> = {
  lumo: "accent",
  userscripts: "success",
  site: "outline",
};

export default function ChangelogPage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;
  const localize = useLocalePath();
  const [filter, setFilter] = useState<Filter>("all");
  const entries = getChangelog().filter(
    (entry) => filter === "all" || entry.product === filter,
  );
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t("changelog.all") },
    { value: "lumo", label: t("changelog.products.lumo") },
    { value: "userscripts", label: t("changelog.products.userscripts") },
    { value: "site", label: t("changelog.products.site") },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <Reveal>
        <div className="stage stage-neutral relative overflow-hidden p-6 sm:p-10">
          <Aurora tone="neutral" />
          <div className="stage-grid" aria-hidden="true" />
          <div className="relative z-10 flex max-w-2xl flex-col items-start gap-4">
            <Eyebrow>{t("changelog.title")}</Eyebrow>
            <h1 className="text-balance text-display-md font-semibold text-foreground">
              {t("changelog.title")}
            </h1>
            <p className="text-pretty text-base leading-7 text-muted-foreground">
              {t("changelog.description")}
            </p>
            <p className="text-xs text-muted-foreground">{t("changelog.subtitle")}</p>
            <a
              href={LINKS.userscriptsReleases}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              {t("changelog.viewReleases")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center gap-1.5">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            aria-pressed={filter === item.value}
            className={cn(
              "inline-flex h-9 items-center rounded-control border px-3 text-xs font-medium transition-colors",
              filter === item.value
                ? "border-border bg-card text-foreground shadow-surface"
                : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {entries.map((entry) => (
          <Reveal key={entry.id}>
            <article className="grid grid-cols-1 gap-4 rounded-card border border-border bg-card p-5 shadow-surface sm:grid-cols-[9rem_minmax(0,1fr)] sm:p-6">
              <div className="flex flex-col gap-2">
                <Badge variant={PRODUCT_BADGE[entry.product]} className="w-fit">
                  {entry.product === "lumo" ? (
                    <Sparkles className="h-3 w-3" />
                  ) : entry.product === "userscripts" ? (
                    <GitBranch className="h-3 w-3" />
                  ) : null}
                  {t(`changelog.products.${entry.product}`)}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {t("changelog.released")}{" "}
                  {formatDate(entry.date, locale)}
                </p>
                <p className="font-mono text-[11px] text-foreground">
                  {entry.version}
                </p>
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-foreground">
                  {entry.title[locale]}
                </h2>
                <p className="mt-1 text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {t("changelog.highlights")}
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {entry.highlights[locale].map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Link
          to={localize("/")}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {t("changelog.backHome")}
        </Link>
      </div>
    </div>
  );
}
