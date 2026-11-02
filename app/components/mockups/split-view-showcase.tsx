import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  Globe,
  History,
  PanelLeft,
  Plus,
  Send,
  Settings,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

/**
 * The split-view surface, interactive.
 *
 * Lumo shows one to three independent chat panels once the side panel is wide
 * enough (`MIN_PANEL_WIDTH = 360`, three panes at 1150px). Each panel owns its
 * conversation, model selection and tool calls, and the dividers are draggable.
 * The demo exposes the same three states instead of asserting the capability in
 * a sentence.
 *
 * The pane bodies are decorative; the count selector is a real radio group, so
 * keyboard users can inspect all three layouts.
 */

type PaneCount = 1 | 2 | 3;

interface Pane {
  model: string;
  prompt: string;
  answer: string;
  tool: string;
  result: string;
  tool2: string;
  result2: string;
}

function PaneHeader({ model, index, last }: { model: string; index: number; last: boolean }) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-1 border-b border-border px-2 py-1.5">
      <span className="flex h-6 min-w-0 items-center gap-1 rounded-md px-1 text-[10px] font-medium text-foreground">
        {index === 0 ? (
          <PanelLeft className="h-3 w-3 shrink-0 text-muted-foreground" />
        ) : null}
        <Sparkles className="h-3 w-3 shrink-0 text-primary" />
        <span className="truncate">{model}</span>
        <ChevronDown className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
      </span>
      <span className="flex shrink-0 items-center gap-0.5 text-muted-foreground">
        <Plus className="h-3 w-3" />
        <History className="h-3 w-3" />
        {last ? <Settings className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </span>
    </header>
  );
}

function PaneBody({ pane, dense }: { pane: Pane; dense: boolean }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-2 py-2">
        {dense ? null : (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2 py-1 text-[9px] text-muted-foreground">
            <Globe className="h-2.5 w-2.5" />
            {t("mockUi.pageContext")} · {t("mockUi.pageContextDetail")}
          </span>
        )}
        <div className="ml-auto max-w-[88%] rounded-2xl bg-chat-user px-2 py-1.5 text-[10px] leading-4 text-chat-user-foreground">
          {pane.prompt}
        </div>
        <p className="text-[10px] leading-4 text-foreground">{pane.answer}</p>
        <div className="flex min-w-0 items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-2 py-1.5">
          <Wrench className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
          <code className="shrink-0 font-mono text-[9px] text-foreground">
            {pane.tool}
          </code>
          <span className="min-w-0 flex-1 truncate text-[9px] text-muted-foreground">
            {pane.result}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-success" />
        </div>
        {dense ? null : (
          <>
            <div className="flex min-w-0 items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-2 py-1.5">
              <Wrench className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
              <code className="shrink-0 font-mono text-[9px] text-foreground">
                {pane.tool2}
              </code>
              <span className="min-w-0 flex-1 truncate text-[9px] text-muted-foreground">
                {pane.result2}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-success" />
            </div>
            <p className="text-[9px] leading-4 text-muted-foreground">
              {t("lumo.split.paneHint")}
            </p>
          </>
        )}
      </div>
      <div className="shrink-0 border-t border-border p-1.5">
        <div className="flex items-center justify-between gap-1 rounded-lg border-2 border-border bg-muted/50 px-2 py-1">
          <span className="truncate text-[9px] text-muted-foreground/70">
            {t("mockUi.placeholder")}
          </span>
          <Send className="h-2.5 w-2.5 shrink-0 text-muted-foreground/40" />
        </div>
      </div>
    </>
  );
}

export function SplitViewShowcase({ className }: { className?: string }) {
  const { t } = useTranslation();
  const [count, setCount] = useState<PaneCount>(1);
  const panes = t("lumo.split.panes", { returnObjects: true }) as Pane[];
  const counts: PaneCount[] = [1, 2, 3];
  const labels: Record<PaneCount, string> = {
    1: t("lumo.split.one"),
    2: t("lumo.split.two"),
    3: t("lumo.split.three"),
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-panel border border-border bg-card shadow-float",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <BrandMark variant="lumo" className="h-5 w-5" />
          <span className="text-[11px] font-semibold text-foreground">Lumo</span>
          <span className="hidden text-[10px] text-muted-foreground sm:inline">
            {t("lumo.split.hint")}
          </span>
        </div>
        <div
          role="radiogroup"
          aria-label={t("lumo.split.title")}
          className="inline-flex shrink-0 items-center gap-0.5 rounded-control border border-border bg-muted p-0.5"
        >
          {counts.map((value) => {
            const active = value === count;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setCount(value)}
                className={cn(
                  "h-6 rounded-[0.3rem] px-2 text-[10px] font-medium transition-colors",
                  active
                    ? "border border-border/60 bg-card text-foreground shadow-surface"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {labels[value]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "flex gap-px bg-border p-px",
          count === 1 ? "flex-col" : "flex-col md:flex-row",
        )}
      >
        {panes.slice(0, count).map((pane, index) => (
          <div
            key={pane.model + index}
            className="flex min-h-[10.5rem] min-w-0 flex-1 flex-col bg-background md:min-h-[17rem]"
          >
            <PaneHeader model={pane.model} index={index} last={index === count - 1} />
            <PaneBody pane={pane} dense={count > 1} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="inline-flex min-w-0 items-center gap-1.5">
          <PanelLeft className="h-3 w-3 shrink-0" />
          <span className="truncate">{t("lumo.split.requirement")}</span>
        </span>
        {count > 1 ? (
          <span className="hidden shrink-0 font-mono sm:inline">
            {t("lumo.split.dividers")}
          </span>
        ) : null}
      </div>
    </div>
  );
}
