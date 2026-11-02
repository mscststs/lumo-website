import { useTranslation } from "react-i18next";
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  KeyRound,
  Lock,
  Plug,
  ShieldCheck,
  Terminal,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The two-layer extension-provider bridge, drawn from the wire contract.
 *
 * L0 is one stateless `chrome.runtime.sendMessage` probe that answers
 * "installed / enabled / authorized / ready" without failing a handshake. L1
 * is standard MCP over a `chrome.runtime.Port` named `lumo:mcp`. The approval
 * happens in the provider's own settings, which is why it sits between the two
 * layers rather than inside either one.
 */
export function AgentBridgeDiagram({ className }: { className?: string }) {
  const { t } = useTranslation();

  const rows = [
    {
      step: "L0",
      icon: ArrowLeftRight,
      label: t("userscripts.agent.bridge.probe"),
      code: "sendMessage(extId, { channel: 'lumo:probe' })",
      tone: "cyan",
    },
    {
      step: "L0",
      icon: Plug,
      label: t("userscripts.agent.bridge.probeReply"),
      code: "{ service, status: { enabled, authorized, ready } }",
      tone: "cyan",
    },
    {
      step: "—",
      icon: ShieldCheck,
      label: t("userscripts.agent.bridge.approval"),
      code: "settings → agent → allowedExtensionIds",
      tone: "amber",
    },
    {
      step: "L1",
      icon: Terminal,
      label: t("userscripts.agent.bridge.port"),
      code: "connect(extId, { name: 'lumo:mcp' })",
      tone: "violet",
    },
    {
      step: "L1",
      icon: Wrench,
      label: t("userscripts.agent.bridge.tools"),
      code: "tools/list · tools/call",
      tone: "violet",
    },
  ] as const;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-panel border border-border bg-card shadow-float",
        className,
      )}
    >
      <div className="grid grid-cols-2 border-b border-border">
        <div className="flex items-center gap-2 border-e border-border px-3 py-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-primary/25 bg-primary/10 font-mono text-[9px] font-semibold text-primary">
            H
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-foreground">Lumo</p>
            <p className="truncate text-[9px] text-muted-foreground">
              {t("userscripts.agent.bridge.host")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-3 py-2.5">
          <div className="min-w-0 text-right">
            <p className="truncate text-[11px] font-semibold text-foreground">
              Lumo Userscripts
            </p>
            <p className="truncate text-[9px] text-muted-foreground">
              {t("userscripts.agent.bridge.provider")}
            </p>
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-brand-emerald/25 bg-brand-emerald/10 font-mono text-[9px] font-semibold text-brand-emerald">
            P
          </span>
        </div>
      </div>

      <div className="relative flex flex-col gap-1.5 p-3">
        <span
          aria-hidden="true"
          className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-border"
        />
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.code}
              className="relative z-10 flex items-center gap-2 rounded-control border border-border bg-background px-2.5 py-2 shadow-surface"
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                  row.tone === "cyan" &&
                    "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan",
                  row.tone === "amber" &&
                    "border-warning/25 bg-warning/10 text-warning",
                  row.tone === "violet" &&
                    "border-brand-violet/25 bg-brand-violet/10 text-brand-violet",
                )}
              >
                <Icon className="h-3 w-3" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="shrink-0 rounded border border-border px-1 font-mono text-[8px] uppercase text-muted-foreground">
                    {row.step}
                  </span>
                  <p className="truncate text-[10px] font-medium text-foreground">
                    {row.label}
                  </p>
                </div>
                <code className="mt-0.5 block truncate font-mono text-[9px] text-muted-foreground">
                  {row.code}
                </code>
              </div>
              <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/50" />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 border-t border-border">
        {[
          { icon: Lock, label: t("userscripts.agent.bridge.invariantAuth") },
          { icon: KeyRound, label: t("userscripts.agent.bridge.invariantPolicy") },
          { icon: Check, label: t("userscripts.agent.bridge.invariantAudit") },
        ].map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-1 border-e border-border px-2.5 py-2 last:border-e-0"
          >
            <fact.icon className="h-3 w-3 text-muted-foreground" />
            <span className="text-[9px] leading-4 text-muted-foreground">
              {fact.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The seven tools the provider registers, with their write classification.
 *
 * The table is the honest answer to "what can the agent actually do": read
 * tools are always available once authorized, write tools additionally need
 * `allowWrites`, and every write is rate-limited and audited.
 */
export function AgentToolTable({ className }: { className?: string }) {
  const { t } = useTranslation();
  const tools = t("userscripts.agent.tools", {
    returnObjects: true,
  }) as { name: string; detail: string; access: string }[];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-border bg-card shadow-surface",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
          <Wrench className="h-3.5 w-3.5 text-primary" />
          {t("userscripts.agent.tableTitle")}
        </span>
        <span className="font-mono text-[9px] text-muted-foreground">
          namespace: userscripts
        </span>
      </div>
      <div className="divide-y divide-border/70">
        {tools.map((tool) => {
          const write = tool.access === "write";
          return (
            <div
              key={tool.name}
              className="flex items-start gap-2.5 px-3 py-2"
            >
              <code className="w-24 shrink-0 truncate font-mono text-[10px] font-medium text-foreground sm:w-28">
                {tool.name}
              </code>
              <p className="min-w-0 flex-1 text-[10px] leading-4 text-muted-foreground">
                {tool.detail}
              </p>
              <span
                className={cn(
                  "shrink-0 rounded-md border px-1.5 py-0.5 text-[8px] font-medium uppercase",
                  write
                    ? "border-warning/30 bg-warning/10 text-warning"
                    : "border-success/25 bg-success/10 text-success",
                )}
              >
                {t(write ? "userscripts.agent.write" : "userscripts.agent.read")}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-1.5 border-t border-border px-3 py-2 text-[9px] text-muted-foreground">
        <ShieldCheck className="h-3 w-3 shrink-0 text-success" />
        {t("userscripts.agent.tableFootnote")}
      </div>
    </div>
  );
}
