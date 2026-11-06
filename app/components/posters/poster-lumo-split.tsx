import { useTranslation } from "react-i18next";
import {
  Check,
  ChevronDown,
  Columns3,
  Globe,
  History,
  ImagePlus,
  PanelLeft,
  Plus,
  Send,
  Settings,
  Wrench,
} from "lucide-react";
import { ContextRing } from "@/components/mockups/context-ring";
import {
  AssistantMockTurn,
  ToolMockCard,
  UserMockTurn,
} from "@/components/mockups/chat-mock-parts";
import {
  PosterHeading,
  PosterShell,
  PosterStatus,
} from "./poster-parts";

interface SplitPane {
  model: string;
  context: string;
  contextDetail: string;
  prompt: string;
  answer: string | null;
  tools: { name: string; summary: string }[];
}

function PaneHeader({ model }: { model: string }) {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-border px-2.5">
      <div className="flex min-w-0 items-center gap-1">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground">
          <PanelLeft className="h-3.5 w-3.5" />
        </span>
        <span className="flex min-w-0 items-center gap-1 rounded-md px-1 text-[11px] font-medium text-foreground">
          <span className="truncate">{model}</span>
          <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 text-muted-foreground">
        <span className="flex h-6 w-6 items-center justify-center rounded-md">
          <Plus className="h-3.5 w-3.5" />
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-md">
          <History className="h-3.5 w-3.5" />
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-md">
          <Settings className="h-3.5 w-3.5" />
        </span>
      </div>
    </header>
  );
}

function PosterComposer({ value }: { value: number }) {
  const { t } = useTranslation();
  return (
    <div className="shrink-0 p-1.5">
      <div className="overflow-hidden rounded-xl border-2 border-border bg-muted/50">
        <div className="px-2.5 pb-0.5 pt-2">
          <p className="truncate text-[10px] text-muted-foreground/60">
            {t("mockUi.placeholder")}
          </p>
        </div>
        <div className="flex items-center justify-between px-1 pb-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground">
            <ImagePlus className="h-3 w-3" />
          </span>
          <span className="flex items-center gap-0.5">
            <ContextRing value={value} className="h-5 w-5" />
            <span className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground/40">
              <Send className="h-3 w-3" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function PaneBody({ pane }: { pane: SplitPane }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-2.5 py-2.5">
        <div className="flex max-w-[94%] items-center gap-1.5 self-end rounded-lg border border-border/70 bg-muted/30 px-2 py-1.5">
          <Globe className="h-3 w-3 shrink-0 text-muted-foreground" />
          <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
            {pane.context}
          </span>
          <span className="min-w-0 flex-1 truncate text-[10px] text-muted-foreground/70">
            {pane.contextDetail}
          </span>
          <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
        </div>

        <UserMockTurn>{pane.prompt}</UserMockTurn>

        <AssistantMockTurn className="gap-1.5">
          {pane.tools.map((tool, toolIndex) => (
            <ToolMockCard
              key={tool.name}
              name={tool.name}
              summary={tool.summary}
              state={toolIndex === pane.tools.length - 1 ? "running" : "done"}
            />
          ))}
          {pane.answer ? (
            <p className="mt-0.5 text-[12px] leading-[1.5] text-foreground">
              {pane.answer}
            </p>
          ) : (
            <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
              {t("mockUi.thinking")}
            </p>
          )}
        </AssistantMockTurn>
      </div>

      <PosterComposer value={pane.answer ? 32 : 61} />
    </>
  );
}

function PaneFooter({ usage }: { usage: number }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between border-t border-border/50 px-2.5 py-1.5">
      <span className="inline-flex items-center gap-1 text-[9px] text-muted-foreground">
        <Wrench className="h-2.5 w-2.5" />
        {t("mockUi.navMcp")}
      </span>
      <span className="inline-flex items-center gap-1 text-[9px] text-success">
        <Check className="h-2.5 w-2.5" />
        <ContextRing value={usage} className="h-4 w-4" />
      </span>
    </div>
  );
}

export function LumoPosterSplit() {
  const { t } = useTranslation();
  const panes = t("lumo.split.panes", {
    returnObjects: true,
  }) as SplitPane[];
  const usage = [32, 61, 44];

  return (
    <PosterShell tone="lumo" variant="solid">
      <div className="flex h-full flex-col pt-6">
        <div className="flex items-end justify-between gap-8">
          <PosterHeading
            eyebrow={t("posters.lumo.items.split.eyebrow")}
            title={t("posters.lumo.items.split.title")}
            description={t("posters.lumo.items.split.subtitle")}
            className="max-w-[720px]"
            titleSize={50}
            descriptionClassName="max-w-[900px]"
          />
          <div className="flex w-[260px] shrink-0 flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <PosterStatus label={t("lumo.split.three")} tone="primary" />
              <span className="rounded-full border border-border/60 bg-card/55 px-2.5 py-1 font-mono text-[9px] text-muted-foreground">
                {t("posters.lumo.items.split.runtime")}
              </span>
            </div>
            <p className="text-right text-[9px] leading-[1.4] text-muted-foreground">
              {t("posters.lumo.items.split.footnote")}
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[18px] border border-border/60 bg-background/85 shadow-float">
          <div className="flex h-9 items-center gap-2 border-b border-border bg-muted/40 px-3">
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-destructive/70" />
              <span className="h-2 w-2 rounded-full bg-warning/70" />
              <span className="h-2 w-2 rounded-full bg-success/70" />
            </div>
            <span className="ml-1 flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 text-[9px] text-muted-foreground">
              <Globe className="h-2.5 w-2.5 shrink-0" />
              <span className="truncate font-mono">
                {t("home.hero.mock.url")}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[9px] text-muted-foreground">
              <Columns3 className="h-3 w-3" />
              {t("lumo.split.three")}
            </span>
          </div>

          <div className="flex h-[348px] gap-2 p-2">
            {panes.map((pane, paneIndex) => (
              <div
                key={pane.model}
                className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-border/70 bg-background"
              >
                <PaneHeader model={pane.model} />
                <PaneBody pane={pane} />
                <PaneFooter usage={usage[paneIndex] ?? 32} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PosterShell>
  );
}
