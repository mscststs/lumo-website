import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock,
  Pencil,
} from "lucide-react";
import { getAdjacentDocs, getDoc, getDocHeadings } from "@/content/docs";
import { DocBlocks } from "@/components/docs/doc-blocks";
import { DocsToc } from "@/components/docs/docs-toc";
import { JsonLd } from "@/components/site/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { useLocalePath } from "@/lib/i18n/use-path";
import { translate } from "@/lib/i18n/translate";
import { formatDate } from "@/lib/format";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { DOCS_EDIT_BASE, SITE_URL } from "@/lib/site";
import {
  docPath,
  getLocale,
  localePath,
  type Locale,
} from "@/lib/site-manifest";

export function meta({
  location,
  params,
}: {
  location: { pathname: string };
  params: { slug?: string };
}) {
  const locale = getLocale(location.pathname);
  const article = params.slug ? getDoc(locale, params.slug) : undefined;
  return pageMeta({
    locale,
    path: localePath(locale, `/docs/${params.slug ?? ""}`),
    title: article ? `${article.title} — Lumo` : translate(locale, "seo.notFound.title"),
    description: article?.description ?? translate(locale, "seo.notFound.description"),
    type: "article",
    noIndex: !article,
  });
}

function NotFoundDoc() {
  const { t } = useTranslation();
  const localize = useLocalePath();
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
        <Link to={localize("/docs")}>{t("docs.backToDocs")}</Link>
      </Button>
    </div>
  );
}

export default function DocsArticlePage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;
  const localize = useLocalePath();
  const params = useParams();
  const article = params.slug ? getDoc(locale, params.slug) : undefined;

  if (!article) return <NotFoundDoc />;

  const headings = getDocHeadings(article);
  const { previous, next } = getAdjacentDocs(locale, article.slug);
  const editUrl = `${DOCS_EDIT_BASE}/app/content/docs/${locale}.ts`;

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
          url: absoluteUrl(docPath(locale, article.slug)),
          author: { "@type": "Organization", name: "Lumo", url: SITE_URL },
          publisher: { "@type": "Organization", name: "Lumo", url: SITE_URL },
        }}
      />

      <article className="min-w-0">
        <header className="flex flex-col gap-4 border-b border-border pb-8">
          <nav
            aria-label={t("docs.breadcrumb")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link to={localize("/docs")} className="hover:text-foreground">
              {t("docs.breadcrumb")}
            </Link>
            <span>/</span>
            <span>{t(`docs.categories.${article.category}`)}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{t(`docs.categories.${article.category}`)}</Badge>
            <span className="text-[11px] text-muted-foreground">
              {t("docs.minRead", { minutes: article.readingMinutes })}
            </span>
          </div>

          <h1 className="max-w-[24ch] text-balance text-display-sm font-semibold text-foreground">
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
            <a
              href={editUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
              {t("docs.editPage")}
            </a>
          </div>
        </header>

        {headings.length > 0 ? (
          <details className="group mt-6 rounded-card border border-border bg-card p-4 xl:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-foreground">
              {t("docs.toc")}
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 border-t border-border pt-3">
              <DocsToc article={article} />
            </div>
          </details>
        ) : null}

        <div className="mt-8">
          <DocBlocks blocks={article.blocks} />
        </div>

        <nav className="mt-14 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {previous ? (
            <Link
              to={docPath(locale, previous.slug)}
              className="group flex flex-col gap-1 rounded-card border border-border bg-card p-4 shadow-surface transition-colors hover:border-primary/25"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("docs.previous")}
              </span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={docPath(locale, next.slug)}
              className="group flex flex-col items-end gap-1 rounded-card border border-border bg-card p-4 text-right shadow-surface transition-colors hover:border-primary/25 sm:col-start-2"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                {t("docs.next")}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </article>
    </>
  );
}
