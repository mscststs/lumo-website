import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { useSearch } from "./search-provider";

export function SearchTrigger() {
  const { t } = useTranslation();
  const { openSearch } = useSearch();

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="hidden h-10 items-center gap-2 rounded-control border border-border bg-card/60 px-3 text-sm text-muted-foreground shadow-surface transition-colors hover:border-input hover:bg-accent hover:text-foreground md:inline-flex"
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="hidden xl:inline">{t("common.search")}</span>
        <Kbd className="ml-0.5 hidden xl:inline-flex">⌘K</Kbd>
      </button>
      <button
        type="button"
        onClick={openSearch}
        aria-label={t("a11y.openSearch")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-control text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
      >
        <Search className="h-4 w-4" />
      </button>
    </>
  );
}
