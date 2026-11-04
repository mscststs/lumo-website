import { defineArticle } from "../types";

export const lumoDocs = {
  overview: defineArticle({
    product: "lumo",
    slug: "overview",
    section: "start",
    title: "Lumo overview",
    description: "A browser agent that reads the page, calls tools and works through multi-step tasks in your sidebar.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Lumo is an AI agent in Chrome's side panel. It reads the page you are on, then uses tools to click, fill forms, take screenshots, extract data and debug — with every step visible. It does not take over the browser, and it does not move your work into another app.",
      },
      {
        type: "mock",
        id: "lumo-chat",
        caption: "The agent loop in the sidebar: each tool call expands in place, and you can stop at any time.",
      },
      { type: "h2", text: "What it does" },
      {
        type: "ul",
        items: [
          "**Understand the page**: read the article, selection, accessibility tree, screenshots and tab metadata.",
          "**Act on the page**: click, fill, scroll, download and switch tabs, across as many steps as the task needs.",
          "**Connect tools**: built-in browser tools, remote MCP servers, WebMCP pages and other extensions all appear in one tool list.",
          "**Use your own model**: OpenAI-compatible APIs, Anthropic and local gateways; keys stay on this device.",
        ],
      },
      { type: "h2", text: "Two products, one connection" },
      {
        type: "p",
        text: "Lumo Userscripts is a separate extension that runs userscripts per site. It can expose its script library over a standard MCP endpoint, letting the agent create, edit, enable and disable scripts directly. The two extensions are installed and authorized independently; see [extension services](/docs/lumo/extension-services).",
      },
      {
        type: "cards",
        items: [
          {
            title: "Lumo Userscripts",
            text: "Run scripts through native chrome.userScripts and expose the library to Lumo as tools.",
            href: "/docs/userscripts",
            cta: "Read the Userscripts docs",
          },
          {
            title: "Extension services",
            text: "Add the Userscripts extension ID to Lumo, approve the connection, then call script tools in chat.",
            href: "/docs/lumo/extension-services",
            cta: "See the steps",
          },
        ],
      },
      { type: "h2", text: "Where your data lives" },
      {
        type: "ul",
        items: [
          "Conversations, settings, files and debug records are stored in the extension's local storage.",
          "There is no Lumo account and no relay server.",
          "Only what you send is submitted to the model provider you configured.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "You bring the model",
        text: "Lumo does not include model credits. After installing, complete [model configuration](/docs/lumo/models); otherwise the sidebar opens but cannot generate a reply.",
      },
      { type: "h2", text: "Next" },
      {
        type: "cards",
        items: [
          {
            title: "Install Lumo",
            text: "Install from the Chrome Web Store or the latest build, then pin the icon to the toolbar.",
            href: "/docs/lumo/install",
            cta: "Install",
          },
          {
            title: "Configure a model",
            text: "Add a provider, save the key and choose a default model.",
            href: "/docs/lumo/models",
            cta: "Start configuring",
          },
          {
            title: "FAQ",
            text: "Start here when there is no reply, a tool is missing, or the page cannot be read.",
            href: "/docs/lumo/faq",
            cta: "Read the FAQ",
          },
        ],
      },
    ],
  }),

  install: defineArticle({
    product: "lumo",
    slug: "install",
    section: "start",
    title: "Install and update",
    description: "Install Lumo from the store, the latest build or source, and complete the first launch.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Lumo supports Chrome and Chromium-based browsers. The store build is the easiest path; when you need the newest features, use the GitHub Actions artifact or build it yourself.",
      },
      { type: "h2", text: "Install from the Chrome Web Store" },
      {
        type: "steps",
        items: [
          {
            title: "Open the store listing",
            text: "Search for Lumo in the Chrome Web Store, or open the listing directly.",
          },
          {
            title: "Add to Chrome",
            text: "Review the permissions and choose “Add to Chrome”.",
          },
          {
            title: "Pin the icon",
            text: "Open the extensions menu (puzzle icon) and pin Lumo to the toolbar so the side panel is one click away.",
          },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "The store build lags",
        text: "Every release goes through Google review, so recently merged features are usually not in the store yet. Use the latest build below when you need them.",
      },
      { type: "h2", text: "Install the latest build" },
      {
        type: "ol",
        items: [
          "Open the repository's GitHub Actions page and pick the latest successful run.",
          "Download the `lumo-chrome-mv3` artifact from the Artifacts section.",
          "Unzip the download.",
          "Open `chrome://extensions`, enable Developer mode in the top-right, choose “Load unpacked” and select the unzipped directory.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Unpacked builds do not auto-update",
        text: "Repeat the download and load steps for every upgrade. Chrome may show a “disable developer mode extensions” warning at startup; that is normal for unpacked installs.",
      },
      { type: "h2", text: "Build from source (optional)" },
      {
        type: "code",
        lang: "bash",
        title: "Build Lumo",
        code: "git clone https://github.com/mscststs/lumo.git\ncd lumo\nnpm install\nnpm run build\n# chrome://extensions → Load unpacked → .output/chrome-mv3",
      },
      { type: "h2", text: "After installing" },
      {
        type: "steps",
        items: [
          {
            title: "Open the side panel",
            text: "Click the Lumo icon in the toolbar. The panel opens on the right of the current window.",
          },
          {
            title: "Open settings",
            text: "Open settings from the panel header, or use “Details → Extension options” on the Lumo card in `chrome://extensions`.",
          },
          {
            title: "Configure a model",
            text: "Follow [model configuration](/docs/lumo/models). Without a model, sending a message produces no reply.",
          },
        ],
      },
      { type: "h2", text: "Updates" },
      {
        type: "p",
        text: "Store builds update automatically. Unpacked builds need the new download, a directory swap and a refresh from `chrome://extensions`. Settings, conversations and files live in extension storage and normally survive an upgrade.",
      },
      {
        type: "callout",
        tone: "note",
        title: "The extension ID can change",
        text: "Reloading an unpacked directory can change its extension ID. If you added Lumo's ID to the Userscripts allowlist, copy the new ID and update it.",
      },
    ],
  }),

  models: defineArticle({
    product: "lumo",
    slug: "models",
    section: "start",
    title: "Configure a model (required)",
    description: "Add a provider, save the key and choose a default model so the sidebar can work.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Lumo does not include model credits. It connects to the model service you choose, using your key. Until this step is done, the sidebar opens but sending a message produces no reply.",
      },
      { type: "h2", text: "Open model settings" },
      {
        type: "steps",
        items: [
          {
            title: "Open settings",
            text: "Side panel header → Settings; or `chrome://extensions` → Lumo → Details → Extension options.",
          },
          {
            title: "Choose Models",
            text: "Select “Models” in the left navigation. Providers, models and the default model are managed here.",
          },
        ],
      },
      {
        type: "mock",
        id: "lumo-models",
        caption: "Settings → Models: add a provider, save the key, discover models and set the default.",
      },
      { type: "h2", text: "Supported APIs" },
      {
        type: "table",
        head: ["API", "Services", "Notes"],
        rows: [
          [
            "Chat Completions",
            "OpenAI, OpenRouter, Azure, most compatible gateways",
            "The most widely supported OpenAI-compatible protocol.",
          ],
          [
            "Responses",
            "OpenAI Responses API",
            "Use this for services that implement the Responses shape.",
          ],
          ["Anthropic", "Claude API", "Connect directly to the official Anthropic API."],
        ],
      },
      { type: "h2", text: "Add a provider" },
      {
        type: "steps",
        items: [
          {
            title: "Choose “Add provider”",
            text: "Give it a name you will recognize, for example “OpenAI · production”.",
          },
          {
            title: "Pick the protocol",
            text: "Use the provider's documentation: Chat Completions, Responses or Anthropic.",
          },
          {
            title: "Fill in the Base URL",
            text: "Official services usually work with the default; compatible gateways take an address ending at `/v1`.",
          },
          {
            title: "Paste the API key",
            text: "The key is stored in `chrome.storage.local` and sent only to the address you entered.",
          },
          {
            title: "Add a model",
            text: "After saving, add a model ID inside the provider card, or pick one from the discovered list.",
          },
        ],
      },
      { type: "h3", text: "How to write the Base URL" },
      {
        type: "ul",
        items: [
          "OpenAI official: use the default, leave it empty.",
          "OpenRouter: `https://openrouter.ai/api/v1`.",
          "Azure OpenAI: enter the resource endpoint and the deployment name required by the service.",
          "Local gateway: an address this machine can reach, for example `http://localhost:11434/v1`.",
        ],
      },
      { type: "h3", text: "Model fields" },
      {
        type: "kv",
        items: [
          { k: "Model ID", v: "The exact name the provider accepts, such as `gpt-4.1` or `claude-sonnet-4-5`." },
          { k: "Context window", v: "Used for the context ring and compaction timing; follow the provider's documentation when unsure." },
          { k: "Vision", v: "Enable when the model accepts image input; otherwise image attachments are rejected." },
          { k: "Reasoning effort", v: "Only applies to models that support reasoning parameters; choose low, medium or high as needed." },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Keys stay on this device",
        text: "Lumo has no relay server. The key travels with each request to the Base URL you configured; if you use a third-party gateway, make sure you trust it.",
      },
      { type: "h2", text: "Verify the configuration" },
      {
        type: "steps",
        items: [
          {
            title: "Test the connection",
            text: "Use the test or refresh action on the provider card and confirm the status is connected.",
          },
          {
            title: "Set the default",
            text: "Choose the default model in the model list. The panel header shows the active model.",
          },
          {
            title: "Send a message",
            text: "Return to the side panel and ask a simple question. A streaming reply means the setup is complete.",
          },
        ],
      },
      { type: "h2", text: "Common configuration errors" },
      {
        type: "table",
        head: ["Symptom", "Usual cause", "Fix"],
        rows: [
          ["401 / Unauthorized", "Wrong or expired key, or no access to the model", "Paste the key again and confirm model access in the provider console."],
          ["404 / Not Found", "Base URL has an extra or missing path", "Check whether `/v1` is required and whether the protocol is correct."],
          ["CORS / network error", "The gateway does not allow browser requests", "Use a gateway that allows browser requests, or proxy it locally."],
          ["Empty model list", "The API has no model discovery", "Add the model ID manually."],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Local models",
        text: "Any local service with an OpenAI-compatible API works, including Ollama, LM Studio or a self-hosted gateway. Point the Base URL at `http://localhost:<port>/v1` and use the local model name as the model ID.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Chat and page context",
            text: "Once configured, learn how to attach pages, paste long text and watch context usage.",
            href: "/docs/lumo/chat",
            cta: "Continue",
          },
          {
            title: "MCP and tools",
            text: "Let the model call browser tools, remote services and other extensions.",
            href: "/docs/lumo/mcp",
            cta: "Configure tools",
          },
        ],
      },
    ],
  }),

  faq: defineArticle({
    product: "lumo",
    slug: "faq",
    section: "faq",
    title: "FAQ",
    description: "Common questions about installation, models, page reading, tool calls and data storage.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Check in this order: is a model configured, is the page readable, is the tool connected. Most problems are resolved within these three steps.",
      },
      { type: "h2", text: "Does Lumo need an account?" },
      {
        type: "p",
        text: "No. Lumo has no account system and no relay service. You only need a key for the model service you choose.",
      },
      { type: "h2", text: "Why is there no reply after sending?" },
      {
        type: "p",
        text: "The most common cause is that no model is configured, or the default model is unavailable. Open Settings → Models and confirm the provider is connected and the default model exists.",
      },
      { type: "h2", text: "Why is the model list empty?" },
      {
        type: "p",
        text: "Some compatible gateways do not implement model discovery. Add the model ID manually instead of relying on the discovered list.",
      },
      { type: "h2", text: "Why can't Lumo read the page?" },
      {
        type: "p",
        text: "Chrome internal pages, extension pages, the PDF viewer and some protected pages do not allow content scripts. Switch to a normal web page; if it still fails, check whether the page has finished loading.",
      },
      { type: "h2", text: "Does Lumo read all my tabs?" },
      {
        type: "p",
        text: "It does not enumerate them on its own. Page content enters the context only when you attach a page, use a tab tool, or explicitly ask about a tab.",
      },
      { type: "h2", text: "Why did a tool call fail?" },
      {
        type: "p",
        text: "Read the error in the tool row first. Common causes are a navigated page, a missing element, insufficient permission, or a disconnected remote MCP server. Expand the row to see the input and output.",
      },
      { type: "h2", text: "Why does an extension service show as not installed?" },
      {
        type: "p",
        text: "Confirm the provider extension is installed and enabled, and that the ID in Lumo is the full 32-character ID. Reloading an unpacked extension can change its ID; copy it again.",
      },
      { type: "h2", text: "Where are conversations and files stored?" },
      {
        type: "p",
        text: "Conversations, settings, files and debug records live in extension storage on this device. Uninstalling the extension deletes them; export or back up anything you need first.",
      },
      { type: "h2", text: "Can I use a local model?" },
      {
        type: "p",
        text: "Yes. Any local service with an OpenAI-compatible API works. Point the Base URL at the local address and use the local model name as the model ID.",
      },
      { type: "h2", text: "How do I stop a run?" },
      {
        type: "p",
        text: "Use the stop button above the composer. Stopping ends the current turn without deleting the conversation; you can keep chatting or retry.",
      },
      { type: "h2", text: "Will settings survive an update?" },
      {
        type: "p",
        text: "Normal upgrades preserve settings. Store builds update automatically; unpacked builds need a directory swap and a refresh. If the extension ID changes, update the allowlists in other extensions.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Still stuck?",
        text: "Open [troubleshooting](/docs/lumo/troubleshooting) and check models, tools and pages in order. The chat debug view shows the raw request and tool results.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Troubleshooting",
            text: "Locate model, tool and page problems by error type.",
            href: "/docs/lumo/troubleshooting",
            cta: "Troubleshoot",
          },
          {
            title: "Data and privacy",
            text: "What is stored locally, what is sent to the provider, and how to clear it.",
            href: "/docs/lumo/data",
            cta: "Read",
          },
        ],
      },
    ],
  }),

  chat: defineArticle({
    product: "lumo",
    slug: "chat",
    section: "features",
    title: "Chat and page context",
    description: "Send messages, attach pages, paste long text and control the agent's run.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "The side panel is Lumo's main surface. It turns the current page, what you paste and tool results into one request, and keeps the whole process in the conversation.",
      },
      {
        type: "mock",
        id: "lumo-chat",
        caption: "The side panel: switch models at the top, attachments above the message, tool calls as expandable rows.",
      },
      { type: "h2", text: "Send a message" },
      {
        type: "ul",
        items: [
          "Type in the composer and press `Enter` to send, `Shift + Enter` for a newline.",
          "The model selector at the top switches the model for the current conversation.",
          "A new chat clears the context; reopen a previous chat from the history entry.",
        ],
      },
      { type: "h2", text: "Attach page context" },
      {
        type: "steps",
        items: [
          {
            title: "Open the target page",
            text: "Open the page you want to ask about in the current tab.",
          },
          {
            title: "Add a page attachment",
            text: "Use “Page” above the composer and pick the current tab or another tab from the list.",
          },
          {
            title: "Ask",
            text: "The attachment appears above your message, can be expanded for a preview, and can be removed at any time.",
          },
        ],
      },
      { type: "h2", text: "Paste long text" },
      {
        type: "p",
        text: "When you paste a large block, Lumo folds it into a “Pasted” attachment instead of filling the composer. The attachment is sent with this request only.",
      },
      { type: "h2", text: "Images and files" },
      {
        type: "ul",
        items: [
          "Models with image input can receive screenshots or image attachments directly.",
          "If the model has no vision support, images are rejected; enable vision in the model settings first.",
          "Files produced by the agent are stored in the file manager and can be previewed or downloaded from Settings → Files.",
        ],
      },
      { type: "h2", text: "Context ring" },
      {
        type: "p",
        text: "The ring beside the composer shows how much of the context window is used. Lumo compacts older content as it approaches the limit; for precise control, remove attachments or start a new chat.",
      },
      { type: "h2", text: "Stop, retry and continue" },
      {
        type: "ul",
        items: [
          "Use the stop button during a run. The current turn ends and completed tool results are kept.",
          "A failed message can be retried without repeating tool calls that already succeeded.",
          "To change direction, keep typing; there is no need to start a new conversation.",
        ],
      },
      { type: "h2", text: "Split view and history" },
      {
        type: "ul",
        items: [
          "Split view places two conversations side by side in the same panel, useful for comparison or parallel work.",
          "History supports search and deletion; deleted chats cannot be recovered.",
          "Each conversation stores its own model, attachments and tool records.",
        ],
      },
      { type: "h2", text: "Input habits" },
      {
        type: "table",
        head: ["Action", "Behavior"],
        rows: [
          ["`Enter`", "Send the current message."],
          ["`Shift + Enter`", "Insert a newline in the composer."],
          ["Click an attachment", "Expand or collapse the preview."],
          ["Click a tool row", "Show the input and output of what the agent actually did."],
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Page content is sent to the model",
        text: "Attaching a page sends its text to the model provider you configured. For sensitive pages, remove the attachment or switch to a local model.",
      },
    ],
  }),

  mcp: defineArticle({
    product: "lumo",
    slug: "mcp",
    section: "features",
    title: "MCP and tools",
    description: "How built-in browser tools, remote MCP servers and extension providers share one tool list.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Lumo discovers and calls tools through the Model Context Protocol. Built-in browser capabilities and external services use the same protocol, so the model sees one tool list instead of a pile of hard-coded commands.",
      },
      { type: "h2", text: "Built-in servers" },
      {
        type: "table",
        head: ["Server", "Capabilities"],
        rows: [
          ["Browser Core", "Tabs, windows, navigation, bookmarks, history, cookies, downloads."],
          ["Page Interaction", "Page reading, accessibility snapshots, clicking, form filling, keyboard, screenshots."],
          ["Network Monitor", "Request capture, URL blocking, redirects, header rewriting."],
          ["DevTools Advanced", "CDP sessions, trusted input, device and network emulation, console capture."],
          ["File Manager", "Read, write, patch, preview and download files in extension storage."],
        ],
      },
      { type: "h2", text: "External MCP servers" },
      {
        type: "p",
        text: "External servers are managed in Settings → MCP. Each server is enabled independently, and its connection status and tool count are shown on the card.",
      },
      { type: "h2", text: "Add an external server" },
      {
        type: "steps",
        items: [
          {
            title: "Open MCP settings",
            text: "Settings → MCP → Add server.",
          },
          {
            title: "Enter the endpoint",
            text: "Provide the HTTP Streamable or SSE address of the service.",
          },
          {
            title: "Configure authentication",
            text: "OAuth-capable services show a sign-in action; for a static secret, set the Authorization header.",
          },
          {
            title: "Inspect the tools",
            text: "After connecting, expand the card and confirm the tool list and descriptions.",
          },
        ],
      },
      { type: "h3", text: "Transports" },
      {
        type: "kv",
        items: [
          { k: "HTTP Streamable", v: "The preferred transport for remote services with request/response behavior." },
          { k: "SSE", v: "Use when the service pushes events over a long-lived connection." },
        ],
      },
      { type: "h3", text: "Authentication" },
      {
        type: "p",
        text: "Protected remote services support OAuth 2.1: protected-resource metadata discovery, dynamic client registration, authorization code + PKCE and refresh tokens. A manually entered Authorization header takes precedence over the automatic flow; credentials stay on this device.",
      },
      {
        type: "mock",
        id: "lumo-mcp",
        caption: "Settings → MCP: built-in servers are always on; external servers and extension providers toggle independently.",
      },
      { type: "h2", text: "Connection states" },
      {
        type: "table",
        head: ["State", "Meaning"],
        rows: [
          ["Connected", "The handshake succeeded and tools are available."],
          ["Connecting", "A session or tool refresh is in progress."],
          ["Disconnected", "Configured but not connected yet."],
          ["Error", "The endpoint is unreachable, authentication failed, or the service returned an error."],
        ],
      },
      { type: "h2", text: "Security boundaries" },
      {
        type: "ul",
        items: [
          "Every tool call is visible in the conversation and can be stopped.",
          "External servers are off by default and must be added explicitly.",
          "Tool results are treated as untrusted content; page text cannot silently expand permissions.",
          "Instructions returned by a remote service are not executed automatically; the model still decides the next step.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Remote tools are code you did not write",
        text: "Only connect MCP services you trust. A service can return data and instructions; Lumo keeps calls visible but cannot audit a third-party implementation.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Connect extension services",
            text: "Expose the Lumo Userscripts library as tools, including where the ID comes from.",
            href: "/docs/lumo/extension-services",
            cta: "See the steps",
          },
          {
            title: "Tools from pages",
            text: "Pages that declare WebMCP tools join the tool list per tab.",
            href: "/docs/lumo/webmcp",
            cta: "Learn about WebMCP",
          },
        ],
      },
    ],
  }),

  "extension-services": defineArticle({
    product: "lumo",
    slug: "extension-services",
    section: "features",
    title: "Connect extension services (Lumo Userscripts)",
    description: "From copying the extension ID to approving the connection, bring the Userscripts library into Lumo.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "An extension service lets another Chrome extension provide MCP tools to Lumo over a runtime port. Lumo Userscripts is a supported provider: once connected, the agent can read, create, edit, enable and disable userscripts directly.",
      },
      {
        type: "callout",
        tone: "note",
        title: "Before you start",
        text: "Both extensions are installed and enabled; Lumo Userscripts has “Allow user scripts” turned on; Lumo has a model configured.",
      },
      { type: "h2", text: "How the connection works" },
      {
        type: "p",
        text: "Lumo first sends a probe to check whether the other extension is installed, enabled, authorized and ready, then opens a standard MCP session on a port named `lumo:mcp`. Tool calls still use MCP; the probe only makes states such as “not installed”, “turned off” and “not authorized” explicit.",
      },
      { type: "h2", text: "Step 1: turn on agent access in Userscripts" },
      {
        type: "steps",
        items: [
          {
            title: "Open Userscripts settings",
            text: "Open the Lumo Userscripts options page and go to Settings → Agent.",
          },
          {
            title: "Enable agent access",
            text: "Turn on “Allow agent access”. When it is off, no extension can open a session.",
          },
          {
            title: "Keep request prompts on",
            text: "“Open settings when an extension requests access” is on by default, so a new extension brings you to this page for approval.",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-agent",
        caption: "Userscripts → Settings → Agent: enable the endpoint, copy the extension ID, manage the allowlist and write access.",
      },
      { type: "h3", text: "Where the extension ID comes from" },
      {
        type: "p",
        text: "There are two places, with the same value: Userscripts Settings → Agent → Identity → Extension ID, with a copy button; or `chrome://extensions`, where the ID is shown on the Lumo Userscripts card. For unpacked installs, the ID can change on every reload.",
      },
      {
        type: "mock",
        id: "chrome-extensions",
        caption: "chrome://extensions: copy the extension ID and confirm “Allow user scripts” is on.",
      },
      { type: "h2", text: "Step 2: add the ID to Lumo" },
      {
        type: "steps",
        items: [
          {
            title: "Open Lumo's MCP settings",
            text: "Settings → MCP → Extensions.",
          },
          {
            title: "Choose “Add extension”",
            text: "Paste the 32-character Userscripts extension ID into the field.",
          },
          {
            title: "Save",
            text: "Lumo probes the extension immediately. The name and status on the card come from the provider's self-description, not a local guess.",
          },
        ],
      },
      {
        type: "mock",
        id: "lumo-extension-dialog",
        caption: "Lumo → Settings → MCP → Extensions: paste the 32-character extension ID.",
      },
      { type: "h3", text: "Where Lumo's own ID comes from" },
      {
        type: "p",
        text: "In Lumo's Settings → MCP → Extensions, the “Current extension” row shows and copies Lumo's own 32-character ID. The same ID appears on the Userscripts access request when you approve the connection.",
      },
      { type: "h2", text: "Step 3: approve the connection" },
      {
        type: "steps",
        items: [
          {
            title: "Return to Userscripts",
            text: "If Userscripts shows an access request, confirm the requester is Lumo.",
          },
          {
            title: "Allow and enable",
            text: "Choose “Allow and enable”. This turns on agent access and adds Lumo's extension ID to the allowlist.",
          },
          {
            title: "Refresh in Lumo",
            text: "Use the refresh action on the extension card, or wait for Lumo to retry when it regains focus.",
          },
        ],
      },
      {
        type: "mock",
        id: "agent-approval",
        caption: "The Userscripts access request: approving enables the endpoint and adds Lumo to the allowlist.",
      },
      { type: "h2", text: "Step 4: verify the tools" },
      {
        type: "steps",
        items: [
          {
            title: "Expand the extension card",
            text: "Confirm the status is connected and a tool count is shown.",
          },
          {
            title: "Call a tool in chat",
            text: "Ask Lumo to list userscripts, or create a simple script. The tool row shows the actual call and result.",
          },
        ],
      },
      { type: "h2", text: "Connection state reference" },
      {
        type: "table",
        head: ["Lumo shows", "Meaning", "Action"],
        rows: [
          ["Not installed, or no agent endpoint", "No extension matches that ID", "Confirm the extension is installed and enabled, and the ID was copied correctly."],
          ["Agent access is turned off", "The Userscripts endpoint switch is off", "Open Userscripts → Settings → Agent → Allow agent access."],
          ["Waiting for approval", "Userscripts has an unhandled request", "Approve Lumo in Userscripts, then refresh."],
          ["This extension is not allowed", "Lumo's ID is not in the allowlist", "Add Lumo's extension ID to the Userscripts allowlist."],
          ["Not ready", "The provider runtime is not ready yet", "Refresh later; restart the browser if needed."],
          ["Connected", "The session is up and tools are available", "Nothing to do."],
        ],
      },
      { type: "h2", text: "Write access" },
      {
        type: "ul",
        items: [
          "With “Allow the agent to modify scripts” off, the agent can only read the library.",
          "With it on, the agent can create, edit, enable/disable, install and trash scripts.",
          "“New scripts need review” saves agent-created scripts disabled until you inspect them.",
          "Every write is recorded in Userscripts' recent activity, and writes are rate-limited.",
        ],
      },
      { type: "h2", text: "Disconnect and remove" },
      {
        type: "steps",
        items: [
          {
            title: "Disable or remove in Lumo",
            text: "Toggle the extension card off to pause it; use delete and confirm to remove the configuration.",
          },
          {
            title: "Revoke in Userscripts",
            text: "Remove Lumo's extension ID from the allowlist; any later session is rejected.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Only add extension IDs you trust",
        text: "An extension service can read script source and metadata. Make sure the ID belongs to the Userscripts you installed, not a string from a web page or a stranger.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Userscripts agent endpoint",
            text: "The Userscripts side of the endpoint, allowlist, write review and audit.",
            href: "/docs/userscripts/agent-endpoint",
            cta: "Read",
          },
          {
            title: "MCP and tools",
            text: "Remote MCP servers, connection states and security boundaries.",
            href: "/docs/lumo/mcp",
            cta: "Back to MCP",
          },
        ],
      },
    ],
  }),

  webmcp: defineArticle({
    product: "lumo",
    slug: "webmcp",
    section: "features",
    title: "Tools from pages (WebMCP)",
    description: "Pages that declare WebMCP tools join Lumo's tool list per tab.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "WebMCP lets a web page declare tools that an agent can call. Lumo mounts those tools per tab: they appear only while you have that page open.",
      },
      { type: "h2", text: "Where the tools come from" },
      {
        type: "p",
        text: "A page registers tools through `document.modelContext` or declarative form attributes. Lumo reads the tool name, description and input schema and treats them as ordinary MCP tools; when the page closes, the tools disappear.",
      },
      { type: "h2", text: "Use page tools" },
      {
        type: "steps",
        items: [
          {
            title: "Open a page that declares tools",
            text: "The page must be open in a foreground tab and must have finished registering.",
          },
          {
            title: "Attach or mention the tab",
            text: "Attach the page in the conversation, or ask Lumo to look at the current tab.",
          },
          {
            title: "Call a tool",
            text: "The model sees the page's tools; results appear in the conversation like any other tool.",
          },
        ],
      },
      { type: "h2", text: "Boundaries" },
      {
        type: "ul",
        items: [
          "Tools are isolated per tab and never shared across pages.",
          "Closing or navigating the page invalidates its tools immediately.",
          "A page can declare tools but cannot read Lumo's other tools or conversation content.",
          "Tool calls still depend on the model's decision and your ability to stop.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "The site must implement WebMCP",
        text: "Ordinary pages do not gain tools automatically. Only sites that explicitly implement WebMCP appear here.",
      },
      { type: "h2", text: "How it differs from extension services" },
      {
        type: "ul",
        items: [
          "WebMCP tools belong to the page and follow the tab's lifetime.",
          "Extension services belong to the extension and follow the browser session.",
          "Both feed the same tool list; the model does not need to know the difference.",
        ],
      },
    ],
  }),

  settings: defineArticle({
    product: "lumo",
    slug: "settings",
    section: "features",
    title: "Settings reference",
    description: "Models, OCR, MCP, files, appearance, system prompt, commands and debug.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Settings are grouped by purpose. Models and MCP decide what Lumo can do; the rest decide how it looks and what it records.",
      },
      { type: "h2", text: "Settings navigation" },
      {
        type: "table",
        head: ["Entry", "Purpose"],
        rows: [
          ["Models", "Providers, keys, models and the default model."],
          ["OCR", "Options related to image text recognition."],
          ["MCP", "Built-in servers, remote servers and extension providers."],
          ["Files", "View, preview, download and delete agent-generated files."],
          ["Interface", "Theme, language and display preferences."],
          ["System prompt", "Append to or replace the system prompt to change assistant behavior."],
          ["Commands", "Manage reusable shortcut prompts."],
          ["Chat debug", "Inspect raw requests, tool results and errors."],
        ],
      },
      { type: "h2", text: "Appearance and language" },
      {
        type: "p",
        text: "Lumo follows the system theme and can also switch between light and dark manually. English and Simplified Chinese are supported; switching applies immediately and does not clear the conversation.",
      },
      { type: "h2", text: "System prompt" },
      {
        type: "p",
        text: "The system prompt defines the assistant's default behavior. Unless you understand the impact, append rules rather than replacing the whole prompt; a full replacement can make the model ignore Lumo's tool-use conventions.",
      },
      { type: "h2", text: "Commands" },
      {
        type: "p",
        text: "A command is a named prompt fragment. Use them for repeated analysis templates, writing rules or checklists. Commands are stored locally only.",
      },
      { type: "h2", text: "Chat debug" },
      {
        type: "p",
        text: "The debug page shows the model, messages, tool calls and errors for each request. When the model refuses, a tool argument is wrong or the context overflows, this is closer to the facts than the chat UI.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Settings are local only",
        text: "All settings live in extension storage and do not sync to other devices. Back up anything you need before changing browsers or reinstalling the extension.",
      },
    ],
  }),

  data: defineArticle({
    product: "lumo",
    slug: "data",
    section: "features",
    title: "Data and privacy",
    description: "What Lumo stores locally, what it sends to your model provider, and how to clear it.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Lumo is a local-first extension. It has no account system and no relay server; the data boundary is set by the model provider you configure.",
      },
      { type: "h2", text: "Stored locally" },
      {
        type: "table",
        head: ["Data", "Location", "Purpose"],
        rows: [
          ["Conversations and messages", "Extension storage", "History and continuing a conversation."],
          ["Settings and keys", "`chrome.storage.local`", "Models, MCP, interface and prompt configuration."],
          ["Files", "IndexedDB", "Files generated or downloaded by the agent."],
          ["Debug records", "Extension storage", "Requests, tool results and error diagnosis."],
        ],
      },
      { type: "h2", text: "Sent to the model provider" },
      {
        type: "ul",
        items: [
          "The messages and attachments you provide (page text, pasted text, images).",
          "The tool definitions and tool results needed to complete the task.",
          "The part of the conversation history still inside the context window.",
        ],
      },
      { type: "h2", text: "Not collected" },
      {
        type: "ul",
        items: [
          "There is no Lumo account and no usage analytics upload.",
          "Keys are not sent to a Lumo server — Lumo has no server.",
          "Tabs or browsing history you did not attach are not scanned proactively.",
        ],
      },
      { type: "h2", text: "Clear data" },
      {
        type: "steps",
        items: [
          {
            title: "Delete conversations",
            text: "Delete them one by one from history, or clear all conversations.",
          },
          {
            title: "Clean up files",
            text: "Settings → Files, delete generated files you no longer need.",
          },
          {
            title: "Uninstall the extension",
            text: "Remove Lumo from `chrome://extensions`. Uninstalling deletes local storage and cannot be undone.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Use a local model for sensitive pages",
        text: "Attaching a page sends its text to the model provider you configured. For contracts, medical records or account pages, remove the attachment or switch to a local model.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Lumo privacy policy",
            text: "The full statement on local storage, third-party requests and data retention.",
            href: "/lumo/privacy",
            cta: "Read the policy",
          },
          {
            title: "Troubleshooting",
            text: "When you need to confirm whether a request was actually sent, inspect chat debug and errors.",
            href: "/docs/lumo/troubleshooting",
            cta: "Troubleshoot",
          },
        ],
      },
    ],
  }),

  troubleshooting: defineArticle({
    product: "lumo",
    slug: "troubleshooting",
    section: "features",
    title: "Troubleshooting",
    description: "Locate problems across models, tools, pages and extensions.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Narrow the scope first: did the model not reply, did a tool not run, or was the page never read? The chat debug page holds the record closest to the facts.",
      },
      { type: "h2", text: "Check these four first" },
      {
        type: "ol",
        items: [
          "Settings → Models: the provider is connected and the default model exists.",
          "Settings → MCP: the required server or extension is connected.",
          "The current page is a normal web page, not `chrome://`, an extension page or a protected page.",
          "The model shown at the top of the panel is the one you expect.",
        ],
      },
      { type: "h2", text: "Model issues" },
      { type: "h3", text: "401 or Unauthorized" },
      {
        type: "p",
        text: "The key is invalid or expired, or the provider has not enabled the model. Paste the key again and confirm access in the provider console.",
      },
      { type: "h3", text: "404 or Not Found" },
      {
        type: "p",
        text: "The Base URL path is wrong, or the protocol is incorrect. OpenAI-compatible gateways usually end in `/v1`; Anthropic uses the official API address.",
      },
      { type: "h3", text: "Timeout or network error" },
      {
        type: "p",
        text: "The gateway may not allow browser requests, or the local service is not running. Confirm the address opens in the browser, then check CORS settings.",
      },
      { type: "h2", text: "Tool issues" },
      { type: "h3", text: "The tool list is empty" },
      {
        type: "p",
        text: "Built-in servers are always present. If an external service has no tools, expand its card and check the connection state. An extension provider must be installed, enabled and authorized.",
      },
      { type: "h3", text: "A tool call fails" },
      {
        type: "p",
        text: "Expand the tool row to see the error. Common causes are a disappeared element, a navigation, a wrong argument type, or a remote service disconnecting mid-call.",
      },
      { type: "h3", text: "An extension service is not connected" },
      {
        type: "p",
        text: "Work through the state table in [extension services](/docs/lumo/extension-services): ID, endpoint switch, allowlist and runtime readiness.",
      },
      { type: "h2", text: "Page issues" },
      { type: "h3", text: "Page content cannot be read" },
      {
        type: "p",
        text: "Chrome internal pages, extension pages, the PDF viewer and some sign-in pages cannot be read. Wait for the page to finish loading, or test with a normal web page.",
      },
      { type: "h3", text: "Screenshots are blank" },
      {
        type: "p",
        text: "Protected video, cross-origin iframes and some canvas content cannot be captured. Confirm the page is in the foreground and not restricted by the browser.",
      },
      { type: "h2", text: "Extension issues" },
      { type: "h3", text: "The side panel will not open" },
      {
        type: "p",
        text: "Confirm Lumo is enabled in `chrome://extensions`, then click the toolbar icon. Some window types do not support the side panel; switch to a normal browser window.",
      },
      { type: "h3", text: "Settings or connections are lost after an update" },
      {
        type: "p",
        text: "Reloading an unpacked extension can change its ID. Copy Lumo's new extension ID, update the Userscripts allowlist, then refresh the extension service.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Use chat debug",
        text: "Settings → Chat debug shows raw requests, tool arguments and error responses. Compare the error with the tool name to tell whether the model, the network or the page is at fault.",
      },
    ],
  }),
};
