import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  Check,
  Download,
  FileCode2,
  Globe,
  KeyRound,
  Link2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InstallFlowMock({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-panel border border-border bg-card shadow-float ${className ?? ""}`}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-control bg-brand-emerald/15 text-brand-emerald">
            <Download className="h-3.5 w-3.5" />
          </span>
          {t("userscripts.install.mock.title")}
        </div>
        <Badge variant="outline">.user.js</Badge>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2 rounded-control border border-border bg-background px-3 py-2 text-[11px] text-muted-foreground">
          <Link2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate font-mono">
            {t("userscripts.install.mock.source")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-border bg-gradient-to-br from-brand-cyan/20 to-brand-violet/10 text-brand-cyan">
            <FileCode2 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {t("userscripts.install.mock.name")}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {t("userscripts.install.mock.version")} ·{" "}
              {t("userscripts.install.mock.author")}
            </p>
          </div>
        </div>

        <div className="rounded-control border border-border bg-muted/30 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {t("userscripts.install.mock.permissions")}
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            <li className="flex items-center gap-2 text-[11px] text-foreground">
              <Globe className="h-3.5 w-3.5 shrink-0 text-brand-cyan" />
              {t("userscripts.install.mock.permissionOne")}
            </li>
            <li className="flex items-center gap-2 text-[11px] text-foreground">
              <KeyRound className="h-3.5 w-3.5 shrink-0 text-brand-violet" />
              {t("userscripts.install.mock.permissionTwo")}
            </li>
            <li className="flex items-center gap-2 text-[11px] text-foreground">
              <Link2 className="h-3.5 w-3.5 shrink-0 text-brand-emerald" />
              {t("userscripts.install.mock.permissionThree")}
            </li>
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-control border border-warning/25 bg-warning/10 p-2.5 text-[10px] leading-4 text-warning">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {t("userscripts.install.mock.warning")}
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-control bg-primary text-[11px] font-medium text-primary-foreground shadow-button">
            <Check className="h-3.5 w-3.5" />
            {t("userscripts.install.mock.action")}
          </span>
          <span className="inline-flex h-9 items-center justify-center rounded-control border border-border px-3 text-[11px] font-medium text-foreground">
            {t("userscripts.install.mock.preview")}
          </span>
        </div>
      </div>
    </div>
  );
}
