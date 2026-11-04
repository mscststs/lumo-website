import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Check,
  ChevronDown,
  Copy,
  Cpu,
  FileCode2,
  FileText,
  FolderOpen,
  Globe,
  Info,
  MoreHorizontal,
  Palette,
  Plug,
  Plus,
  Puzzle,
  RefreshCw,
  ScanEye,
  Search,
  Server,
  Settings,
  Wrench,
} from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { CodeEditorMock } from "@/components/mockups/code-editor-mock";
import { InstallFlowMock } from "@/components/mockups/install-flow-mock";
import { MockScaler } from "@/components/mockups/mock-scaler";
import { SidebarChatMock } from "@/components/mockups/sidebar-chat-mock";
import {
  AgentAccessMock,
  UserscriptsDashboardMock,
} from "@/components/mockups/userscripts-dashboard-mock";
import type { DocMockId } from "@/content/docs/types";
import { cn } from "@/lib/utils";

function StepTag({ n, label }: { n?: string; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium leading-4 text-primary">
      {n ? (
        <span className="font-mono font-semibold">{n}</span>
      ) : (
        <span className="h-1 w-1 rounded-full bg-primary" />
      )}
      {label}
    </span>
  );
}

function MiniSwitch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "relative flex h-3.5 w-6 shrink-0 items-center rounded-full p-0.5",
        on ? "bg-primary" : "bg-muted-foreground/30",
      )}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full bg-primary-foreground shadow-sm",
          on && "ml-auto",
        )}
      />
    </span>
  );
}

function MiniButton({
  children,
  variant = "outline",
  highlight,
}: {
  children: ReactNode;
  variant?: "outline" | "primary" | "ghost";
  highlight?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 text-[10px] font-medium",
        variant === "primary" && "bg-primary text-primary-foreground shadow-button",
        variant === "outline" &&
          "border border-border bg-card text-foreground shadow-surface",
        variant === "ghost" && "text-muted-foreground",
        highlight && "ring-2 ring-primary/30",
      )}
    >
      {children}
    </span>
  );
}

const LUMO_NAV = [
  { key: "models", icon: Cpu, labelKey: "mockUi.navModels" },
  { key: "ocr", icon: ScanEye, labelKey: "mockUi.navOcr" },
  { key: "mcp", icon: Plug, labelKey: "mockUi.navMcp" },
  { key: "files", icon: FolderOpen, labelKey: "mockUi.navFiles" },
  { key: "ui", icon: Palette, labelKey: "mockUi.navUi" },
  { key: "prompt", icon: Settings, labelKey: "mockUi.navPrompt" },
  { key: "commands", icon: Wrench, labelKey: "mockUi.navCommands" },
  { key: "debug", icon: Info, labelKey: "mockUi.navDebug" },
] as const;

function LumoOptionsNav({ active }: { active: string }) {
  const { t } = useTranslation();
  return (
    <aside className="flex w-44 shrink-0 flex-col border-e border-border bg-card">
      <div className="border-b border-border px-3 py-3">
        <p className="truncate text-xs font-semibold text-foreground">
          {t("mockUi.settingsTitle")}
        </p>
      </div>
      <div className="flex flex-col gap-0.5 p-2">
        {LUMO_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active;
          return (
            <span
              key={item.key}
              className={cn(
                "flex h-7 items-center gap-2 rounded-md px-2 text-[10px]",
                isActive
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="truncate">{t(item.labelKey)}</span>
            </span>
          );
        })}
      </div>
    </aside>
  );
}

function LumoOptionRow({
  icon: Icon,
  name,
  detail,
}: {
  icon: typeof Server;
  name: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-primary">
        <Icon className="h-3 w-3" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-medium text-foreground">{name}</p>
        <p className="truncate text-[9px] text-muted-foreground">{detail}</p>
      </div>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
      <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
    </div>
  );
}

function ChromeExtensionsMock() {
  const { t } = useTranslation();
  return (
    <MockScaler designWidth={720} designHeight={400}>
      <BrowserFrame
        tabs={[{ label: t("docs.mocks.chrome.pageTitle"), active: true }]}
        url="chrome://extensions"
        className="w-[720px]"
        contentClassName="bg-background"
      >
        <div className="flex flex-col gap-2.5 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              {t("docs.mocks.chrome.pageTitle")}
            </h2>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-40 items-center gap-1.5 rounded-full border border-border bg-card px-2 text-[9px] text-muted-foreground">
                <Search className="h-2.5 w-2.5" />
                {t("docs.mocks.chrome.search")}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                {t("docs.mocks.chrome.developerMode")}
                <MiniSwitch on />
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2.5">
              <BrandMark variant="userscripts" className="h-7 w-7" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {t("nav.productUserscriptsName")}
                  </p>
                  <span className="rounded bg-muted px-1 py-0.5 text-[8px] text-muted-foreground">
                    1.0.19
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {t("docs.mocks.chrome.enabled")}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                  {t("docs.mocks.chrome.cardHint")}
                </p>
              </div>
              <MiniButton>{t("docs.mocks.chrome.details")}</MiniButton>
              <MiniButton variant="ghost">
                <MoreHorizontal className="h-3 w-3" />
              </MiniButton>
            </div>

            <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg border border-border/70 bg-muted/25 px-2.5 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-[9px] text-muted-foreground">
                  {t("docs.mocks.chrome.extensionId")}
                </span>
                <code className="min-w-0 truncate rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] text-foreground">
                  abcdefghijklmnopabcdefghijklmnop
                </code>
                <span className="inline-flex shrink-0 items-center gap-1 text-[9px] text-muted-foreground">
                  <Copy className="h-2.5 w-2.5" />
                  {t("docs.mocks.chrome.copyId")}
                </span>
              </div>
              <StepTag label={t("docs.mocks.chrome.stepCopyId")} />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-primary/25 bg-primary/5 px-2.5 py-2 ring-2 ring-primary/20">
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-foreground">
                  {t("docs.mocks.chrome.allowUserScripts")}
                </p>
                <p className="truncate text-[9px] text-muted-foreground">
                  {t("docs.mocks.chrome.allowUserScriptsHint")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <MiniSwitch on />
                <StepTag label={t("docs.mocks.chrome.stepAllow")} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2.5">
              <BrandMark variant="lumo" className="h-7 w-7" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">
                  {t("nav.productLumoName")}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="shrink-0 text-[9px] text-muted-foreground">
                    {t("docs.mocks.chrome.extensionId")}
                  </span>
                  <code className="truncate rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[9px] text-foreground">
                    cgfnadidpooocnkalljpdmelmaponefa
                  </code>
                </div>
              </div>
              <StepTag label={t("docs.mocks.chrome.stepLumoId")} />
            </div>
          </div>
        </div>
      </BrowserFrame>
    </MockScaler>
  );
}

function LumoModelsMock() {
  const { t } = useTranslation();
  return (
    <MockScaler designWidth={760} designHeight={440}>
      <div className="relative flex h-[440px] w-[760px] overflow-hidden rounded-panel border border-border bg-background shadow-float">
        <LumoOptionsNav active="models" />
        <main className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-foreground">
                {t("mockUi.providersTitle")}
              </h2>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {t("mockUi.providersDescription")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <MiniButton variant="primary" highlight>
                <Plus className="h-3 w-3" />
                {t("mockUi.addProvider")}
              </MiniButton>
              <StepTag n="1" label={t("docs.mocks.models.stepAdd")} />
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="rounded-xl border border-border bg-card p-2.5">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground">
                  Anthropic
                </p>
                <span className="rounded border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground">
                  {t("mockUi.protocolAnthropic")}
                </span>
                <span className="rounded border border-success/25 bg-success/10 px-1.5 py-0.5 text-[8px] text-success">
                  {t("mockUi.keyStored")}
                </span>
              </div>
              <div className="mt-1.5 border-t border-border/60 pt-1.5">
                {["claude-sonnet-4-5", "claude-opus-4-1"].map((model, index) => (
                  <div
                    key={model}
                    className="flex items-center justify-between gap-2 border-b border-border/40 py-1 last:border-0"
                  >
                    <span className="min-w-0 truncate text-[10px] text-foreground">
                      {model}
                    </span>
                    <span className="shrink-0 text-[8px] text-muted-foreground">
                      {index === 0
                        ? t("docs.mocks.models.defaultModel")
                        : "vision"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2.5">
              <ChevronDown className="-rotate-90 h-3.5 w-3.5 text-muted-foreground" />
              <p className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground">
                OpenAI · Production
              </p>
              <span className="rounded border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground">
                {t("mockUi.protocolChat")}
              </span>
              <span className="rounded border border-success/25 bg-success/10 px-1.5 py-0.5 text-[8px] text-success">
                {t("mockUi.keyStored")}
              </span>
            </div>
          </div>
        </main>

        <div className="absolute inset-0 flex items-center justify-center bg-overlay p-6">
          <div className="w-[430px] rounded-panel border border-border bg-card p-4 shadow-float">
            <p className="text-sm font-semibold text-foreground">
              {t("docs.mocks.models.dialogTitle")}
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-medium text-muted-foreground">
                  {t("docs.mocks.models.name")}
                </span>
                <span className="flex h-7 items-center rounded-md border border-border bg-background px-2 text-[10px] text-foreground">
                  {t("docs.mocks.models.nameValue")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-medium text-muted-foreground">
                    {t("docs.mocks.models.protocol")}
                  </span>
                  <span className="flex h-7 items-center justify-between rounded-md border border-border bg-background px-2 text-[10px] text-foreground">
                    {t("mockUi.protocolChat")}
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-medium text-muted-foreground">
                    {t("docs.mocks.models.baseUrl")}
                  </span>
                  <span className="flex h-7 items-center rounded-md border border-border bg-background px-2 font-mono text-[9px] text-muted-foreground">
                    {t("docs.mocks.models.baseUrlValue")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-medium text-muted-foreground">
                    {t("docs.mocks.models.apiKey")}
                  </span>
                  <StepTag n="2" label={t("docs.mocks.models.stepKey")} />
                </div>
                <span className="flex h-7 items-center rounded-md border border-primary/30 bg-primary/5 px-2 font-mono text-[9px] text-muted-foreground ring-2 ring-primary/20">
                  {t("docs.mocks.models.apiKeyValue")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-medium text-muted-foreground">
                    {t("docs.mocks.models.model")}
                  </span>
                  <StepTag n="3" label={t("docs.mocks.models.stepModel")} />
                </div>
                <span className="flex h-7 items-center rounded-md border border-border bg-background px-2 font-mono text-[9px] text-foreground">
                  {t("docs.mocks.models.modelValue")}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <MiniButton variant="ghost">
                {t("docs.mocks.models.cancel")}
              </MiniButton>
              <MiniButton variant="primary">
                <Check className="h-3 w-3" />
                {t("docs.mocks.models.save")}
              </MiniButton>
            </div>
          </div>
        </div>
      </div>
    </MockScaler>
  );
}

function LumoMcpMock() {
  const { t } = useTranslation();
  const servers = t("lumo.tools.servers", {
    returnObjects: true,
  }) as { name: string; detail: string }[];
  const icons = [Globe, FileText, Server, Wrench, FolderOpen];
  return (
    <MockScaler designWidth={760} designHeight={460}>
      <div className="flex h-[460px] w-[760px] overflow-hidden rounded-panel border border-border bg-background shadow-float">
        <LumoOptionsNav active="mcp" />
        <main className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-foreground">
                {t("mockUi.mcpTitle")}
              </h2>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {t("mockUi.mcpDescription")}
              </p>
            </div>
            <MiniButton>
              <Plus className="h-3 w-3" />
              {t("mockUi.addServer")}
            </MiniButton>
          </div>

          <section className="mt-3">
            <h3 className="mb-1.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
              {t("mockUi.builtinServers")}
            </h3>
            <div className="flex flex-col gap-1">
              {servers.map((server, index) => (
                <LumoOptionRow
                  key={server.name}
                  icon={icons[index] ?? Server}
                  name={server.name}
                  detail={server.detail}
                />
              ))}
            </div>
          </section>

          <section className="mt-3">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <h3 className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                {t("mockUi.extensions")}
              </h3>
              <div className="flex items-center gap-1.5">
                <MiniButton highlight>
                  <Plus className="h-2.5 w-2.5" />
                  {t("mockUi.addExtension")}
                </MiniButton>
                <StepTag n="1" label={t("docs.mocks.mcp.stepAdd")} />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 p-2.5">
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <Puzzle className="h-3.5 w-3.5 shrink-0 text-brand-violet" />
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-foreground">
                  {t("nav.productUserscriptsName")}
                </span>
                <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[8px] uppercase text-muted-foreground">
                  extension
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[9px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {t("docs.mocks.mcp.connected")}
                </span>
                <span className="shrink-0 text-[9px] text-muted-foreground">
                  {t("docs.mocks.mcp.toolCount", { count: 12 })}
                </span>
                <MiniSwitch on />
                <RefreshCw className="h-3 w-3 shrink-0 text-muted-foreground" />
              </div>
              <div className="border-t border-border/60 px-2.5 py-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {["list", "get", "create", "edit", "set_enabled"].map(
                    (tool) => (
                      <code
                        key={tool}
                        className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground"
                      >
                        {tool}
                      </code>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MockScaler>
  );
}

function LumoExtensionDialogMock() {
  const { t } = useTranslation();
  return (
    <MockScaler designWidth={760} designHeight={420}>
      <div className="relative flex h-[420px] w-[760px] overflow-hidden rounded-panel border border-border bg-background shadow-float">
        <LumoOptionsNav active="mcp" />
        <main className="min-w-0 flex-1 p-4">
          <h2 className="text-sm font-semibold text-foreground">
            {t("mockUi.mcpTitle")}
          </h2>
          <div className="mt-3 flex flex-col gap-1 opacity-60">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5"
              >
                <span className="h-5 w-5 rounded-md border border-border bg-muted/50" />
                <span className="h-2 w-24 rounded-full bg-muted" />
                <span className="ml-auto h-2 w-12 rounded-full bg-muted" />
              </div>
            ))}
          </div>
        </main>

        <div className="absolute inset-0 flex items-center justify-center bg-overlay p-6">
          <div className="w-[400px] rounded-panel border border-border bg-card p-4 shadow-float">
            <p className="text-sm font-semibold text-foreground">
              {t("docs.mocks.extensionDialog.title")}
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-medium text-muted-foreground">
                  {t("docs.mocks.extensionDialog.idLabel")}
                </span>
                <StepTag n="1" label={t("docs.mocks.extensionDialog.stepPaste")} />
              </div>
              <span className="flex h-8 items-center rounded-md border border-primary/30 bg-primary/5 px-2 font-mono text-[10px] text-foreground ring-2 ring-primary/20">
                {t("docs.mocks.extensionDialog.idValue")}
              </span>
              <p className="text-[9px] leading-4 text-muted-foreground">
                {t("docs.mocks.extensionDialog.hint")}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <MiniButton variant="ghost">
                {t("docs.mocks.extensionDialog.cancel")}
              </MiniButton>
              <div className="flex items-center gap-1.5">
                <MiniButton variant="primary">
                  <Plus className="h-3 w-3" />
                  {t("docs.mocks.extensionDialog.add")}
                </MiniButton>
                <StepTag n="2" label={t("docs.mocks.extensionDialog.stepAdd")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockScaler>
  );
}

const US_NAV = [
  { key: "scripts", icon: FileCode2, labelKey: "mockUi.usNav.scripts" },
  { key: "settings", icon: Settings, labelKey: "mockUi.usNav.settings" },
  { key: "appearance", icon: Palette, labelKey: "mockUi.usNav.appearance" },
  { key: "logs", icon: ScrollTextIcon, labelKey: "mockUi.usNav.logs" },
  { key: "about", icon: Info, labelKey: "mockUi.usNav.about" },
] as const;

function ScrollTextIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}

function UserscriptsShell({
  active,
  children,
}: {
  active: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex h-[460px] w-[760px] overflow-hidden rounded-panel border border-border bg-sidebar text-foreground shadow-float">
      <aside className="flex w-36 shrink-0 flex-col py-2">
        <div className="flex h-10 items-center gap-2 px-2.5">
          <BrandMark variant="userscripts" className="h-6 w-6 shrink-0" />
          <p className="min-w-0 truncate text-[10px] font-semibold text-foreground">
            {t("nav.productUserscriptsName")}
          </p>
        </div>
        <div className="flex flex-col gap-0.5 px-1.5 py-1">
          {US_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <span
                key={item.key}
                className={cn(
                  "flex h-7 items-center gap-2 rounded-control px-2 text-[10px]",
                  isActive
                    ? "border border-border/60 bg-card font-medium text-foreground shadow-surface"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{t(item.labelKey)}</span>
              </span>
            );
          })}
        </div>
      </aside>
      <main className="my-1.5 mr-1.5 min-w-0 flex-1 overflow-hidden rounded-card border border-border/70 bg-background shadow-panel">
        {children}
      </main>
    </div>
  );
}

function UserscriptsAgentMock() {
  const { t } = useTranslation();
  return (
    <MockScaler designWidth={760} designHeight={460}>
      <UserscriptsShell active="settings">
        <header className="flex min-h-11 items-center border-b border-border px-3">
          <h1 className="text-sm font-semibold text-foreground">
            {t("mockUi.usNav.settings")}
          </h1>
        </header>
        <div className="border-b border-border px-3">
          <div className="flex items-center gap-3">
            {[
              t("mockUi.settingsGeneral"),
              t("mockUi.settingsUpdates"),
              t("mockUi.settingsData"),
              t("mockUi.settingsAgent"),
            ].map((label, index) => (
              <span
                key={label}
                className={cn(
                  "relative py-1.5 text-[9px] font-medium",
                  index === 3 ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
                {index === 3 ? (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2.5">
          <div className="rounded-card border border-border bg-card px-2.5 py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[10px] font-medium text-foreground">
                  {t("mockUi.agentEndpoint")}
                </p>
                <p className="truncate text-[8px] text-muted-foreground">
                  {t("mockUi.agentEnabledHint")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <MiniSwitch on />
                <StepTag label={t("docs.mocks.userscriptsAgent.stepAllow")} />
              </div>
            </div>
          </div>

          <div className="rounded-card border border-border bg-card px-2.5 py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-foreground">
                  {t("docs.mocks.userscriptsAgent.identity")}
                </p>
                <code className="mt-0.5 block truncate font-mono text-[8px] text-muted-foreground">
                  abcdefghijklmnopabcdefghijklmnop
                </code>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <MiniButton>
                  <Copy className="h-2.5 w-2.5" />
                  {t("docs.mocks.userscriptsAgent.copy")}
                </MiniButton>
                <StepTag label={t("docs.mocks.userscriptsAgent.stepCopy")} />
              </div>
            </div>
          </div>

          <div className="rounded-card border border-border bg-card px-2.5 py-2">
            <p className="text-[10px] font-medium text-foreground">
              {t("mockUi.agentWrites")}
            </p>
            <div className="mt-1 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[9px] text-muted-foreground">
                  {t("mockUi.agentAllowWrites")}
                </span>
                <MiniSwitch on />
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[9px] text-muted-foreground">
                  {t("mockUi.agentReview")}
                </span>
                <div className="flex items-center gap-2">
                  <MiniSwitch on />
                  <StepTag label={t("docs.mocks.userscriptsAgent.stepWrites")} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-border bg-card px-2.5 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-medium text-foreground">
                {t("mockUi.agentAllowed")}
              </p>
              <span className="text-[8px] text-muted-foreground">
                {t("docs.mocks.userscriptsAgent.allowedHint")}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 rounded border border-border bg-muted/30 px-1.5 py-1">
              <code className="min-w-0 flex-1 truncate font-mono text-[8px] text-muted-foreground">
                cgfnadidpooocnkalljpdmelmaponefa
              </code>
              <span className="shrink-0 text-[8px] text-muted-foreground">
                {t("nav.productLumoName")}
              </span>
            </div>
          </div>
        </div>
      </UserscriptsShell>
    </MockScaler>
  );
}

function UserscriptsGeneralMock() {
  const { t } = useTranslation();
  return (
    <MockScaler designWidth={760} designHeight={400}>
      <UserscriptsShell active="settings">
        <header className="flex min-h-11 items-center border-b border-border px-3">
          <h1 className="text-sm font-semibold text-foreground">
            {t("mockUi.usNav.settings")}
          </h1>
        </header>
        <div className="border-b border-border px-3">
          <div className="flex items-center gap-3">
            {[
              t("mockUi.settingsGeneral"),
              t("mockUi.settingsUpdates"),
              t("mockUi.settingsData"),
              t("mockUi.settingsAgent"),
            ].map((label, index) => (
              <span
                key={label}
                className={cn(
                  "relative py-1.5 text-[9px] font-medium",
                  index === 0 ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
                {index === 0 ? (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2.5">
          <div className="rounded-card border border-primary/25 bg-primary/5 px-2.5 py-2 ring-2 ring-primary/20">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-foreground">
                  {t("docs.mocks.userscriptsGeneral.scriptInjection")}
                </p>
                <p className="truncate text-[8px] text-muted-foreground">
                  {t("docs.mocks.userscriptsGeneral.scriptInjectionHint")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <MiniSwitch on />
                <StepTag label={t("docs.mocks.userscriptsGeneral.stepKeepOn")} />
              </div>
            </div>
          </div>

          {[
            {
              label: t("docs.mocks.userscriptsGeneral.defaultRunAt"),
              value: "document-idle",
            },
            {
              label: t("docs.mocks.userscriptsGeneral.defaultInjectInto"),
              value: "auto",
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-2 rounded-card border border-border bg-card px-2.5 py-2"
            >
              <span className="min-w-0 truncate text-[10px] text-foreground">
                {row.label}
              </span>
              <span className="flex h-6 w-32 shrink-0 items-center justify-between rounded-md border border-border bg-background px-1.5 font-mono text-[8px] text-muted-foreground">
                {row.value}
                <ChevronDown className="h-2.5 w-2.5" />
              </span>
            </div>
          ))}
        </div>
      </UserscriptsShell>
    </MockScaler>
  );
}

function LumoChatMock() {
  return (
    <MockScaler designWidth={400} designHeight={560}>
      <SidebarChatMock
        mode="loop"
        className="h-[560px] w-[400px]"
      />
    </MockScaler>
  );
}

function UserscriptsDashboardDocMock() {
  return (
    <MockScaler designWidth={720} designHeight={420}>
      <UserscriptsDashboardMock className="h-[420px] w-[720px]" />
    </MockScaler>
  );
}

function UserscriptsInstallDocMock() {
  return (
    <MockScaler designWidth={420} designHeight={540}>
      <InstallFlowMock className="w-[420px]" />
    </MockScaler>
  );
}

function UserscriptsEditorDocMock() {
  return (
    <MockScaler designWidth={760} designHeight={440}>
      <CodeEditorMock className="h-[440px] w-[760px]" />
    </MockScaler>
  );
}

function AgentApprovalDocMock() {
  return (
    <MockScaler designWidth={720} designHeight={440}>
      <AgentAccessMock className="h-[440px] w-[720px]" />
    </MockScaler>
  );
}

const MOCKS: Record<DocMockId, () => ReactNode> = {
  "lumo-chat": LumoChatMock,
  "lumo-models": LumoModelsMock,
  "lumo-mcp": LumoMcpMock,
  "lumo-extension-dialog": LumoExtensionDialogMock,
  "chrome-extensions": ChromeExtensionsMock,
  "userscripts-dashboard": UserscriptsDashboardDocMock,
  "userscripts-install": UserscriptsInstallDocMock,
  "userscripts-editor": UserscriptsEditorDocMock,
  "userscripts-agent": UserscriptsAgentMock,
  "userscripts-general": UserscriptsGeneralMock,
  "agent-approval": AgentApprovalDocMock,
};

/**
 * A docs figure. The mock itself is decorative (`aria-hidden` inside each
 * component); the caption carries the explanation a screen reader needs.
 */
export function DocMock({
  id,
  caption,
}: {
  id: DocMockId;
  caption?: string;
}) {
  const Mock = MOCKS[id];
  return (
    <figure className="my-6 not-prose">
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-stage border border-border bg-stage/60 p-3 sm:p-4"
      >
        <Mock />
      </div>
      {caption ? (
        <figcaption className="mt-2.5 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="min-w-0">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
