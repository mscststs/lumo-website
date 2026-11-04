import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock,
} from "lucide-react";
import { getAdjacentDocs, getDoc, getDocHeadings } from "@/content/docs";
import { DocBlocks } from "@/components/docs/doc-blocks";
import { DocsToc } from "@/components/docs/docs-toc";
import { BrandMark } from "@/components/brand/brand-mark";
import { JsonLd } from "@/components/site/json-ld";
import { LocaleLink } from "@/components/site/locale-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { formatDate } from "@/lib/format";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { siteOrigin } from "@/lib/site";
import {
  docPath,
  docRoute,
  getLocale,
  isDocProduct,
  localePath,
  SITE_ROUTES,
  type DocProduct,
  type Locale,
} from "@/lib/site-manifest";

interface DocsParams {
  product?: string;
  slug?: string;
}

function resolveParams(params: DocsParams): {
  product?: DocProduct;
  slug: string;
} {
  return {
    product: isDocProduct(params.product) ? params.product : undefined,
    slug: params.slug ?? "overview",
  };
}

export function meta({
  location,
  params,
}: {
  location: { pathname: string };
  params: DocsParams;
}) {
  const locale = getLocale(location.pathname);
  const { product, slug } = resolveParams(params);
  const article = product ? getDoc(locale, product, slug) : undefined;
  return pageMeta({
    locale,
    path:
      product && article
        ? docPath(locale, product, article.slug)
        : localePath(locale, SITE_ROUTES.docs),
    title: article
      ? `${article.title} — Lumo`
      : translate(locale, "seo.notFound.title"),
    description:
      article?.description ?? translate(locale, "seo.notFound.description"),
    type: "article",
    noIndex: !article,
  });
}

function NotFoundDoc() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <p className="font-mono text-xs text-muted-foreground">404</p>
      <h1 className="text-display-sm font-semibold text-foreground">
        {t("docs.notFound")}
      </h1>
      <p className="max-w-[52ch] text-sm leading-7 text-muted-foreground">
        {t("docs.notFoundDescription")}
      </p>
      <Button asChild>
        <LocaleLink to={SITE_ROUTES.docs}>{t("docs.backToDocs")}</LocaleLink>
      </Button>
    </div>
  );
}

export default function DocsArticlePage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;
  const params = useParams();
  const { product, slug } = resolveParams(params);
  const article = product ? getDoc(locale, product, slug) : undefined;

  if (!product || !article) return <NotFoundDoc />;

  const headings = getDocHeadings(article);
  const { previous, next } = getAdjacentDocs(locale, product, article.slug);
  const productName =
    product === "lumo"
      ? t("nav.productLumoName")
      : t("nav.productUserscriptsName");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title,
          description: article.description,
          dateModified: article.updated,
          inLanguage: locale === "zh" ? "zh-CN" : "en",
          url: absoluteUrl(docPath(locale, product, article.slug)),
          author: { "@type": "Organization", name: "Lumo", url: siteOrigin() },
          publisher: { "@type": "Organization", name: "Lumo", url: siteOrigin() },
        }}
      />

      <article className="min-w-0">
        <header className="flex flex-col gap-4 border-b border-border pb-8">
          <nav
            aria-label={t("docs.breadcrumb")}
            className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            <LocaleLink to={SITE_ROUTES.docs} className="hover:text-foreground">
              {t("docs.breadcrumb")}
            </LocaleLink>
            <span>/</span>
            <LocaleLink
              to={`${SITE_ROUTES.docs}/${product}`}
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <BrandMark variant={product} className="h-3.5 w-3.5" />
              {productName}
            </LocaleLink>
            <span>/</span>
            <span>{t(`docs.sections.${article.section}`)}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">
              {t(`docs.sections.${article.section}`)}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {t("docs.minRead", { minutes: article.readingMinutes })}
            </span>
          </div>

          <h1 className="max-w-[26ch] text-balance text-display-sm font-semibold text-foreground">
            {article.title}
          </h1>
          <p className="max-w-[62ch] text-pretty text-base leading-7 text-muted-foreground">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {t("docs.updated", { date: formatDate(article.updated, locale) })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {t("docs.minRead", { minutes: article.readingMinutes })}
            </span>
          </div>
        </header>

        {headings.length > 0 ? (
          <details className="group mt-6 rounded-card border border-border bg-card p-4 xl:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-foreground">
              {t("docs.toc")}
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 border-t border-border pt-3">
              <DocsToc blocks={article.blocks} />
            </div>
          </details>
        ) : null}

        <div className="mt-8">
          <DocBlocks blocks={article.blocks} />
        </div>

        <nav className="mt-14 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {previous ? (
            <LocaleLink
              to={docRoute(product, previous.slug)}
              className="group flex flex-col gap-1 rounded-card border border-border bg-card p-4 shadow-surface transition-colors hover:border-primary/25"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("docs.previous")}
              </span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                {previous.title}
              </span>
            </LocaleLink>
          ) : (
            <span />
          )}
          {next ? (
            <LocaleLink
              to={docRoute(product, next.slug)}
              className="group flex flex-col items-end gap-1 rounded-card border border-border bg-card p-4 text-right shadow-surface transition-colors hover:border-primary/25 sm:col-start-2"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                {t("docs.next")}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                {next.title}
              </span>
            </LocaleLink>
          ) : null}
        </nav>
      </article>
    </>
  );
}
