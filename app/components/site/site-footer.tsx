import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { BrandMark, Wordmark } from "@/components/brand/brand-mark";
import { Separator } from "@/components/ui/separator";
import { LINKS } from "@/lib/site";
import { PRIVACY_PATHS, SITE_ROUTES } from "@/lib/site-manifest";
import { LanguageMenu } from "./language-menu";
import { LocaleLink } from "./locale-link";
import { ThemeMenu } from "./theme-menu";

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const productLinks = [
    { label: t("nav.productLumoName"), href: SITE_ROUTES.lumo },
    { label: t("nav.productUserscriptsName"), href: SITE_ROUTES.userscripts },
  ];

  const sourceLinks = [
    {
      label: t("footer.lumoRepo"),
      href: LINKS.lumoRepo,
      external: true,
    },
    {
      label: t("footer.userscriptsRepo"),
      href: LINKS.userscriptsRepo,
      external: true,
    },
  ];

  const legalLinks = [
    { label: t("footer.lumoPrivacy"), href: PRIVACY_PATHS.lumo },
    {
      label: t("footer.userscriptsPrivacy"),
      href: PRIVACY_PATHS.userscripts,
    },
  ];

  const resourceLinks = [
    { label: t("footer.posters"), href: SITE_ROUTES.posters },
  ];

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container-page py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col items-start gap-4">
            <LocaleLink
              to={SITE_ROUTES.home}
              className="flex items-center gap-2.5 rounded-control"
              aria-label={t("common.brand")}
            >
              <BrandMark className="h-8 w-8" />
              <Wordmark />
            </LocaleLink>
            <div className="flex items-center gap-1">
              <ThemeMenu modal={false} />
              <LanguageMenu modal={false} />
            </div>
          </div>

          <FooterColumn title={t("footer.products")} links={productLinks} />
          <FooterColumn title={t("footer.source")} links={sourceLinks} />
          <FooterColumn title={t("footer.resources")} links={resourceLinks} />
          <FooterColumn title={t("footer.legal")} links={legalLinks} />
        </div>

        <Separator className="my-8" />

        <p className="text-xs text-muted-foreground">
          {t("common.copyright", { year })}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
            ) : (
              <LocaleLink
                to={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </LocaleLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
