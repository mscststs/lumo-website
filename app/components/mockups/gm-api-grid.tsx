import { useTranslation } from "react-i18next";
import { Code2 } from "lucide-react";

export function GmApiGrid({ className }: { className?: string }) {
  const { t } = useTranslation();
  const items = t("userscripts.apis.items", {
    returnObjects: true,
  }) as { name: string; detail: string }[];

  return (
    <div
      className={`grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}
    >
      {items.map((item) => (
        <div
          key={item.name}
          className="group flex items-start gap-2.5 rounded-control border border-border bg-card px-3 py-2.5 shadow-surface transition-colors hover:border-primary/25"
        >
          <Code2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="truncate font-mono text-[11px] font-medium text-foreground">
              {item.name}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
