import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BookOpen, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearch } from "@/components/site/search-provider";
import type { DocProduct } from "@/lib/site-manifest";
import { DocsSidebar } from "./docs-sidebar";

export function DocsMobileNav({ product }: { product: DocProduct }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { openSearch } = useSearch();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between gap-2 sm:w-auto"
        >
          <span className="inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {product === "lumo"
              ? t("nav.productLumoName")
              : t("nav.productUserscriptsName")}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(92vw,22rem)] p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle>{t("docs.sidebar")}</SheetTitle>
          <Button
            variant="outline"
            className="mt-2 w-full justify-start gap-2 text-muted-foreground"
            onClick={() => {
              setOpen(false);
              openSearch();
            }}
          >
            <Search className="h-4 w-4" />
            {t("docs.search")}
          </Button>
        </SheetHeader>
        <SheetBody className="px-3 py-4">
          <DocsSidebar product={product} onNavigate={() => setOpen(false)} />
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
