import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyThemeToDocument,
  DEFAULT_THEME,
  isDarkResolved,
  readThemePreference,
  writeThemePreference,
  type ThemeMode,
  type ThemePreference,
} from "./registry";

interface ThemeContextValue {
  preference: ThemePreference;
  systemDark: boolean;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Theme state for the marketing surfaces.
 *
 * The first paint is handled by the inline preload script; this provider only
 * takes over after hydration so it can never overwrite the stored mode with
 * the server default for a frame.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(DEFAULT_THEME);
  const [systemDark, setSystemDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPreference(readThemePreference());
    setSystemDark(
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia(DARK_QUERY).matches
        : false,
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia(DARK_QUERY);
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyThemeToDocument(preference, systemDark);
  }, [hydrated, preference, systemDark]);

  useEffect(() => {
    if (!hydrated) return;
    writeThemePreference(preference);
  }, [hydrated, preference]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== "lumo-site-theme") return;
      setPreference(readThemePreference());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    setPreference({ mode });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      systemDark,
      isDark: isDarkResolved(preference.mode, systemDark),
      setMode,
    }),
    [preference, systemDark, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
