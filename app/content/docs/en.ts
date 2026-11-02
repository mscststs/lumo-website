import { defineArticle, type DocCollection } from "./types";

export const en: DocCollection = {
  introduction: defineArticle({
    slug: "introduction",
    category: "start",
    title: "Introduction",
    description:
      "What Lumo is, the two products it ships, and the boundary that connects them.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo is a browser-native toolset. It does not replace the browser or move your work into another app. It adds two precise capabilities to the browser you already use: **understanding** and **control**.",
      },
      { type: "h2", text: "Two products, one boundary" },
      {
        type: "p",
        text: "The products are separate on purpose. Each has its own permissions, storage and release cadence. They share a design language and a local-first stance, not a runtime.",
      },
      {
        type: "ul",
        items: [
          "**Lumo** — an AI sidebar with a full agent loop: it reads the current page, calls browser and DevTools tools through MCP, and keeps working until the task is done.",
          "**Lumo Userscripts** — a userscript manager built on native `chrome.userScripts`, with a real editor, GM APIs, backups and diagnostics — plus an MCP endpoint the agent can operate.",
          "**This website** — the brand surface, product documentation and the reference implementation of the shared design system.",
        ],
      },
      { type: "h2", text: "What makes it different" },
      {
        type: "ul",
        items: [
          "**Local-first.** Conversations, files, settings and script bodies stay on your device. There is no Lumo account and no relay server.",
          "**Bring your own model.** Lumo talks to the provider you configure, using your key. A local model is a first-class option.",
          "**Native platform APIs.** The userscript manager registers scripts through `chrome.userScripts`; it does not simulate them with content-script injection.",
          "**Agent-native, not agent-wrapped.** The Lumo Userscripts endpoint is standard MCP, so the agent creates and edits scripts instead of instructing the user.",
          "**Craft as a constraint.** Four design laws — invisible assistance, coherent familiarity, progressive disclosure and cinematic momentum — are part of the review checklist.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "This site is part of the system",
        text: "The website uses the same OKLCH tokens, type scale, motion curves and interaction rules as the extensions. Reading the docs is also reading the design system in use.",
      },
      { type: "h2", text: "Where to go next" },
      {
        type: "steps",
        items: [
          {
            title: "Install a product",
            text: "Start with Lumo for page understanding, or Lumo Userscripts for per-site control.",
          },
          {
            title: "Read the architecture",
            text: "See how the extension runtime, the model layer and this static site fit together.",
          },
          {
            title: "Use the design system",
            text: "Tokens, palettes, motion and accessibility rules are documented as executable constraints.",
          },
        ],
      },
    ],
  }),

  "getting-started": defineArticle({
    slug: "getting-started",
    category: "start",
    title: "Getting started",
    description:
      "Install both products, run this site locally, and know which commands matter.",
    updated: "2025-11-01",
    blocks: [
      {
        type: "p",
        text: "There are three ways to run Lumo: the Chrome Web Store, a GitHub Actions artifact, or a local build. The userscript manager is distributed through GitHub Releases. This site is a standard Vite project.",
      },
      { type: "h2", text: "Install Lumo" },
      {
        type: "steps",
        items: [
          {
            title: "Chrome Web Store",
            text: "The stable channel. It auto-updates, but each release waits for Google review, so it can lag behind `main`.",
          },
          {
            title: "GitHub Actions artifact",
            text: "Download the latest successful `lumo-chrome-mv3` artifact, unzip it, open `chrome://extensions`, enable Developer mode and choose Load unpacked.",
          },
          {
            title: "Build from source",
            text: "Clone the repository, install dependencies, build, then load `.output/chrome-mv3`.",
          },
        ],
      },
      {
        type: "code",
        lang: "bash",
        title: "Build Lumo from source",
        code: "git clone https://github.com/mscststs/lumo.git\ncd lumo\nnpm install\nnpm run build\n# chrome://extensions → Load unpacked → .output/chrome-mv3",
      },
      { type: "h2", text: "Install Lumo Userscripts" },
      {
        type: "p",
        text: "Userscripts require **Chrome 138 or newer** and the native `chrome.userScripts` API. Chrome asks you to allow user scripts for the extension once.",
      },
      {
        type: "ol",
        items: [
          "Download the latest archive from GitHub Releases, or build from source.",
          "Open `chrome://extensions`, enable Developer mode and load the unpacked directory.",
          "On the extension card, enable **Allow User Scripts**.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "The switch is mandatory",
        text: "Without Allow User Scripts, the manager can install and edit scripts but Chrome will not execute them.",
      },
      { type: "h2", text: "Run this website locally" },
      {
        type: "code",
        lang: "bash",
        title: "Website",
        code: "npm install\nnpm run dev       # http://localhost:5173\nnpm run typecheck\nnpm run test\nnpm run build     # pre-renders every route into build/client",
      },
      {
        type: "table",
        head: ["Command", "What it does"],
        rows: [
          ["`npm run dev`", "React Router dev server with HMR."],
          ["`npm run build`", "Pre-renders all routes and writes static HTML."],
          ["`npm run preview`", "Serves `build/client` through Wrangler."],
          ["`npm run typecheck`", "Generates route types, then runs `tsc --noEmit`."],
          ["`npm run test`", "Vitest: i18n parity, docs integrity, theme contrast."],
          ["`npm run deploy`", "Deploys `build/client` as Worker static assets."],
        ],
      },
    ],
  }),

  architecture: defineArticle({
    slug: "architecture",
    category: "platform",
    title: "Architecture",
    description:
      "Three codebases, two extension runtimes and one static delivery pipeline.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo is split into three repositories so that permissions, release cadence and failure domains stay separate. The design language is the only thing deliberately shared across all three.",
      },
      { type: "h2", text: "Product runtime" },
      {
        type: "p",
        text: "Both extensions are WXT projects on Chrome MV3. React renders the surfaces; Tailwind and shadcn-style primitives provide the component layer; Motion handles layout and entrance animation.",
      },
      {
        type: "table",
        head: ["Layer", "Lumo", "Lumo Userscripts"],
        rows: [
          ["Shell", "WXT + MV3", "WXT + MV3"],
          ["UI", "React 19 + Tailwind 4", "React 19 + Tailwind 4"],
          ["State", "Zustand + chrome.storage", "Zustand + chrome.storage + IndexedDB"],
          ["AI / tools", "Vercel AI SDK agent loop + MCP", "Optional MCP provider endpoint"],
          ["Editor", "CodeMirror 6 / Streamdown", "CodeMirror 6 / Shiki"],
          ["Animation", "Motion", "Motion"],
        ],
      },
      { type: "h2", text: "Site runtime" },
      {
        type: "p",
        text: "This site uses **React Router 8 framework mode** with `ssr: false` and full pre-rendering. The build renders every route to HTML, then hydrates into a normal SPA. No server runs in production.",
      },
      {
        type: "code",
        lang: "ts",
        title: "react-router.config.ts",
        code: "export default {\n  ssr: false,\n  prerender: async ({ getStaticPaths }) => [\n    ...getStaticPaths(),\n    ...docPaths,\n  ],\n} satisfies Config;",
      },
      {
        type: "p",
        text: "The static output is `build/client`. Cloudflare Workers serves it as static assets; every known route already has a file, and unknown URLs fall through to the generated `404.html`.",
      },
      { type: "h2", text: "Shared design language" },
      {
        type: "ul",
        items: [
          "OKLCH semantic tokens, with palette and accent axes.",
          "The same type scale, radii, material and motion curves.",
          "The same four design laws, applied to marketing and tool surfaces differently.",
          "i18next resources with strict English/Chinese key parity.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "One-way dependency",
        text: "The website may document the products, but it must never import product runtime code. Documentation drifts; a shared import would couple releases.",
      },
    ],
  }),

  mcp: defineArticle({
    slug: "mcp",
    category: "platform",
    title: "MCP and browser tools",
    description:
      "How Lumo exposes the browser as a typed tool surface, and where the trust boundary sits.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo does not hard-wire a list of commands into the model prompt. It runs one or more **Model Context Protocol** servers and lets the agent discover their tools at runtime. The same protocol works for built-in browser tools and remote servers.",
      },
      { type: "h2", text: "Built-in servers" },
      {
        type: "table",
        head: ["Server", "Capability"],
        rows: [
          ["Browser Core", "Tabs, windows, navigation, bookmarks, history, cookies, downloads."],
          ["Page Interaction", "Page reading, accessibility snapshots, clicks, form fills, keyboard, screenshots."],
          ["Network Monitor", "Request capture, URL blocking, redirects, header rewriting."],
          ["DevTools Advanced", "CDP sessions, trusted input, device/network emulation, console capture."],
          ["File Manager", "Read, write, patch, preview and download files stored in IndexedDB."],
        ],
      },
      { type: "h2", text: "Transports" },
      {
        type: "ul",
        items: [
          "**HTTP Streamable** — preferred for remote servers with a request/response shape.",
          "**SSE** — supported for servers that stream events over a long-lived connection.",
          "Built-in servers are registered in-process; they do not leave the extension.",
        ],
      },
      {
        type: "code",
        lang: "json",
        title: "A tool result, simplified",
        code: "{\n  \"tool\": \"page.read\",\n  \"input\": { \"tabId\": 42 },\n  \"result\": {\n    \"title\": \"Pricing — Northwind\",\n    \"sections\": 3,\n    \"words\": 1284\n  }\n}",
      },
      { type: "h2", text: "Extension providers and WebMCP" },
      {
        type: "p",
        text: "A sibling extension can serve MCP over a `chrome.runtime.Port`. Lumo discovers it with a single L0 probe, checks `enabled / authorized / ready`, then opens a standard MCP session. Pages that declare WebMCP tools contribute a per-tab surface instead. Both appear in the same registry as remote servers, so the model sees one tool list.",
      },
      {
        type: "ul",
        items: [
          "Remote servers use HTTP Streamable or SSE; extension providers use the runtime port.",
          "Disabling a source removes its tools on the next step, with no prompt rebuild.",
          "Tool names are namespaced; a collision never silently overwrites another server.",
        ],
      },
      { type: "h2", text: "The security boundary" },
      {
        type: "ul",
        items: [
          "Every tool call is explicit in the transcript; the agent loop can be stopped mid-step.",
          "External servers are disabled by default and must be added by the user.",
          "Tool results are treated as untrusted content; page text cannot silently expand permissions.",
          "The extension requests only the Chrome permissions a feature needs, and documents each one.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Remote tools are code you did not write",
        text: "Only connect MCP servers you trust. A server can return instructions as well as data; Lumo keeps tool calls visible, but it cannot audit a third-party implementation.",
      },
      { type: "h2", text: "Adding a server" },
      {
        type: "steps",
        items: [
          {
            title: "Open MCP settings",
            text: "Settings → MCP → Add external server.",
          },
          {
            title: "Choose a transport",
            text: "Provide an HTTP Streamable or SSE endpoint. Authentication headers are stored locally.",
          },
          {
            title: "Inspect the tools",
            text: "Lumo discovers the tool list and shows connection status before you enable it in a conversation.",
          },
        ],
      },
    ],
  }),

  "userscripts-runtime": defineArticle({
    slug: "userscripts-runtime",
    category: "products",
    title: "Userscript runtime",
    description:
      "Two execution engines, metadata matching, GM APIs and the permission model.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts registers every script through the native `chrome.userScripts` API. There are two engines: a page-world runner and an isolated USER_SCRIPT host. Both talk to the extension over a nonce-scoped `MessageChannel`. The same manager optionally exposes its scripts over MCP; see [Connecting an agent](/docs/agent-connections).",
      },
      { type: "h2", text: "Execution model" },
      {
        type: "table",
        head: ["Engine", "World", "When to use it"],
        rows: [
          ["`us-runner`", "MAIN", "Scripts that need the page's real `window`, or `@grant unsafeWindow`."],
          ["`us-host`", "USER_SCRIPT", "Scripts that should stay isolated from page globals while still using GM APIs."],
        ],
      },
      {
        type: "p",
        text: "`@inject-into page` and `@grant none` scripts run in the page world. USER_SCRIPT scripts get the isolated world's `window`; they cannot provide a synchronous page object.",
      },
      { type: "h2", text: "Metadata" },
      {
        type: "code",
        lang: "javascript",
        title: "A script header",
        code: "// ==UserScript==\n// @name        GitHub focus mode\n// @namespace   https://example.com/\n// @version     1.4.2\n// @match       *://*.github.com/*\n// @run-at      document-idle\n// @grant       GM_setValue\n// @grant       GM_getValue\n// ==/UserScript==",
      },
      {
        type: "p",
        text: "The manager validates metadata on save, supports glob and regex rules for `@match` / `@include` / `@exclude`, and resolves relative `@require` / `@resource` URLs against the install source.",
      },
      { type: "h2", text: "GM APIs" },
      {
        type: "ul",
        items: [
          "Values: `GM_setValue`, `GM_getValue`, `GM_deleteValue`, `GM_listValues`.",
          "Network: `GM_xmlhttpRequest` for cross-origin requests.",
          "Browser: `GM_cookie`, `GM_download`, `GM_notification`, `GM_setClipboard`.",
          "Page: `GM_addStyle`, `GM_addElement`, `unsafeWindow`.",
          "Shell: `GM_registerMenuCommand`, tab state and the promised `GM.*` aliases.",
        ],
      },
      { type: "h2", text: "Permissions" },
      {
        type: "table",
        head: ["Permission", "Why it exists"],
        rows: [
          ["`userScripts`", "Dynamic registration through Chrome's native API."],
          ["`storage`, `unlimitedStorage`", "Settings and bounded metadata."],
          ["`tabs`, `activeTab`, `webNavigation`, `scripting`", "Tab context and diagnostics."],
          ["`declarativeNetRequest`", "Redirect `.user.js` navigations to the install page."],
          ["`cookies`, `downloads`", "Back `GM_cookie` and `GM_download`."],
          ["`notifications`, `contextMenus`, `alarms`, `clipboardWrite`", "GM APIs and background jobs."],
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Updates are permission-aware",
        text: "If a new version asks for more access, the update waits for the user. The manager never silently widens a script's reach.",
      },
    ],
  }),

  "design-system": defineArticle({
    slug: "design-system",
    category: "design",
    title: "Design system",
    description:
      "The tokens, palettes, motion curves and accessibility rules shared by the products and this site.",
    updated: "2025-11-01",
    blocks: [
      {
        type: "p",
        text: "The design system is a set of executable constraints, not a mood. Every value below has a counterpart in `app/styles/globals.css` or `app/lib/theme/registry.ts`, and the tests fail if they drift.",
      },
      { type: "h2", text: "The four laws" },
      {
        type: "ul",
        items: [
          "**Invisible assistance** — a feature should explain itself through form and state, not through helper text.",
          "**Coherent familiarity** — the same action has the same shape, hit area and focus treatment everywhere.",
          "**Progressive disclosure** — start with the decision, fold the internals until they are requested.",
          "**Cinematic momentum** — motion explains cause and effect; leaving is faster than arriving.",
        ],
      },
      { type: "h2", text: "Tokens" },
      {
        type: "table",
        head: ["Group", "Rule"],
        rows: [
          ["Colour", "OKLCH only. Components consume semantic tokens, never hex/rgb/hsl literals."],
          ["Type", "Inter Variable for Latin, system CJK fallback; JetBrains Mono for code and identifiers."],
          ["Radius", "Controls 10px, cards 16px, panels 20px, stages 24px."],
          ["Material", "Surface, card, panel and float shadows; dark mode replaces soft shadows with a top highlight."],
          ["Spacing", "8pt base; section rhythm `clamp(72px, 10vw, 144px)`."],
        ],
      },
      {
        type: "code",
        lang: "css",
        title: "Accent axis",
        code: ":root[data-accent='emerald'] {\n  --accent-h: 162;\n  --accent-c: 0.135;\n  --accent-l: 0.535;\n}\n\n--color-primary: oklch(var(--accent-l) var(--accent-c) var(--accent-h));",
      },
      { type: "h2", text: "Palettes" },
      {
        type: "ul",
        items: [
          "**Paper** — warm neutral light. Long reading without the clinical blue cast of pure white.",
          "**Graphite** — near-black neutral. The quietest dark surface.",
          "**Midnight** — cool blue dark with a clearer lightness ladder.",
          "Dark surfaces separate by lightness: background → card → popover → hover. Borders sit above every surface.",
        ],
      },
      { type: "h2", text: "Motion" },
      {
        type: "table",
        head: ["Token", "Curve", "Use"],
        rows: [
          ["`--ease-standard`", "`cubic-bezier(0.2, 0, 0, 1)`", "Hover, colour, width."],
          ["`--ease-emphasis`", "`cubic-bezier(0.16, 1, 0.3, 1)`", "Entrance, hero reveals."],
          ["`--ease-exit`", "`cubic-bezier(0.4, 0, 1, 1)`", "Exit, 25–40% shorter."],
        ],
      },
      { type: "h2", text: "Accessibility" },
      {
        type: "ul",
        items: [
          "Visible focus ring on every interactive element; removal is a defect.",
          "Target size: 44px on touch, 32px in dense desktop surfaces, 24px absolute minimum.",
          "Contrast: body text and metadata at least 4.5:1; large text 3:1.",
          "`prefers-reduced-motion` removes large movement while keeping state changes legible.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Test the tokens, not the screenshot",
        text: "Contrast is computed from OKLCH in the test suite. A palette cannot ship because it looked fine on one monitor.",
      },
    ],
  }),

  i18n: defineArticle({
    slug: "i18n",
    category: "engineering",
    title: "Internationalization",
    description:
      "Path-based locales, synchronous pre-rendering, strict key parity and hreflang.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Locale is part of the URL. English is unprefixed; Chinese lives under `/zh`, so every page is shareable, cacheable and indexable in both languages.",
      },
      { type: "h2", text: "First visit" },
      {
        type: "p",
        text: "A tiny script in `<head>` reads the stored preference, then `navigator.languages`. A Chinese browser entering an unprefixed URL is sent to `/zh` before first paint; an English browser stays. The redirect is deliberately one-way: a `/zh` URL is never redirected, same-site deep links keep the language being read, and crawlers are skipped.",
      },
      {
        type: "ul",
        items: [
          "A rendered locale is stored, and the language menu writes it before navigating.",
          "The redirect preserves the path, query and hash.",
          "Both locales are pre-rendered; the script only chooses an entry point, never generates a page.",
        ],
      },
      { type: "h2", text: "Routing" },
      {
        type: "code",
        lang: "ts",
        title: "Locale helpers",
        code: "localePath('zh', '/docs/mcp') // '/zh/docs/mcp'\nstripLocale('/zh/docs/mcp')    // '/docs/mcp'\nswitchLocalePath('/lumo', 'zh') // '/zh/lumo'",
      },
      {
        type: "p",
        text: "The route table is generated per locale, so a product page and its translation are the same component. The locale provider derives the current language from `useLocation()` and selects the matching i18next instance.",
      },
      { type: "h2", text: "Synchronous pre-render" },
      {
        type: "p",
        text: "i18next is initialized with `initAsync: false` and bundled resources. That makes initialization synchronous, which is required for static generation: a Chinese route must contain Chinese HTML at build time, not after hydration.",
      },
      {
        type: "code",
        lang: "ts",
        title: "One instance per locale",
        code: "const instance = i18next.createInstance();\ninstance.init({\n  lng: locale,\n  resources,\n  initAsync: false,\n});",
      },
      { type: "h2", text: "Content" },
      {
        type: "ul",
        items: [
          "UI copy lives in `app/lib/i18n/resources/{en,zh}.ts`.",
          "Long-form docs live in `app/content/docs/{en,zh}.ts` using the same `DocBlock` model.",
          "A test compares the English and Chinese key trees; a missing key fails before runtime.",
          "Technical identifiers (`chrome.userScripts`, `GM_setValue`) stay in English.",
        ],
      },
      { type: "h2", text: "SEO" },
      {
        type: "ul",
        items: [
          "Each route emits its own title, description, canonical, Open Graph and Twitter tags.",
          "`hreflang` pairs both languages and includes `x-default` for the English page.",
          "The sitemap is generated from the pre-rendered HTML after the build.",
        ],
      },
      { type: "h2", text: "Add a locale" },
      {
        type: "steps",
        items: [
          {
            title: "Add the resource",
            text: "Create the translation object, typed against the English shape.",
          },
          {
            title: "Extend the manifest",
            text: "Add the locale to `LOCALES` and `LOCALE_META`. Route generation and the language menu pick it up.",
          },
          {
            title: "Add content",
            text: "Translate the docs collection. The integrity test will list missing slugs.",
          },
          {
            title: "Pre-render",
            text: "Add the locale to the doc-path list in `react-router.config.ts`.",
          },
        ],
      },
    ],
  }),

  deployment: defineArticle({
    slug: "deployment",
    category: "engineering",
    title: "Deployment",
    description:
      "Static pre-rendering, Cloudflare Workers static assets, headers, redirects and custom domains.",
    updated: "2025-11-01",
    blocks: [
      {
        type: "p",
        text: "The site has no runtime server. `react-router build` pre-renders every route into `build/client`; Cloudflare Workers serves those files as static assets and only unknown URLs fall back to the generated `404.html`.",
      },
      { type: "h2", text: "Build" },
      {
        type: "code",
        lang: "bash",
        title: "Local verification",
        code: "npm install\nnpm run typecheck\nnpm run test\nnpm run build\nnpm run preview   # Wrangler serves build/client",
      },
      {
        type: "p",
        text: "The build output contains one HTML file per route plus React Router's `.data` files for client navigation. Do not flatten or rename these files.",
      },
      { type: "h2", text: "Cloudflare Workers" },
      {
        type: "steps",
        items: [
          {
            title: "Create the Worker",
            text: "In the Cloudflare dashboard, create a Worker under Workers & Pages and connect it to this repository.",
          },
          {
            title: "Set build and deploy",
            text: "Build command `npm run typecheck && npm test && npm run build`, deploy command `npx wrangler deploy`, Node 22.",
          },
          {
            title: "Set the site URL",
            text: "Add `VITE_SITE_URL=https://your-domain` so canonical and Open Graph URLs are absolute and correct.",
          },
          {
            title: "Deploy",
            text: "Push to main, or run `npm run deploy` with Wrangler authenticated locally.",
          },
        ],
      },
      {
        type: "code",
        lang: "toml",
        title: "wrangler.toml",
        code: "name = \"lumo-website\"\ncompatibility_date = \"2025-01-01\"\n\n[assets]\ndirectory = \"./build/client\"\nhtml_handling = \"auto-trailing-slash\"\nnot_found_handling = \"404-page\"",
      },
      { type: "h2", text: "Headers and redirects" },
      {
        type: "table",
        head: ["File", "Purpose"],
        rows: [
          ["`public/_headers`", "Security headers and immutable asset caching."],
          ["`404.html` (generated)", "Branded 404 response for unknown URLs; known routes are served from their own HTML files."],
          ["`public/robots.txt`", "Crawler policy and sitemap location."],
          ["`scripts/build-sitemap.mjs`", "Walks the pre-rendered HTML and writes `sitemap.xml`."],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Order matters",
        text: "Cloudflare Workers static assets serve an existing file first. If a route 404s, check that its pre-rendered HTML exists before changing the 404 fallback.",
      },
      { type: "h2", text: "Custom domain" },
      {
        type: "ol",
        items: [
          "Add the domain under Worker → Settings → Domains & Routes and follow the DNS instructions.",
          "Set `VITE_SITE_URL` to the final HTTPS origin and redeploy.",
          "Submit the generated `sitemap.xml` in Search Console.",
        ],
      },
    ],
  }),

  faq: defineArticle({
    slug: "faq",
    category: "start",
    title: "FAQ",
    description:
      "Short answers about data, browsers, models, userscript reach and self-hosting.",
    updated: "2025-11-06",
    blocks: [
      { type: "h2", text: "Is Lumo open source?" },
      {
        type: "p",
        text: "The extension repositories are public. Lumo does not currently include a license file; Lumo Userscripts is MIT. Read the repository before redistributing a build.",
      },
      { type: "h2", text: "Does Lumo send my pages to a server?" },
      {
        type: "p",
        text: "There is no Lumo relay. Model requests go from your browser to the provider you configure. If you choose a local model, page content does not leave the machine.",
      },
      { type: "h2", text: "Which browsers are supported?" },
      {
        type: "ul",
        items: [
          "Lumo: Chrome and Chromium-based browsers with MV3. A Firefox build is available from source.",
          "Lumo Userscripts: Chrome 138+ with Allow User Scripts enabled.",
        ],
      },
      { type: "h2", text: "Can the agent create userscripts?" },
      {
        type: "p",
        text: "Yes, when you enable the endpoint in Lumo Userscripts and approve the caller. The agent gets `list`, `get` and `diagnostics` immediately; creating, editing, enabling, installing and trashing scripts needs a second `Allow writes` switch, and every write is audited.",
      },
      { type: "h2", text: "Can I use a local model?" },
      {
        type: "p",
        text: "Yes. Configure an OpenAI-compatible endpoint such as Ollama or a local gateway. Vision and tool calling depend on the model you choose.",
      },
      { type: "h2", text: "Do userscripts run on chrome:// pages?" },
      {
        type: "p",
        text: "No. Chrome does not allow extensions to inject into privileged pages, the Web Store, or other extensions. The manager shows a permission empty state instead of pretending the script ran.",
      },
      { type: "h2", text: "How do updates work?" },
      {
        type: "p",
        text: "Lumo Userscripts checks script updates and asks before installing a version that needs more permissions. Lumo itself updates through the Chrome Web Store or by replacing an unpacked build.",
      },
      { type: "h2", text: "Can I self-host this website?" },
      {
        type: "p",
        text: "Yes. It is a static Vite build. Run `npm run build` and serve `build/client` from any static host. Set `VITE_SITE_URL` so canonical and social URLs point at your domain.",
      },
      {
        type: "callout",
        tone: "note",
        title: "Still stuck?",
        text: "Open an issue on the relevant repository. Include the browser version, the product version and the exact status or log line.",
      },
    ],
  }),

  "agent-loop": defineArticle({
    slug: "agent-loop",
    category: "platform",
    title: "The agent loop",
    description:
      "How one turn becomes many model steps, tool calls and a checked result — and where the limits are.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "A chat completion answers once. An agent turn keeps going: the model plans, calls tools, reads what came back, and decides whether the goal is met. Lumo implements that loop on top of the Vercel AI SDK, with every step visible in the transcript.",
      },
      { type: "h2", text: "What one turn contains" },
      {
        type: "p",
        text: "A turn starts with the user's message and its attachments, plus the system prompt and the tool catalogue. It ends when the model produces a final answer, the user presses stop, or a configured cap is reached.",
      },
      {
        type: "ol",
        items: [
          "Assemble context: conversation, page or selection attachments, file references and the enabled tool list.",
          "Call the model and stream its parts: reasoning, text, and zero or more tool calls.",
          "Execute every tool call, in parallel when the model issued several, and append typed results.",
          "Feed the enlarged context back and repeat from step 2 until the model answers without a tool call.",
        ],
      },
      { type: "h2", text: "The step budget" },
      {
        type: "p",
        text: "The default budget is unbounded. A browsing task can legitimately need dozens of steps, and any fixed cap becomes a reply that stops mid-task and asks the user to type \"continue\".",
      },
      {
        type: "ul",
        items: [
          "`0` means no cap and is the default. It is not a step count.",
          "Custom caps below `MIN_MAX_STEPS` (10) are raised, because a lower cap would truncate almost every real task.",
          "`20` and `60` are offered as presets for users who want a predictable ceiling.",
        ],
      },
      {
        type: "code",
        lang: "ts",
        title: "The only budget check",
        code: "export function stepAllowed(step: number, maxSteps: number): boolean {\n  return maxSteps === 0 || step < maxSteps;\n}",
      },
      { type: "h2", text: "Tool execution" },
      {
        type: "ul",
        items: [
          "The tool catalogue is assembled per request from every connected MCP server, so disabling a server removes its tools on the next step.",
          "Each call is rendered as a collapsible card with its input, status and output; failures open by default.",
          "Images returned by a tool are stripped from later prompts and replaced with a caption, so base64 payloads cannot consume the context window.",
          "Tool calls that were still running when a turn was interrupted are shown as interrupted, not as an infinite spinner.",
        ],
      },
      { type: "h2", text: "Context and compaction" },
      {
        type: "p",
        text: "The context ring estimates what the next request will cost, not what the conversation has cost. When the estimate crosses the model's window, old turns are folded into a checkpoint that is replayed as a summary; the original messages stay readable in the transcript.",
      },
      {
        type: "table",
        head: ["Signal", "Source", "What it changes"],
        rows: [
          ["Context ring", "Prompt estimate + live provider usage", "How close the next request is to the window"],
          ["Compaction checkpoint", "Older turns folded into a summary", "What is replayed to the model"],
          ["Step usage", "Per-step token counts", "The usage breakdown on an assistant message"],
          ["Stop reason", "Provider finish reason", "Whether the reply is marked interrupted"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "The transcript is the source of truth",
        text: "Compaction changes the prompt projection, never the stored conversation. A user can always scroll back to the messages that were summarised.",
      },
      { type: "h2", text: "Stopping and resuming" },
      {
        type: "ul",
        items: [
          "Stop aborts the in-flight request and settles every open tool call.",
          "Retry re-sends the turn that failed, with bounded attempts and backoff.",
          "Regeneration creates a new variant of an assistant message; earlier variants remain switchable.",
        ],
      },
      { type: "h2", text: "Providers are part of the loop" },
      {
        type: "p",
        text: "The loop is protocol-agnostic. Three wire protocols are supported, plus a vendor profile for OpenCode that derives its endpoints and per-conversation session identifier.",
      },
      {
        type: "table",
        head: ["Profile", "Protocol", "Endpoint", "Notes"],
        rows: [
          ["OpenAI Chat", "Chat Completions", "`POST {baseUrl}/chat/completions`", "Portable default; works with most gateways."],
          ["OpenAI Responses", "Responses", "`POST {baseUrl}/responses`", "Reasoning and built-in tool shapes."],
          ["Anthropic", "Messages", "`POST {baseUrl}/messages`", "Claude models, vision and effort control."],
          ["OpenCode", "All three", "Derived from the vendor", "Client header and stable session affinity."],
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "OpenCode is a vendor type, not a protocol",
        text: "If you use an OpenCode endpoint, set the provider vendor to OpenCode. It derives the protocol path, sends the identifying client header and a per-conversation session ID. A custom provider pointed at the same path omits those headers, so OpenCode rejects the request.",
      },
      {
        type: "callout",
        tone: "note",
        title: "Reasoning is a per-model setting",
        text: "Reasoning effort is stored per model and omitted when unset, so a provider default is never overridden by an empty value.",
      },
    ],
  }),

  "agent-connections": defineArticle({
    slug: "agent-connections",
    category: "products",
    title: "Agent connections",
    description:
      "Connect from Lumo, or authorize from Lumo Userscripts — the same contract in both directions.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts can expose its scripts to an MCP client. The host in practice is Lumo, but the contract does not care who connects: any extension that can probe, be authorized, and open a runtime port gets the same tool surface.",
      },
      { type: "h2", text: "Two directions, one contract" },
      {
        type: "p",
        text: "There are two ways to start, and both end at the same session. Lumo can discover the provider; the provider can also treat an unknown caller as a request that needs a decision.",
      },
      {
        type: "table",
        head: ["Starting point", "What happens", "Where the user decides"],
        rows: [
          ["From Lumo", "Add the provider's 32-character extension ID under Settings → MCP → Extensions.", "In Lumo, before the first probe."],
          ["From Lumo Userscripts", "The provider answers the probe with `authorized: false` and queues a request.", "In the provider's Settings → Agent, or in the approval dialog."],
          ["Either way", "After approval, Lumo opens the `lumo:mcp` port and lists tools.", "No further prompt unless the policy changes."],
        ],
      },
      { type: "h2", text: "Connect from Lumo" },
      {
        type: "steps",
        items: [
          {
            title: "Open MCP settings",
            text: "Settings → MCP → Extensions. The same panel shows Lumo's own extension ID; approval needs it.",
          },
          {
            title: "Add the provider ID",
            text: "Paste the 32-character ID of Lumo Userscripts. IDs use only the letters a–p.",
          },
          {
            title: "Let the probe run",
            text: "Lumo sends one L0 probe. A disabled endpoint, missing authorization or an unavailable runtime is reported as a specific state, not a failed handshake.",
          },
          {
            title: "Approve and connect",
            text: "If the provider asks for approval, open its settings and allow Lumo's ID. Focus Lumo again; it retries the probe and opens the MCP session.",
          },
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "The ID is not the name",
        text: "A provider's name is self-reported and only used for display. Authorization always compares `sender.id`, because a name can claim to be anything.",
      },
      { type: "h2", text: "Authorize from Lumo Userscripts" },
      {
        type: "steps",
        items: [
          {
            title: "Turn on the endpoint",
            text: "Settings → Agent → Agent access. It is off by default and nothing is discoverable while it is off.",
          },
          {
            title: "Decide on writes",
            text: "Allow writes is a second switch. Leave it off to expose only `list`, `get` and `diagnostics`.",
          },
          {
            title: "Add the caller",
            text: "Paste Lumo's extension ID into Allowed extensions. The panel offers a copy button for the provider's own ID.",
          },
          {
            title: "Review the queue",
            text: "A pending request appears in the same section and in an interrupt dialog. Approve, dismiss, or defer for the session.",
          },
        ],
      },
      { type: "h2", text: "What the user sees when it is not ready" },
      {
        type: "table",
        head: ["Provider state", "Lumo shows", "Fix"],
        rows: [
          ["Not installed / no endpoint", "Extension is not installed, or it does not expose an agent endpoint.", "Check the ID, then reinstall or rebuild."],
          ["Endpoint off", "Agent access is turned off in <name>.", "Enable Agent access in the provider."],
          ["Not authorized", "<name> does not allow this extension.", "Add Lumo's ID to the provider's allowlist."],
          ["Approval pending", "<name> is waiting for you to approve this extension.", "Open the provider's settings and approve."],
          ["Not ready", "The provider's own reason message.", "Read the reason; usually `chrome.userScripts` is unavailable."],
        ],
      },
      { type: "h2", text: "Writing safely" },
      {
        type: "ul",
        items: [
          "Read tools are available once the endpoint is on and the caller is authorized.",
          "Write tools additionally require Allow writes; turning it off invalidates the next call, not the next session.",
          "Review mode creates new scripts disabled and marked pending review.",
          "Every write is rate-limited to 30 calls per minute and recorded in the activity list; parameters are hashed, not stored.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "The agent is not a separate permission system",
        text: "A script the agent creates runs with the same `@match` and `@grant` reach as one you write by hand. Review mode exists so a new script cannot run before you have seen it.",
      },
      { type: "h2", text: "Troubleshooting" },
      {
        type: "table",
        head: ["Symptom", "Likely cause", "Action"],
        rows: [
          ["Tools disappear after a while", "MV3 recycled the service worker; the port closed.", "Call a tool again; Lumo reconnects and re-initializes lazily."],
          ["Tools exist but every write fails", "Allow writes is off, or the rate window is exhausted.", "Enable writes or wait a minute."],
          ["Approval prompt repeats", "The caller's ID is not on the allowlist.", "Add it under Settings → Agent → Allowed extensions."],
          ["`authorized: true` but no tools", "`chrome.userScripts` is unavailable or no scripts are installed.", "Run `diagnostics`, then check Allow User Scripts."],
          ["Wrong extension connected", "A 32-character ID was pasted incorrectly.", "Copy the ID from the provider's agent section instead of typing it."],
        ],
      },
      {
        type: "p",
        text: "For the wire format, state matrix and limits, read [the extension-provider protocol](/docs/agent-protocol). For the loop that consumes these tools, read [the agent loop](/docs/agent-loop).",
      },
    ],
  }),

  "agent-protocol": defineArticle({
    slug: "agent-protocol",
    category: "engineering",
    title: "Extension protocol",
    description:
      "The L0 probe and the L1 MCP session: wire format, state machine, invariants and limits.",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "This is the contract between an MCP host (Lumo) and any Chrome extension that serves tools. It has exactly two layers: one custom message that answers whether the provider is usable, and standard MCP for everything else.",
      },
      { type: "h2", text: "Two layers" },
      {
        type: "p",
        text: "An MCP `initialize` cannot describe \"installed but disabled\" or \"not authorized\" without failing the handshake, which leaves the host unable to tell the user what to fix. L0 exists to express those states; L1 stays completely standard.",
      },
      {
        type: "code",
        lang: "json",
        title: "L0 request over chrome.runtime.sendMessage",
        code: "{\n  \"channel\": \"lumo:probe\",\n  \"version\": 1,\n  \"id\": \"probe-42\",\n  \"client\": { \"id\": \"<lumo extension id>\", \"name\": \"Lumo\", \"version\": \"1.0.19\" }\n}",
      },
      {
        type: "code",
        lang: "json",
        title: "L0 response — ok stays true for policy failures",
        code: "{\n  \"ok\": true,\n  \"service\": { \"namespace\": \"userscripts\", \"name\": \"Lumo Userscripts\", \"version\": \"1.0.1\" },\n  \"status\": {\n    \"enabled\": true,\n    \"authorized\": false,\n    \"ready\": true,\n    \"pendingApproval\": true\n  }\n}",
      },
      { type: "h2", text: "Layer 1: MCP over a runtime port" },
      {
        type: "ul",
        items: [
          "The port name is fixed: `lumo:mcp`. The probe channel is fixed: `lumo:probe`.",
          "JSON-RPC, `initialize`, capability negotiation, `tools/list` and `tools/call` are handled by the official MCP SDK on both sides.",
          "A port closing does not mean the service disappeared: MV3 may recycle the service worker. The host keeps the logical session and cached tool list, then reconnects lazily.",
          "Reconnection performs a fresh `initialize`. The provider creates one `McpServer` per port and must not replay an old initialize result.",
        ],
      },
      { type: "h2", text: "State machine" },
      {
        type: "table",
        head: ["Probe result", "Host state", "User-visible outcome"],
        rows: [
          ["sendMessage rejects", "error", "Extension not installed, or no agent endpoint."],
          ["Timeout at 1500ms", "error", "The original error message."],
          ["`ok: false`", "error", "The protocol error message."],
          ["Missing service or status", "error", "Probe response is incomplete."],
          ["`enabled: false`", "error", "Agent access is turned off in the provider."],
          ["`authorized: false` + pending", "error", "Waiting for your approval in the provider."],
          ["`authorized: false`", "error", "The caller is not on the allowlist."],
          ["`ready: false`", "error", "The provider's own reason message."],
          ["All pass", "connected", "Tools appear, with counts."],
        ],
      },
      { type: "h2", text: "Invariants" },
      {
        type: "ol",
        items: [
          "Fixed names and version: `lumo:probe`, `lumo:mcp`, probe version `1`.",
          "`isExtensionId()` is the only ID validator: `/^[a-p]{32}$/`. Every input path must use it.",
          "A probe returns `ok: true` even for a policy failure; only a protocol failure returns `ok: false`.",
          "Authorization compares `sender.id`. `client.name` and `service.name` are display-only.",
          "L1 requires `enabled && authorized`. `ready` describes capability, not permission.",
          "The provider re-checks policy on every tool call, so a switch takes effect immediately.",
          "A closed port is not a deleted service; reconnect with a fresh initialize.",
          "L0 carries metadata only. Tools and business data move over L1 after authorization.",
        ],
      },
      { type: "h2", text: "Tool namespacing and limits" },
      {
        type: "table",
        head: ["Rule", "Value", "Reason"],
        rows: [
          ["Maximum tools per provider", "64", "Keeps the model-visible catalogue bounded."],
          ["Namespace length", "≤ 16", "Leaves room for the tool name."],
          ["Tool name length", "≤ 40", "Provider-side constraint."],
          ["Combined length", "≤ 57", "Below OpenAI's 64-character function-name limit."],
          ["Reserved namespaces", "`browser`, `page`, `file`, `network`, `devtools`, `webmcp`, `ext`", "Prevents collisions with built-ins."],
          ["Name collisions", "First wins", "Never silently overwrite another server's tool."],
        ],
      },
      { type: "h2", text: "Audit and rate limits" },
      {
        type: "ul",
        items: [
          "Every write is audited with tool name, sender ID, result, target UUID and a hashed argument digest.",
          "Script source code never enters the audit log.",
          "Writes use a sliding window of 30 calls per 60 seconds per caller.",
          "A business failure is returned as a successful MCP call with `isError: true`, so the model can read the reason instead of losing the turn.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Do not widen these limits casually",
        text: "The 57-character total is derived from a hard provider limit. Raising the namespace or tool budget without checking every model integration breaks tool calling in ways that look like model failures.",
      },
      { type: "h2", text: "Implementing a provider" },
      {
        type: "steps",
        items: [
          {
            title: "Declare the boundary",
            text: "Add `externally_connectable` to the manifest. `ids: ['*']` is required while the host is unpacked, because its ID changes on every install.",
          },
          {
            title: "Register both listeners synchronously",
            text: "Call `chrome.runtime.onMessageExternal` and `onConnectExternal` at the top level of the background script, not inside an async callback.",
          },
          {
            title: "Write a buffered transport",
            text: "Implement the MCP `Transport` interface over the port, buffering inbound messages until authorization completes.",
          },
          {
            title: "Create one server per port",
            text: "Register tools with the official SDK and shape the instructions with the current policy.",
          },
          {
            title: "Store and re-check policy",
            text: "Persist endpoint, allowlist, write and review switches; re-resolve them at the start of every tool call.",
          },
        ],
      },
      {
        type: "p",
        text: "Lumo Userscripts is the reference implementation: `lib/agent/protocol.ts`, `probe.ts`, `transport.ts`, `mcp-server.ts`, `tools.ts`, `policy.ts` and `audit.ts`. The host side lives in `lib/mcp/extension-*.ts`.",
      },
    ],
  }),

};
