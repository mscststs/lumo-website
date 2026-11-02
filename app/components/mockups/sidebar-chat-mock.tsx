import { useTranslation } from "react-i18next";
import {
  Brain,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Globe,
  History,
  ImagePlus,
  Plus,
  Send,
  Settings,
  Sparkles,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pixel-faithful reconstruction of the Lumo side panel.
 *
 * The proportions come straight from the product: a 32px header with a borderless
 * model select on the left and three 28px ghost icon buttons on the right, a
 * full-width assistant column (no bubble), a `rounded-2xl` user bubble at 85%
 * max width, collapsible tool cards at 11px mono, and a `rounded-xl` composer
 * with a 2px border that turns accent-coloured on focus.
 *
 * Everything here is decorative (`aria-hidden`) and reads from the same
 * semantic tokens as the site, so re-theming the site re-themes the mockup.
 */

function ContextRing({ value = 35 }: { value?: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-4 w-4 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-primary) 0 ${value}%, var(--color-muted) ${value}% 100%)`,
      }}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-card" />
    </span>
  );
}

function HeaderIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground">
      {children}
    </span>
  );
}

function ToolCard({
  name,
  summary,
  output,
  state = "done",
}: {
  name: string;
  summary: string;
  output?: string;
  state?: "done" | "running" | "interrupted";
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

  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-lg border bg-muted/40",
        state === "interrupted" ? "border-border/60" : "border-border",
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5 px-2 py-1.5">
        <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
        <Wrench className="h-3 w-3 shrink-0 text-muted-foreground" />
        <span className="max-w-[45%] shrink-0 truncate font-mono text-[0.6875rem] font-medium text-foreground">
          {name}
        </span>
        <span className="min-w-0 flex-1 truncate text-[0.6875rem] text-muted-foreground">
          {summary}
        </span>
        <span className="ms-auto flex shrink-0 items-center gap-1 ps-1">
          <Icon className={cn("h-3 w-3", meta.className)} />
          <span className={cn("text-[0.625rem]", meta.className)}>{meta.label}</span>
        </span>
      </div>
      {output ? (
        <div className="flex flex-col gap-1 border-t border-border/60 px-2 py-1.5">
          <span className="text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground/70">
            {t("mockUi.output")}
          </span>
          <pre className="max-h-24 overflow-hidden whitespace-pre-wrap break-all rounded-md border border-border/60 bg-background/80 p-1.5 font-mono text-[0.6875rem] leading-relaxed text-foreground">
            {output}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

function ReasoningCard() {
  const { t } = useTranslation();
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-border/60 bg-muted/25">
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
        <Brain className="h-3 w-3 shrink-0 text-muted-foreground" />
        <span className="truncate text-[0.6875rem] font-medium text-muted-foreground">
          {t("mockUi.thought")}
        </span>
      </div>
    </div>
  );
}

function UserTurn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl bg-chat-user px-3 py-2 text-sm text-chat-user-foreground">
        {children}
      </div>
    </div>
  );
}

function AssistantTurn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-1 text-sm", className)}>
      {children}
    </div>
  );
}

export function SidebarChatMock({
  mode = "lumo",
  className,
}: {
  mode?: "home" | "lumo" | "loop";
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-h-0 min-w-0 flex-col overflow-hidden rounded-panel border border-border bg-background text-foreground shadow-float",
        className,
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="flex h-8 min-w-0 items-center gap-1 rounded-md px-1.5 text-xs font-medium text-foreground">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
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

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-3 py-3">
        {mode === "loop" ? (
          <>
            <UserTurn>{t("lumo.agent.mock.user")}</UserTurn>
            <AssistantTurn>
              <ReasoningCard />
              <ToolCard
                name="page_snapshot"
                summary={t("lumo.agent.mock.stepOneSummary")}
                output={t("lumo.agent.mock.stepOneOutput")}
              />
              <ToolCard
                name="browser_tabs"
                summary={t("lumo.agent.mock.stepTwoSummary")}
                state="done"
              />
              <ToolCard
                name="debug_input"
                summary={t("lumo.agent.mock.stepThreeSummary")}
                state="running"
              />
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
                {t("mockUi.thinking")}
              </p>
            </AssistantTurn>
          </>
        ) : mode === "home" ? (
          <>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                <Globe className="h-3 w-3" />
                {t("mockUi.pageContext")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                <FileText className="h-3 w-3" />
                {t("mockUi.pasted")}
              </span>
            </div>
            <UserTurn>{t("home.hero.mock.prompt")}</UserTurn>
            <AssistantTurn>
              <p className="leading-relaxed text-foreground">
                {t("home.hero.mock.answer")}
              </p>
              <ul className="mt-1 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {[
                  t("home.hero.mock.decisionOne"),
                  t("home.hero.mock.decisionTwo"),
                  t("home.hero.mock.decisionThree"),
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {line}
                  </li>
                ))}
              </ul>
              <ToolCard
                name="page_read"
                summary="1,284 words · markdown"
                output={t("home.hero.mock.toolDone")}
              />
            </AssistantTurn>
          </>
        ) : (
          <>
            <UserTurn>{t("lumo.hero.mock.user")}</UserTurn>
            <AssistantTurn>
              <p className="leading-relaxed text-foreground">
                {t("lumo.hero.mock.assistant")}
              </p>
              <ToolCard
                name="page_read"
                summary={t("lumo.hero.mock.toolOneDetail")}
                output={t("lumo.hero.mock.toolOneOutput")}
              />
              <ToolCard
                name="debug_input"
                summary={t("lumo.hero.mock.toolTwoDetail")}
                state="done"
              />
              <ToolCard
                name="page_screenshot"
                summary={t("lumo.hero.mock.toolThreeDetail")}
                state="running"
              />
            </AssistantTurn>
          </>
        )}
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
              <ContextRing value={mode === "loop" ? 61 : 32} />
              <span className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/40">
                <Send className="h-4 w-4" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
