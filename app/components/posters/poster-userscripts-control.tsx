import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  Archive,
  Check,
  Download,
  FileCode2,
  Globe,
  KeyRound,
  Link2,
  RefreshCw,
  ScrollText,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PermissionTable } from "@/components/mockups/permission-table";
import {
  PosterHeading,
  PosterShell,
} from "./poster-parts";

const FEATURE_ICONS: LucideIcon[] = [Trash2, Archive, RefreshCw, ScrollText];

/**
 * A compact install card for the poster. The full `InstallFlowMock` is taller
 * than the canvas allows beside the permission table, so this keeps the same
 * copy and order at poster density instead of scaling a component that was
 * designed for a page.
 */
function PosterInstallCard() {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-[16px] border border-border/60 bg-card/60">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2.5">
        <span className="flex min-w-0 items-center gap-2 text-[11px] font-semibold text-foreground">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-emerald/15 text-brand-emerald">
            <Download className="h-3 w-3" />
          </span>
          <span className="truncate">{t("userscripts.install.mock.title")}</span>
        </span>
        <code className="shrink-0 rounded-md border border-border/60 bg-muted/30 px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground">
          .user.js
        </code>
      </div>

      <div className="flex flex-col gap-2.5 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/70 px-2.5 py-1.5 text-[9px] text-muted-foreground">
          <Link2 className="h-3 w-3 shrink-0" />
          <span className="truncate font-mono">
            {t("userscripts.install.mock.source")}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-gradient-to-br from-brand-cyan/20 to-brand-violet/10 text-brand-cyan">
            <FileCode2 className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-foreground">
              {t("userscripts.install.mock.name")}
            </p>
            <p className="truncate text-[9px] text-muted-foreground">
              {t("userscripts.install.mock.version")} ·{" "}
              {t("userscripts.install.mock.author")}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {t("userscripts.install.mock.permissions")}
          </p>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            <li className="flex items-center gap-2 text-[9px] text-foreground">
              <Globe className="h-3 w-3 shrink-0 text-brand-cyan" />
              <span className="truncate">
                {t("userscripts.install.mock.permissionOne")}
              </span>
            </li>
            <li className="flex items-center gap-2 text-[9px] text-foreground">
              <KeyRound className="h-3 w-3 shrink-0 text-brand-violet" />
              <span className="truncate">
                {t("userscripts.install.mock.permissionTwo")}
              </span>
            </li>
            <li className="flex items-center gap-2 text-[9px] text-foreground">
              <Link2 className="h-3 w-3 shrink-0 text-brand-emerald" />
              <span className="truncate">
                {t("userscripts.install.mock.permissionThree")}
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-warning/25 bg-warning/10 px-2.5 py-2 text-[9px] leading-[1.4] text-warning">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
          <span className="line-clamp-2">{t("userscripts.install.mock.warning")}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary text-[10px] font-medium text-primary-foreground">
            <Check className="h-3 w-3" />
            {t("userscripts.install.mock.action")}
          </span>
          <span className="inline-flex h-8 items-center justify-center rounded-lg border border-border/60 px-3 text-[10px] font-medium text-foreground">
            {t("userscripts.install.mock.preview")}
          </span>
        </div>
      </div>
    </div>
  );
}

export function UserscriptsPosterControl() {
  const { t } = useTranslation();
  const features = t("userscripts.control.features", {
    returnObjects: true,
  }) as { title: string; detail: string }[];

  return (
    <PosterShell tone="userscripts">
      <div className="flex h-full flex-col pt-6">
        <PosterHeading
          eyebrow={t("posters.userscripts.items.control.eyebrow")}
          title={t("posters.userscripts.items.control.title")}
          description={t("posters.userscripts.items.control.subtitle")}
          className="max-w-[760px]"
          titleSize={56}
          descriptionClassName="max-w-[700px]"
        />

        <div className="mt-4 grid flex-1 grid-cols-[420px_minmax(0,1fr)] items-start gap-4">
          <PosterInstallCard />

          <div className="flex min-w-0 flex-col gap-3">
            <PermissionTable />
            <div className="grid grid-cols-2 gap-2.5">
              {features.map((feature, featureIndex) => {
                const Icon = FEATURE_ICONS[featureIndex] ?? ScrollText;
                return (
                  <div
                    key={feature.title}
                    className="flex min-w-0 items-start gap-2 rounded-[12px] border border-border/60 bg-card/50 px-3 py-2"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/40 text-brand-emerald">
                      <Icon className="h-3 w-3" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-semibold text-foreground">
                        {feature.title}
                      </p>
                      <p className="line-clamp-1 text-[9px] text-muted-foreground">
                        {feature.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PosterShell>
  );
}
