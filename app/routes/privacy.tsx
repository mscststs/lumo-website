import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  ArrowRight,
  Cloud,
  Database,
  EyeOff,
  KeyRound,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/site/section-heading";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/site/external-link";
import { useLocale } from "@/lib/i18n";
import { useLocalePath } from "@/lib/i18n/use-path";
import { formatDate } from "@/lib/format";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { LINKS } from "@/lib/site";
import { getLocale, localePath, type Locale } from "@/lib/site-manifest";

const SECTIONS: {
  key: string;
  bodyKey: string;
  icon: LucideIcon;
}[] = [
  { key: "collect", bodyKey: "privacy.collectBody", icon: Database },
  { key: "notCollect", bodyKey: "privacy.notCollectBody", icon: EyeOff },
  { key: "storage", bodyKey: "privacy.storageBody", icon: ShieldCheck },
  { key: "permissions", bodyKey: "privacy.permissionsBody", icon: KeyRound },
  { key: "providers", bodyKey: "privacy.providersBody", icon: Cloud },
  { key: "delete", bodyKey: "privacy.deleteBody", icon: Trash2 },
];

const LAST_UPDATED = "2025-11-01";

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, "/privacy"),
    title: translate(locale, "seo.privacy.title"),
    description: translate(locale, "seo.privacy.description"),
  });
}

export default function PrivacyPage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;
  const localize = useLocalePath();

  return (
    <div className="container-page py-10 sm:py-14">
      <Reveal>
        <div className="stage stage-neutral relative overflow-hidden p-6 sm:p-10">
          <Aurora tone="neutral" />
          <div className="stage-grid" aria-hidden="true" />
          <div className="relative z-10 flex max-w-2xl flex-col items-start gap-4">
            <Badge variant="outline" className="gap-1.5">
              <ShieldCheck className="h-3 w-3 text-success" />
              {t("common.localFirst")}
            </Badge>
            <Eyebrow>{t("privacy.title")}</Eyebrow>
            <h1 className="text-balance text-display-md font-semibold text-foreground">
              {t("privacy.title")}
            </h1>
            <p className="text-pretty text-base leading-7 text-muted-foreground">
              {t("privacy.description")}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {t("privacy.summary")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("privacy.lastUpdated", {
                date: formatDate(LAST_UPDATED, locale),
              })}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Reveal key={section.key}>
              <section className="flex h-full flex-col gap-3 rounded-card border border-border bg-card p-5 shadow-surface">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-muted/50 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="text-sm font-semibold text-foreground">
                    {t(`privacy.sections.${section.key}`)}
                  </h2>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t(section.bodyKey)}
                </p>
              </section>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ExternalLink
          showIcon={false}
          href={LINKS.lumoPrivacy}
          className="flex items-center justify-between rounded-card border border-border bg-card p-5 shadow-surface hover:border-primary/25"
        >
          <span className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground">
              {t("nav.productLumoName")}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              PRIVACY.md
            </span>
          </span>
          <ArrowRight className="h-4 w-4" />
        </ExternalLink>
        <ExternalLink
          showIcon={false}
          href={LINKS.userscriptsPrivacy}
          className="flex items-center justify-between rounded-card border border-border bg-card p-5 shadow-surface hover:border-primary/25"
        >
          <span className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground">
              {t("nav.productUserscriptsName")}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              PRIVACY.md
            </span>
          </span>
          <ArrowRight className="h-4 w-4" />
        </ExternalLink>
      </div>

      <div className="mt-8">
        <Link
          to={localize("/")}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {t("changelog.backHome")}
        </Link>
      </div>
    </div>
  );
}
