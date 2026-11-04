import { describe, expect, it } from "vitest";
import { en } from "@/lib/i18n/resources/en";
import { zh } from "@/lib/i18n/resources/zh";
import { getI18n, translate } from "@/lib/i18n/translate";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function flatten(value: Json, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof value === "string") {
    out.set(prefix, value);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      for (const [key, text] of flatten(item, `${prefix}.${index}`)) {
        out.set(key, text);
      }
    });
    return out;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      for (const [path, text] of flatten(child, prefix ? `${prefix}.${key}` : key)) {
        out.set(path, text);
      }
    }
  }
  return out;
}

function placeholders(text: string): string[] {
  return Array.from(text.matchAll(/{{(\w+)}}/g), (match) => match[1] ?? "").sort();
}

describe("i18n resources", () => {
  const enFlat = flatten(en as unknown as Json);
  const zhFlat = flatten(zh as unknown as Json);

  it("has exactly the same key tree in both languages", () => {
    expect([...zhFlat.keys()].sort()).toEqual([...enFlat.keys()].sort());
  });

  it("uses double braces for every interpolation", () => {
    for (const [key, text] of [...enFlat, ...zhFlat]) {
      expect(text, key).not.toMatch(/(^|[^{]){(\w+)}/);
    }
  });

  it("keeps interpolation placeholders in sync", () => {
    for (const [key, text] of enFlat) {
      expect(placeholders(zhFlat.get(key) ?? ""), key).toEqual(placeholders(text));
    }
  });

  it("translates through the locale-specific instance", () => {
    expect(getI18n("zh").t("docs.articleCount", { count: 3 })).toContain("3");
    expect(
      translate("en", "privacy.updated", { date: "Nov 1, 2025" }),
    ).toContain("Nov 1, 2025");
    expect(translate("zh", "home.hero.title")).not.toBe("home.hero.title");
  });
});
