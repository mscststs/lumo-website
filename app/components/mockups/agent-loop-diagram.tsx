import { useTranslation } from "react-i18next";
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Check,
  CircleStop,
  Gauge,
  RotateCcw,
  Sparkles,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The agent loop as a physical circuit.
 *
 * One assistant turn is one lap: the model reads the goal, picks tools, the
 * harness executes them, results are appended, and the next step starts from a
 * larger context. The diagram names the four points where Lumo differs from a
 * one-shot chat call — the uncapped step budget, the visible tool surface, the
 * stop control, and compaction before the window overflows.
 */
export function AgentLoopDiagram({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-panel border border-border bg-card shadow-float",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-border bg-muted/50 text-primary">
            <RotateCcw className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-foreground">
              {t("lumo.agent.loop.title")}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              {t("lumo.agent.loop.subtitle")}
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-success/25 bg-success/10 px-2 py-1 text-[10px] font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {t("lumo.agent.loop.live")}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        {[
          {
            icon: Sparkles,
            label: t("lumo.agent.loop.steps.goal.title"),
            detail: t("lumo.agent.loop.steps.goal.detail"),
            tone: "primary",
          },
          {
            icon: Braces,
            label: t("lumo.agent.loop.steps.reason.title"),
            detail: t("lumo.agent.loop.steps.reason.detail"),
            tone: "primary",
          },
          {
            icon: Wrench,
            label: t("lumo.agent.loop.steps.tools.title"),
            detail: t("lumo.agent.loop.steps.tools.detail"),
            tone: "violet",
          },
          {
            icon: Check,
            label: t("lumo.agent.loop.steps.result.title"),
            detail: t("lumo.agent.loop.steps.result.detail"),
            tone: "success",
          },
        ].map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5 rounded-control border border-border bg-muted/25 px-2.5 py-2">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                    step.tone === "violet"
                      ? "border-brand-violet/25 bg-brand-violet/10 text-brand-violet"
                      : step.tone === "success"
                        ? "border-success/25 bg-success/10 text-success"
                        : "border-primary/25 bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="h-3 w-3" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-foreground">
                    {step.label}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[9px] text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              {index < 3 ? (
                <span className="flex items-center justify-center text-border">
                  <ArrowDown className="h-3 w-3" />
                </span>
              ) : null}
            </div>
          );
        })}

        <div className="mt-1 flex items-center justify-between gap-2 rounded-control border border-primary/25 bg-primary/[0.06] px-2.5 py-2">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-foreground">
            <RotateCcw className="h-3 w-3 shrink-0 text-primary" />
            <span className="truncate">{t("lumo.agent.loop.repeat")}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
            {t("lumo.agent.loop.stepCounter")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
        {[
          { icon: Gauge, label: t("lumo.agent.loop.facts.steps") },
          { icon: CircleStop, label: t("lumo.agent.loop.facts.stop") },
          { icon: ArrowRight, label: t("lumo.agent.loop.facts.context") },
          { icon: RotateCcw, label: t("lumo.agent.loop.facts.compaction") },
        ].map((fact) => (
          <div
            key={fact.label}
            className="flex min-w-0 flex-col gap-1 bg-card px-3 py-2.5"
          >
            <fact.icon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] leading-4 text-muted-foreground">
              {fact.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
