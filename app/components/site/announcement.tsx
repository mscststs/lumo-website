import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function AnnouncementPill({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <Link
      to={href}
      className={cn(
        "group inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-card/60 py-1.5 pl-2 pr-3.5 text-xs text-muted-foreground shadow-surface backdrop-blur transition-colors hover:border-primary/30 hover:text-foreground",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-2xs font-semibold text-primary-ink">
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        {t("home.announcement.label")}
      </span>
      <span className="hidden min-w-0 truncate sm:inline">
        {t("home.announcement.description")}
      </span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
