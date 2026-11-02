import type { ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  MoreHorizontal,
  Plus,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BrowserTab {
  label: string;
  active?: boolean;
  tone?: "lumo" | "userscripts" | "neutral";
}

export function BrowserFrame({
  tabs,
  url,
  children,
  className,
  contentClassName,
  compact = false,
}: {
  tabs: BrowserTab[];
  url: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  compact?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "min-w-0 overflow-hidden rounded-panel border border-border bg-card shadow-float",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-border bg-muted/60 px-3",
          compact ? "py-1.5" : "py-2",
        )}
      >
        <div className="flex shrink-0 items-center gap-1.5 pl-0.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </div>
        <div className="ml-1 flex min-w-0 flex-1 items-end gap-1 overflow-hidden">
          {tabs.map((tab, index) => (
            <div
              key={`${tab.label}-${index}`}
              className={cn(
                "flex min-w-0 max-w-[10rem] items-center gap-2 rounded-t-[0.45rem] px-2.5 text-[11px]",
                compact ? "h-6" : "h-7",
                tab.active
                  ? "bg-card text-foreground shadow-[inset_0_1px_0_0_var(--color-border)]"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 shrink-0 rounded-[3px]",
                  tab.tone === "userscripts"
                    ? "bg-brand-emerald"
                    : tab.tone === "lumo"
                      ? "bg-brand-cyan"
                      : "bg-muted-foreground/50",
                )}
              />
              <span className="truncate">{tab.label}</span>
            </div>
          ))}
          <Plus className="mb-1.5 h-3 w-3 shrink-0 text-muted-foreground" />
        </div>
        <MoreHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        <div className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <RotateCw className="h-3.5 w-3.5" />
        </div>
        <div className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-muted/50 px-3 text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3 shrink-0" />
          <span className="truncate font-mono">{url}</span>
        </div>
        <MoreHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </div>

      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
