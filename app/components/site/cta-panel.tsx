import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { LocaleLink } from "./locale-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Action {
  label: string;
  href: string;
  external?: boolean;
}

export function CtaPanel({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  tone = "neutral",
  footnote,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: Action;
  secondary?: Action;
  tone?: "lumo" | "userscripts" | "neutral";
  footnote?: ReactNode;
}) {
  return (
    <section className="container-page">
      <Reveal>
        <div
          className={cn(
            "stage relative overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-20",
            tone === "lumo" && "stage-lumo",
            tone === "userscripts" && "stage-userscripts",
            tone === "neutral" && "stage-neutral",
          )}
        >
          <Aurora tone={tone} />
          <div className="stage-grid" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
            {eyebrow ? (
              <p className="text-eyebrow font-semibold uppercase text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-balance text-display-md font-semibold text-foreground">
              {title}
            </h2>
            <p className="max-w-[52ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>
            <div className="mt-2 flex flex-col items-center gap-2.5 sm:flex-row">
              {primary.external ? (
                <Button asChild size="lg">
                  <a href={primary.href} target="_blank" rel="noreferrer noopener">
                    {primary.label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <LocaleLink to={primary.href}>
                    {primary.label}
                    <ArrowRight className="h-4 w-4" />
                  </LocaleLink>
                </Button>
              )}
              {secondary ? (
                secondary.external ? (
                  <Button asChild variant="outline" size="lg">
                    <a
                      href={secondary.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {secondary.label}
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline" size="lg">
                    <LocaleLink to={secondary.href}>{secondary.label}</LocaleLink>
                  </Button>
                )
              ) : null}
            </div>
            {footnote ? (
              <p className="text-xs text-muted-foreground">{footnote}</p>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
