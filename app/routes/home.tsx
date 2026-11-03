import { useTranslation } from "react-i18next";
import { FileCode2, Network, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { CtaPanel } from "@/components/site/cta-panel";
import { JsonLd } from "@/components/site/json-ld";
import { ProductTabs } from "@/components/site/product-tabs";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { MockScaler } from "@/components/mockups/mock-scaler";
import { SidebarChatMock } from "@/components/mockups/sidebar-chat-mock";
import { UserscriptsDashboardMock } from "@/components/mockups/userscripts-dashboard-mock";
import { Aurora } from "@/components/motion/aurora";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { siteOrigin } from "@/lib/site";
import {
  getLocale,
  localePath,
  SITE_ROUTES,
  type Locale,
} from "@/lib/site-manifest";

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, "/"),
    title: translate(locale, "seo.home.title"),
    description: translate(locale, "seo.home.description"),
  });
}

function FakeDocument() {
  const { t } = useTranslation();
  const stats = [
    { label: t("home.hero.mock.statOne"), value: "MCP" },
    { label: t("home.hero.mock.statTwo"), value: "∞" },
    { label: t("home.hero.mock.statThree"), value: "BYOK" },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <Badge variant="accent">{t("home.hero.mock.productNotes")}</Badge>
        <span className="text-[10px] text-muted-foreground">{t("home.hero.mock.updatedToday")}</span>
      </div>
      <h3 className="max-w-md text-balance text-xl font-semibold tracking-[-0.02em] text-foreground">
        {t("home.hero.mock.docTitle")}
      </h3>
      <p className="max-w-lg text-pretty text-xs leading-6 text-muted-foreground">
        {t("home.hero.mock.docBody")}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-control border border-border bg-muted/30 px-2.5 py-2"
          >
            <p className="text-sm font-semibold text-foreground">{stat.value}</p>
            <p className="truncate text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-1.5 w-full rounded-full bg-muted" />
        <div className="h-1.5 w-[92%] rounded-full bg-muted" />
        <div className="h-1.5 w-[78%] rounded-full bg-muted" />
      </div>
      <blockquote className="border-l-2 border-primary/60 pl-3 text-[11px] leading-5 text-muted-foreground">
        {t("home.hero.mock.docQuote")}
      </blockquote>
    </div>
  );
}

function FloatingScriptsCard() {
  const { t } = useTranslation();
  const rows = [
    t("home.hero.mock.scriptOne"),
    t("home.hero.mock.scriptTwo"),
    t("home.hero.mock.scriptThree"),
  ];

  return (
    <div aria-hidden="true" className="animate-float absolute -bottom-8 -left-10 hidden w-64 rounded-panel border border-border bg-card p-3 shadow-float xl:block">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <BrandMark variant="userscripts" className="h-4 w-4" />
          <span className="text-[10px] font-semibold text-foreground">
            {t("home.hero.mock.scripts")}
          </span>
        </span>
        <span className="rounded-full bg-success/10 px-1.5 py-0.5 text-[8px] font-medium text-success">
          {t("home.hero.mock.active")}
        </span>
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5">
        {rows.map((row, index) => (
          <div
            key={row}
            className="flex items-center gap-2 rounded-[6px] border border-border/60 bg-muted/30 px-2 py-1.5"
          >
            <FileCode2 className="h-3 w-3 shrink-0 text-brand-cyan" />
            <span className="min-w-0 flex-1 truncate text-[9px] text-foreground">
              {row}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${index === 2 ? "bg-muted-foreground/40" : "bg-success"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingMcpCard() {
  const { t } = useTranslation();
  return (
    <div aria-hidden="true" className="animate-float absolute -top-20 right-8 hidden w-48 rounded-panel border border-border bg-card p-3 shadow-float [animation-delay:-3.5s] xl:block">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-control bg-brand-cyan/15 text-brand-cyan">
          <Network className="h-3.5 w-3.5" />
        </span>
        <span className="text-[10px] font-semibold text-foreground">
          {t("home.hero.mock.mcp")}
        </span>
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-success" />
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">
        {t("home.hero.mock.mcpTools")}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {["browser_tabs", "page_snapshot", "debug_input", "file_write"].map((tool) => (
          <span
            key={tool}
            className="rounded-full bg-muted px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Lumo",
          url: siteOrigin(),
          inLanguage: locale === "zh" ? "zh-CN" : "en",
          description: t("seo.home.description"),
          publisher: {
            "@type": "Organization",
            name: "Lumo",
            url: siteOrigin(),
            sameAs: [
              "https://github.com/mscststs/lumo",
              "https://github.com/mscststs/lumo-userscript-manager",
            ],
          },
        }}
      />

      <section className="relative overflow-hidden pb-14 pt-24 sm:pb-16 sm:pt-32 lg:pt-36">
        <Aurora tone="neutral" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,transparent_35%,var(--color-background)_100%)]" />
        <div className="container-page relative">
          <Reveal className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-balance text-display-xl font-semibold text-foreground">
              {locale === "zh" ? (
                <>
                  {t("home.hero.titleLead")}
                  <span className="text-gradient">{t("home.hero.titleAccent")}</span>
                  {t("home.hero.titleTail")}
                </>
              ) : (
                <>
                  {t("home.hero.titleLead")}{" "}
                  <span className="text-gradient">{t("home.hero.titleAccent")}</span>{" "}
                  {t("home.hero.titleTail")}
                </>
              )}
            </h1>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto mt-14 max-w-5xl sm:mt-16 lg:mt-20">
            <Parallax distance={18}>
              <TiltCard>
                <MockScaler designWidth={1024} designHeight={500}>
                  <BrowserFrame
                    tabs={[
                      { label: t("home.hero.mock.tab"), active: true, tone: "neutral" },
                      { label: "Docs", tone: "neutral" },
                      { label: "GitHub", tone: "neutral" },
                    ]}
                    url={t("home.hero.mock.url")}
                    contentClassName="grid min-h-[26rem] grid-cols-[minmax(0,1fr)_19rem]"
                  >
                    <FakeDocument />
                    <div className="border-l border-border bg-muted/20 p-2">
                      <SidebarChatMock mode="home" className="h-full min-h-[22rem]" />
                    </div>
                  </BrowserFrame>
                </MockScaler>
              </TiltCard>
            </Parallax>
            <FloatingScriptsCard />
            <FloatingMcpCard />
          </Reveal>
        </div>
      </section>

      <section className="container-page pt-6 pb-16 sm:pt-10 sm:pb-24">
        <ProductTabs
          items={[
            {
              tone: "lumo",
              name: t("home.products.lumo.name"),
              tagline: t("home.products.lumo.tagline"),
              title: t("home.stages.lumo.title"),
              description: t("home.stages.lumo.description"),
              bullets: t("home.stages.lumo.bullets", {
                returnObjects: true,
              }) as string[],
              cta: t("home.products.lumo.cta"),
              href: SITE_ROUTES.lumo,
              visual: (
                <SidebarChatMock
                  mode="loop"
                  className="mx-auto h-[26rem] w-full max-w-[22rem] sm:h-[28rem]"
                />
              ),
            },
            {
              tone: "userscripts",
              name: t("home.products.userscripts.name"),
              tagline: t("home.products.userscripts.tagline"),
              title: t("home.stages.userscripts.title"),
              description: t("home.stages.userscripts.description"),
              bullets: t("home.stages.userscripts.bullets", {
                returnObjects: true,
              }) as string[],
              cta: t("home.products.userscripts.cta"),
              href: SITE_ROUTES.userscripts,
              visual: (
                <UserscriptsDashboardMock className="w-full" />
              ),
            },
          ]}
        />
      </section>

      <div className="pb-16 sm:pb-24">
        <CtaPanel
          tone="neutral"
          title={t("home.cta.title")}
          description={t("home.cta.description")}
          primary={{ label: t("home.cta.primary"), href: SITE_ROUTES.lumo }}
          secondary={{
            label: t("home.cta.secondary"),
            href: SITE_ROUTES.userscripts,
          }}
          footnote={
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {t("common.tagline")}
            </span>
          }
        />
      </div>
    </>
  );
}
