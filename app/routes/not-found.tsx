import { useTranslation } from "react-i18next";
import { ArrowRight, Search } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Aurora } from "@/components/motion/aurora";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/components/site/search-provider";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { getLocale, SITE_ROUTES } from "@/lib/site-manifest";
import { LocaleLink } from "@/components/site/locale-link";

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
            <LocaleLink to={SITE_ROUTES.home}>
              {t("notFound.home")}
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </Button>
          <Button variant="outline" size="lg" onClick={openSearch}>
            <Search className="h-4 w-4" />
            {t("notFound.docs")}
          </Button>
        </div>
        <LocaleLink
          to={SITE_ROUTES.docs}
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("docs.backToDocs")}
        </LocaleLink>
      </div>
    </section>
  );
}
