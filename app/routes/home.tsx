import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  FileCode2,
  Network,
  Sparkles,
  Terminal,
} from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { AnnouncementPill } from "@/components/site/announcement";
import { CtaPanel } from "@/components/site/cta-panel";
import { JsonLd } from "@/components/site/json-ld";
import { MetricBand } from "@/components/site/metric-band";
import { PhilosophyGrid } from "@/components/site/philosophy-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { TechGrid } from "@/components/site/tech-grid";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { FeatureStage } from "@/components/mockups/feature-stage";
import { SidebarChatMock } from "@/components/mockups/sidebar-chat-mock";
import { UserscriptsDashboardMock } from "@/components/mockups/userscripts-dashboard-mock";
import { Aurora } from "@/components/motion/aurora";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { useLocalePath } from "@/lib/i18n/use-path";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { siteOrigin } from "@/lib/site";
import {
  getLocale,
  localePath,
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
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Badge variant="accent">{t("home.hero.mock.productNotes")}</Badge>
        <span className="text-[10px] text-muted-foreground">{t("home.hero.mock.updatedToday")}</span>
      </div>
      <h3 className="max-w-md text-balance text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
        {t("home.hero.mock.docTitle")}
      </h3>
      <p className="max-w-lg text-pretty text-[11px] leading-5 text-muted-foreground sm:text-xs sm:leading-6">
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
    <div aria-hidden="true" className="animate-float absolute -top-24 right-8 hidden w-48 rounded-panel border border-border bg-card p-3 shadow-float [animation-delay:-3.5s] xl:block">
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

function ProductCard({
  tone,
  name,
  tagline,
  description,
  bullets,
  cta,
  href,
  visual,
}: {
  tone: "lumo" | "userscripts";
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  cta: string;
  href: string;
  visual: React.ReactNode;
}) {
  return (
    <article
      className={`stage group flex h-full min-w-0 flex-col gap-6 p-5 sm:p-7 ${
        tone === "lumo" ? "stage-lumo" : "stage-userscripts"
      }`}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-card border border-border bg-card/80 shadow-card">
            <BrandMark variant={tone} className="h-7 w-7" />
          </span>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{tagline}</p>
          </div>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
      </div>

      <div className="relative z-10 min-h-0 min-w-0 flex-1 overflow-hidden rounded-panel border border-border bg-background/60 p-2 shadow-surface">
        {visual}
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        <ul className="flex flex-col gap-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-xs leading-5 text-foreground/85">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              {bullet}
            </li>
          ))}
        </ul>
        <Link
          to={href}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;
  const localize = useLocalePath();

  const philosophy = t("home.philosophy.items", {
    returnObjects: true,
  }) as { title: string; description: string }[];
  const stack = t("home.stack.items", {
    returnObjects: true,
  }) as { name: string; detail: string }[];
  const metrics = t("home.metrics.items", {
    returnObjects: true,
  }) as { value: string; label: string }[];
  const docLinks = t("home.docs.links", {
    returnObjects: true,
  }) as { title: string; detail: string }[];

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

      <section className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pt-24">
        <Aurora tone="neutral" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,transparent_35%,var(--color-background)_100%)]" />
        <div className="container-page relative">
          <Reveal className="flex flex-col items-center text-center">
            <AnnouncementPill href={localize("/changelog")} />
            <h1 className="mt-7 max-w-4xl text-balance text-display-xl font-semibold text-foreground">
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
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {t("home.hero.description")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-2.5 sm:flex-row">
              <Button asChild size="lg">
                <Link to={localize("/lumo")}>
                  {t("home.hero.primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={localize("/userscripts")}>
                  {t("home.hero.secondary")}
                </Link>
              </Button>
              <Link
                to={localize("/docs")}
                className="inline-flex h-12 items-center gap-1.5 px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("home.hero.tertiary")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {(t("home.hero.chips", { returnObjects: true }) as string[]).map(
                (chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {chip}
                  </span>
                ),
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto mt-14 max-w-5xl">
            <Parallax distance={18}>
              <TiltCard>
                <BrowserFrame
                  tabs={[
                    { label: t("home.hero.mock.tab"), active: true, tone: "neutral" },
                    { label: "Docs", tone: "neutral" },
                    { label: "GitHub", tone: "neutral" },
                  ]}
                  url={t("home.hero.mock.url")}
                  contentClassName="grid min-h-[26rem] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_19rem]"
                >
                  <FakeDocument />
                  <div className="border-t border-border bg-muted/20 p-2 lg:border-l lg:border-t-0">
                    <SidebarChatMock mode="home" className="h-full min-h-[22rem]" />
                  </div>
                </BrowserFrame>
              </TiltCard>
            </Parallax>
            <FloatingScriptsCard />
            <FloatingMcpCard />
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow={t("home.products.eyebrow")}
          title={t("home.products.title")}
          description={t("home.products.description")}
        />
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal>
            <ProductCard
              tone="lumo"
              name={t("home.products.lumo.name")}
              tagline={t("home.products.lumo.tagline")}
              description={t("home.products.lumo.description")}
              bullets={
                t("home.products.lumo.bullets", {
                  returnObjects: true,
                }) as string[]
              }
              cta={t("home.products.lumo.cta")}
              href={localize("/lumo")}
              visual={<SidebarChatMock mode="lumo" className="h-[19rem]" />}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ProductCard
              tone="userscripts"
              name={t("home.products.userscripts.name")}
              tagline={t("home.products.userscripts.tagline")}
              description={t("home.products.userscripts.description")}
              bullets={
                t("home.products.userscripts.bullets", {
                  returnObjects: true,
                }) as string[]
              }
              cta={t("home.products.userscripts.cta")}
              href={localize("/userscripts")}
              visual={<UserscriptsDashboardMock className="h-[19rem]" />}
            />
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow={t("home.philosophy.eyebrow")}
          title={t("home.philosophy.title")}
          description={t("home.philosophy.description")}
          action={
            <Button asChild variant="outline" size="sm">
              <Link to={localize("/docs/design-system")}>
                {t("common.readDocs")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          }
        />
        <div className="mt-10">
          <PhilosophyGrid items={philosophy} />
        </div>
      </section>

      <div className="flex flex-col gap-16 py-16 sm:gap-24 sm:py-24">
        <FeatureStage
          tone="lumo"
          eyebrow={t("home.stages.lumo.eyebrow")}
          title={t("home.stages.lumo.title")}
          description={t("home.stages.lumo.description")}
          bullets={
            t("home.stages.lumo.bullets", { returnObjects: true }) as string[]
          }
          ctaLabel={t("home.stages.lumo.cta")}
          ctaHref={localize("/lumo")}
          visual={
            <TiltCard>
              <SidebarChatMock mode="loop" className="mx-auto h-[24rem] max-w-sm" />
            </TiltCard>
          }
        />
        <FeatureStage
          tone="userscripts"
          reverse
          eyebrow={t("home.stages.userscripts.eyebrow")}
          title={t("home.stages.userscripts.title")}
          description={t("home.stages.userscripts.description")}
          bullets={
            t("home.stages.userscripts.bullets", {
              returnObjects: true,
            }) as string[]
          }
          ctaLabel={t("home.stages.userscripts.cta")}
          ctaHref={localize("/userscripts")}
          visual={
            <TiltCard>
              <UserscriptsDashboardMock className="mx-auto max-w-xl" />
            </TiltCard>
          }
        />
      </div>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow={t("home.stack.eyebrow")}
          title={t("home.stack.title")}
          description={t("home.stack.description")}
        />
        <div className="mt-10">
          <TechGrid items={stack} />
        </div>
        <div className="mt-6">
          <MetricBand items={metrics} />
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow={t("home.docs.eyebrow")}
          title={t("home.docs.title")}
          description={t("home.docs.description")}
          action={
            <Button asChild size="sm">
              <Link to={localize("/docs")}>
                {t("home.docs.primary")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          }
        />
        <Reveal className="mt-10 overflow-hidden rounded-panel border border-border bg-card shadow-card">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            <div className="relative flex flex-col justify-between gap-6 bg-muted/30 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Terminal className="h-4 w-4 text-primary" />
                <span>npm run build</span>
              </div>
              <pre className="overflow-x-auto font-mono text-[11px] leading-6 text-muted-foreground sm:text-xs">
                <code>
                  <span className="text-brand-cyan">$</span> npm run build{"\n"}
                  <span className="text-success">✓</span> react-router build{"\n"}
                  <span className="text-success">✓</span> 30 routes pre-rendered{"\n"}
                  <span className="text-success">✓</span> sitemap generated{"\n"}
                  <span className="text-brand-violet">→</span> build/client
                </code>
              </pre>
              <p className="text-xs leading-5 text-muted-foreground">
                {t("home.docs.codeNote")}
              </p>
            </div>
            <div className="flex flex-col divide-y divide-border">
              {docLinks.map((link, index) => (
                <Link
                  key={link.title}
                  to={
                    [
                      localize("/docs/agent-loop"),
                      localize("/docs/agent-connections"),
                      localize("/docs/agent-protocol"),
                    ][index] ?? localize("/docs")
                  }
                  className="group flex items-start justify-between gap-4 p-5 transition-colors hover:bg-accent/50 sm:p-6"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {link.title}
                    </span>
                    <span className="text-xs leading-5 text-muted-foreground">
                      {link.detail}
                    </span>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              ))}
              <Link
                to={localize("/docs")}
                className="group flex items-center gap-2 p-5 text-sm font-medium text-primary sm:p-6"
              >
                <BookOpen className="h-4 w-4" />
                {t("home.docs.primary")}
                <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="pb-16 sm:pb-24">
        <CtaPanel
          tone="neutral"
          title={t("home.cta.title")}
          description={t("home.cta.description")}
          primary={{ label: t("home.cta.primary"), href: localize("/lumo") }}
          secondary={{
            label: t("home.cta.secondary"),
            href: localize("/userscripts"),
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
