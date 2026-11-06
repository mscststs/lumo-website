import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Braces,
  Check,
  CircleStop,
  Gauge,
  RotateCcw,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PosterHeading,
  PosterShell,
  PosterStatus,
} from "./poster-parts";
import { cn } from "@/lib/utils";

const STAGE_ICONS: LucideIcon[] = [Sparkles, Braces, Wrench, Check];

export function LumoPosterLoop() {
  const { t } = useTranslation();
  const stages = [
    {
      title: t("lumo.agent.loop.steps.goal.title"),
      detail: t("lumo.agent.loop.steps.goal.detail"),
    },
    {
      title: t("lumo.agent.loop.steps.reason.title"),
      detail: t("lumo.agent.loop.steps.reason.detail"),
    },
    {
      title: t("lumo.agent.loop.steps.tools.title"),
      detail: t("lumo.agent.loop.steps.tools.detail"),
    },
    {
      title: t("lumo.agent.loop.steps.result.title"),
      detail: t("lumo.agent.loop.steps.result.detail"),
    },
  ];
  const facts = [
    { icon: Gauge, label: t("lumo.agent.loop.facts.steps") },
    { icon: CircleStop, label: t("lumo.agent.loop.facts.stop") },
    { icon: ArrowRight, label: t("lumo.agent.loop.facts.context") },
    { icon: RotateCcw, label: t("lumo.agent.loop.facts.compaction") },
  ];

  return (
    <PosterShell tone="lumo">
      <div className="flex h-full flex-col pt-6">
        <div className="flex items-end justify-between gap-10">
          <PosterHeading
            eyebrow={t("posters.lumo.items.loop.eyebrow")}
            title={t("posters.lumo.items.loop.title")}
            description={t("posters.lumo.items.loop.subtitle")}
            className="max-w-[650px]"
            titleSize={56}
            descriptionClassName="max-w-[570px]"
          />
          <div className="flex w-[330px] shrink-0 flex-col gap-3 rounded-[18px] border border-border/60 bg-card/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-semibold text-foreground">
                {t("lumo.agent.loop.title")}
              </span>
              <PosterStatus label={t("lumo.agent.loop.live")} />
            </div>
            <p className="truncate text-[10px] text-muted-foreground">
              {t("lumo.agent.loop.subtitle")}
            </p>
            <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-2.5">
              <code className="font-mono text-[10px] text-muted-foreground">
                {t("lumo.agent.loop.stepCounter")}
              </code>
              <RotateCcw className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-1 flex-col justify-center">
          <div className="flex items-stretch gap-2.5">
            {stages.map((stage, stageIndex) => {
              const Icon = STAGE_ICONS[stageIndex] ?? Sparkles;
              const tone =
                stageIndex === 2
                  ? "border-brand-violet/25 bg-brand-violet/10 text-brand-violet"
                  : stageIndex === 3
                    ? "border-success/25 bg-success/10 text-success"
                    : "border-primary/25 bg-primary/10 text-primary";

              return (
                <div key={stage.title} className="flex min-w-0 flex-1 items-stretch gap-2.5">
                  <div className="flex min-w-0 flex-1 flex-col rounded-[18px] border border-border/60 bg-card/60 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                          tone,
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground/60">
                        0{stageIndex + 1}
                      </span>
                    </div>
                    <p className="mt-4 line-clamp-2 text-[14px] font-semibold leading-[1.3] text-foreground">
                      {stage.title}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.5] text-muted-foreground">
                      {stage.detail}
                    </p>
                  </div>
                  {stageIndex < stages.length - 1 ? (
                    <span className="flex w-5 shrink-0 items-center justify-center text-border">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 rounded-[16px] border border-primary/25 bg-primary/[0.06] px-4 py-3">
            <span className="inline-flex min-w-0 items-center gap-2 text-[12px] font-medium text-foreground">
              <RotateCcw className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">{t("lumo.agent.loop.repeat")}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
              {t("lumo.agent.loop.stepCounter")}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex min-w-0 items-center gap-2 rounded-[14px] border border-border/55 bg-card/45 px-3 py-2.5"
              >
                <fact.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="line-clamp-2 text-[10px] leading-[1.4] text-muted-foreground">
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PosterShell>
  );
}
