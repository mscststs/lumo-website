import { useTranslation } from "react-i18next";
import {
  Check,
  ChevronDown,
  FileCode2,
  FilePlus2,
  Info,
  MoreHorizontal,
  Palette,
  Plus,
  Puzzle,
  RefreshCw,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

/**
 * Reconstruction of the Lumo Userscripts options window.
 *
 * The real window is a 224px navigation rail on `bg-sidebar` plus one raised
 * content panel (`my-2 mr-2 rounded-card border bg-background shadow-panel`).
 * Page chrome is a single 56px header row — title, then actions — with the tabs
 * or toolbar directly below it. Script rows are a fixed four-column grid:
 * identity tile, name + metadata, relative time (≥sm), switch + actions.
 *
 * The rail collapses to 56px below `md`; the mock shows the expanded desktop
 * state because that is what a product page needs to explain.
 */

const NAV = [
  { key: "scripts", icon: FileCode2, active: true },
  { key: "settings", icon: Settings, active: false },
  { key: "appearance", icon: Palette, active: false },
  { key: "logs", icon: ScrollText, active: false },
  { key: "about", icon: Info, active: false },
] as const;

function AppFrame({
  active,
  children,
  className,
}: {
  active: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-w-0 overflow-hidden rounded-panel border border-border bg-sidebar text-foreground shadow-float",
        className,
      )}
    >
      <aside className="flex w-12 shrink-0 flex-col py-2 sm:w-36">
        <div className="flex h-10 items-center gap-2 px-2.5">
          <BrandMark variant="userscripts" className="h-6 w-6 shrink-0" />
          <p className="hidden min-w-0 truncate text-[10px] font-semibold text-foreground sm:block">
            {t("userscripts.productName")}
          </p>
        </div>
        <div className="flex flex-col gap-0.5 px-1.5 py-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <span
                key={item.key}
                className={cn(
                  "flex h-7 items-center gap-2 rounded-control px-2 text-[11px]",
                  isActive
                    ? "border border-border/60 bg-card font-medium text-foreground shadow-surface"
                    : "text-muted-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    isActive && "text-primary",
                  )}
                />
                <span className="hidden truncate sm:block">
                  {t(`mockUi.usNav.${item.key}`)}
                </span>
                {item.key === "logs" ? (
                  <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-destructive sm:block" />
                ) : null}
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

function PageHeader({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex min-h-11 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border px-3 py-2">
      <h1 className="min-w-0 truncate text-sm font-semibold text-foreground">
        {title}
      </h1>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          {actions}
        </div>
      ) : null}
    </header>
  );
}

function MiniButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "secondary";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 text-[10px] font-medium",
        variant === "primary" && "bg-primary text-primary-foreground shadow-button",
        variant === "outline" &&
          "border border-border bg-card text-foreground shadow-surface",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "ghost" && "text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

interface ScriptRow {
  name: string;
  meta: string;
  badge?: string;
  enabled: boolean;
  error?: string;
}

function ScriptListRow({ script }: { script: ScriptRow }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-x-2.5 rounded-control px-2 py-1.5 transition-colors hover:bg-accent/60 sm:grid-cols-[1.5rem_minmax(0,1fr)_auto_auto]">
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[5px] border border-border bg-gradient-to-br from-brand-cyan/20 to-brand-violet/10 text-brand-cyan",
          !script.enabled && "opacity-45 grayscale",
        )}
      >
        <FileCode2 className="h-3 w-3" />
      </span>
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-1.5">
          <span
            className={cn(
              "min-w-0 truncate text-[11px] font-medium",
              script.enabled ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {script.name}
          </span>
          {script.badge ? (
            <span className="shrink-0 rounded-md border border-primary/25 bg-primary/10 px-1 py-0.5 text-[8px] font-medium text-primary">
              {script.badge}
            </span>
          ) : null}
        </div>
        <p className="min-w-0 truncate text-[9px] text-muted-foreground">
          {script.meta}
        </p>
        {script.error ? (
          <p className="truncate text-[9px] text-destructive">{script.error}</p>
        ) : null}
      </div>
      <span className="hidden whitespace-nowrap text-right text-[9px] tabular-nums text-muted-foreground sm:block">
        {t("mockUi.updatedNow")}
      </span>
      <div className="flex items-center justify-end gap-1">
        <span
          className={cn(
            "relative flex h-3.5 w-6 shrink-0 items-center rounded-full p-0.5",
            script.enabled ? "bg-primary" : "bg-input",
          )}
        >
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full bg-primary-foreground shadow-sm",
              script.enabled && "ml-auto",
            )}
          />
        </span>
        <MoreHorizontal className="h-3 w-3 shrink-0 text-muted-foreground opacity-60" />
      </div>
    </div>
  );
}

export function UserscriptsDashboardMock({
  className,
}: {
  className?: string;
}) {
  const { t } = useTranslation();
  const scripts = t("userscripts.hero.mock.scripts", {
    returnObjects: true,
  }) as ScriptRow[];

  return (
    <AppFrame active="scripts" className={className}>
      <PageHeader
        title={t("mockUi.usNav.scripts")}
        actions={
          <>
            <MiniButton>
              <FilePlus2 className="h-3 w-3" />
              {t("mockUi.newScript")}
            </MiniButton>
            <MiniButton variant="outline">
              <RefreshCw className="h-3 w-3" />
              {t("mockUi.checkUpdates")}
            </MiniButton>
          </>
        }
      />
      <div className="p-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex h-7 min-w-0 flex-1 basis-28 items-center gap-1.5 rounded-control border border-border bg-background px-2 text-[10px] text-muted-foreground">
            <Search className="h-3 w-3 shrink-0" />
            <span className="truncate">{t("mockUi.searchScripts")}</span>
          </span>
          <span className="inline-flex h-7 shrink-0 items-center gap-0.5 rounded-control border border-border bg-muted p-0.5">
            {[
              t("mockUi.filterAll"),
              t("mockUi.filterEnabled"),
              t("mockUi.filterUpdates"),
            ].map((label, index) => (
              <span
                key={label}
                className={cn(
                  "inline-flex h-6 items-center rounded-[0.3rem] px-1.5 text-[9px]",
                  index === 0
                    ? "border border-border/60 bg-card font-medium text-foreground shadow-surface"
                    : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            ))}
          </span>
          <MiniButton variant="ghost">
            <Upload className="h-3 w-3" />
            {t("mockUi.import")}
          </MiniButton>
          <MiniButton variant="ghost">
            <Trash2 className="h-3 w-3" />
            {t("mockUi.trash")}
          </MiniButton>
        </div>

        <div className="mt-2 rounded-card border border-border bg-card p-1 shadow-surface">
          {scripts.map((script) => (
            <ScriptListRow key={script.name} script={script} />
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/**
 * The agent-access approval dialog, mounted above a dimmed options page.
 *
 * This is an interrupt, not a page section — it can appear on any route, so the
 * mock shows it over the scripts list with the real scrim, 32px shield badge,
 * client identity card and the two-action footer.
 */
export function AgentAccessMock({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <div
      aria-hidden="true"
      className={cn("relative min-w-0 overflow-hidden rounded-panel", className)}
    >
      <div className="opacity-40 blur-[0.5px]">
        <UserscriptsDashboardMock />
      </div>
      <div className="absolute inset-0 bg-overlay" />
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-sm overflow-hidden rounded-panel border border-border bg-card p-4 text-foreground shadow-float">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">
                  {t("mockUi.agentDialogTitle")}
                </p>
                <span className="mt-0.5 shrink-0 rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-primary">
                  +1
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {t("mockUi.agentDialogDescription")}
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-control border border-border bg-muted/40 px-2.5 py-2">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <p className="min-w-0 truncate text-xs font-medium text-foreground">
                Lumo
              </p>
              <span className="rounded-md border border-border bg-transparent px-1.5 py-0.5 text-[9px] text-muted-foreground">
                1.0.19
              </span>
            </div>
            <code className="mt-1 block select-all truncate font-mono text-[9px] text-muted-foreground">
              cgfnadidpooocnkalljpdmelmaponefa
            </code>
          </div>

          <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
            {t("mockUi.agentDialogGrants")}
          </p>

          <div className="mt-3 flex items-center justify-end gap-2">
            <span className="inline-flex h-7 items-center rounded-md px-2 text-[11px] font-medium text-muted-foreground">
              {t("mockUi.later")}
            </span>
            <span className="inline-flex h-7 items-center gap-1 rounded-md bg-primary px-2.5 text-[11px] font-medium text-primary-foreground shadow-button">
              <ShieldCheck className="h-3 w-3" />
              {t("mockUi.approve")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingSwitch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "relative flex h-3.5 w-6 shrink-0 items-center rounded-full p-0.5",
        on ? "bg-primary" : "bg-input",
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

function SettingsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-1.5">
      <h3 className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="divide-y divide-border/70 rounded-card border border-border bg-card px-2.5 shadow-surface">
        {children}
      </div>
    </section>
  );
}

function SettingRow({
  label,
  description,
  control,
}: {
  label: string;
  description?: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-foreground">{label}</p>
        {description ? (
          <p className="mt-0.5 text-[9px] leading-4 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

/**
 * Settings → Agent: the durable management surface for the agent endpoint.
 *
 * Shows the queue, the two write gates, the allowlist with the host's ID, and
 * the audit trail. This is the half of the integration the marketing page
 * cannot show with a dialog alone.
 */
export function AgentSettingsMock({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <AppFrame active="settings" className={className}>
      <PageHeader title={t("mockUi.usNav.settings")} />
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
                "relative py-1.5 text-[10px] font-medium",
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
      <div className="flex flex-col gap-2.5 p-2.5">
        <div className="rounded-card border border-warning/30 bg-warning/5 px-2.5 py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium text-foreground">
                Lumo · desktop
              </p>
              <code className="mt-0.5 block truncate font-mono text-[9px] text-muted-foreground">
                cgfnadidpooocnkalljpdmelmaponefa
              </code>
            </div>
            <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-md bg-primary px-2 text-[9px] font-medium text-primary-foreground">
              <Check className="h-2.5 w-2.5" />
              {t("mockUi.approve")}
            </span>
          </div>
        </div>

        <SettingsGroup title={t("mockUi.agentEndpoint")}>
          <SettingRow
            label={t("mockUi.agentEnabled")}
            description={t("mockUi.agentEnabledHint")}
            control={<SettingSwitch on />}
          />
          <SettingRow
            label={t("mockUi.agentPrompt")}
            description={t("mockUi.agentPromptHint")}
            control={<SettingSwitch on />}
          />
        </SettingsGroup>

        <SettingsGroup title={t("mockUi.agentWrites")}>
          <SettingRow
            label={t("mockUi.agentAllowWrites")}
            description={t("mockUi.agentAllowWritesHint")}
            control={<SettingSwitch on />}
          />
          <SettingRow
            label={t("mockUi.agentReview")}
            description={t("mockUi.agentReviewHint")}
            control={<SettingSwitch on />}
          />
        </SettingsGroup>

        <SettingsGroup title={t("mockUi.agentAllowed")}>
          <div className="flex items-center justify-between gap-2 py-2">
            <code className="min-w-0 flex-1 truncate font-mono text-[9px] text-muted-foreground">
              cgfnadidpooocnkalljpdmelmaponefa
            </code>
            <X className="h-3 w-3 shrink-0 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1.5 py-2">
            <span className="flex h-6 min-w-0 flex-1 items-center rounded-md border border-border bg-muted/40 px-1.5 font-mono text-[9px] text-muted-foreground">
              {t("mockUi.extensionId")}
            </span>
            <MiniButton variant="outline">
              <Plus className="h-2.5 w-2.5" />
              {t("mockUi.add")}
            </MiniButton>
          </div>
        </SettingsGroup>

        <SettingsGroup title={t("mockUi.agentActivity")}>
          {[
            { tool: "create", result: "ok", target: "lumo-focus-mode" },
            { tool: "edit", result: "ok", target: "reader-cleanup" },
            { tool: "set_enabled", result: "error", target: "bilibili-quiet" },
          ].map((entry) => (
            <div key={entry.tool} className="flex items-start gap-1.5 py-1.5">
              <span
                className={cn(
                  "shrink-0 rounded-md border px-1 py-0.5 text-[8px] font-medium",
                  entry.result === "ok"
                    ? "border-success/25 bg-success/10 text-success"
                    : "border-destructive/25 bg-destructive/10 text-destructive",
                )}
              >
                {entry.tool}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[9px] text-muted-foreground">
                  {entry.target}
                </p>
                <p className="text-[8px] tabular-nums text-muted-foreground">
                  {t("mockUi.justNow")}
                </p>
              </div>
            </div>
          ))}
        </SettingsGroup>
      </div>
    </AppFrame>
  );
}

/** Small chip used by the popup and by page-level "per-site" callouts. */
export function PerPageScopeChip() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-muted-foreground shadow-surface">
      <Puzzle className="h-3 w-3 text-brand-emerald" />
      {t("mockUi.perPage")}
      <ChevronDown className="h-2.5 w-2.5" />
    </span>
  );
}
