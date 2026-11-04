import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { AnchorNav } from "@/components/site/anchor-nav";
import { CrossSell } from "@/components/site/cross-sell";
import { JsonLd } from "@/components/site/json-ld";
import { ProductHero } from "@/components/site/product-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { InstallPanel, type InstallFact } from "@/components/site/install-panel";
import {
  AgentAccessMock,
  UserscriptsDashboardMock,
} from "@/components/mockups/userscripts-dashboard-mock";
import { AgentScriptScene } from "@/components/mockups/agent-script-scene";
import { FeatureStage } from "@/components/mockups/feature-stage";
import { useLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { LINKS, siteOrigin } from "@/lib/site";
import {
  getLocale,
  localePath,
  PRIVACY_PATHS,
  SITE_ROUTES,
  type Locale,
} from "@/lib/site-manifest";

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, "/userscripts"),
    title: translate(locale, "seo.userscripts.title"),
    description: translate(locale, "seo.userscripts.description"),
  });
}

export default function UserscriptsPage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;

  const anchors = [
    { id: "overview", label: t("userscripts.anchors.overview") },
    { id: "agent", label: t("userscripts.anchors.agent") },
    { id: "install", label: t("userscripts.anchors.install") },
  ];

  const installChannels = t("userscripts.installPage.channels", {
    returnObjects: true,
  }) as { title: string; detail: string }[];
  const installChannelHrefs = [
    LINKS.userscriptsReleases,
    LINKS.userscriptsRepo,
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Lumo Userscripts",
          applicationCategory: "BrowserApplication",
          operatingSystem: "Chrome",
          url: absoluteUrl(localePath(locale, "/userscripts")),
          description: t("seo.userscripts.description"),
          inLanguage: locale === "zh" ? "zh-CN" : "en",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: "Lumo", url: siteOrigin() },
        }}
      />

      <ProductHero
        variant="userscripts"
        eyebrow={t("userscripts.hero.eyebrow")}
        title={t("userscripts.hero.title")}
        summary={t("userscripts.hero.summary")}
        primary={{
          label: t("userscripts.hero.primary"),
          href: LINKS.userscriptsStore,
          icon: <ArrowUpRight className="h-4 w-4" />,
        }}
        secondary={{
          label: t("userscripts.hero.secondary"),
          href: `${SITE_ROUTES.docs}/userscripts`,
        }}
        visual={<UserscriptsDashboardMock className="mx-auto w-full max-w-[34rem]" />}
      />

      <AnchorNav items={anchors} ariaLabel={t("userscripts.anchors.overview")} />

      <div className="flex flex-col gap-16 py-16 sm:gap-24 sm:py-24">
        <FeatureStage
          id="agent"
          tone="userscripts"
          eyebrow={t("userscripts.agent.eyebrow")}
          title={t("userscripts.agent.title")}
          description={t("userscripts.agent.description")}
          bullets={
            t("userscripts.agent.bullets", { returnObjects: true }) as string[]
          }
          ctaLabel={t("userscripts.agent.cta")}
          ctaHref={`${SITE_ROUTES.docs}/userscripts/agent-endpoint`}
          visual={<AgentAccessMock />}
        />

        <section className="container-page">
          <SectionHeading
            eyebrow={t("userscripts.agent.protocolEyebrow")}
            title={t("userscripts.agent.sceneTitle")}
            description={t("userscripts.agent.sceneDescription")}
          />
          <div className="mt-10">
            <AgentScriptScene />
          </div>
        </section>
      </div>

      <section
        id="install"
        className="container-page scroll-mt-24 py-16 sm:py-24"
      >
        <SectionHeading
          title={t("userscripts.installPage.title")}
          description={t("userscripts.installPage.description")}
        />
        <InstallPanel
          className="mt-10"
          brand="userscripts"
          name={t("userscripts.productName")}
          store={{
            href: LINKS.userscriptsStore,
            label: t("userscripts.installPage.store.label"),
            tagline: t("userscripts.installPage.store.tagline"),
          }}
          facts={
            t("userscripts.installPage.facts", {
              returnObjects: true,
            }) as InstallFact[]
          }
          channelsTitle={t("userscripts.installPage.channelsTitle")}
          channels={installChannels.map((channel, index) => ({
            ...channel,
            href: installChannelHrefs[index] ?? LINKS.userscriptsRepo,
          }))}
          privacy={{
            href: PRIVACY_PATHS.userscripts,
            label: t("userscripts.installPage.privacy"),
          }}
        />
      </section>

      <div className="pb-16 sm:pb-24">
        <CrossSell
          tone="lumo"
          eyebrow={t("userscripts.cross.eyebrow")}
          title={t("userscripts.cross.title")}
          description={t("userscripts.cross.description")}
          cta={t("userscripts.cross.cta")}
          href={SITE_ROUTES.lumo}
        />
      </div>
    </>
  );
}
