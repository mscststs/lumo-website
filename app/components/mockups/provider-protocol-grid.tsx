import { useTranslation } from "react-i18next";
import { Box, Braces, MessagesSquare, Server, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PROTOCOLS: {
  id: string;
  icon: LucideIcon;
  endpoint: string;
  tone: "cyan" | "violet" | "emerald";
}[] = [
  { id: "chat", icon: MessagesSquare, endpoint: "POST /v1/chat/completions", tone: "cyan" },
  { id: "responses", icon: Sparkles, endpoint: "POST /v1/responses", tone: "violet" },
  { id: "anthropic", icon: Braces, endpoint: "POST /v1/messages", tone: "emerald" },
];

/**
 * Four ways to reach a model — three wire protocols and one vendor.
 *
 * OpenCode is deliberately in the same grid but with a different badge: it
 * speaks all three protocols, yet it is not "just another gateway" (its paths,
 * identifying header and per-conversation session routing are vendor-specific).
 */
export function ProviderProtocolGrid({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div className={cn("grid grid-cols-1 gap-2.5 sm:grid-cols-3", className)}>
      {PROTOCOLS.map((protocol) => {
        const Icon = protocol.icon;
        return (
          <div
            key={protocol.id}
            className="group flex min-w-0 flex-col gap-2 rounded-card border border-border bg-card p-3.5 shadow-surface transition-colors hover:border-primary/25"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-control border",
                  protocol.tone === "cyan" && "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan",
                  protocol.tone === "violet" &&
                    "border-brand-violet/25 bg-brand-violet/10 text-brand-violet",
                  protocol.tone === "emerald" &&
                    "border-brand-emerald/25 bg-brand-emerald/10 text-brand-emerald",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {t(`lumo.providers.items.${protocol.id}.name`)}
              </h3>
              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                {t(`lumo.providers.items.${protocol.id}.detail`)}
              </p>
            </div>
            <code className="mt-auto block truncate rounded-md border border-border/70 bg-muted/40 px-2 py-1 font-mono text-[10px] text-muted-foreground">
              {protocol.endpoint}
            </code>
          </div>
        );
      })}
    </div>
  );
}

const DEVTOOLS_TOOLS = [
  { id: "session", icon: Server },
  { id: "input", icon: Sparkles },
  { id: "emulate", icon: Box },
  { id: "console", icon: Braces },
] as const;

/**
 * The DevTools Advanced server's four CDP-backed tools.
 *
 * These are the difference between "click the element you can see" and "drive
 * the browser the way DevTools does": trusted input events, device/network
 * emulation and the console stream all require `chrome.debugger` + CDP, which a
 * content script can never reach.
 */
export function DevToolsToolGrid({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <div className={cn("grid grid-cols-1 gap-2.5 sm:grid-cols-3", className)}>
      {DEVTOOLS_TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <div
            key={tool.id}
            className="flex min-w-0 items-start gap-2.5 rounded-card border border-border bg-card p-3.5 shadow-surface"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-brand-violet/25 bg-brand-violet/10 text-brand-violet">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <code className="block truncate font-mono text-[11px] font-medium text-foreground">
                debug_{tool.id}
              </code>
              <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
                {t(`lumo.tools.devtoolsTools.${tool.id}`)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
