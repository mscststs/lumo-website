import { useState, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LocaleLink } from "./locale-link";

/**
 * The home product switcher.
 *
 * The lineup (two cards side by side) and the capability stages below it said
 * the same thing twice, so the page opens one product at a time: identity, one
 * headline, the capability list and the entry action live in the same stage.
 *
 * The control follows Apple's segmented switches: a quiet muted track, a single
 * raised capsule that glides between labels on a spring, and copy that changes
 * under it rather than beside it. The capsule is one `layoutId`, so it is
 * physically the same object moving — not two highlights cross-fading.
 *
 * Both panels stay in the pre-rendered HTML (`forceMount`) so the static
 * document keeps the full product copy; the inactive one is hidden with
 * `data-[state=inactive]:hidden`, which also removes it from the accessibility
 * tree and the tab order.
 *
 * Motion follows the four laws: only opacity and transform animate, the panel
 * swap uses the emphasis curve, and `prefers-reduced-motion` drops both.
 */

export type ProductTone = "lumo" | "userscripts";

export interface ProductTabItem {
  tone: ProductTone;
  name: string;
  tagline: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  href: string;
  visual: ReactNode;
}

const STAGE_TONE: Record<ProductTone, string> = {
  lumo: "stage-lumo",
  userscripts: "stage-userscripts",
};

const SPRING = { type: "spring", stiffness: 520, damping: 42, mass: 0.6 } as const;

export function ProductTabs({
  items,
  className,
}: {
  items: ProductTabItem[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<ProductTone>(items[0]?.tone ?? "lumo");

  return (
    <Tabs
      value={active}
      onValueChange={(next) => setActive(next as ProductTone)}
      className={cn("flex flex-col", className)}
    >
      <TabsList className="self-center gap-1 rounded-full border-transparent bg-muted/70 p-1.5">
        {items.map((item) => (
          <TabsTrigger
            key={item.tone}
            value={item.tone}
            className="relative h-10 rounded-full px-4 text-sm font-medium text-muted-foreground transition-[color,transform] duration-150 hover:text-foreground focus-visible:bg-accent/60 focus-visible:text-foreground focus-visible:outline-none active:scale-[0.98] data-[state=active]:text-foreground sm:h-11 sm:px-5"
          >
            {active === item.tone ? (
              <motion.span
                layoutId="product-tab-capsule"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-card shadow-card"
                transition={reduce ? { duration: 0 } : SPRING}
              />
            ) : null}
            <span className="relative flex min-w-0 items-center gap-2">
              <BrandMark variant={item.tone} className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.name}</span>
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent
          key={item.tone}
          value={item.tone}
          forceMount
          className="tab-panel mt-6 outline-none data-[state=inactive]:hidden sm:mt-8"
        >
          <article
            className={cn("stage relative", STAGE_TONE[item.tone])}
            aria-label={item.name}
          >
            <div className="stage-grid" aria-hidden="true" />
            <div className="relative z-10 grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12 lg:p-12">
              <div className="flex min-w-0 flex-col items-start gap-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-border bg-card/80 shadow-card">
                    <BrandMark variant={item.tone} className="h-7 w-7" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <h3 className="max-w-[18ch] text-balance text-display-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="max-w-[54ch] text-pretty text-base leading-7 text-muted-foreground">
                  {item.description}
                </p>

                <ul className="flex flex-col gap-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm leading-6">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-foreground/85">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="lg" className="mt-1">
                  <LocaleLink to={item.href}>
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </LocaleLink>
                </Button>
              </div>

              <div className="flex min-w-0 items-center justify-center lg:min-h-[27rem]">
                {item.visual}
              </div>
            </div>
          </article>
        </TabsContent>
      ))}
    </Tabs>
  );
}
