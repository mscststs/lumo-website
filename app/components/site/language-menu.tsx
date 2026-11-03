import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { writeLocalePreference } from "@/lib/i18n/detect";
import {
  LOCALES,
  LOCALE_META,
  switchLocaleHref,
  type Locale,
} from "@/lib/site-manifest";
import { cn } from "@/lib/utils";

export function LanguageMenu({
  className,
  modal,
}: {
  className?: string;
  /**
   * `false` keeps the page scrollable and the viewport scrollbar in place
   * while the menu is open — required for header/footer popovers, where a
   * scroll lock would shift the fixed header by the scrollbar width. Keep the
   * Radix default (`true`) when rendered inside a dialog or sheet.
   */
  modal?: boolean;
}) {
  const { t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (value: string) => {
    const next = value as Locale;
    if (next === locale) return;
    // Persist before navigating: the boot script enforces this choice on the
    // next root visit, and the provider's own effect would only run later.
    writeLocalePreference(next);
    // Plain `navigate`: the href is already fully localized for the *target*
    // locale, and the localized primitives would re-prefix it for the current
    // one. Path, query and hash all survive the switch.
    navigate(switchLocaleHref(location, next));
  };

  return (
    <DropdownMenu modal={modal}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-1.5 px-2.5 text-muted-foreground", className)}
          title={t("language.title")}
        >
          <Languages className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t("a11y.changeLanguage")}</span>
          <span className="text-xs font-medium">
            {locale === "en" ? "EN" : "中文"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{t("language.title")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale} onValueChange={onChange}>
          {LOCALES.map((id) => (
            <DropdownMenuRadioItem key={id} value={id}>
              {LOCALE_META[id].nativeLabel}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
