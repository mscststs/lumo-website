import { useTranslation } from "react-i18next";
import {
  Box,
  ChevronDown,
  ChevronRight,
  Cpu,
  FileCode2,
  FolderOpen,
  Info,
  MoreHorizontal,
  Palette,
  Plug,
  Plus,
  Puzzle,
  RefreshCw,
  ScanEye,
  Server,
  Settings,
  ShieldCheck,
  Wifi,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reconstruction of the Lumo options window (`chrome-extension://…/options.html`).
 *
 * The real window is a fixed 224px navigation column on `bg-card`, a grouped
 * nav (Core / Customization / ungrouped), and a 24px-padded scrolling main
 * column capped at `max-w-2xl` for forms. Cards are `rounded-lg` on
 * `bg-card`, rows are 32px, and the only saturated surface is the active nav
 * chip (`bg-accent`). The mock keeps those ratios and uses site tokens so both
 * palettes stay honest.
 */

const NAV_GROUPS = [
  {
    labelKey: "mockUi.groupCore",
    items: [
      { key: "models", icon: Cpu, labelKey: "mockUi.navModels" },
      { key: "ocr", icon: ScanEye, labelKey: "mockUi.navOcr" },
      { key: "mcp", icon: Plug, labelKey: "mockUi.navMcp" },
      { key: "files", icon: FolderOpen, labelKey: "mockUi.navFiles" },
    ],
  },
  {
    labelKey: "mockUi.groupCustomization",
    items: [
      { key: "ui", icon: Palette, labelKey: "mockUi.navUi" },
      { key: "prompt", icon: Settings, labelKey: "mockUi.navPrompt" },
      { key: "commands", icon: Wrench, labelKey: "mockUi.navCommands" },
    ],
  },
  {
    labelKey: null,
    items: [
      { key: "debug", icon: Info, labelKey: "mockUi.navDebug" },
    ],
  },
] as const;

function OptionsNav({ active }: { active: string }) {
  const { t } = useTranslation();
  return (
    <aside className="hidden w-40 shrink-0 flex-col border-e border-border bg-card sm:flex">
      <div className="border-b border-border p-4">
        <h1 className="truncate text-base font-semibold text-foreground">
          {t("mockUi.settingsTitle")}
        </h1>
      </div>
      <div className="flex max-h-full flex-1 flex-col gap-3 overflow-hidden p-2">
        {NAV_GROUPS.map((group, index) => (
          <div
            key={group.labelKey ?? `group-${index}`}
            className={cn(index > 0 && "border-t border-border pt-3")}
          >
            {"labelKey" in group && group.labelKey ? (
              <p className="select-none px-3 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {t(group.labelKey)}
              </p>
            ) : null}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.key === active;
                return (
                  <span
                    key={item.key}
                    className={cn(
                      "flex h-8 items-center gap-2 rounded-md px-3 text-xs",
                      isActive
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{t(item.labelKey)}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ServerRow({
  icon: Icon,
  name,
  description,
}: {
  icon: typeof Server;
  name: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{name}</p>
        <p className="truncate text-[10px] text-muted-foreground">{description}</p>
      </div>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
    </div>
  );
}

export function LumoMcpSettingsMock({ className }: { className?: string }) {
  const { t } = useTranslation();

  const builtins = [
    {
      name: t("lumo.tools.servers.0.name"),
      description: t("lumo.tools.servers.0.detail"),
      icon: Server,
    },
    {
      name: t("lumo.tools.servers.1.name"),
      description: t("lumo.tools.servers.1.detail"),
      icon: FileCode2,
    },
    {
      name: t("lumo.tools.servers.2.name"),
      description: t("lumo.tools.servers.2.detail"),
      icon: Wifi,
    },
    {
      name: t("lumo.tools.servers.3.name"),
      description: t("lumo.tools.servers.3.detail"),
      icon: Box,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-w-0 overflow-hidden rounded-panel border border-border bg-background shadow-float",
        className,
      )}
    >
      <OptionsNav active="mcp" />
      <main className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {t("mockUi.mcpTitle")}
              </h2>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                {t("mockUi.mcpDescription")}
              </p>
            </div>
            <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-border bg-card px-2 text-[10px] font-medium text-foreground shadow-surface">
              <Plus className="h-3 w-3" />
              {t("mockUi.addServer")}
            </span>
          </div>
        </div>

        <section className="mt-4">
          <h3 className="mb-2 text-[11px] font-medium text-muted-foreground">
            {t("mockUi.builtinServers")}
          </h3>
          <div className="flex flex-col gap-1.5">
            {builtins.map((server) => (
              <ServerRow
                key={server.name}
                icon={server.icon}
                name={server.name}
                description={server.description}
              />
            ))}
          </div>
        </section>

        <section className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-medium text-muted-foreground">
              {t("mockUi.extensions")}
            </h3>
            <span className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-card px-1.5 text-[10px] font-medium text-foreground">
              <Plus className="h-2.5 w-2.5" />
              {t("mockUi.addExtension")}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/25 px-2.5 py-2 text-[10px] text-muted-foreground">
            <span>{t("mockUi.thisExtension")}</span>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <code className="max-w-[16ch] truncate rounded border border-border bg-card px-1.5 py-0.5 font-mono">
                cgfnadidpooocnkalljpdmelmaponefa
              </code>
              <ShieldCheck className="h-3 w-3 shrink-0 text-success" />
            </span>
          </div>
          <div className="mt-1.5 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 p-2.5">
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <Puzzle className="h-3.5 w-3.5 shrink-0 text-brand-violet" />
              <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
                Lumo Userscripts
              </span>
              <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[9px] uppercase text-muted-foreground">
                extension
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              <span className="relative flex h-3.5 w-6 shrink-0 items-center rounded-full bg-primary p-0.5">
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-primary-foreground" />
              </span>
              <RefreshCw className="h-3 w-3 shrink-0 text-muted-foreground" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProviderCard({
  name,
  protocol,
  vendor,
  models,
  keyStored,
  expanded,
}: {
  name: string;
  protocol: string;
  vendor?: string;
  models: string[];
  keyStored: boolean;
  expanded?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-start gap-1.5 p-2.5">
        <ChevronDown
          className={cn(
            "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground",
            !expanded && "-rotate-90",
          )}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">{name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1">
            <span className="rounded-md border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
              {protocol}
            </span>
            {vendor ? (
              <span className="rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">
                {vendor}
              </span>
            ) : null}
            {keyStored ? (
              <span className="rounded-md border border-success/25 bg-success/10 px-1.5 py-0.5 text-[9px] text-success">
                {t("mockUi.keyStored")}
              </span>
            ) : null}
          </div>
        </div>
        <span className="inline-flex h-6 shrink-0 items-center gap-0.5 rounded-md px-1.5 text-[10px] text-muted-foreground">
          <Plus className="h-3 w-3" />
        </span>
        <MoreHorizontal className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </div>
      {expanded ? (
        <div className="border-t border-border/60 px-2.5 py-1.5">
          {models.map((model) => (
            <div
              key={model}
              className="flex items-center justify-between gap-2 border-b border-border/40 py-1.5 last:border-0"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                <span className="min-w-0 truncate text-[11px] text-foreground">
                  {model}
                </span>
              </div>
              <span className="shrink-0 text-[9px] text-muted-foreground">vision</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function LumoProviderMock({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-w-0 overflow-hidden rounded-panel border border-border bg-background shadow-float",
        className,
      )}
    >
      <OptionsNav active="models" />
      <main className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              {t("mockUi.providersTitle")}
            </h2>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
              {t("mockUi.providersDescription")}
            </p>
          </div>
          <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-primary px-2 text-[10px] font-medium text-primary-foreground shadow-button">
            <Plus className="h-3 w-3" />
            {t("mockUi.addProvider")}
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <ProviderCard
            name="OpenAI · Production"
            protocol={t("mockUi.protocolChat")}
            models={["gpt-4.1", "gpt-4.1-mini"]}
            keyStored
          />
          <ProviderCard
            name="Anthropic"
            protocol={t("mockUi.protocolAnthropic")}
            models={["claude-sonnet-4-5", "claude-opus-4-1"]}
            keyStored
            expanded
          />
          <ProviderCard
            name="Local gateway"
            protocol={t("mockUi.protocolChat")}
            models={["qwen3-32b"]}
            keyStored={false}
          />
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <ShieldCheck className="h-3 w-3 shrink-0 text-success" />
          {t("mockUi.byokNote")}
        </p>
      </main>
    </div>
  );
}
