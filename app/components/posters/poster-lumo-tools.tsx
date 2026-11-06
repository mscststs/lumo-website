import { useTranslation } from "react-i18next";
import {
  Activity,
  Bug,
  FolderOpen,
  Globe,
  MousePointerClick,
  Puzzle,
  Server,
  Terminal,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PosterHeading,
  PosterShell,
} from "./poster-parts";
import { cn } from "@/lib/utils";

const ITEM_ICONS: LucideIcon[] = [
  Globe,
  MousePointerClick,
  Activity,
  Bug,
  FolderOpen,
  Server,
  Puzzle,
  Wrench,
];

export function LumoPosterTools() {
  const { t } = useTranslation();
  const servers = t("lumo.tools.servers", {
    returnObjects: true,
  }) as { name: string; detail: string; badge: string }[];
  const integrations = t("lumo.tools.integrations", {
    returnObjects: true,
  }) as { title: string; detail: string; badge: string }[];
  const items = [
    ...servers.map((server, itemIndex) => ({
      ...server,
      name: server.name,
      devtools: itemIndex === 3,
      integration: false,
    })),
    ...integrations.map((integration) => ({
      name: integration.title,
      detail: integration.detail,
      badge: integration.badge,
      devtools: false,
      integration: true,
    })),
  ];

  return (
    <PosterShell tone="lumo">
      <div className="grid h-full grid-cols-[420px_minmax(0,1fr)] items-center gap-12">
        <div className="min-w-0">
          <PosterHeading
            eyebrow={t("posters.lumo.items.tools.eyebrow")}
            title={t("posters.lumo.items.tools.title")}
            description={t("posters.lumo.items.tools.subtitle")}
            descriptionClassName="max-w-[390px]"
          />
          <div className="mt-7 inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/55 px-3 py-2">
            <Terminal className="h-3.5 w-3.5 text-brand-violet" />
            <code className="font-mono text-[10px] text-muted-foreground">
              {t("posters.lumo.items.tools.foot")}
            </code>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-2 gap-3">
          {items.map((item, itemIndex) => {
            const Icon = ITEM_ICONS[itemIndex] ?? Server;
            return (
              <div
                key={item.name}
                className={cn(
                  "flex min-w-0 flex-col rounded-[16px] border p-3.5",
                  item.integration
                    ? "border-dashed border-border/60 bg-muted/15"
                    : item.devtools
                      ? "border-brand-violet/30 bg-brand-violet/[0.05]"
                      : "border-border/60 bg-card/55",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                      item.devtools
                        ? "border-brand-violet/25 bg-brand-violet/10 text-brand-violet"
                        : item.integration
                          ? "border-border/60 bg-card/70 text-muted-foreground"
                          : "border-border/60 bg-muted/40 text-primary",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[8px]",
                      item.devtools
                        ? "border-brand-violet/25 bg-brand-violet/10 text-brand-violet"
                        : "border-border/60 bg-muted/30 text-muted-foreground",
                    )}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="mt-3 truncate text-[13px] font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-[1.5] text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </PosterShell>
  );
}
