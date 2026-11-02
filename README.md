# Lumo Website

The brand site for **Lumo** — a product home for the AI browser sidebar and the userscript manager, plus bilingual technical documentation.

Built with **Vite 8 + React Router 8 (framework mode) + React 19 + Tailwind CSS 4 + shadcn-style Radix primitives + Motion + i18next**, pre-rendered to static HTML and deployed on **Cloudflare Pages**.

---

## What is inside

- **Home** — brand narrative, both product entries, the four design laws, stack and docs teaser.
- **`/lumo`** — product page for the AI browser sidebar: the agent loop, DevTools via CDP, built-in and external MCP, an interactive split-view demo, BYOK model endpoints, privacy and install paths.
- **`/userscripts`** — product page for the userscript manager: the agent endpoint, approval flow, install, editor, runtime and permissions.
- **`/docs`** — twelve bilingual articles with sidebar navigation, search (⌘K), TOC, Shiki code blocks and pager.
- **`/changelog`**, **`/privacy`**, **404**.
- **Chinese** at the same paths under `/zh` (e.g. `/zh/lumo`, `/zh/docs/mcp`).

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
npm run preview    # serves build/client through Wrangler Pages
```

### Useful scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | React Router dev server with HMR. |
| `npm run build` | Client + server build, pre-render all routes, then generate `sitemap.xml`. |
| `npm run preview` | Cloudflare Pages-compatible local preview. |
| `npm run deploy` | `wrangler pages deploy build/client --project-name=lumo-website`. |
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
    docs/{en,zh}.ts        # structured DocBlock collections
    changelog.ts
  lib/
    i18n/                  # resources, synchronous locale instances
    theme/                 # registry, provider, first-paint script
    seo.ts                 # title/description/OG/hreflang/canonical
    site-manifest.ts       # locales, paths, doc slugs
    site.ts                # links, site URL, version
  styles/globals.css       # OKLCH tokens, palettes, motion, prose, Shiki
public/
  brand/                   # logo marks + OG image
  _headers, _redirects   # no SPA rewrite; 404.html is generated after build
  robots.txt, site.webmanifest, favicon.svg
react-router.config.ts     # ssr: false + full prerender
scripts/build-sitemap.mjs  # sitemap from pre-rendered HTML
wrangler.toml              # Pages output directory
docs/SPEC.md               # product/technical spec
docs/DESIGN.md             # design system
AGENTS.md                  # agent development guide
.agents/skills/            # skills ported from ../lumo
```

### Rendering model

`react-router.config.ts` sets `ssr: false` and pre-renders every static route plus every documentation slug. The build writes complete HTML per URL into `build/client`; hydration turns it into a normal SPA. There is **no runtime server**.

- Every route exports `meta()` for title, description, Open Graph, Twitter, canonical and hreflang.
- Cloudflare Pages serves the generated `404.html` (with a 404 status) for unknown URLs; known routes are pre-rendered. Non-root routes are normalized to a trailing slash by Pages, and canonical/sitemap URLs use the same form.
- `scripts/build-sitemap.mjs` walks the generated HTML after the build.

### Internationalization

- English is unprefixed; Chinese is `/zh`.
- A head script follows the browser language on a first visit (Chinese browsers land on `/zh`), while crawlers and explicit `/zh` URLs are never redirected.
- The rendered locale is stored, so a later root visit keeps the choice; the language menu writes it explicitly.
- `LocaleProvider` selects a synchronous i18next instance per locale, so Chinese routes contain Chinese HTML at build time.
- UI copy: `app/lib/i18n/resources/{en,zh}.ts`.
- Long-form docs: `app/content/docs/{en,zh}.ts` using the same `DocBlock` model.
- Tests enforce key parity, placeholder parity and docs block-shape parity.

### Theme

Three axes: `mode` (light/dark/system), `palette` (paper/graphite/midnight), `accent` (azure/violet/emerald/amber/rose).

- `app/lib/theme/registry.ts` is the single registry.
- An inline head script applies the stored theme before first paint.
- `app/components/site/theme-menu.tsx` exposes all three axes.
- `tests/theme.test.ts` checks palette/CSS consistency and OKLCH contrast.

### Design system

See [`docs/DESIGN.md`](docs/DESIGN.md). The short version:

- OKLCH semantic tokens; no colour literals in components.
- Inter Variable + system CJK fallback; JetBrains Mono for code.
- Gradients only through `stage-lumo` / `stage-userscripts` / `stage-neutral`.
- Reveal animations animate transform only, so content is never hidden from crawlers or no-JS readers.
- `prefers-reduced-motion` is respected in CSS and through `MotionConfig`.

---

## Cloudflare Pages deployment

The pipeline lives entirely in Cloudflare: create the Pages project from the
repository and Cloudflare builds and deploys on every push. There is no CI
workflow in this repository.

1. Create a Pages project from the repository.
2. Build command: `npm run typecheck && npm test && npm run build`.
3. Output directory: `build/client`.
4. Environment variable: `VITE_SITE_URL=https://your-domain` (used for canonical, OG and sitemap).
5. Node version: 22 (`.nvmrc`).

### Local deploy

```bash
npx wrangler login
VITE_SITE_URL=https://your-domain npm run build
npm run deploy
```

`wrangler.toml` already points Pages at `./build/client`.

---

## Content editing

- **UI copy** → `app/lib/i18n/resources/en.ts` and `zh.ts` (same key tree).
- **Docs article** → `app/content/docs/en.ts` and `zh.ts` (same slug and block types). Use `defineArticle`; reading time is computed.
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
- Theme registry, CSS/palette consistency and OKLCH contrast.
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
