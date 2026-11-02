import { promises as fs } from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("build/client");

// Keep in sync with SITE_ORIGIN_PLACEHOLDER in app/lib/site-origin.ts; the
// Worker swaps it for the request origin, so no build-time domain is needed.
const SITE_ORIGIN_PLACEHOLDER = "https://site.invalid";

const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  SITE_ORIGIN_PLACEHOLDER
)
  .trim()
  .replace(/\/$/, "");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : Promise.resolve([path.join(dir, entry.name)]),
    ),
  );
  return files.flat();
}

function toPath(file) {
  const relative = path.relative(OUT_DIR, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"/index.html".length)}/`;
  }
  return `/${relative.replace(/\.html$/, "")}`;
}

function withSlash(value) {
  if (!value || value === "/") return "/";
  return value.endsWith("/") ? value : `${value}/`;
}

function alternate(url, locale) {
  const clean = url === "/" ? "/" : url.replace(/\/$/, "");
  const next =
    locale === "zh"
      ? clean.replace(/^\/zh/, "") || "/"
      : clean === "/"
        ? "/zh"
        : `/zh${clean}`;
  return `${SITE_URL}${withSlash(next) === "/" ? "/" : withSlash(next)}`;
}

const files = (await walk(OUT_DIR)).filter(
  (file) =>
    file.endsWith(".html") &&
    !file.endsWith("404.html") &&
    !file.endsWith("__spa-fallback.html") &&
    !file.includes("/404/"),
);

const urls = Array.from(new Set(files.map(toPath))).sort((a, b) => {
  if (a === "/") return -1;
  if (b === "/") return 1;
  return a.localeCompare(b);
});

const entries = urls
  .map((url) => {
    const locale = url === "/zh" || url.startsWith("/zh/") ? "zh" : "en";
    const other = locale === "zh" ? "en" : "zh";
    const locPath = withSlash(url);
    const loc = `${SITE_URL}${locPath === "/" ? "/" : locPath}`;
    const defaultPath = withSlash(url.replace(/^\/zh/, "") || "/");
    const defaultUrl = `${SITE_URL}${defaultPath === "/" ? "/" : defaultPath}`;
    return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="${locale === "zh" ? "zh-CN" : "en"}" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="${other === "zh" ? "zh-CN" : "en"}" href="${alternate(url, locale)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>
    <changefreq>weekly</changefreq>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;

await fs.writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemap, "utf8");
await fs.writeFile(
  path.join(OUT_DIR, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "utf8",
);

// Workers static assets serve `404.html` for unknown URLs with a real 404
// status (not_found_handling = "404-page"). Prefer the pre-rendered /404 page so
// the response has branded content and hydrates against the requested path;
// fall back to the SPA shell if absent.
try {
  await fs.copyFile(
    path.join(OUT_DIR, "404", "index.html"),
    path.join(OUT_DIR, "404.html"),
  );
} catch {
  try {
    await fs.copyFile(
      path.join(OUT_DIR, "__spa-fallback.html"),
      path.join(OUT_DIR, "404.html"),
    );
  } catch {
    // No fallback available; Cloudflare's default 404 page still applies.
  }
}

console.log(`sitemap: ${urls.length} URLs → ${SITE_URL}/sitemap.xml`);
