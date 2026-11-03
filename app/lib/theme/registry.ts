export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export interface ThemePreference {
  mode: ThemeMode;
}

/**
 * Mode is the only selectable axis: light is Paper, dark is always Midnight.
 */
export const DEFAULT_THEME: ThemePreference = {
  mode: "system",
};

export const THEME_STORAGE_KEY = "lumo-site-theme";

/**
 * Shell background per resolved scheme. Must stay byte-identical to
 * `--color-background` in globals.css.
 */
export const THEME_BACKGROUND = {
  light: "oklch(0.985 0.002 95)",
  dark: "oklch(0.196 0.026 262)",
} as const;

export function isDarkResolved(mode: ThemeMode, systemDark: boolean): boolean {
  return mode === "dark" || (mode === "system" && systemDark);
}

function isMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && THEME_MODES.includes(value as ThemeMode);
}

/**
 * Older builds stored `palette` and `accent` next to `mode`; both axes are
 * gone, so unknown keys are dropped and only a valid mode survives.
 */
export function normalizeThemePreference(value: unknown): ThemePreference {
  if (!value || typeof value !== "object") return DEFAULT_THEME;
  const record = value as Record<string, unknown>;
  return {
    mode: isMode(record.mode) ? record.mode : DEFAULT_THEME.mode,
  };
}

export function readThemePreference(): ThemePreference {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return DEFAULT_THEME;
    return normalizeThemePreference(JSON.parse(raw));
  } catch {
    return DEFAULT_THEME;
  }
}

export function writeThemePreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference));
  } catch {
    // Private mode / storage disabled: the in-memory preference still applies.
  }
}

export function applyThemeToDocument(
  preference: ThemePreference,
  systemDark: boolean,
): void {
  const root = document.documentElement;
  const dark = isDarkResolved(preference.mode, systemDark);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  root.style.backgroundColor = dark
    ? THEME_BACKGROUND.dark
    : THEME_BACKGROUND.light;
}

/**
 * Runs in `<head>` before the stylesheet paints. Self-contained on purpose: it
 * is serialised into the document and cannot import anything — the background
 * literals mirror `THEME_BACKGROUND`.
 */
function themePreload() {
  try {
    var key = "lumo-site-theme";
    var root = document.documentElement;
    var raw = localStorage.getItem(key);
    var stored = raw ? JSON.parse(raw) : null;
    var mode = stored && stored.mode ? stored.mode : "system";
    var systemDark = !!(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    var dark = mode === "dark" || (mode === "system" && systemDark);
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    root.style.backgroundColor = dark
      ? "oklch(0.196 0.026 262)"
      : "oklch(0.985 0.002 95)";
  } catch {
    /* First paint falls back to the stylesheet defaults. */
  }
}

export const THEME_PRELOAD_SCRIPT = `(${themePreload.toString()})();`;
