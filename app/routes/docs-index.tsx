import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/site/section-heading";
import { LocaleLink } from "@/components/site/locale-link";
import { useSearch } from "@/components/site/search-provider";
import { Kbd } from "@/components/ui/kbd";
import { getDoc, getDocCount } from "@/content/docs";
import { useLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import {
  DOC_PRODUCTS,
  docRoute,
  getLocale,
  localePath,
  SITE_ROUTES,
  type DocProduct,
  type DocSlug,
} from "@/lib/site-manifest";

const REQUIRED: Record<DocProduct, readonly DocSlug[]> = {
  lumo: ["install", "models"],
  userscripts: ["install", "enable-userscripts"],
};

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, SITE_ROUTES.docs),
    title: translate(locale, "seo.docs.title"),
    description: translate(locale, "seo.docs.description"),
  });
}

function productName(product: DocProduct, t: (key: string) => string): string {
  return product === "lumo"
    ? t("nav.productLumoName")
    : t("nav.productUserscriptsName");
}

function productTagline(product: DocProduct, t: (key: string) => string): string {
  return product === "lumo"
    ? t("nav.productLumoTagline")
    : t("nav.productUserscriptsTagline");
}

export default function DocsIndexPage() {
  const { t } = useTranslation();
  const locale = useLocale();
  const { openSearch } = useSearch();

  return (
    <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
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
                  <span>{t("docs.chooseProduct")}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{t("docs.statsBilingual")}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{t("docs.staticPreRendered")}</span>
                </div>
              </div>

              <div className="hidden w-full max-w-xs justify-self-end rounded-card border border-border bg-card/70 p-4 shadow-card backdrop-blur lg:block">
                <div className="flex items-center gap-2 border-b border-border pb-3 text-[11px] font-medium text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono">docs</span>
                </div>
                <div className="mt-3 flex flex-col gap-2.5">
                  {DOC_PRODUCTS.map((product) => (
                    <div key={product} className="flex items-center gap-2">
                      <BrandMark variant={product} className="h-4 w-4" />
                      <span className="min-w-0 flex-1 truncate text-[11px] text-muted-foreground">
                        {productName(product, t)}
                      </span>
                      <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                        {getDocCount(locale, product)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              {t("docs.chooseProduct")}
            </h2>
            <span className="text-xs text-muted-foreground">
              {t("docs.statsBilingual")}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {DOC_PRODUCTS.map((product) => {
              const required = REQUIRED[product]
                .map((slug) => getDoc(locale, product, slug))
                .filter((article) => article !== undefined);
              return (
                <Reveal key={product}>
                  <div className="flex h-full flex-col gap-5 rounded-card border border-border bg-card p-6 shadow-surface">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-border bg-muted/40">
                        <BrandMark variant={product} className="h-7 w-7" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          {productName(product, t)}
                        </h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {productTagline(product, t)}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-2xs tabular-nums text-muted-foreground">
                        {t("docs.articleCount", {
                          count: getDocCount(locale, product),
                        })}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {t("docs.requiredReading")}
                      </p>
                      {required.map((article) => (
                        <LocaleLink
                          key={article.slug}
                          to={docRoute(product, article.slug)}
                          className="group flex items-center justify-between gap-3 rounded-control border border-border/70 bg-background/60 px-3 py-2 text-sm transition-colors hover:border-primary/25 hover:text-foreground"
                        >
                          <span className="min-w-0 truncate text-foreground">
                            {article.title}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                        </LocaleLink>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3">
                      <LocaleLink
                        to={`${SITE_ROUTES.docs}/${product}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-control bg-primary px-3.5 text-sm font-medium text-primary-foreground shadow-button transition-colors hover:bg-primary-hover"
                      >
                        {t("common.readDocs")}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </LocaleLink>
                      <LocaleLink
                        to={`${SITE_ROUTES.docs}/${product}/faq`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-control border border-border bg-card px-3.5 text-sm font-medium text-foreground shadow-surface transition-colors hover:border-primary/25"
                      >
                        {t("docs.faqShort")}
                      </LocaleLink>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
