import { useTranslation } from "react-i18next";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { THEME_MODES, type ThemeMode } from "@/lib/theme/registry";
import { cn } from "@/lib/utils";

const MODE_ICON = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export function ThemeMenu({
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
  const { preference, isDark, setMode } = useTheme();
  const Icon = isDark ? Moon : Sun;

  return (
    <DropdownMenu modal={modal}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="iconSm"
          className={cn("text-muted-foreground", className)}
          aria-label={t("a11y.changeTheme")}
          title={t("theme.title")}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{t("theme.mode")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference.mode}
          onValueChange={(value) => setMode(value as ThemeMode)}
        >
          {THEME_MODES.map((mode) => {
            const ModeIcon = MODE_ICON[mode];
            return (
              <DropdownMenuRadioItem key={mode} value={mode}>
                <ModeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {t(`theme.${mode}`)}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
