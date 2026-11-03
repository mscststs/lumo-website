import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { isExternalHref } from "@/lib/site-manifest";
import { cn } from "@/lib/utils";
import { LocaleLink } from "./locale-link";

export type ProductHeroCta = {
  label: string;
  href: string;
  icon?: ReactNode;
};

/**
 * The product-page hero: one claim, one supporting line, two actions, one stage.
 *
 * Both product pages share this component so the eyebrow, headline rhythm,
 * action row and stage width stay identical across Lumo and Userscripts.
 * The headline carries its own line breaks (`\n` in the copy): Chinese breaks
 * inside a phrase when the browser is left to choose, so the split has to be
 * authored rather than balanced.
 */
export function ProductHero({
  variant,
  eyebrow,
  title,
  summary,
  primary,
  secondary,
  visual,
}: {
  variant: "lumo" | "userscripts";
  eyebrow: string;
  title: string;
  summary: string;
  primary: ProductHeroCta;
  secondary: ProductHeroCta;
  visual: ReactNode;
}) {
  const locale = useLocale();
  const isZh = locale === "zh";
  const titleLines = title.split("\n").filter(Boolean);

  return (
    <section
      id="overview"
      className="relative scroll-mt-24 overflow-hidden pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16"
    >
      <Aurora tone={variant} />
      <div className="container-page relative grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14 xl:gap-16">
        <Reveal className="flex min-w-0 flex-col items-start">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-border bg-card/80 shadow-card">
              <BrandMark variant={variant} className="h-6 w-6" />
            </span>
            <p className="min-w-0 text-eyebrow font-semibold uppercase text-muted-foreground">
              {eyebrow}
            </p>
          </div>

          <h1
            className={cn(
              "mt-5 flex flex-col text-display-lg font-semibold text-foreground",
              // Negative tracking is for Latin display type only — Chinese
              // glyphs already sit tight without it.
              !isZh && "tracking-[-0.045em]",
            )}
          >
            {titleLines.map((line, index) => (
              <span key={`${index}-${line}`} className="block">
                {line}
                {isZh || index === titleLines.length - 1 ? null : " "}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-[44ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {summary}
          </p>

          <div className="mt-7 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <HeroCta cta={primary} tone="primary" />
            <HeroCta cta={secondary} tone="secondary" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative min-w-0">
          <TiltCard>{visual}</TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

function HeroCta({
  cta,
  tone,
}: {
  cta: ProductHeroCta;
  tone: "primary" | "secondary";
}) {
  const external = isExternalHref(cta.href);
  const className = "w-full sm:w-auto";
  const variant = tone === "primary" ? "default" : "outline";

  if (external) {
    return (
      <Button asChild size="lg" variant={variant} className={className}>
        <a href={cta.href} target="_blank" rel="noreferrer noopener">
          {cta.icon}
          {cta.label}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild size="lg" variant={variant} className={className}>
      <LocaleLink to={cta.href}>
        {cta.icon}
        {cta.label}
        <ArrowRight className="h-4 w-4" />
      </LocaleLink>
    </Button>
  );
}
