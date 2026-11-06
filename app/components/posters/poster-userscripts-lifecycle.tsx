import { useTranslation } from "react-i18next";
import {
  Archive,
  ArrowRight,
  Check,
  History,
  RefreshCw,
  ScrollText,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PosterHeading,
  PosterShell,
  PosterStatus,
} from "./poster-parts";

const FEATURE_ICONS: LucideIcon[] = [Trash2, Archive, RefreshCw, ScrollText];

export function UserscriptsPosterLifecycle() {
  const { t } = useTranslation();
  const features = t("userscripts.control.features", {
    returnObjects: true,
  }) as { title: string; detail: string }[];
  const facts = t("userscripts.runtime.facts", {
    returnObjects: true,
  }) as { label: string; value: string }[];

  return (
    <PosterShell tone="userscripts">
      <div className="grid h-full grid-cols-[430px_minmax(0,1fr)] items-center gap-12">
        <div className="min-w-0">
          <PosterHeading
            eyebrow={t("posters.userscripts.items.lifecycle.eyebrow")}
            title={t("posters.userscripts.items.lifecycle.title")}
            description={t("posters.userscripts.items.lifecycle.subtitle")}
            descriptionClassName="max-w-[390px]"
          />

          <div className="mt-7 rounded-[16px] border border-border/60 bg-card/55 p-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate font-mono text-[10px] text-foreground">
                {t("userscripts.editor.mock.file")}
              </span>
              <PosterStatus
                label={t("posters.userscripts.items.lifecycle.healthy")}
                tone="success"
              />
            </div>
            <div className="mt-2.5 flex items-center gap-2 font-mono text-[9px] text-muted-foreground">
              <span>{t("posters.userscripts.items.lifecycle.version")}</span>
              <ArrowRight className="h-3 w-3 text-brand-emerald" />
              <span className="truncate text-success">
                {t("posters.userscripts.items.lifecycle.logLine")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="rounded-[18px] border border-border/60 bg-card/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[12px] font-semibold text-foreground">
                <History className="h-3.5 w-3.5 text-brand-emerald" />
                {t("posters.userscripts.items.lifecycle.label")}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground">
                {t("posters.userscripts.items.lifecycle.storage")}
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {features.map((feature, featureIndex) => {
                const Icon = FEATURE_ICONS[featureIndex] ?? ScrollText;
                return (
                  <div
                    key={feature.title}
                    className="flex min-w-0 items-center gap-2.5 rounded-[12px] border border-border/55 bg-background/65 px-3 py-2"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/40 text-brand-emerald">
                      <Icon className="h-3 w-3" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold text-foreground">
                        {feature.title}
                      </p>
                      <p className="truncate text-[9px] text-muted-foreground">
                        {feature.detail}
                      </p>
                    </div>
                    <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex min-w-0 flex-col gap-1 rounded-[12px] border border-border/55 bg-card/45 px-3 py-2"
              >
                <span className="truncate text-[9px] text-muted-foreground">
                  {fact.label}
                </span>
                <span className="truncate font-mono text-[10px] text-foreground">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PosterShell>
  );
}
