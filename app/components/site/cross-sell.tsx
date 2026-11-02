import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function CrossSell({
  tone,
  eyebrow,
  title,
  description,
  cta,
  href,
}: {
  tone: "lumo" | "userscripts";
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="container-page">
      <Reveal>
        <div
          className={cn(
            "stage relative overflow-hidden p-6 sm:p-10 lg:p-12",
            tone === "lumo" ? "stage-lumo" : "stage-userscripts",
          )}
        >
          <div className="stage-grid" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card border border-border bg-card/80 shadow-card">
                <BrandMark variant={tone} className="h-8 w-8" />
              </span>
              <div className="flex min-w-0 flex-col gap-1.5">
                <p className="text-eyebrow font-semibold uppercase text-muted-foreground">
                  {eyebrow}
                </p>
                <h2 className="text-balance text-xl font-semibold text-foreground sm:text-2xl">
                  {title}
                </h2>
                <p className="max-w-[54ch] text-pretty text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="lg" className="shrink-0">
              <Link to={href}>
                {cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
