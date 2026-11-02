import { Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { getDoc } from "@/content/docs";
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";
import { useLocale } from "@/lib/i18n";
import { stripLocale } from "@/lib/site-manifest";
import { cn } from "@/lib/utils";

export default function DocsLayout() {
  const { t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const slug = path.startsWith("/docs/") ? path.slice("/docs/".length) : null;
  const article = slug ? getDoc(locale, slug) : undefined;

  return (
    <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div
        className={cn(
          "grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]",
          article && "xl:grid-cols-[14rem_minmax(0,1fr)_13rem] xl:gap-10",
        )}
      >
        <aside aria-label={t("docs.sidebar")} className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-2 scrollbar-lumo">
            <DocsSidebar />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 lg:hidden">
            <DocsMobileNav />
          </div>
          <Outlet />
        </div>

        {article ? (
          <aside aria-label={t("docs.toc")} className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pl-2 scrollbar-lumo">
              <DocsToc article={article} />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
