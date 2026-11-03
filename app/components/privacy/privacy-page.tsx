import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  FileCode2,
} from "lucide-react";
import { getPrivacyDoc } from "@/content/privacy";
import { BrandMark } from "@/components/brand/brand-mark";
import { DocBlocks } from "@/components/docs/doc-blocks";
import { DocsToc } from "@/components/docs/docs-toc";
import { JsonLd } from "@/components/site/json-ld";
import { LocaleLink } from "@/components/site/locale-link";
import { useLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { formatDate } from "@/lib/format";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { LINKS, siteOrigin } from "@/lib/site";
import {
  getLocale,
  localePath,
  PRIVACY_PATHS,
  SITE_ROUTES,
  type Locale,
  type ProductId,
} from "@/lib/site-manifest";

const PRODUCT_META: Record<
  ProductId,
  {
    nameKey: "nav.productLumoName" | "nav.productUserscriptsName";
    descriptionKey:
      | "seo.privacy.lumo.description"
      | "seo.privacy.userscripts.description";
    /** Upstream `PRIVACY.md` — the document this page publishes. */
    source: string;
  }
> = {
  lumo: {
    nameKey: "nav.productLumoName",
    descriptionKey: "seo.privacy.lumo.description",
    source: LINKS.lumoPrivacy,
  },
  userscripts: {
    nameKey: "nav.productUserscriptsName",
    descriptionKey: "seo.privacy.userscripts.description",
    source: LINKS.userscriptsPrivacy,
  },
};

/** The other product, for the footer cross-link. */
const SIBLING: Record<ProductId, ProductId> = {
  lumo: "userscripts",
  userscripts: "lumo",
};

/**
 * Route metadata for a product's policy.
 *
 * The canonical path comes from `PRIVACY_PATHS`, so the URL exists in exactly
 * one place; the title is the document's own title, because a policy should
 * introduce itself the way it is published.
 */
export function privacyMeta(product: ProductId, pathname: string) {
  const locale = getLocale(pathname);
  const doc = getPrivacyDoc(locale, product);
  return pageMeta({
    locale,
    path: localePath(locale, PRIVACY_PATHS[product]),
    title: `${doc.title} — Lumo`,
    description: translate(locale, PRODUCT_META[product].descriptionKey),
    type: "article",
  });
}

/**
 * One product's privacy policy, rendered from the same `DocBlock` model as the
 * docs: typed content, bilingual, with shareable section anchors.
 *
 * The policy text is a document, not UI copy — it lives in `app/content/privacy`
 * and uses the docs typography, so legal text and technical text never drift
 * apart visually.
 */
export function PrivacyPage({ product }: { product: ProductId }) {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;
  const doc = getPrivacyDoc(locale, product);
  const meta = PRODUCT_META[product];
  const sibling = SIBLING[product];
  const productPath = SITE_ROUTES[product];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: doc.title,
          description: doc.summary,
          url: absoluteUrl(localePath(locale, PRIVACY_PATHS[product])),
          inLanguage: locale === "zh" ? "zh-CN" : "en",
          dateModified: doc.updated,
          isPartOf: { "@type": "WebSite", name: "Lumo", url: siteOrigin() },
        }}
      />

      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_13rem] xl:gap-12">
          <article className="min-w-0">
            <header className="flex flex-col gap-5 border-b border-border pb-8">
              <nav
                aria-label={t("privacy.breadcrumb")}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <LocaleLink to={productPath} className="hover:text-foreground">
                  {t(meta.nameKey)}
                </LocaleLink>
                <span aria-hidden="true">/</span>
                <span>{t("privacy.eyebrow")}</span>
              </nav>

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-border bg-card shadow-surface">
                  <BrandMark variant={product} className="h-7 w-7" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {t(meta.nameKey)}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileCode2 className="h-3.5 w-3.5" />
                    PRIVACY.md
                  </p>
                </div>
              </div>

              <h1 className="max-w-[26ch] text-balance text-display-sm font-semibold text-foreground">
                {doc.title}
              </h1>
              <p className="max-w-[62ch] text-pretty text-base leading-7 text-muted-foreground">
                {doc.summary}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {t("privacy.updated", {
                    date: formatDate(doc.updated, locale),
                  })}
                </span>
                <a
                  href={meta.source}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <FileCode2 className="h-3.5 w-3.5" />
                  {t("privacy.source")}
                </a>
              </div>
            </header>

            <details className="group mt-6 rounded-card border border-border bg-card p-4 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-foreground">
                {t("privacy.toc")}
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-3 border-t border-border pt-3">
                <DocsToc blocks={doc.blocks} />
              </div>
            </details>

            <div className="mt-8">
              <DocBlocks blocks={doc.blocks} />
            </div>

            <nav className="mt-14 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
              <LocaleLink
                to={productPath}
                className="group flex flex-col gap-1 rounded-card border border-border bg-card p-4 shadow-surface transition-colors hover:border-primary/25"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t("privacy.backToProduct")}
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                  {t(meta.nameKey)}
                </span>
              </LocaleLink>
              <LocaleLink
                to={PRIVACY_PATHS[sibling]}
                className="group flex flex-col gap-1 rounded-card border border-border bg-card p-4 shadow-surface transition-colors hover:border-primary/25 sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  {t("privacy.otherProduct")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary">
                  <BrandMark variant={sibling} className="h-4 w-4" />
                  {t(PRODUCT_META[sibling].nameKey)}
                </span>
              </LocaleLink>
            </nav>
          </article>

          <aside aria-label={t("privacy.toc")} className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pl-2 scrollbar-lumo">
              <DocsToc blocks={doc.blocks} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
