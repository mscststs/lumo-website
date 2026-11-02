import { useTranslation } from "react-i18next";
import {
  Activity,
  Bug,
  FolderOpen,
  Globe,
  MousePointerClick,
  Plus,
  Puzzle,
  Server,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SERVER_ICONS: LucideIcon[] = [
  Globe,
  MousePointerClick,
  Activity,
  Bug,
  FolderOpen,
];

const INTEGRATION_ICONS: LucideIcon[] = [Server, Puzzle, Wrench];

/**
 * The tool surface as the product presents it: five built-in MCP servers, then
 * the three ways to add more (remote servers, sibling-extension providers and
 * WebMCP pages). DevTools Advanced carries an explicit CDP badge because it is
 * the one server that needs `chrome.debugger`, not just extension APIs.
 */
export function McpServerGrid({ className }: { className?: string }) {
  const { t } = useTranslation();
  const servers = t("lumo.tools.servers", {
    returnObjects: true,
  }) as { name: string; detail: string; badge: string }[];
  const integrations = t("lumo.tools.integrations", {
    returnObjects: true,
  }) as { title: string; detail: string; badge: string }[];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {servers.map((server, index) => {
        const Icon = SERVER_ICONS[index] ?? Server;
        const devtools = index === 3;
        return (
          <div
            key={server.name}
            className={cn(
              "group flex flex-col rounded-card border bg-card p-5 shadow-surface transition-colors",
              devtools
                ? "border-brand-violet/30"
                : "border-border hover:border-primary/25",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-control border",
                  devtools
                    ? "border-brand-violet/25 bg-brand-violet/10 text-brand-violet"
                    : "border-border bg-muted/50 text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <Badge variant={devtools ? "accent" : "outline"}>
                {server.badge}
              </Badge>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              {server.name}
            </h3>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              {server.detail}
            </p>
          </div>
        );
      })}

      {integrations.map((integration, index) => {
        const Icon = INTEGRATION_ICONS[index] ?? Plus;
        return (
          <div
            key={integration.title}
            className="flex flex-col rounded-card border border-dashed border-border bg-muted/20 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-card text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <Badge variant="outline">{integration.badge}</Badge>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              {integration.title}
            </h3>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              {integration.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}
