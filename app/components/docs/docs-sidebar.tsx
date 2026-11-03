import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { FileText } from "lucide-react";
import { getDocsByCategory } from "@/content/docs";
import { useLocale } from "@/lib/i18n";
import { SITE_ROUTES, stripLocale } from "@/lib/site-manifest";
import { LocaleLink } from "@/components/site/locale-link";
import { cn } from "@/lib/utils";

export function DocsSidebar({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const groups = getDocsByCategory(locale);

  return (
    <nav
      aria-label={t("a11y.docsNav")}
      className={cn("flex flex-col gap-6", className)}
    >
      <LocaleLink
        to={SITE_ROUTES.docs}
        onClick={onNavigate}
        aria-current={path === "/docs" ? "page" : undefined}
        className={cn(
          "flex items-center gap-2 rounded-control px-2.5 py-2 text-sm font-semibold transition-colors",
          path === "/docs"
            ? "bg-accent text-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        <FileText className="h-4 w-4 shrink-0" />
        {t("docs.allDocs")}
      </LocaleLink>

      {groups.map((group) => (
        <div key={group.category} className="flex flex-col gap-2">
          <p className="px-2.5 text-2xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {t(`docs.categories.${group.category}`)}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.articles.map((article) => {
              const active = path === `/docs/${article.slug}`;
              return (
                <li key={article.slug}>
                  <LocaleLink
                    to={`${SITE_ROUTES.docs}/${article.slug}`}
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
