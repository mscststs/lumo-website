import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

export type PosterTone = "lumo" | "userscripts";

/**
 * The one frame every poster shares.
 *
 * Posters are fixed 1280 × 800 documents, not responsive pages. The outer
 * scaler only changes their physical size; everything inside is authored in
 * pixels, so a line break or a padding change can never be caused by the
 * viewport. The `dark` scope is intentional: a poster is an artifact, and the
 * product interface inside it must look the same regardless of the visitor's
 * site theme.
 */
export function PosterShell({
  tone,
  variant = "gradient",
  children,
  className,
  contentClassName,
}: {
  tone: PosterTone;
  variant?: "gradient" | "solid";
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const { t } = useTranslation();
  const surface =
    variant === "solid"
      ? "poster-surface-solid"
      : tone === "lumo"
        ? "poster-surface-lumo"
        : "poster-surface-userscripts";
  const accent = tone === "lumo" ? "bg-brand-cyan" : "bg-brand-emerald";
  const productName = t(
    tone === "lumo" ? "lumo.productName" : "userscripts.productName",
  );
  const tagline = t(
    tone === "lumo" ? "posters.lumo.tagline" : "posters.userscripts.tagline",
  );

  return (
    <div
      data-poster={tone}
      className={cn(
        "dark relative h-[800px] w-[1280px] overflow-hidden bg-background text-foreground",
        className,
      )}
    >
      <div className={cn("absolute inset-0", surface)} />
      <div className="poster-grid absolute inset-0" aria-hidden="true" />
      <div className="poster-halo absolute -right-52 -top-56" aria-hidden="true" />

      <div className="relative flex h-full w-full flex-col px-[56px] py-[42px]">
        <header className="flex shrink-0 items-center gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <BrandMark
              variant={tone}
              className="h-10 w-10 rounded-[9px] border border-border/50 bg-card/50 p-1"
            />
            <span className="truncate text-[20px] font-semibold tracking-[-0.03em]">
              {productName}
            </span>
          </div>
        </header>

        <div
          data-poster-content
          className={cn("relative min-h-0 flex-1", contentClassName)}
        >
          {children}
        </div>

        <footer className="flex shrink-0 items-center gap-6 border-t border-border/55 pt-4">
          <span className="flex min-w-0 items-center gap-2 text-[12px] text-muted-foreground">
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", accent)} />
            <span className="truncate">{tagline}</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

export function PosterHeading({
  eyebrow,
  title,
  description,
  className,
  titleSize = 58,
  titleClassName,
  descriptionClassName,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  titleSize?: number;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 whitespace-pre-line font-semibold tracking-[-0.045em] text-foreground",
          titleClassName,
        )}
        style={{ fontSize: titleSize, lineHeight: 1.02 }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 whitespace-pre-line text-[16px] leading-[1.65] text-muted-foreground",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PosterChips({
  items,
  tone,
  className,
}: {
  items: readonly string[];
  tone: PosterTone;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex h-8 items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 text-[11px] text-foreground/80"
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              tone === "lumo" ? "bg-brand-cyan" : "bg-brand-emerald",
            )}
          />
          <span className="whitespace-nowrap">{item}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * The fake document behind the Lumo side panel. It reuses the home hero copy so
 * the poster and the marketing page describe the same product, not two
 * different ones.
 */
export function PosterDocument() {
  const { t } = useTranslation();
  const stats = [
    { label: t("home.hero.mock.statOne"), value: "MCP" },
    { label: t("home.hero.mock.statTwo"), value: "∞" },
    { label: t("home.hero.mock.statThree"), value: "BYOK" },
  ];

  return (
    <div className="flex h-full min-w-0 flex-col gap-3 overflow-hidden p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">
          {t("home.hero.mock.productNotes")}
        </span>
        <span className="truncate text-[9px] text-muted-foreground">
          {t("home.hero.mock.updatedToday")}
        </span>
      </div>
      <h3 className="line-clamp-2 text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground">
        {t("home.hero.mock.docTitle")}
      </h3>
      <p className="line-clamp-3 text-[11px] leading-[1.7] text-muted-foreground">
        {t("home.hero.mock.docBody")}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="min-w-0 rounded-md border border-border/70 bg-muted/30 px-2 py-1.5"
          >
            <p className="text-[13px] font-semibold text-foreground">
              {stat.value}
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-1 flex flex-col gap-2">
        <div className="h-1.5 w-full rounded-full bg-muted" />
        <div className="h-1.5 w-[92%] rounded-full bg-muted" />
        <div className="h-1.5 w-[78%] rounded-full bg-muted" />
        <div className="h-1.5 w-[86%] rounded-full bg-muted/70" />
      </div>
      <blockquote className="mt-auto border-l-2 border-primary/60 pl-3 text-[10px] leading-4 text-muted-foreground">
        {t("home.hero.mock.docQuote")}
      </blockquote>
    </div>
  );
}

/** A compact status pill used by the diagram-style posters. */
export function PosterStatus({
  label,
  tone = "success",
}: {
  label: string;
  tone?: "success" | "primary" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2 text-[10px] font-medium",
        tone === "success" && "border-success/25 bg-success/10 text-success",
        tone === "primary" && "border-primary/25 bg-primary/10 text-primary",
        tone === "muted" && "border-border/60 bg-muted/40 text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "success" && "bg-success",
          tone === "primary" && "bg-primary",
          tone === "muted" && "bg-muted-foreground",
        )}
      />
      {label}
    </span>
  );
}
