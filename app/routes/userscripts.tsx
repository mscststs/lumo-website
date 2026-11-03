import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Braces,
  Code2,
  Download,
  ExternalLink as ExternalLinkIcon,
  Globe,
  KeyRound,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/brand/icons";
import { AnchorNav } from "@/components/site/anchor-nav";
import { CrossSell } from "@/components/site/cross-sell";
import { JsonLd } from "@/components/site/json-ld";
import { ProductHero } from "@/components/site/product-hero";
import { SectionHeading } from "@/components/site/section-heading";
import {
  AgentAccessMock,
  UserscriptsDashboardMock,
} from "@/components/mockups/userscripts-dashboard-mock";
import {
  AgentBridgeDiagram,
  AgentToolTable,
} from "@/components/mockups/agent-bridge-diagram";
import { CodeEditorMock } from "@/components/mockups/code-editor-mock";
import { FeatureStage } from "@/components/mockups/feature-stage";
import { GmApiGrid } from "@/components/mockups/gm-api-grid";
import { InstallFlowMock } from "@/components/mockups/install-flow-mock";
import { PermissionTable } from "@/components/mockups/permission-table";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { useLocale } from "@/lib/i18n";
import { LocaleLink } from "@/components/site/locale-link";
import { translate } from "@/lib/i18n/translate";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { LINKS, siteOrigin } from "@/lib/site";
import {
  getLocale,
  isExternalHref,
  localePath,
  PRIVACY_PATHS,
  SITE_ROUTES,
  type Locale,
} from "@/lib/site-manifest";
import { cn } from "@/lib/utils";

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, "/userscripts"),
    title: translate(locale, "seo.userscripts.title"),
    description: translate(locale, "seo.userscripts.description"),
  });
}

function ApiCodeCard() {
  const { t } = useTranslation();
  const lines = t("userscripts.apis.code", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="overflow-hidden rounded-panel border border-border bg-card shadow-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <Code2 className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold text-foreground">
          {t("userscripts.apis.codeTitle")}
        </span>
      </div>
      <pre className="scrollbar-lumo overflow-x-auto bg-code-bg p-4 font-mono text-[11px] leading-6 text-foreground">
        <code>
          {lines.map((line, index) => (
            <div key={index} className="flex gap-3">
              <span className="w-4 shrink-0 select-none text-right text-muted-foreground/60">
                {index + 1}
              </span>
              <span
                className={cn(
                  line.trimStart().startsWith("//")
                    ? "text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {line}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function InstallStepCard({
  index,
  title,
  detail,
  action,
  href,
  icon,
}: {
  index: number;
  title: string;
  detail: string;
  action: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-card border border-border bg-card p-5 shadow-surface">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-muted/50 text-primary">
          {icon}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          0{index + 1}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
      {isExternalHref(href) ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          {action}
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </a>
      ) : (
        <LocaleLink
          to={href}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          {action}
          <ArrowRight className="h-3.5 w-3.5" />
        </LocaleLink>
      )}
    </div>
  );
}

const POLICY_ICONS = [ShieldCheck, KeyRound, Plus];

export default function UserscriptsPage() {
  const { t } = useTranslation();
  const locale = useLocale() as Locale;

  const anchors = [
    { id: "overview", label: t("userscripts.anchors.overview") },
    { id: "agent", label: t("userscripts.anchors.agent") },
    { id: "install", label: t("userscripts.anchors.install") },
    { id: "editor", label: t("userscripts.anchors.editor") },
    { id: "runtime", label: t("userscripts.anchors.runtime") },
    { id: "control", label: t("userscripts.anchors.control") },
  ];

  const controlFeatures = t("userscripts.control.features", {
    returnObjects: true,
  }) as { title: string; detail: string }[];
  const policy = t("userscripts.agent.policy.items", {
    returnObjects: true,
  }) as { title: string; detail: string }[];
  const runtimeFacts = t("userscripts.runtime.facts", {
    returnObjects: true,
  }) as { label: string; value: string }[];
  const installSteps = t("userscripts.installPage.steps", {
    returnObjects: true,
  }) as { title: string; detail: string; action: string }[];
  const stepLinks = [
    LINKS.userscriptsReleases,
    `${SITE_ROUTES.docs}/getting-started`,
    `${SITE_ROUTES.docs}/getting-started`,
  ];
  const stepIcons = [
    <Download key="download" className="h-4 w-4" />,
    <GithubIcon key="github" className="h-4 w-4" />,
    <Globe key="chrome" className="h-4 w-4" />,
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
          href: LINKS.userscriptsReleases,
          icon: <GithubIcon className="h-4 w-4" />,
        }}
        secondary={{
          label: t("userscripts.hero.secondary"),
          href: `${SITE_ROUTES.docs}/agent-connections`,
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
          ctaHref={`${SITE_ROUTES.docs}/agent-connections`}
          visual={<AgentAccessMock />}
        />

        <section className="container-page">
          <SectionHeading
            eyebrow={t("userscripts.agent.protocolEyebrow")}
            title={t("userscripts.agent.policy.title")}
            description={t("userscripts.agent.policy.description")}
          />
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <AgentBridgeDiagram className="h-fit" />
            <div className="flex min-w-0 flex-col gap-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {policy.map((item, index) => {
                  const Icon = POLICY_ICONS[index] ?? ShieldCheck;
                  return (
                    <Reveal key={item.title} delay={index * 0.05}>
                      <div className="flex h-full items-start gap-2.5 rounded-card border border-border bg-card p-3 shadow-surface">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-border bg-muted/50 text-primary">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[13px] font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <AgentToolTable />
            </div>
          </div>
        </section>

        <div id="install" className="scroll-mt-24">
          <FeatureStage
            tone="userscripts"
            eyebrow={t("userscripts.install.eyebrow")}
            title={t("userscripts.install.title")}
            description={t("userscripts.install.description")}
            bullets={
              t("userscripts.install.bullets", {
                returnObjects: true,
              }) as string[]
            }
            ctaLabel={t("common.readDocs")}
            ctaHref={`${SITE_ROUTES.docs}/getting-started`}
            visual={
              <TiltCard>
                <InstallFlowMock className="mx-auto max-w-sm" />
              </TiltCard>
            }
          />
        </div>

        <FeatureStage
          id="editor"
          tone="userscripts"
          reverse
          eyebrow={t("userscripts.editor.eyebrow")}
          title={t("userscripts.editor.title")}
          description={t("userscripts.editor.description")}
          bullets={
            t("userscripts.editor.bullets", {
              returnObjects: true,
            }) as string[]
          }
          ctaLabel={t("common.readDocs")}
          ctaHref={`${SITE_ROUTES.docs}/userscripts-runtime`}
          visual={
            <TiltCard>
              <CodeEditorMock />
            </TiltCard>
          }
        />

        <section id="runtime" className="container-page scroll-mt-24">
          <SectionHeading
            eyebrow={t("userscripts.runtime.eyebrow")}
            title={t("userscripts.runtime.title")}
            description={t("userscripts.runtime.description")}
          />
          <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {runtimeFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex min-w-0 flex-col gap-1 rounded-card border border-border bg-card px-3 py-2.5 shadow-surface"
              >
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {fact.label}
                </span>
                <span className="truncate font-mono text-[11px] text-foreground">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <GmApiGrid />
            <ApiCodeCard />
          </div>
        </section>

        <section id="control" className="container-page scroll-mt-24">
          <SectionHeading
            eyebrow={t("userscripts.control.eyebrow")}
            title={t("userscripts.control.title")}
            description={t("userscripts.control.description")}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <PermissionTable />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {controlFeatures.map((feature) => (
                <Reveal key={feature.title}>
                  <div className="flex h-full flex-col gap-1.5 rounded-card border border-border bg-card p-4 shadow-surface">
                    <div className="flex items-center gap-2">
                      <Braces className="h-3.5 w-3.5 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {feature.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow={t("userscripts.installPage.eyebrow")}
          title={t("userscripts.installPage.title")}
          description={t("userscripts.installPage.description")}
        />
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
          {installSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <InstallStepCard
                index={index}
                title={step.title}
                detail={step.detail}
                action={step.action}
                href={stepLinks[index] ?? LINKS.userscriptsReleases}
                icon={stepIcons[index]}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Globe className="h-4 w-4 text-success" />
            {t("userscripts.installPage.requirement")}
          </span>
          <LocaleLink
            to={PRIVACY_PATHS.userscripts}
            className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
          >
            {t("common.privacy")}
            <ArrowRight className="h-3.5 w-3.5" />
          </LocaleLink>
        </div>
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
