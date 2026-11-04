import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { LayoutGrid } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { LocaleLink } from "@/components/site/locale-link";
import { getDocsBySection } from "@/content/docs";
import { useLocale } from "@/lib/i18n";
import {
  DOC_PRODUCTS,
  docRoute,
  SITE_ROUTES,
  stripLocale,
  type DocProduct,
} from "@/lib/site-manifest";
import { cn } from "@/lib/utils";

/**
 * Product-scoped documentation navigation.
 *
 * The product switcher is a segmented control, not a dropdown: there are
 * exactly two products, and a reader should see both without opening anything.
 * Each product owns its reading order, so the group list is rebuilt from the
 * active product's catalog rather than filtered from a global article list.
 */
export function DocsSidebar({
  product,
  onNavigate,
  className,
}: {
  product: DocProduct;
  onNavigate?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const groups = getDocsBySection(locale, product);

  return (
    <nav
      aria-label={t("a11y.docsNav")}
      className={cn("flex flex-col gap-5", className)}
    >
      <div
        role="group"
        aria-label={t("docs.productSwitcher")}
        className="grid grid-cols-2 gap-1 rounded-control border border-border bg-muted/40 p-1"
      >
        {DOC_PRODUCTS.map((entry) => {
          const active = entry === product;
          return (
            <LocaleLink
              key={entry}
              to={`${SITE_ROUTES.docs}/${entry}`}
              onClick={onNavigate}
              aria-current={active ? "true" : undefined}
              className={cn(
                "flex min-w-0 items-center gap-1.5 rounded-[0.45rem] px-2 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-card text-foreground shadow-surface"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <BrandMark variant={entry} className="h-4 w-4" />
              <span className="min-w-0 truncate">
                {t(`docs.productShort.${entry}`)}
              </span>
            </LocaleLink>
          );
        })}
      </div>

      <LocaleLink
        to={SITE_ROUTES.docs}
        onClick={onNavigate}
        aria-current={path === SITE_ROUTES.docs ? "page" : undefined}
        className={cn(
          "flex items-center gap-2 rounded-control px-2.5 py-2 text-sm transition-colors",
          path === SITE_ROUTES.docs
            ? "bg-accent font-medium text-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        <LayoutGrid className="h-4 w-4 shrink-0" />
        <span className="min-w-0 truncate">{t("docs.allDocs")}</span>
      </LocaleLink>

      {groups.map((group) => (
        <div key={group.section} className="flex flex-col gap-1.5">
          <p className="px-2.5 text-2xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {t(`docs.sections.${group.section}`)}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.articles.map((article) => {
              const active = path === docRoute(product, article.slug);
              return (
                <li key={article.slug}>
                  <LocaleLink
                    to={docRoute(product, article.slug)}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-control px-2.5 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        active ? "bg-primary" : "bg-border",
                      )}
                    />
                    <span className="min-w-0 truncate">{article.title}</span>
                  </LocaleLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
