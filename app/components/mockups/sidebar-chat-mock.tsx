import { useTranslation } from "react-i18next";
import {
  Brain,
  ChevronDown,
  ChevronRight,
  FileText,
  Globe,
} from "lucide-react";
import {
  AssistantMockTurn,
  ChatMockHeader,
  ComposerMock,
  ToolMockCard,
  UserMockTurn,
} from "@/components/mockups/chat-mock-parts";
import { cn } from "@/lib/utils";

/**
 * Pixel-faithful reconstruction of the Lumo side panel.
 *
 * The proportions come straight from the product: a 40px header with a borderless
 * model select on the left and three 28px ghost icon buttons on the right, a
 * full-width assistant column (no bubble), a `rounded-2xl` user bubble at 85%
 * max width preceded by collapsible attachment cards, tool calls as one-line
 * collapsible rows (11px mono, chevron + wrench + name + `key: value` input
 * summary + status), and a `rounded-xl` composer with a 2px border.
 *
 * The panel chrome, tool row, turns and composer live in `chat-mock-parts` so
 * every Lumo mockup draws the same object. Everything here is decorative
 * (`aria-hidden`) and reads from the same semantic tokens as the site, so
 * re-theming the site re-themes the mockup.
 */

function ReasoningCard() {
  const { t } = useTranslation();
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-border/60 bg-muted/25">
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
        <Brain className="h-3 w-3 shrink-0 text-muted-foreground" />
        <span className="truncate text-[0.6875rem] font-medium text-muted-foreground">
          {t("mockUi.reasoning")}
        </span>
      </div>
    </div>
  );
}

function AttachmentCard({
  kind,
  label,
  preview,
}: {
  kind: "page" | "text";
  label: string;
  preview: string;
}) {
  const Icon = kind === "page" ? Globe : FileText;
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-muted/30">
      <div className="flex w-full items-center gap-2 px-2.5 py-1.5">
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="shrink-0 text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="min-w-0 flex-1 truncate text-start text-xs text-muted-foreground/70">
          {preview}
        </span>
        <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
      </div>
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
      <ChatMockHeader />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-3 py-3">
        {mode === "loop" ? (
          <>
            <UserMockTurn>{t("lumo.agent.mock.user")}</UserMockTurn>
            <AssistantMockTurn>
              <ReasoningCard />
              <ToolMockCard
                name="page_snapshot"
                summary={t("lumo.agent.mock.stepOneSummary")}
                input={t("lumo.agent.mock.stepOneInput")}
                output={t("lumo.agent.mock.stepOneOutput")}
              />
              <ToolMockCard
                name="browser_tabs"
                summary={t("lumo.agent.mock.stepTwoSummary")}
                state="done"
              />
              <ToolMockCard
                name="debug_input"
                summary={t("lumo.agent.mock.stepThreeSummary")}
                state="running"
              />
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
                {t("mockUi.thinking")}
              </p>
            </AssistantMockTurn>
          </>
        ) : mode === "home" ? (
          <>
            <div className="flex w-full flex-col items-end gap-2">
              <div className="flex w-full max-w-[85%] flex-col gap-1.5">
                <AttachmentCard
                  kind="page"
                  label={t("mockUi.attachmentPage")}
                  preview={t("home.hero.mock.pageContextPreview")}
                />
                <AttachmentCard
                  kind="text"
                  label={t("mockUi.attachmentPasted")}
                  preview={t("home.hero.mock.pastedPreview")}
                />
              </div>
              <UserMockTurn>{t("home.hero.mock.prompt")}</UserMockTurn>
            </div>
            <AssistantMockTurn>
              <ToolMockCard
                name="page_read"
                summary={t("home.hero.mock.toolOneSummary")}
              />
              <ToolMockCard
                name="debug_input"
                summary={t("home.hero.mock.toolTwoSummary")}
              />
              <ToolMockCard
                name="page_screenshot"
                summary={t("home.hero.mock.toolThreeSummary")}
              />
              <p className="mt-2 leading-relaxed text-foreground">
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
            </AssistantMockTurn>
          </>
        ) : (
          <>
            <UserMockTurn>{t("lumo.hero.mock.user")}</UserMockTurn>
            <AssistantMockTurn>
              <ToolMockCard
                name="page_read"
                summary={t("lumo.hero.mock.toolOneDetail")}
              />
              <ToolMockCard
                name="debug_input"
                summary={t("lumo.hero.mock.toolTwoDetail")}
                state="done"
              />
              <ToolMockCard
                name="page_screenshot"
                summary={t("lumo.hero.mock.toolThreeDetail")}
                state="done"
              />
              <p className="mt-2 leading-relaxed text-foreground">
                {t("lumo.hero.mock.assistant")}
              </p>
            </AssistantMockTurn>
          </>
        )}
      </div>

      <ComposerMock value={mode === "loop" ? 61 : 32} />
    </div>
  );
}
