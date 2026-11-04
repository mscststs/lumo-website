import { useTranslation } from "react-i18next";
import {
  FileText,
  Folder,
  GitBranch,
  GitFork,
  Scale,
  Star,
} from "lucide-react";
import { GithubIcon } from "@/components/brand/icons";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import {
  AssistantMockTurn,
  ChatMockHeader,
  ComposerMock,
  ToolMockCard,
  UserMockTurn,
} from "@/components/mockups/chat-mock-parts";
import { cn } from "@/lib/utils";

/**
 * The agent protocol, shown instead of drawn.
 *
 * The previous L0/L1 diagram explained the wire contract; this scene shows the
 * same flow as a user experiences it: a GitHub page on the left, the Lumo side
 * panel on the right, a `userscripts_list` call, then `userscripts_create`
 * expanded with its real input and the summary the provider returns. Tool names
 * carry the provider namespace because the host prefixes them
 * (`lib/mcp/extension-server.ts`), and the page stays in `.dark` because the
 * script the agent just wrote is already doing its job.
 *
 * Decorative (`aria-hidden` through `BrowserFrame`) and built from the same
 * `chat-mock-parts` primitives as every other Lumo mockup.
 */
export function AgentScriptScene({ className }: { className?: string }) {
  const { t } = useTranslation();
  const page = t("userscripts.agent.scene.page", { returnObjects: true }) as {
    repo: string;
    url: string;
    visibility: string;
    tabCode: string;
    tabIssues: string;
    tabPulls: string;
    tabActions: string;
    branch: string;
    goToFile: string;
    codeButton: string;
    stars: string;
    forks: string;
    files: { name: string; meta: string; time: string }[];
    readmeTitle: string;
    readmeBody: string;
    readmeCode: string;
    commitMeta: string;
    aboutTitle: string;
    aboutBody: string;
    topics: string[];
    license: string;
  };
  const files = page.files;

  return (
    <BrowserFrame
      tabs={[{ label: page.repo, active: true }]}
      url={page.url}
      className={cn("mx-auto w-full max-w-[72rem]", className)}
      contentClassName="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_19rem] lg:grid-cols-[minmax(0,1fr)_21rem]"
    >
      {/* The page the script is written for, already in night mode. */}
      <div className="dark hidden min-w-0 flex-col bg-background text-foreground sm:flex">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <GithubIcon className="h-4 w-4 text-foreground" />
          <span className="min-w-0 truncate text-xs font-semibold">
            {page.repo}
          </span>
          <span className="shrink-0 rounded-full border border-border px-1.5 py-px text-[9px] text-muted-foreground">
            {page.visibility}
          </span>
          <span className="ms-auto hidden items-center gap-3 text-[9px] text-muted-foreground sm:flex">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3" />
              {page.stars}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {page.forks}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4 border-b border-border px-3 text-[10px] text-muted-foreground">
          {[page.tabCode, page.tabIssues, page.tabPulls, page.tabActions].map(
            (tab, index) => (
              <span
                key={tab}
                className={cn(
                  "border-b-2 py-2",
                  index === 0
                    ? "border-primary text-foreground"
                    : "border-transparent",
                )}
              >
                {tab}
              </span>
            ),
          )}
        </div>

        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-1 text-[10px] text-foreground">
            <GitBranch className="h-3 w-3 text-muted-foreground" />
            <span className="truncate font-mono">{page.branch}</span>
          </span>
          <span className="hidden min-w-0 flex-1 truncate rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground md:block">
            {page.goToFile}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-success/30 bg-success/10 px-2 py-1 text-[10px] font-medium text-success">
            {page.codeButton}
          </span>
        </div>

        <div className="divide-y divide-border/60">
          {files.map((file) => {
            const Folderish = !file.name.includes(".");
            return (
              <div key={file.name} className="flex min-w-0 items-center gap-2 px-3 py-2">
                {Folderish ? (
                  <Folder className="h-3.5 w-3.5 shrink-0 text-primary" />
                ) : (
                  <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className="min-w-0 truncate text-[11px] text-foreground">
                  {file.name}
                </span>
                <span className="ms-auto hidden min-w-0 truncate text-[10px] text-muted-foreground md:block">
                  {file.meta}
                </span>
                <span className="w-6 shrink-0 text-right text-[10px] tabular-nums text-muted-foreground/70">
                  {file.time}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex min-w-0 items-center gap-2 border-b border-border px-3 py-2 text-[10px] text-muted-foreground">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 font-mono text-[8px] text-foreground">
            nw
          </span>
          <span className="min-w-0 truncate">{page.commitMeta}</span>
          <code className="ms-auto hidden shrink-0 font-mono text-[9px] text-muted-foreground/70 sm:block">
            8f3a1c2
          </code>
        </div>

        {/* Enough README to fill the column beside the conversation. */}
        <div className="mt-3 flex min-w-0 flex-col gap-2 rounded-lg border border-border px-3 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
            <FileText className="h-3 w-3 text-muted-foreground" />
            {page.readmeTitle}
          </span>
          <p className="text-[10px] leading-5 text-muted-foreground">
            {page.readmeBody}
          </p>
          <code className="block min-w-0 truncate rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-[10px] text-foreground">
            {page.readmeCode}
          </code>
        </div>

        <div className="mt-auto flex min-w-0 flex-col gap-2 border-t border-border px-3 py-3">
          <span className="text-[10px] font-semibold text-foreground">
            {page.aboutTitle}
          </span>
          <p className="text-[10px] leading-5 text-muted-foreground">
            {page.aboutBody}
          </p>
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            {page.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-primary/30 px-1.5 py-px text-[9px] text-primary"
              >
                {topic}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-[9px] text-muted-foreground">
            <Scale className="h-2.5 w-2.5" />
            {page.license}
          </span>
        </div>
      </div>

      {/* Lumo, writing the script in the same conversation. */}
      <div className="flex min-w-0 flex-col border-t border-border bg-background sm:border-s sm:border-t-0">
        <ChatMockHeader />
        <div className="flex min-w-0 flex-col gap-4 px-3 py-3">
          <UserMockTurn>{t("userscripts.agent.scene.user")}</UserMockTurn>
          <AssistantMockTurn>
            <p className="leading-relaxed text-foreground">
              {t("userscripts.agent.scene.assistantLead")}
            </p>
            <ToolMockCard
              name="userscripts_list"
              summary={t("userscripts.agent.scene.listSummary")}
            />
            <ToolMockCard
              name="userscripts_create"
              summary={t("userscripts.agent.scene.createSummary")}
              input={t("userscripts.agent.scene.createInput")}
              output={t("userscripts.agent.scene.createOutput")}
              blockClassName="max-h-32"
            />
            <p className="mt-1 leading-relaxed text-foreground">
              {t("userscripts.agent.scene.assistantDone")}
            </p>
          </AssistantMockTurn>
        </div>
        <ComposerMock value={24} />
      </div>
    </BrowserFrame>
  );
}
