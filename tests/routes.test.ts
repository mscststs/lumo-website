import { describe, expect, it } from "vitest";
import {
  docPath,
  getLocale,
  isDocsPath,
  localePath,
  productPath,
  stripLocale,
  switchLocalePath,
} from "@/lib/site-manifest";

describe("locale-aware paths", () => {
  it("detects the locale from the first segment", () => {
    expect(getLocale("/")).toBe("en");
    expect(getLocale("/lumo")).toBe("en");
    expect(getLocale("/zh")).toBe("zh");
    expect(getLocale("/zh/docs/mcp")).toBe("zh");
  });

  it("strips and restores the locale prefix", () => {
    expect(stripLocale("/zh")).toBe("/");
    expect(stripLocale("/zh/lumo")).toBe("/lumo");
    expect(stripLocale("/zh/docs/mcp/")).toBe("/docs/mcp");
    expect(localePath("en", "/lumo")).toBe("/lumo");
    expect(localePath("zh", "/lumo")).toBe("/zh/lumo");
    expect(localePath("zh", "/")).toBe("/zh");
  });

  it("switches language without losing the document", () => {
    expect(switchLocalePath("/lumo", "zh")).toBe("/zh/lumo");
    expect(switchLocalePath("/zh/docs/mcp", "en")).toBe("/docs/mcp");
  });

  it("builds docs and product paths", () => {
    expect(docPath("en", "index")).toBe("/docs");
    expect(docPath("zh", "mcp")).toBe("/zh/docs/mcp");
    expect(productPath("zh", "userscripts")).toBe("/zh/userscripts");
    expect(isDocsPath("/zh/docs")).toBe(true);
    expect(isDocsPath("/zh/lumo")).toBe(false);
  });
});
