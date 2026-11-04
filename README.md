# Lumo Website

The brand site for **Lumo** — a product home for the AI browser sidebar and the userscript manager, plus bilingual technical documentation.

Built with **Vite 8 + React Router 8 (framework mode) + React 19 + Tailwind CSS 4 + shadcn-style Radix primitives + Motion + i18next**, pre-rendered to static HTML and served as **Cloudflare Workers static assets**.

---

## What is inside

- **Home** — brand narrative, both product entries, the four design laws, stack and docs teaser.
- **`/lumo`** — product page for the AI browser sidebar: the agent loop, DevTools via CDP, built-in and external MCP, an interactive split-view demo, BYOK model endpoints, privacy and install paths.
- **`/userscripts`** — product page for the userscript manager: the agent endpoint, approval flow, install, editor, runtime and permissions.
- **`/docs`** — product-scoped user documentation for Lumo and Lumo Userscripts: product switcher, sidebar, search (⌘K), TOC, Shiki code blocks, step-by-step UI mocks and pager.
- **`/lumo/privacy`**, **`/userscripts/privacy`** — each product's `PRIVACY.md`, rendered as a bilingual document page.
- **404** — localized, pre-rendered.
- **Chinese** at the same paths under `/zh` (e.g. `/zh/lumo`, `/zh/docs/lumo/mcp`).

Product visuals are code, not screenshots: every mockup in `app/components/mockups/` reproduces the real extension surfaces with the shared design tokens.

---

## Quick start

Requires **Node 22.22+** and npm 10+.

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run typecheck  # react-router typegen + tsc --noEmit
npm test           # Vitest: i18n, docs, theme contrast, render smoke
npm run build      # pre-renders every route into build/client
npm run preview    # serves build/client through Wrangler
```

### Useful scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | React Router dev server with HMR. |
| `npm run build` | Client + server build, pre-render all routes, then generate `sitemap.xml`. |
| `npm run preview` | Local preview of the exact Worker output (`wrangler dev`). |
| `npm run deploy` | `wrangler deploy` — uploads `build/client` as Worker assets. |
| `npm run typecheck` | Route type generation and strict TypeScript. |
| `npm test` | Hermetic test suite. |

---

## Architecture

```
app/
  root.tsx                 # <html>, theme preload, links, error boundary
  routes.ts                # locale-prefixed route tree
  routes/                  # home, products, docs, changelog, privacy, 404
  components/
    ui/                    # shadcn-style primitives (Radix)
    brand/                 # brand/product marks, icons
    site/                  # header, footer, search, theme/language menus, CTA
    motion/                # reveal, parallax, tilt, aurora, marquee, count-up
    mockups/               # product visual reproductions
    docs/                  # sidebar, TOC, code block, content renderer
  content/
    docs/{en,zh}/          # structured DocBlock collections per product
    changelog.ts
  lib/
    i18n/                  # resources, synchronous locale instances
    theme/                 # registry, provider, first-paint script
    seo.ts                 # title/description/OG/hreflang/canonical
    site-manifest.ts       # locales, paths, doc slugs
    site.ts                # links, canonical origin, version
    site-origin.ts         # placeholder origin + edge rewrite helpers
  styles/globals.css       # OKLCH tokens, theme, motion, prose, Shiki
public/
  brand/                   # logo marks + OG image
  _headers, _redirects   # no SPA rewrite; 404.html is generated after build
  robots.txt, site.webmanifest, favicon.svg
react-router.config.ts     # ssr: false + full prerender
scripts/build-sitemap.mjs  # sitemap from pre-rendered HTML
src/worker.ts              # serves assets, rewrites the origin per request
wrangler.toml              # Worker entry + static asset directory
docs/SPEC.md               # product/technical spec
docs/DESIGN.md             # design system
AGENTS.md                  # agent development guide
.agents/skills/            # skills ported from ../lumo
```

### Rendering model

`react-router.config.ts` sets `ssr: false` and pre-renders every static route plus every documentation slug. The build writes complete HTML per URL into `build/client`; hydration turns it into a normal SPA. There is **no runtime server**.

- Every route exports `meta()` for title, description, Open Graph, Twitter, canonical and hreflang.
- Workers serves the generated `404.html` (with a 404 status) for unknown URLs; known routes are pre-rendered. Non-root routes are normalized to a trailing slash at the edge, and canonical/sitemap URLs use the same form.
- `scripts/build-sitemap.mjs` walks the generated HTML after the build.

### Origin-agnostic URLs

Absolute URLs need an origin at build time, but the site has to serve any domain
(`*.workers.dev`, a custom domain, a preview deployment) with **no build
variables**. So:

1. The build stamps `https://site.invalid` (`SITE_ORIGIN_PLACEHOLDER`) into canonical, hreflang, Open Graph, JSON-LD, `sitemap.xml` and `robots.txt`.
2. `src/worker.ts` replaces that placeholder with the origin of the incoming request before the response leaves the edge.
3. In the browser, `siteOrigin()` returns `window.location.origin`, so client-side navigation produces the same URLs as the served HTML.

Set `VITE_SITE_URL` only to pin a single canonical origin (for example when the site is also served from a plain static host without the Worker).

### Internationalization

- English is unprefixed; Chinese is `/zh`.
- A head script follows the browser language on a first visit (Chinese browsers land on `/zh`), while crawlers and explicit `/zh` URLs are never redirected.
- The rendered locale is stored, so a later root visit keeps the choice; the language menu writes it explicitly.
- `LocaleProvider` selects a synchronous i18next instance per locale, so Chinese routes contain Chinese HTML at build time.
- UI copy: `app/lib/i18n/resources/{en,zh}.ts`.
- Long-form docs: `app/content/docs/{en,zh}/{lumo,userscripts}.ts` using the same `DocBlock` model.
- Tests enforce key parity, placeholder parity and docs block-shape parity.

### Theme

One axis: `mode` (light/dark/system). Light renders Paper; dark always renders
Midnight, at a fixed azure accent.

- `app/lib/theme/registry.ts` is the single registry.
- An inline head script applies the stored mode before first paint.
- `app/components/site/theme-menu.tsx` exposes only the mode switch.
- `tests/theme.test.ts` checks registry/CSS consistency and OKLCH contrast.

### Design system

See [`docs/DESIGN.md`](docs/DESIGN.md). The short version:

- OKLCH semantic tokens; no colour literals in components.
- Inter Variable + system CJK fallback; JetBrains Mono for code.
- Gradients only through `stage-lumo` / `stage-userscripts` / `stage-neutral`.
- Reveal animations animate transform only, so content is never hidden from crawlers or no-JS readers.
- `prefers-reduced-motion` is respected in CSS and through `MotionConfig`.

---

## Cloudflare Workers deployment

The pipeline lives entirely in Cloudflare Workers Builds: the Worker project is
connected to this repository, and every push to `main` builds and deploys.
There is no CI workflow in this repository.

`wrangler.toml` declares a Worker whose only job is to serve the pre-rendered
assets and rewrite their absolute URLs to the request origin:

```toml
name = "lumo-website"
main = "./src/worker.ts"
compatibility_date = "2025-01-01"

[assets]
directory = "./build/client"
binding = "ASSETS"
html_handling = "auto-trailing-slash"
not_found_handling = "404-page"
run_worker_first = true
```

Build settings in the Cloudflare dashboard — nothing else to configure:

| Field | Value |
| --- | --- |
| Build command | `npm run typecheck && npm test && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Node version | 22 (`.nvmrc`) |

No build variables are required: the site derives its canonical origin from the
incoming request, so `*.workers.dev`, preview URLs and custom domains all produce
correct metadata.

`not_found_handling = "404-page"` makes unknown URLs return the generated
`404.html` with a real 404 status; `public/_headers` and `public/_redirects` are
honoured from the asset directory.

### Local deploy

```bash
npx wrangler login
npm run build
npm run deploy
```

`npm run preview` runs `wrangler dev`, so local behaviour (origin rewriting,
trailing-slash redirects, 404 handling, response headers) matches production.

---

## Content editing

- **UI copy** → `app/lib/i18n/resources/en.ts` and `zh.ts` (same key tree).
- **Docs article** → `app/content/docs/en/{lumo,userscripts}.ts` and `zh/{lumo,userscripts}.ts` (same product-scoped slug and block types). Use `defineArticle`; reading time is computed.
- **Changelog** → `app/content/changelog.ts`.
- **Product links / site URL / version** → `app/lib/site.ts`.
- **New doc slug** → add to `DOC_SLUGS` in `app/lib/site-manifest.ts`; route generation, sitemap and sidebar pick it up.

---

## Testing

```bash
npm run typecheck
npm test
npm run build
```

The suite covers:

- English/Chinese key and placeholder parity.
- Docs registry integrity, block-shape parity, search and adjacency.
- Locale path helpers.
- Theme registry, CSS token consistency and OKLCH contrast.
- Render smoke tests for brand, section heading and docs sidebar.

For visual QA, `npm run preview` and check 360 / 390 / 768 / 1024 / 1440 in both themes.

---

## Reference projects

- [`../lumo`](../lumo) — AI browser sidebar.
- [`../lumo-userscript-manager`](../lumo-userscript-manager) — userscript manager and the source of `docs/DESIGN.md`.

`AGENTS.md` and `.agents/skills/` are ported from `../lumo` and adapted for this website.

---

## License

MIT for this website repository. Product repositories have their own licenses; check them before redistributing a build.
