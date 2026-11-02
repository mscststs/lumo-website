import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Aurora } from "@/components/motion/aurora";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/components/site/search-provider";
import { useLocalePath } from "@/lib/i18n/use-path";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { getLocale } from "@/lib/site-manifest";

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: location.pathname,
    title: translate(locale, "seo.notFound.title"),
    description: translate(locale, "seo.notFound.description"),
    noIndex: true,
  });
}

export default function NotFoundPage() {
  const { t } = useTranslation();
  const localize = useLocalePath();
  const { openSearch } = useSearch();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Aurora tone="neutral" />
      <div className="container-page relative flex max-w-2xl flex-col items-start gap-5">
        <div className="flex items-center gap-3">
          <BrandMark className="h-9 w-9" />
          <p className="font-mono text-xs text-muted-foreground">
            {t("notFound.code")}
          </p>
        </div>
        <h1 className="text-balance text-display-md font-semibold text-foreground">
          {t("notFound.title")}
        </h1>
        <p className="text-pretty text-base leading-7 text-muted-foreground">
          {t("notFound.description")}
        </p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Button asChild size="lg">
            <Link to={localize("/")}>
              {t("notFound.home")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={openSearch}>
            <Search className="h-4 w-4" />
            {t("notFound.docs")}
          </Button>
        </div>
        <Link
          to={localize("/docs")}
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("docs.backToDocs")}
        </Link>
      </div>
    </section>
  );
}
