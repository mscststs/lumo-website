import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { en } from "@/lib/i18n/resources/en";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function flatten(value: Json, prefix = ""): Set<string> {
  const out = new Set<string>();
  if (typeof value === "string") {
    out.add(prefix);
    return out;
  }
  if (Array.isArray(value)) {
    if (prefix) out.add(prefix);
    value.forEach((item, index) => {
      for (const path of flatten(item, `${prefix}.${index}`)) out.add(path);
    });
    return out;
  }
  if (value && typeof value === "object") {
    if (prefix) out.add(prefix);
    for (const [key, child] of Object.entries(value)) {
      for (const path of flatten(child, prefix ? `${prefix}.${key}` : key)) {
        out.add(path);
      }
    }
  }
  return out;
}

const FILES = [
  "app/routes",
  "app/components",
  "app/lib/seo.ts",
];

function walk(dir: string): string[] {
  const url = resolve(process.cwd(), dir);
  if (url.endsWith(".ts")) return [url];
  return readdirSync(url).flatMap((entry) => {
    const path = resolve(url, entry);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".tsx") || path.endsWith(".ts") ? [path] : [];
  });
}

describe("i18n key usage", () => {
  it("only references keys that exist in the English resource", () => {
    const keys = flatten(en as unknown as Json);
    const missing = new Set<string>();
    for (const file of FILES.flatMap(walk)) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/\bt\(\s*["']([^"']+)["']/g)) {
        const key = match[1];
        if (key && !keys.has(key)) missing.add(`${key} (${file.replace(process.cwd(), "")})`);
      }
    }
    expect([...missing]).toEqual([]);
  });
});
