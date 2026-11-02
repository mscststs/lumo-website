import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  ACCENTS,
  ACCENT_IDS,
  DEFAULT_THEME,
  PALETTES,
  normalizeThemePreference,
  resolvePalette,
} from "@/lib/theme/registry";

const CSS = readFileSync(resolve(process.cwd(), "app/styles/globals.css"), "utf8");

function oklchToLinearRgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const lPrime = l + 0.3963377774 * a + 0.2158037573 * b;
  const mPrime = l - 0.1055613458 * a - 0.0638541728 * b;
  const sPrime = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = lPrime ** 3;
  const m3 = mPrime ** 3;
  const s3 = sPrime ** 3;

  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ].map((value) => Math.min(1, Math.max(0, value))) as [number, number, number];
}

function luminance(l: number, c: number, h: number): number {
  const [r, g, b] = oklchToLinearRgb(l, c, h);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const l1 = luminance(...a);
  const l2 = luminance(...b);
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

describe("theme registry", () => {
  it("keeps every palette background identical to the stylesheet", () => {
    for (const palette of Object.values(PALETTES)) {
      expect(CSS).toContain(`--color-background: ${palette.background};`);
    }
  });

  it("declares every accent axis in the stylesheet", () => {
    for (const id of ACCENT_IDS) {
      expect(CSS).toContain(`[data-accent="${id}"]`);
      expect(ACCENTS[id].hue).toBeGreaterThan(0);
      expect(ACCENTS[id].chroma).toBeGreaterThan(0);
    }
  });

  it("resolves light and dark palettes", () => {
    expect(resolvePalette("light", true, "midnight")).toBe("paper");
    expect(resolvePalette("dark", false, "midnight")).toBe("midnight");
    expect(resolvePalette("system", true, "graphite")).toBe("graphite");
    expect(resolvePalette("system", false, "graphite")).toBe("paper");
  });

  it("normalises unknown preferences to the default", () => {
    expect(normalizeThemePreference(null)).toEqual(DEFAULT_THEME);
    expect(
      normalizeThemePreference({ mode: "neon", palette: "pink", accent: "gold" }),
    ).toEqual(DEFAULT_THEME);
    expect(
      normalizeThemePreference({ mode: "dark", palette: "midnight", accent: "rose" }),
    ).toEqual({ mode: "dark", palette: "midnight", accent: "rose" });
  });

  it("keeps solid accent buttons above AA contrast", () => {
    for (const accent of Object.values(ACCENTS)) {
      const light = contrast(
        [accent.lightness, accent.chroma, accent.hue],
        [0.995, 0, 0],
      );
      expect(light, `light ${accent.id}`).toBeGreaterThanOrEqual(4.5);

      const dark = contrast(
        [0.78, accent.chroma * 0.78, accent.hue],
        [0.185, 0.015, accent.hue],
      );
      expect(dark, `dark ${accent.id}`).toBeGreaterThanOrEqual(4.5);
    }
  });
});
