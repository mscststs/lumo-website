import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ArrowUpRight,
  Bug,
  Check,
} from "lucide-react";
import { AnchorNav } from "@/components/site/anchor-nav";
import { CrossSell } from "@/components/site/cross-sell";
import { JsonLd } from "@/components/site/json-ld";
import { ProductHero } from "@/components/site/product-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { InstallPanel, type InstallFact } from "@/components/site/install-panel";
import { AgentLoopDiagram } from "@/components/mockups/agent-loop-diagram";
import { FeatureStage } from "@/components/mockups/feature-stage";
import { LumoProviderMock } from "@/components/mockups/lumo-settings-mock";
import { McpServerGrid } from "@/components/mockups/mcp-server-grid";
import { PrivacyDiagram } from "@/components/mockups/privacy-diagram";
import { ProviderProtocolGrid, DevToolsToolGrid } from "@/components/mockups/provider-protocol-grid";
import { SidebarChatMock } from "@/components/mockups/sidebar-chat-mock";
import { SplitViewShowcase } from "@/components/mockups/split-view-showcase";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { LocaleLink } from "@/components/site/locale-link";
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
    path: localePath(locale, "/lumo"),
    title: translate(locale, "seo.lumo.title"),
    description: translate(locale, "seo.lumo.description"),
  });
}

export default function LumoPage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;

  const anchors = [
    { id: "overview", label: t("lumo.anchors.overview") },
    { id: "agent", label: t("lumo.anchors.agent") },
    { id: "tools", label: t("lumo.anchors.tools") },
    { id: "workspace", label: t("lumo.anchors.workspace") },
    { id: "providers", label: t("lumo.anchors.providers") },
    { id: "privacy", label: t("lumo.anchors.privacy") },
    { id: "install", label: t("lumo.anchors.install") },
  ];

  const grid = t("lumo.grid.items", {
    returnObjects: true,
  }) as { title: string; detail: string }[];
  const installChannels = t("lumo.install.channels", {
    returnObjects: true,
  }) as { title: string; detail: string }[];
  const installChannelHrefs = [LINKS.lumoActions, LINKS.lumoRepo];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Lumo",
          applicationCategory: "BrowserApplication",
          operatingSystem: "Chrome",
          url: absoluteUrl(localePath(locale, "/lumo")),
          description: t("seo.lumo.description"),
          inLanguage: locale === "zh" ? "zh-CN" : "en",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: "Lumo", url: siteOrigin() },
        }}
      />

      <ProductHero
        variant="lumo"
        eyebrow={t("lumo.hero.eyebrow")}
        title={t("lumo.hero.title")}
        summary={t("lumo.hero.summary")}
        primary={{
          label: t("lumo.hero.primary"),
          href: LINKS.lumoStore,
          icon: <ArrowUpRight className="h-4 w-4" />,
        }}
        secondary={{
          label: t("lumo.hero.secondary"),
          href: `${SITE_ROUTES.docs}/lumo/chat`,
        }}
        visual={
          <SidebarChatMock
            mode="loop"
            className="mx-auto h-[26rem] w-full max-w-[34rem] sm:h-[30rem] lg:h-[33rem]"
          />
        }
      />

      <AnchorNav items={anchors} ariaLabel={t("lumo.anchors.overview")} />

      <div className="flex flex-col gap-16 py-16 sm:gap-24 sm:py-24">
        <FeatureStage
          id="agent"
          tone="lumo"
          eyebrow={t("lumo.agent.eyebrow")}
          title={t("lumo.agent.title")}
          description={t("lumo.agent.description")}
          bullets={t("lumo.agent.bullets", { returnObjects: true }) as string[]}
          ctaLabel={t("lumo.agent.cta")}
          ctaHref={`${SITE_ROUTES.docs}/lumo/chat`}
          visual={<AgentLoopDiagram />}
        />

        <section id="tools" className="container-page scroll-mt-24">
          <SectionHeading
            eyebrow={t("lumo.tools.eyebrow")}
            title={t("lumo.tools.title")}
            description={t("lumo.tools.description")}
            action={
              <Button asChild variant="outline" size="sm">
                <LocaleLink to={`${SITE_ROUTES.docs}/lumo/mcp`}>
                  {t("common.readDocs")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </LocaleLink>
              </Button>
            }
          />
          <div className="mt-10">
            <McpServerGrid />
          </div>

          <Reveal>
            <div className="stage stage-lumo relative mt-4 grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:p-10">
              <div className="stage-grid" aria-hidden="true" />
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-muted-foreground">
                  <Bug className="h-3.5 w-3.5 text-brand-violet" />
                  {t("lumo.tools.devtoolsEyebrow")}
                </div>
                <h3 className="text-balance text-display-sm font-semibold text-foreground">
                  {t("lumo.tools.devtoolsTitle")}
                </h3>
                <p className="max-w-[52ch] text-pretty text-sm leading-7 text-muted-foreground">
                  {t("lumo.tools.devtoolsDescription")}
                </p>
                <code className="rounded-control border border-border bg-card/80 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                  chrome.debugger · CDP 1.3
                </code>
              </div>
              <div className="relative z-10 min-w-0">
                <DevToolsToolGrid />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="workspace" className="container-page scroll-mt-24">
          <SectionHeading
            eyebrow={t("lumo.split.eyebrow")}
            title={t("lumo.split.title")}
            description={t("lumo.split.description")}
          />
          <div className="mt-8">
            <SplitViewShowcase />
          </div>
        </section>

        <div id="providers" className="flex scroll-mt-24 flex-col gap-5">
          <FeatureStage
            tone="lumo"
            reverse
            eyebrow={t("lumo.providers.eyebrow")}
            title={t("lumo.providers.title")}
            description={t("lumo.providers.description")}
            bullets={
              t("lumo.providers.bullets", { returnObjects: true }) as string[]
            }
            ctaLabel={t("lumo.providers.cta")}
            ctaHref={`${SITE_ROUTES.docs}/lumo/models`}
            visual={<LumoProviderMock />}
          />
          <section className="container-page">
            <SectionHeading
              eyebrow={t("lumo.providers.eyebrow")}
              title={t("lumo.providers.matrixTitle")}
              description={t("lumo.providers.matrixDescription")}
            />
            <ProviderProtocolGrid className="mt-6" />
          </section>
        </div>

        <FeatureStage
          id="privacy"
          tone="lumo"
          eyebrow={t("lumo.privacy.eyebrow")}
          title={t("lumo.privacy.title")}
          description={t("lumo.privacy.description")}
          bullets={t("lumo.privacy.bullets", { returnObjects: true }) as string[]}
          ctaLabel={t("common.privacy")}
          ctaHref={PRIVACY_PATHS.lumo}
          visual={<PrivacyDiagram />}
        />

        <section className="container-page">
          <SectionHeading
            eyebrow={t("lumo.grid.eyebrow")}
            title={t("lumo.grid.title")}
          />
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((item) => (
              <Reveal key={item.title}>
                <div className="flex h-full flex-col gap-2 rounded-card border border-border bg-card p-5 shadow-surface">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <section id="install" className="container-page scroll-mt-24 py-16 sm:py-24">
        <SectionHeading
          title={t("lumo.install.title")}
          description={t("lumo.install.description")}
        />
        <InstallPanel
          className="mt-10"
          brand="lumo"
          name={t("lumo.productName")}
          store={{
            href: LINKS.lumoStore,
            label: t("lumo.install.store.label"),
            tagline: t("lumo.install.store.tagline"),
          }}
          facts={t("lumo.install.facts", { returnObjects: true }) as InstallFact[]}
          channelsTitle={t("lumo.install.channelsTitle")}
          channels={installChannels.map((channel, index) => ({
            ...channel,
            href: installChannelHrefs[index] ?? LINKS.lumoRepo,
          }))}
          privacy={{ href: PRIVACY_PATHS.lumo, label: t("lumo.install.privacy") }}
        />
      </section>

      <div className="pb-16 sm:pb-24">
        <CrossSell
          tone="userscripts"
          eyebrow={t("lumo.cross.eyebrow")}
          title={t("lumo.cross.title")}
          description={t("lumo.cross.description")}
          cta={t("lumo.cross.cta")}
          href={SITE_ROUTES.userscripts}
        />
      </div>
    </>
  );
}
