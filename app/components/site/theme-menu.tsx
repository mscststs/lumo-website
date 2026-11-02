import { useTranslation } from "react-i18next";
import {
  Check,
  Monitor,
  Moon,
  Palette,
  Sun,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import {
  ACCENT_OPTIONS,
  DARK_PALETTE_OPTIONS,
  THEME_MODES,
} from "@/lib/theme/registry";
import { cn } from "@/lib/utils";

const MODE_ICON = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export function ThemeMenu({ className }: { className?: string }) {
  const { t } = useTranslation();
  const {
    preference,
    isDark,
    setMode,
    setPalette,
    setAccent,
  } = useTheme();
  const Icon = isDark ? Moon : Sun;

  return (
    <DropdownMenu>
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
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>{t("theme.mode")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference.mode}
          onValueChange={(value) =>
            setMode(value as (typeof THEME_MODES)[number])
          }
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

        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t("theme.palette")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference.palette}
          onValueChange={(value) =>
            setPalette(value as import("@/lib/theme/registry").DarkPalette)
          }
        >
          {DARK_PALETTE_OPTIONS.map((palette) => (
            <DropdownMenuRadioItem key={palette.id} value={palette.id}>
              <span
                aria-hidden="true"
                className="mr-2 h-4 w-4 shrink-0 rounded-[5px] border"
                style={{
                  backgroundColor: palette.swatch.background,
                  borderColor: palette.swatch.border,
                }}
              />
              <span className="flex min-w-0 flex-col">
                <span>{t(palette.labelKey)}</span>
                <span className="truncate text-2xs text-muted-foreground">
                  {t(palette.descriptionKey)}
                </span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-3.5 w-3.5" />
          {t("theme.accent")}
        </DropdownMenuLabel>
        <div className="flex items-center gap-1.5 px-2 pb-1 pt-1">
          {ACCENT_OPTIONS.map((accent) => {
            const selected = preference.accent === accent.id;
            return (
              <button
                key={accent.id}
                type="button"
                aria-label={t(accent.labelKey)}
                aria-pressed={selected}
                title={t(accent.labelKey)}
                onClick={() => setAccent(accent.id)}
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border border-border/70 transition-transform hover:scale-105",
                  selected && "ring-2 ring-ring ring-offset-2 ring-offset-popover",
                )}
                style={{ backgroundColor: accent.swatch }}
              >
                {selected ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-card text-foreground shadow-surface">
                    <Check className="h-3 w-3" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
