import { useTranslation } from "react-i18next";
import { ArrowRight, Cloud, Database, Laptop, ShieldCheck } from "lucide-react";

function Node({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Laptop;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-card border border-border bg-background/70 px-3 py-4 text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-card text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-[11px] font-semibold text-foreground">{title}</p>
      <p className="text-[9px] leading-4 text-muted-foreground">{detail}</p>
    </div>
  );
}

export function PrivacyDiagram({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div
      aria-hidden="true"
      className={`rounded-panel border border-border bg-card p-4 shadow-card ${className ?? ""}`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-stretch">
          <Node
            icon={Laptop}
            title={t("lumo.privacy.diagram.device")}
            detail={t("common.localFirst")}
          />
          <div className="flex items-center justify-center text-muted-foreground">
            <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
          </div>
          <Node
            icon={Database}
            title={t("lumo.privacy.diagram.storage")}
            detail={t("lumo.privacy.diagram.storageDetail")}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-stretch">
          <div className="flex items-center justify-center text-muted-foreground">
            <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
          </div>
          <Node
            icon={Cloud}
            title={t("lumo.privacy.diagram.provider")}
            detail={t("lumo.privacy.diagram.providerDetail")}
          />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 rounded-control border border-dashed border-success/30 bg-success/5 px-3 py-2 text-[10px] text-success">
        <ShieldCheck className="h-3.5 w-3.5" />
        {t("lumo.privacy.diagram.note")}
      </div>
    </div>
  );
}
