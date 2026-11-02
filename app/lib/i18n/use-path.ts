import { useCallback } from "react";
import { localePath } from "@/lib/site-manifest";
import { useLocale } from "./index";

/** Prefixes an unprefixed path with the active locale. */
export function useLocalePath() {
  const locale = useLocale();
  return useCallback(
    (path: string) => localePath(locale, path),
    [locale],
  );
}
