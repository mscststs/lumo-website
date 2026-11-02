export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const DARK_PALETTES = ["graphite", "midnight"] as const;
export type DarkPalette = (typeof DARK_PALETTES)[number];

export const ACCENT_IDS = ["azure", "violet", "emerald", "amber", "rose"] as const;
export type AccentId = (typeof ACCENT_IDS)[number];

export type PaletteId = "paper" | DarkPalette;

export interface ThemePreference {
  mode: ThemeMode;
  palette: DarkPalette;
  accent: AccentId;
}

export const DEFAULT_THEME: ThemePreference = {
  mode: "system",
  palette: "graphite",
  accent: "azure",
};

export const THEME_STORAGE_KEY = "lumo-site-theme";

export interface PaletteDefinition {
  id: PaletteId;
  scheme: "light" | "dark";
  labelKey: string;
  descriptionKey: string;
  /** Must stay byte-identical to `--color-background` in globals.css. */
  background: string;
  swatch: {
    background: string;
    surface: string;
    border: string;
    foreground: string;
    accent: string;
  };
}

export const PALETTES: Record<PaletteId, PaletteDefinition> = {
  paper: {
    id: "paper",
    scheme: "light",
    labelKey: "theme.paper",
    descriptionKey: "theme.paperDescription",
    background: "oklch(0.985 0.002 95)",
    swatch: {
      background: "oklch(0.985 0.002 95)",
      surface: "oklch(1 0 0)",
      border: "oklch(0.902 0.004 95)",
      foreground: "oklch(0.205 0.008 285)",
      accent: "oklch(0.552 0.17 258)",
    },
  },
  graphite: {
    id: "graphite",
    scheme: "dark",
    labelKey: "theme.graphite",
    descriptionKey: "theme.graphiteDescription",
    background: "oklch(0.168 0.004 270)",
    swatch: {
      background: "oklch(0.168 0.004 270)",
      surface: "oklch(0.205 0.004 270)",
      border: "oklch(0.306 0.006 270)",
      foreground: "oklch(0.962 0.002 270)",
      accent: "oklch(0.78 0.133 258)",
    },
  },
  midnight: {
    id: "midnight",
    scheme: "dark",
    labelKey: "theme.midnight",
    descriptionKey: "theme.midnightDescription",
    background: "oklch(0.196 0.026 262)",
    swatch: {
      background: "oklch(0.196 0.026 262)",
      surface: "oklch(0.232 0.028 262)",
      border: "oklch(0.336 0.03 262)",
      foreground: "oklch(0.958 0.008 262)",
      accent: "oklch(0.79 0.133 258)",
    },
  },
};

export interface AccentDefinition {
  id: AccentId;
  labelKey: string;
  hue: number;
  chroma: number;
  lightness: number;
  swatch: string;
}

export const ACCENTS: Record<AccentId, AccentDefinition> = {
  azure: {
    id: "azure",
    labelKey: "theme.azure",
    hue: 258,
    chroma: 0.17,
    lightness: 0.552,
    swatch: "oklch(0.552 0.17 258)",
  },
  violet: {
    id: "violet",
    labelKey: "theme.violet",
    hue: 296,
    chroma: 0.175,
    lightness: 0.552,
    swatch: "oklch(0.552 0.175 296)",
  },
  emerald: {
    id: "emerald",
    labelKey: "theme.emerald",
    hue: 162,
    chroma: 0.135,
    lightness: 0.535,
    swatch: "oklch(0.535 0.135 162)",
  },
  amber: {
    id: "amber",
    labelKey: "theme.amber",
    hue: 70,
    chroma: 0.135,
    lightness: 0.552,
    swatch: "oklch(0.552 0.135 70)",
  },
  rose: {
    id: "rose",
    labelKey: "theme.rose",
    hue: 18,
    chroma: 0.175,
    lightness: 0.552,
    swatch: "oklch(0.552 0.175 18)",
  },
};

export const DARK_PALETTE_OPTIONS = DARK_PALETTES.map((id) => PALETTES[id]);
export const ACCENT_OPTIONS = ACCENT_IDS.map((id) => ACCENTS[id]);

export function resolvePalette(
  mode: ThemeMode,
  systemDark: boolean,
  darkPalette: DarkPalette,
): PaletteId {
  const dark = mode === "dark" || (mode === "system" && systemDark);
  return dark ? darkPalette : "paper";
}

export function isDarkResolved(
  mode: ThemeMode,
  systemDark: boolean,
): boolean {
  return mode === "dark" || (mode === "system" && systemDark);
}

function isMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && THEME_MODES.includes(value as ThemeMode);
}

function isDarkPalette(value: unknown): value is DarkPalette {
  return typeof value === "string" && DARK_PALETTES.includes(value as DarkPalette);
}

function isAccent(value: unknown): value is AccentId {
  return typeof value === "string" && ACCENT_IDS.includes(value as AccentId);
}

export function normalizeThemePreference(value: unknown): ThemePreference {
  if (!value || typeof value !== "object") return DEFAULT_THEME;
  const record = value as Record<string, unknown>;
  return {
    mode: isMode(record.mode) ? record.mode : DEFAULT_THEME.mode,
    palette: isDarkPalette(record.palette) ? record.palette : DEFAULT_THEME.palette,
    accent: isAccent(record.accent) ? record.accent : DEFAULT_THEME.accent,
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
  const palette = resolvePalette(preference.mode, systemDark, preference.palette);
  root.classList.toggle("dark", dark);
  root.dataset.palette = palette;
  root.dataset.accent = preference.accent;
  root.style.colorScheme = dark ? "dark" : "light";
  root.style.backgroundColor = PALETTES[palette].background;
}

/**
 * Runs in `<head>` before the stylesheet paints. Self-contained on purpose: it
 * is serialised into the document and cannot import anything.
 */
function themePreload() {
  try {
    var key = "lumo-site-theme";
    var root = document.documentElement;
    var raw = localStorage.getItem(key);
    var stored = raw ? JSON.parse(raw) : null;
    var mode = stored && stored.mode ? stored.mode : "system";
    var palette = stored && stored.palette ? stored.palette : "graphite";
    var accent = stored && stored.accent ? stored.accent : "azure";
    var systemDark = !!(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    var dark = mode === "dark" || (mode === "system" && systemDark);
    var resolved = dark ? palette : "paper";
    root.classList.toggle("dark", dark);
    root.dataset.palette = resolved;
    root.dataset.accent = accent;
    root.style.colorScheme = dark ? "dark" : "light";
    var backgrounds = {
      paper: "oklch(0.985 0.002 95)",
      graphite: "oklch(0.168 0.004 270)",
      midnight: "oklch(0.196 0.026 262)",
    };
    root.style.backgroundColor =
      backgrounds[resolved as keyof typeof backgrounds] || backgrounds.paper;
  } catch {
    /* First paint falls back to the CSS media query. */
  }
}

export const THEME_PRELOAD_SCRIPT = `(${themePreload.toString()})();`;
