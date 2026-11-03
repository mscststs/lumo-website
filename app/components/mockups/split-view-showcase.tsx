import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Columns2,
  Columns3,
  Globe,
  History,
  ImagePlus,
  Loader2,
  PanelLeft,
  Plus,
  Send,
  Settings,
  Square,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { BrandMark } from "@/components/brand/brand-mark";
import { ContextRing } from "@/components/mockups/context-ring";
import { MockScaler } from "@/components/mockups/mock-scaler";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

/**
 * Split view, as the product actually draws it.
 *
 * The pane is a verbatim reconstruction of `components/chat/ChatPanel.tsx` in
 * the Lumo extension: a 48px header (split button on the left edge, borderless
 * model select, then 28px ghost actions), a transcript of attachment card →
 * right-aligned `rounded-2xl` bubble → tool rows → answer, and a `rounded-xl`
 * composer with a double border, an 18px context ring and a send/stop button.
 * Pane identity follows the product's roles too: the split button only exists on
 * the leftmost pane while the layout can still grow, the rightmost pane owns
 * Settings, every other pane owns Close.
 *
 * ## Why a fixed canvas
 *
 * Three panes are three ~360px columns — the product's `MIN_PANEL_WIDTH`. A
 * fluid mock would either squeeze them into unreadable slivers on a phone or
 * stack them, and stacking invents a layout the feature does not have. So the
 * canvas is authored at 1120 × 544 and scaled as a whole (`MockScaler`), which
 * keeps the pane proportions identical at every viewport.
 *
 * ## Why the dividers really drag
 *
 * "Drag the dividers to resize" is a claim; a divider that moves is evidence.
 * Pointer capture keeps the gesture alive wherever the pointer goes, and the
 * pixel delta is divided by the *scaled* canvas width, so the same drag feels
 * identical at 1440px and at 360px. Panes clamp at `MIN_PANE_WIDTH`, which is
 * the same rule that decides how many panes fit.
 *
 * The canvas is decorative (`aria-hidden`): the count switch above it is the
 * accessible control, and the prose around the stage carries the meaning.
 */

const DESIGN_WIDTH = 1120;
const DESIGN_HEIGHT = 544;
/** The 8px column that separates two panes, as in the product. */
const DIVIDER_WIDTH = 8;
/** Narrower than this and the pane is no longer usable — the product's floor. */
const MIN_PANE_WIDTH = 360;
/** Product duration for a pane-count change; drags are instant. */
const WIDTH_TRANSITION = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };

type PaneCount = 1 | 2 | 3;
const PANE_COUNTS: PaneCount[] = [1, 2, 3];

interface SplitTool {
  name: string;
  summary: string;
}

interface SplitPane {
  model: string;
  context: string;
  contextDetail: string;
  prompt: string;
  /** `null` means the turn is still running. */
  answer: string | null;
  tools: SplitTool[];
  snapshot?: {
    plan: string;
    sso: string;
    rows: { name: string; sso: boolean }[];
  };
}

interface PaneMeta {
  usage: number;
  expandedTool: number;
}

/**
 * Per-pane chrome that is presentation, not copy: context-window occupancy and
 * which tool row is expanded. Indexed by pane, so it stays out of the locale
 * resources — a number is not a translation.
 */
const PANE_META: PaneMeta[] = [
  { usage: 32, expandedTool: 1 },
  { usage: 61, expandedTool: -1 },
  { usage: 44, expandedTool: -1 },
];

const DEFAULT_PANE_META: PaneMeta = { usage: 32, expandedTool: -1 };

function HeaderAction({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground">
      {children}
    </span>
  );
}

function PaneHeader({
  model,
  showSplit,
  showSettings,
}: {
  model: string;
  showSplit: boolean;
  showSettings: boolean;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
      <div className="flex min-w-0 items-center">
        {showSplit ? (
          <span className="me-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground">
            <PanelLeft className="h-4 w-4" />
          </span>
        ) : null}
        <span className="me-2 flex h-8 min-w-0 items-center gap-1 rounded-md px-1.5 text-xs font-medium text-foreground">
          <span className="truncate">{model}</span>
          <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        <HeaderAction>
          <Plus className="h-4 w-4" />
        </HeaderAction>
        <HeaderAction>
          <History className="h-4 w-4" />
        </HeaderAction>
        <HeaderAction>
          {showSettings ? (
            <Settings className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </HeaderAction>
      </div>
    </header>
  );
}

function ToolRow({
  tool,
  running,
  expanded,
  snapshot,
}: {
  tool: SplitTool;
  running: boolean;
  expanded: boolean;
  snapshot?: SplitPane["snapshot"];
}) {
  const { t } = useTranslation();

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-border bg-muted/40">
      <div className="flex min-w-0 items-center gap-1.5 px-2 py-1.5">
        <ChevronRight
          className={cn(
            "h-3 w-3 shrink-0 text-muted-foreground",
            expanded && "rotate-90",
          )}
        />
        <Wrench className="h-3 w-3 shrink-0 text-muted-foreground" />
        <span className="max-w-[45%] shrink-0 truncate font-mono text-[0.6875rem] font-medium text-foreground">
          {tool.name}
        </span>
        <span className="min-w-0 flex-1 truncate text-[0.6875rem] text-muted-foreground/70">
          {tool.summary}
        </span>
        <span className="ms-auto flex shrink-0 items-center gap-1 ps-1">
          {running ? (
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
          ) : (
            <Check className="h-3 w-3 text-success" />
          )}
          <span
            className={cn(
              "text-[0.625rem]",
              running ? "text-primary" : "text-success",
            )}
          >
            {running ? t("mockUi.running") : t("mockUi.completed")}
          </span>
        </span>
      </div>

      {expanded && snapshot ? (
        <div className="border-t border-border/60 px-2 py-1.5">
          <div className="overflow-hidden rounded-md border border-border/60 bg-background/80">
            <div className="flex items-center justify-between border-b border-border/60 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground/70">
              <span>{snapshot.plan}</span>
              <span>{snapshot.sso}</span>
            </div>
            {snapshot.rows.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between px-2 py-1 text-[0.6875rem] text-foreground"
              >
                <span>{row.name}</span>
                {row.sso ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <span className="text-muted-foreground/50">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PaneBody({ pane, meta }: { pane: SplitPane; meta: PaneMeta }) {
  const { t } = useTranslation();
  const streaming = pane.answer === null;

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-3 py-3">
        <div className="flex flex-col items-end gap-2">
          <div className="flex w-full max-w-[85%] items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 py-1.5">
            <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="shrink-0 text-xs font-medium text-muted-foreground">
              {pane.context}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground/70">
              {pane.contextDetail}
            </span>
            <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
          </div>
          <div className="max-w-[85%] rounded-2xl bg-chat-user px-3 py-2 text-sm text-chat-user-foreground">
            {pane.prompt}
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-2 text-sm">
          {pane.tools.map((tool, index) => (
            <ToolRow
              key={tool.name}
              tool={tool}
              running={streaming && index === pane.tools.length - 1}
              expanded={index === meta.expandedTool}
              snapshot={pane.snapshot}
            />
          ))}
          {pane.answer ? (
            <p className="mt-1 leading-relaxed text-foreground">{pane.answer}</p>
          ) : (
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
              {t("mockUi.thinking")}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 p-3">
        <div className="overflow-hidden rounded-xl border-2 border-border bg-muted/50">
          <div className="px-3 pb-1 pt-3">
            <p className="text-sm text-muted-foreground/60">
              {t("mockUi.placeholder")}
            </p>
          </div>
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground">
              <ImagePlus className="h-4 w-4" />
            </span>
            <span className="flex items-center gap-1">
              <ContextRing value={meta.usage} />
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg",
                  streaming ? "text-destructive" : "text-muted-foreground/40",
                )}
              >
                {streaming ? (
                  <Square className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export function SplitViewShowcase({ className }: { className?: string }) {
  const { t } = useTranslation();
  const panes = t("lumo.split.panes", { returnObjects: true }) as SplitPane[];
  const [count, setCount] = useState<PaneCount>(3);
  /** Flex weight per pane, in the canvas' own pixels. Reset by a count change. */
  const [ratios, setRatios] = useState<number[]>([1 / 3, 1 / 3, 1 / 3]);
  const [dragging, setDragging] = useState<number | null>(null);
  const dragRef = useRef<{
    index: number;
    startX: number;
    left: number;
    right: number;
    /** Canvas pixels per CSS pixel, so a drag is scale-independent. */
    scale: number;
  } | null>(null);

  const labels: Record<PaneCount, string> = {
    1: t("lumo.split.one"),
    2: t("lumo.split.two"),
    3: t("lumo.split.three"),
  };
  const icons: Record<PaneCount, typeof PanelLeft> = {
    1: PanelLeft,
    2: Columns2,
    3: Columns3,
  };

  /** Slot indices on screen, left to right. Slot identity is the pane's locale entry. */
  const visible = PANE_COUNTS.slice(0, count).map((_, index) => index);
  const available = DESIGN_WIDTH - (count - 1) * DIVIDER_WIDTH;
  const widthOf = (index: number) => (ratios[index] ?? 1 / count) * available;

  const handleCountChange = (value: string) => {
    const next = Number(value);
    if (next !== 1 && next !== 2 && next !== 3) return;
    setCount(next);
    setRatios(PANE_COUNTS.map((_, index) => (index < next ? 1 / next : 1)));
  };

  const handleDividerPointerDown =
    (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      // `getBoundingClientRect` is the *painted* width because the whole canvas
      // is transform-scaled by `MockScaler`; `clientWidth` would report the
      // design width and make a drag on a phone move the divider too slowly.
      const canvas = event.currentTarget.closest("[data-split-canvas]");
      const scale = canvas ? canvas.getBoundingClientRect().width / DESIGN_WIDTH : 1;
      dragRef.current = {
        index,
        startX: event.clientX,
        left: ratios[index] ?? 1 / count,
        right: ratios[index + 1] ?? 1 / count,
        scale,
      };
      setDragging(index);
    };

  const handleDividerPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const total = drag.left + drag.right;
    const min = MIN_PANE_WIDTH / available;
    const delta = (event.clientX - drag.startX) / (available * drag.scale);
    const left = Math.min(Math.max(drag.left + delta, min), total - min);
    setRatios((prev) =>
      prev.map((ratio, index) =>
        index === drag.index ? left : index === drag.index + 1 ? total - left : ratio,
      ),
    );
  };

  const endDrag = (target: HTMLDivElement, pointerId: number) => {
    if (target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId);
    }
    dragRef.current = null;
    setDragging(null);
  };

  const handleDividerPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    endDrag(event.currentTarget, event.pointerId);
  };

  /** Capture can also be taken away (scroll, focus loss); never leave a pane stuck mid-drag. */
  const handleDividerPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    endDrag(event.currentTarget, event.pointerId);
  };

  return (
    <div
      className={cn(
        "stage stage-lumo relative overflow-hidden rounded-stage px-4 pb-4 pt-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6",
        className,
      )}
    >
      <div className="stage-grid" aria-hidden="true" />

      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control border border-border bg-card/80 shadow-surface">
            <BrandMark variant="lumo" className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold text-foreground">Lumo</span>
          <code className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
            chrome.sidePanel
          </code>
        </div>

        <ToggleGroup
          type="single"
          value={String(count)}
          onValueChange={handleCountChange}
          aria-label={t("lumo.split.title")}
        >
          {PANE_COUNTS.map((value) => {
            const Icon = icons[value];
            return (
              <ToggleGroupItem
                key={value}
                value={String(value)}
                aria-label={labels[value]}
                className="h-7 px-2"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{labels[value]}</span>
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>

      <div className="relative z-10">
        <MockScaler designWidth={DESIGN_WIDTH} designHeight={DESIGN_HEIGHT}>
          <div
            data-split-canvas
            aria-hidden="true"
            className={cn(
              "flex overflow-hidden rounded-panel border border-border bg-background",
              dragging !== null && "cursor-col-resize select-none",
            )}
            style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT }}
          >
            <AnimatePresence initial={false}>
              {visible.map((slot, index) => {
                const pane = panes[slot];
                const meta = PANE_META[slot] ?? DEFAULT_PANE_META;
                const isLast = index === count - 1;
                if (!pane) return null;

                return (
                  <motion.div
                    key={slot}
                    className="flex h-full shrink-0 overflow-hidden"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: widthOf(slot) + (isLast ? 0 : DIVIDER_WIDTH),
                      opacity: 1,
                    }}
                    exit={{
                      width: 0,
                      opacity: 0,
                      transition: {
                        width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    transition={{
                      width:
                        dragging !== null
                          ? { duration: 0 }
                          : WIDTH_TRANSITION,
                      opacity: dragging !== null ? { duration: 0 } : { duration: 0.2 },
                    }}
                  >
                    <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
                      <PaneHeader
                        model={pane.model}
                        showSplit={index === 0 && count < 3}
                        showSettings={isLast}
                      />
                      <PaneBody pane={pane} meta={meta} />
                    </div>

                    {isLast ? null : (
                      <div
                        // The pane wrapper clips its content, so the divider's hit
                        // area cannot be widened past the wrapper's edge; it stays
                        // the product's 8px column.
                        className={cn(
                          "group flex h-full shrink-0 touch-none cursor-col-resize items-center justify-center transition-colors hover:bg-muted/60",
                          dragging === index && "bg-muted",
                        )}
                        style={{ width: DIVIDER_WIDTH }}
                        onPointerDown={handleDividerPointerDown(index)}
                        onPointerMove={handleDividerPointerMove}
                        onPointerUp={handleDividerPointerUp}
                        onPointerCancel={handleDividerPointerCancel}
                        onLostPointerCapture={handleDividerPointerCancel}
                      >
                        <span
                          className={cn(
                            "h-8 w-0.5 rounded-full bg-border transition-colors group-hover:bg-foreground/30",
                            dragging === index && "bg-foreground/50",
                          )}
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </MockScaler>
      </div>
    </div>
  );
}
