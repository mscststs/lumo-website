import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand/icons";
import { BrandMark, Wordmark } from "@/components/brand/brand-mark";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LINKS, SITE_VERSION } from "@/lib/site";
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

  const resourceLinks = [
    { label: t("common.docs"), href: SITE_ROUTES.docs },
    {
      label: t("footer.architecture"),
      href: `${SITE_ROUTES.docs}/architecture`,
    },
    { label: t("footer.mcp"), href: `${SITE_ROUTES.docs}/mcp` },
    {
      label: t("footer.releases"),
      href: LINKS.userscriptsReleases,
      external: true,
    },
  ];

  const legalLinks = [
    { label: t("footer.lumoPrivacy"), href: PRIVACY_PATHS.lumo },
    {
      label: t("footer.userscriptsPrivacy"),
      href: PRIVACY_PATHS.userscripts,
    },
    {
      label: t("footer.license"),
      href: LINKS.userscriptsRepo,
      external: true,
    },
    { label: t("footer.github"), href: LINKS.githubOrg, external: true },
  ];

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container-page py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col items-start gap-4">
            <LocaleLink
              to={SITE_ROUTES.home}
              className="flex items-center gap-2.5 rounded-control"
              aria-label={t("common.brand")}
            >
              <BrandMark className="h-8 w-8" />
              <Wordmark />
            </LocaleLink>
            <p className="text-pretty text-sm leading-6 text-muted-foreground">
              {t("footer.statement")}
            </p>
            <Badge variant="outline" className="gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {t("common.builtInTheOpen")}
            </Badge>
            <a
              href={LINKS.githubOrg}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <div className="mt-1 flex items-center gap-1">
              <ThemeMenu modal={false} />
              <LanguageMenu modal={false} />
            </div>
          </div>

          <FooterColumn title={t("footer.products")} links={productLinks} />
          <FooterColumn title={t("footer.resources")} links={resourceLinks} />
          <FooterColumn title={t("footer.legal")} links={legalLinks} />
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t("common.copyright", { year })}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <p>{t("footer.builtWith")}</p>
            <p className="font-mono text-2xs">{t("footer.siteVersion", { version: SITE_VERSION })}</p>
          </div>
        </div>
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
