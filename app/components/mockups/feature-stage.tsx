import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import { Eyebrow } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function FeatureStage({
  id,
  tone = "neutral",
  eyebrow,
  title,
  description,
  bullets,
  ctaLabel,
  ctaHref,
  visual,
  reverse = false,
}: {
  id?: string;
  tone?: "lumo" | "userscripts" | "neutral";
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel?: string;
  ctaHref?: string;
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="container-page scroll-mt-24">
      <Reveal>
        <div
          className={cn(
            "stage relative grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-14",
            tone === "lumo" && "stage-lumo",
            tone === "userscripts" && "stage-userscripts",
            tone === "neutral" && "stage-neutral",
          )}
        >
          <div className="stage-grid" aria-hidden="true" />
          <div
            className={cn(
              "relative z-10 flex flex-col items-start gap-5",
              reverse && "lg:order-2",
            )}
          >
            <Eyebrow tone={tone === "neutral" ? "default" : tone}>{eyebrow}</Eyebrow>
            <h2 className="max-w-[18ch] text-balance text-display-sm font-semibold text-foreground">
              {title}
            </h2>
            <p className="max-w-[54ch] text-pretty text-base leading-7 text-muted-foreground">
              {description}
            </p>
            <ul className="mt-1 flex flex-col gap-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-6">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-foreground/85">{bullet}</span>
                </li>
              ))}
            </ul>
            {ctaLabel && ctaHref ? (
              <Link
                to={ctaHref}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          <div
            className={cn(
              "relative z-10 min-w-0",
              reverse && "lg:order-1",
            )}
          >
            {visual}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
