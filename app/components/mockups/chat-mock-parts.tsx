import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Check,
  ChevronDown,
  ChevronRight,
  History,
  ImagePlus,
  Plus,
  Send,
  Settings,
  Wrench,
} from "lucide-react";
import { ContextRing } from "@/components/mockups/context-ring";
import { cn } from "@/lib/utils";

/**
 * Shared primitives for the Lumo side-panel mockups.
 *
 * Both `SidebarChatMock` and the userscripts scene draw the same panel, so the
 * geometry lives here once: a 40px header with a borderless model label and
 * 28px ghost icons, a tool call as a single collapsible row (11px mono name +
 * `key: value` input summary + status), and a `rounded-xl` composer with a 2px
 * border whose textarea sits above a 28px icon toolbar. Sharing the parts is
 * what keeps the two mocks from drifting apart.
 */

export function HeaderIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground">
      {children}
    </span>
  );
}

export function ChatMockHeader() {
  const { t } = useTranslation();

  return (
    <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
      <span className="flex h-8 min-w-0 items-center gap-1 rounded-md px-1.5 text-xs font-medium text-foreground">
        <span className="truncate">{t("mockUi.model")}</span>
        <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
      </span>
      <div className="flex shrink-0 items-center gap-0.5">
        <HeaderIcon>
          <Plus className="h-4 w-4" />
        </HeaderIcon>
        <HeaderIcon>
          <History className="h-4 w-4" />
        </HeaderIcon>
        <HeaderIcon>
          <Settings className="h-4 w-4" />
        </HeaderIcon>
      </div>
    </header>
  );
}

export function ToolMockCard({
  name,
  summary,
  input,
  output,
  state = "done",
  blockClassName = "max-h-24",
}: {
  name: string;
  summary: string;
  input?: string;
  output?: string;
  state?: "done" | "running" | "interrupted";
  /** Height cap for the input/output blocks; taller reads better in wide mocks. */
  blockClassName?: string;
}) {
  const { t } = useTranslation();
  const meta = {
    done: { icon: Check, className: "text-success", label: t("mockUi.completed") },
    running: {
      icon: Wrench,
      className: "text-primary",
      label: t("mockUi.running"),
    },
    interrupted: {
      icon: ChevronRight,
      className: "text-muted-foreground",
      label: t("mockUi.interrupted"),
    },
  }[state];
  const Icon = meta.icon;
  const expanded = Boolean(input || output);

  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-lg border bg-muted/40",
        state === "interrupted" ? "border-border/60" : "border-border",
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5 px-2 py-1.5">
        <ChevronRight
          className={cn(
            "h-3 w-3 shrink-0 text-muted-foreground",
            expanded && "rotate-90",
          )}
        />
        <Wrench className="h-3 w-3 shrink-0 text-muted-foreground" />
        <span className="max-w-[45%] shrink-0 truncate font-mono text-[0.6875rem] font-medium text-foreground">
          {name}
        </span>
        <span className="min-w-0 flex-1 truncate text-[0.6875rem] text-muted-foreground/70">
          {summary}
        </span>
        <span className="ms-auto flex shrink-0 items-center gap-1 ps-1">
          <Icon className={cn("h-3 w-3", meta.className)} />
          <span className={cn("text-[0.625rem]", meta.className)}>{meta.label}</span>
        </span>
      </div>
      {expanded ? (
        <div className="flex flex-col gap-1.5 border-t border-border/60 px-2 py-1.5">
          {input ? (
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground/70">
                {t("mockUi.input")}
              </span>
              <pre
                className={cn(
                  "overflow-hidden whitespace-pre-wrap break-all rounded-md border border-border/60 bg-background/80 p-1.5 font-mono text-[0.6875rem] leading-relaxed text-foreground",
                  blockClassName,
                )}
              >
                {input}
              </pre>
            </div>
          ) : null}
          {output ? (
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground/70">
                {t("mockUi.output")}
              </span>
              <pre
                className={cn(
                  "overflow-hidden whitespace-pre-wrap break-all rounded-md border border-border/60 bg-background/80 p-1.5 font-mono text-[0.6875rem] leading-relaxed text-foreground",
                  blockClassName,
                )}
              >
                {output}
              </pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function UserMockTurn({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl bg-chat-user px-3 py-2 text-sm text-chat-user-foreground">
        {children}
      </div>
    </div>
  );
}

export function AssistantMockTurn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-1 text-sm", className)}>
      {children}
    </div>
  );
}

export function ComposerMock({ value = 32 }: { value?: number }) {
  const { t } = useTranslation();

  return (
    <div className="shrink-0 p-3">
      <div className="overflow-hidden rounded-xl border-2 border-border bg-muted/50">
        <div className="px-3 pb-1 pt-3">
          <p className="text-sm text-muted-foreground/60">{t("mockUi.placeholder")}</p>
        </div>
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground">
            <ImagePlus className="h-4 w-4" />
          </span>
          <span className="flex items-center gap-1">
            <ContextRing value={value} />
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/40">
              <Send className="h-4 w-4" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
