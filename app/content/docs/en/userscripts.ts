import { defineArticle } from "../types";

export const userscriptsDocs = {
  overview: defineArticle({
    product: "userscripts",
    slug: "overview",
    section: "start",
    title: "Lumo Userscripts overview",
    description: "Run, edit and manage userscripts through native chrome.userScripts, and expose them to an agent.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts is a Chrome MV3 userscript manager. It registers scripts through the browser's native `chrome.userScripts` API and provides a real editor, GM APIs, backups, diagnostics and a standard MCP endpoint that Lumo can call.",
      },
      {
        type: "mock",
        id: "userscripts-dashboard",
        caption: "The script list: enabled state, scope, updates and actions on one row.",
      },
      { type: "h2", text: "What it does" },
      {
        type: "ul",
        items: [
          "Install scripts from a URL, a file or the clipboard, with scope and permissions shown first.",
          "Edit scripts with CodeMirror 6, including metadata, values, resources and overrides.",
          "Control which pages a script runs on with `@match`, `@include` and `@exclude`.",
          "Use the full GM API, and choose between the MAIN world and an isolated USER_SCRIPT world.",
          "Check for updates automatically and ask before a permission expansion.",
          "Export and import JSON / ZIP backups; restore deleted scripts from the recycle bin.",
          "Expose the script library over MCP so Lumo can create, edit, enable and disable scripts.",
        ],
      },
      { type: "h2", text: "Where scripts run" },
      {
        type: "p",
        text: "Each script is registered individually through `chrome.userScripts`. Scripts that need the real page `window` run in the MAIN world; scripts that need isolation from the page while still using GM APIs run in the USER_SCRIPT world. Both engines talk to the extension over a `MessageChannel` with a nonce handshake.",
      },
      { type: "h2", text: "How it relates to Lumo" },
      {
        type: "p",
        text: "Lumo Userscripts works on its own; Lumo is not required. With Lumo installed, you can connect Userscripts as an extension service so the agent can read, create and edit scripts. The two extensions authorize independently and do not replace each other.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Connect Lumo",
            text: "Enable agent access in Userscripts, copy the extension ID, then add it in Lumo.",
            href: "/docs/userscripts/agent-endpoint",
            cta: "See the steps",
          },
          {
            title: "The Lumo side",
            text: "Learn about extension services, probing and connection states from Lumo's perspective.",
            href: "/docs/lumo/extension-services",
            cta: "Read",
          },
        ],
      },
      { type: "h2", text: "Next" },
      {
        type: "cards",
        items: [
          {
            title: "Install",
            text: "Install from the Chrome Web Store or the latest release, then pin it to the toolbar.",
            href: "/docs/userscripts/install",
            cta: "Install",
          },
          {
            title: "Enable user scripts",
            text: "Chrome does not allow extensions to run userscripts by default; this step is required.",
            href: "/docs/userscripts/enable-userscripts",
            cta: "Start configuring",
          },
          {
            title: "FAQ",
            text: "Scripts not running, updates disabled, where data lives.",
            href: "/docs/userscripts/faq",
            cta: "Read the FAQ",
          },
        ],
      },
    ],
  }),

  install: defineArticle({
    product: "userscripts",
    slug: "install",
    section: "start",
    title: "Install and update",
    description: "Install Lumo Userscripts and understand the difference between store and unpacked builds.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts requires **Chrome 138 or newer**, because it depends on the native `chrome.userScripts` API. After installing, you must also turn on “Allow user scripts” for the extension.",
      },
      { type: "h2", text: "Install from the Chrome Web Store" },
      {
        type: "steps",
        items: [
          {
            title: "Open the store listing",
            text: "Search for Lumo Userscripts in the Chrome Web Store, or open the listing directly.",
          },
          {
            title: "Add to Chrome",
            text: "Review the permissions and choose “Add to Chrome”.",
          },
          {
            title: "Pin the icon",
            text: "Open the extensions menu (puzzle icon) and pin Lumo Userscripts to the toolbar.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "One more step",
        text: "Installing is not enough for scripts to run. Continue with [Enable user scripts](/docs/userscripts/enable-userscripts) and turn on Chrome's “Allow user scripts” switch.",
      },
      { type: "h2", text: "Install the latest release" },
      {
        type: "ol",
        items: [
          "Open the repository's GitHub Releases page and download the latest archive.",
          "Unzip it into a fixed directory so it is not moved later.",
          "Open `chrome://extensions` and enable Developer mode in the top-right.",
          "Choose “Load unpacked” and select the unzipped directory.",
        ],
      },
      { type: "h2", text: "Build from source (optional)" },
      {
        type: "code",
        lang: "bash",
        title: "Build Lumo Userscripts",
        code: "git clone https://github.com/mscststs/lumo-userscript-manager.git\ncd lumo-userscript-manager\nnpm install\nnpm run build\n# chrome://extensions → Load unpacked → .output/chrome-mv3",
      },
      { type: "h2", text: "After installing" },
      {
        type: "steps",
        items: [
          {
            title: "Open the script list",
            text: "Click the toolbar icon to open the popup, then open “Manage scripts” for the full page.",
          },
          {
            title: "Allow user scripts",
            text: "Turn on “Allow user scripts” on the extension card or details page in `chrome://extensions`.",
          },
          {
            title: "Install your first script",
            text: "Install from a URL or a file; the install page lists scope and permissions.",
          },
        ],
      },
      { type: "h2", text: "Updates" },
      {
        type: "p",
        text: "Store builds update automatically. Unpacked builds need a fresh download, a directory swap and a refresh from `chrome://extensions`. Updates preserve scripts, settings and backup data.",
      },
    ],
  }),

  "enable-userscripts": defineArticle({
    product: "userscripts",
    slug: "enable-userscripts",
    section: "start",
    title: "Enable user scripts (required)",
    description: "Turn on Chrome's “Allow user scripts” and confirm the manager is not pausing injection.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Chrome does not allow extensions to execute userscripts by default. After installing Lumo Userscripts, you must turn on “Allow user scripts” once in the browser; otherwise scripts appear installed but never run on a page.",
      },
      { type: "h2", text: "Step 1: turn on Chrome's switch" },
      {
        type: "steps",
        items: [
          {
            title: "Open the extensions page",
            text: "Enter `chrome://extensions` in the address bar.",
          },
          {
            title: "Find Lumo Userscripts",
            text: "Confirm the extension is enabled. For unpacked installs, also enable Developer mode in the top-right.",
          },
          {
            title: "Turn on “Allow user scripts”",
            text: "Enable it on the card or the Details page. Chrome may ask you to confirm once.",
          },
          {
            title: "Reload the page",
            text: "Return to the site and refresh. Pages that are already open do not receive the script automatically.",
          },
        ],
      },
      {
        type: "mock",
        id: "chrome-extensions",
        caption: "chrome://extensions: “Allow user scripts” must be on; the same card also shows the extension ID.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "The switch is mandatory",
        text: "Without “Allow user scripts”, the manager can still install, edit and back up scripts, but Chrome will not execute them.",
      },
      { type: "h2", text: "Step 2: confirm the manager is not paused" },
      {
        type: "steps",
        items: [
          {
            title: "Open settings",
            text: "Open the Lumo Userscripts options page and choose Settings → General.",
          },
          {
            title: "Keep “Enable script injection” on",
            text: "This is the manager's own master switch. Turning it off pauses every script without uninstalling anything.",
          },
          {
            title: "Check the default run timing",
            text: "If a script depends on the early document state, confirm the default run timing and injection world match its needs.",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-general",
        caption: "Userscripts → Settings → General: “Enable script injection” is the manager-level switch.",
      },
      { type: "h2", text: "How the two switches differ" },
      {
        type: "table",
        head: ["Switch", "Location", "When it is off"],
        rows: [
          ["Allow user scripts", "Chrome extensions page", "Chrome refuses to run any userscript; the manager cannot bypass it."],
          ["Enable script injection", "Manager → Settings → General", "The manager pauses every script; scripts remain installed."],
        ],
      },
      { type: "h2", text: "Verify" },
      {
        type: "steps",
        items: [
          {
            title: "Install a test script",
            text: "Use an `@match` for a site you visit often.",
          },
          {
            title: "Open a matching page",
            text: "Refresh and confirm the script's effect appears.",
          },
          {
            title: "Check the logs",
            text: "If nothing happens, open the manager's Logs page and look for registration or runtime errors.",
          },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "It persists across restarts",
        text: "“Allow user scripts” is a persistent setting; you do not need to turn it on at every launch. Check it again only after reloading an unpacked extension or changing browser profiles.",
      },
    ],
  }),

  faq: defineArticle({
    product: "userscripts",
    slug: "faq",
    section: "faq",
    title: "FAQ",
    description: "Common questions about scripts not running, updates, permissions, data and agent connections.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Userscript problems usually fall into three groups: Chrome has not allowed them, the script does not match the current page, or the script itself is throwing. Start there.",
      },
      { type: "h2", text: "Why is an installed script not running?" },
      {
        type: "p",
        text: "Confirm “Allow user scripts” is on in `chrome://extensions`, then check that “Enable script injection” is not off in the manager settings, and finally verify the script's `@match` covers the current page.",
      },
      { type: "h2", text: "Which Chrome version is required?" },
      {
        type: "p",
        text: "Chrome 138 or newer. Older versions do not have a stable `chrome.userScripts` API, so the manager cannot register scripts.",
      },
      { type: "h2", text: "Where is script data stored?" },
      {
        type: "p",
        text: "Scripts, values, resources and settings live in extension storage and IndexedDB on this device. There is no cloud sync and no automatic upload.",
      },
      { type: "h2", text: "Does uninstalling the extension delete scripts?" },
      {
        type: "p",
        text: "Yes. Uninstalling removes local data. Export a JSON or ZIP backup from Settings → Data first if you need to keep anything.",
      },
      { type: "h2", text: "Why does the install page say the script needs more permissions?" },
      {
        type: "p",
        text: "The script's `@match`, `@grant`, `@require` or `@resource` declarations expand what it can reach. The install page lists each permission; install only after confirming the source is trustworthy.",
      },
      { type: "h2", text: "Can I import from Tampermonkey?" },
      {
        type: "p",
        text: "There is no direct Tampermonkey database import. Reinstall scripts from their original URLs, or export `.user.js` files and install them from a file.",
      },
      { type: "h2", text: "Why was a script disabled after an update?" },
      {
        type: "p",
        text: "If the new version requests more permissions, the update waits for your confirmation. This is permission-aware updating, and it prevents a script from silently widening its reach.",
      },
      { type: "h2", text: "Why do some sites not run scripts?" },
      {
        type: "p",
        text: "Chrome internal pages, extension pages, the Web Store and some protected pages do not allow injection. Check the script's `@exclude` rules and the site's CSP restrictions.",
      },
      { type: "h2", text: "What if the agent cannot connect?" },
      {
        type: "p",
        text: "Confirm Userscripts has “Allow agent access” on, Lumo has the correct 32-character extension ID, and Lumo's ID is in the allowlist. Work through the state table in [agent endpoint](/docs/userscripts/agent-endpoint).",
      },
      { type: "h2", text: "How do I back up?" },
      {
        type: "p",
        text: "Settings → Data → Export. JSON is good for inspection and version control; ZIP is good for a complete backup. Import previews contents and conflicts first.",
      },
      { type: "h2", text: "Is Firefox supported?" },
      {
        type: "p",
        text: "The project includes Firefox build configuration, but the primary target and this documentation are Chrome MV3. Firefox's userscript API behaves differently and is not guaranteed to match Chrome.",
      },
      { type: "h2", text: "Do scripts sync across devices?" },
      {
        type: "p",
        text: "No. There is no cross-device sync; migrate manually with a JSON / ZIP backup.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Start with the logs",
        text: "The manager's Logs page records script registration, runtime errors and message failures. Most “nothing happened” cases already have a cause there.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Logs and diagnostics",
            text: "Inspect runtime health, registration state and errors.",
            href: "/docs/userscripts/diagnostics",
            cta: "Troubleshoot",
          },
          {
            title: "Permissions and scope",
            text: "Understand @match, run timing and injection worlds.",
            href: "/docs/userscripts/permissions",
            cta: "Read",
          },
        ],
      },
    ],
  }),

  "install-scripts": defineArticle({
    product: "userscripts",
    slug: "install-scripts",
    section: "features",
    title: "Install scripts",
    description: "Install from a URL, a file or the clipboard, and confirm permissions on the install page.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "There are three entry points: URL, file and new script. Whichever you use, the install page shows the script's identity, scope and permissions before anything is written to the library.",
      },
      { type: "h2", text: "Install from a URL" },
      {
        type: "steps",
        items: [
          {
            title: "Copy the script URL",
            text: "The address should end in `.user.js`, or return `application/javascript`.",
          },
          {
            title: "Open the install page",
            text: "Choose “Install script” in the manager and paste the URL.",
          },
          {
            title: "Confirm permissions",
            text: "Review the scope, GM APIs, external code and network access.",
          },
          {
            title: "Install and enable",
            text: "The script is written to the library and enabled by default; you can pause it from the list later.",
          },
        ],
      },
      { type: "h2", text: "Install from a file" },
      {
        type: "steps",
        items: [
          {
            title: "Choose the file",
            text: "Drop a `.user.js` onto the install page, or use the file picker.",
          },
          {
            title: "Check the metadata",
            text: "Confirm the name, version, author and `@match` are what you expect.",
          },
          {
            title: "Install",
            text: "The install page resolves `@require` and `@resource`; relative addresses are resolved against the install source.",
          },
        ],
      },
      { type: "h2", text: "From the clipboard or a new script" },
      {
        type: "steps",
        items: [
          {
            title: "Create a script",
            text: "Choose “New script” in the script list to open the editor.",
          },
          {
            title: "Fill in the metadata",
            text: "At minimum, set `@name`, `@version` and `@match`.",
          },
          {
            title: "Save",
            text: "Saving registers the script immediately; matching pages pick it up after a refresh.",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-install",
        caption: "The install page: source, identity, permissions and the install action on one screen.",
      },
      { type: "h2", text: "What the install page shows" },
      {
        type: "table",
        head: ["Section", "Content"],
        rows: [
          ["Scope", "The sites parsed from `@match`, `@include` and `@exclude`."],
          ["Permissions", "GM APIs and browser capabilities such as `GM_xmlhttpRequest` and `GM_cookie`."],
          ["Network", "External addresses the script can request."],
          ["External code", "Files pulled in by `@require` and `@resource`."],
        ],
      },
      { type: "h2", text: "After installing" },
      {
        type: "ul",
        items: [
          "Scripts are enabled by default and can be turned off from the list.",
          "The install source is kept for update checks and relative resource resolution.",
          "If an update expands permissions, it waits for your confirmation.",
          "Deleted scripts go to the recycle bin and can be restored.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Only install scripts you trust",
        text: "Userscripts can read and modify page content. The permission list on the install page is the basis for that decision; do not skip it for an unknown source.",
      },
    ],
  }),

  editor: defineArticle({
    product: "userscripts",
    slug: "editor",
    section: "features",
    title: "Editor and metadata",
    description: "Edit scripts with CodeMirror 6, validate metadata, and manage values and resources.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "The editor gives the whole surface to code; metadata, values, resources and info live in tabs. Saving writes to the library and re-registers the script.",
      },
      {
        type: "mock",
        id: "userscripts-editor",
        caption: "The editor: a full-width code panel, an underlined tab strip and a save action.",
      },
      { type: "h2", text: "Open the editor" },
      {
        type: "steps",
        items: [
          {
            title: "Open from the list",
            text: "Click a script row, or use the edit action at the end of the row.",
          },
          {
            title: "Switch tabs",
            text: "Move between Code, Metadata, Values, Resources and Info.",
          },
          {
            title: "Save",
            text: "Use the save button or the shortcut. Saving re-registers the script as a new version.",
          },
        ],
      },
      { type: "h2", text: "Metadata" },
      {
        type: "code",
        lang: "javascript",
        title: "A script header",
        code: "// ==UserScript==\n// @name        GitHub focus mode\n// @namespace   https://example.com/\n// @version     1.4.2\n// @match       *://*.github.com/*\n// @run-at      document-idle\n// @grant       GM_setValue\n// @grant       GM_getValue\n// ==/UserScript==",
      },
      { type: "h2", text: "Validation and overrides" },
      {
        type: "ul",
        items: [
          "Saving validates metadata syntax, required fields and match rules.",
          "An invalid `@match` is marked in the metadata tab instead of being silently dropped.",
          "Overrides can temporarily change run timing and injection world without editing the script body.",
        ],
      },
      { type: "h2", text: "Values editor" },
      {
        type: "p",
        text: "The values editor shows data written through `GM_setValue` and lets you inspect, edit or delete it. Values are isolated per script and never shared across scripts.",
      },
      { type: "h2", text: "Resource viewer" },
      {
        type: "p",
        text: "The resource viewer lists files pulled in by `@require` and `@resource`, with their sizes. Resources are stored with the script and are not re-downloaded on every run.",
      },
      { type: "h2", text: "Run timing and injection world" },
      {
        type: "table",
        head: ["Setting", "Effect"],
        rows: [
          ["`@run-at`", "Which point in the document lifecycle the script runs at."],
          ["`@inject-into`", "Whether the script runs in the page world or an isolated world."],
          ["`@grant`", "Determines available GM APIs; `@grant none` leans toward the page world."],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "One script per editor",
        text: "The current version hosts one script per editor window. For side-by-side editing, open two tabs rather than splitting the layout.",
      },
    ],
  }),

  "gm-api": defineArticle({
    product: "userscripts",
    slug: "gm-api",
    section: "features",
    title: "GM API",
    description: "Value storage, cross-origin requests, cookies, downloads, notifications, styles and menu commands.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "The GM API is provided by the extension's service worker. Scripts call it over the message channel; permissions are declared at install time and every call is still bound to the script's identity.",
      },
      { type: "h2", text: "Value storage" },
      {
        type: "code",
        lang: "javascript",
        title: "Read and write script values",
        code: "await GM_setValue('theme', 'dark');\nconst theme = await GM_getValue('theme', 'light');\nconst keys = await GM_listValues();\nawait GM_deleteValue('theme');",
      },
      { type: "h2", text: "Network requests" },
      {
        type: "code",
        lang: "javascript",
        title: "Cross-origin request",
        code: "const response = await GM_xmlhttpRequest({\n  method: 'GET',\n  url: 'https://api.example.com/items',\n  headers: { Accept: 'application/json' },\n});\nconsole.log(response.responseText);",
      },
      { type: "h2", text: "Browser capabilities" },
      {
        type: "ul",
        items: [
          "`GM_cookie`: read, write and delete cookies.",
          "`GM_download`: download files and track progress.",
          "`GM_notification`: system notifications.",
          "`GM_setClipboard`: write to the clipboard.",
          "`GM_registerMenuCommand`: register extension menu commands.",
        ],
      },
      { type: "h2", text: "Page capabilities" },
      {
        type: "ul",
        items: [
          "`GM_addStyle`: inject styles into the page.",
          "`GM_addElement`: create and insert elements.",
          "`unsafeWindow`: access the real page `window`, available only in the MAIN world.",
          "`GM.*` promise aliases: match modern async style.",
        ],
      },
      { type: "h2", text: "Menu commands" },
      {
        type: "code",
        lang: "javascript",
        title: "Register a menu command",
        code: "GM_registerMenuCommand('Toggle focus mode', () => {\n  document.body.classList.toggle('focus-mode');\n});",
      },
      { type: "h2", text: "Permissions and safety" },
      {
        type: "p",
        text: "Every GM API maps to a permission on the install page. A script cannot call an undeclared capability; if an update adds one, it waits for your confirmation.",
      },
      {
        type: "callout",
        tone: "note",
        title: "The isolated world has no synchronous page object",
        text: "USER_SCRIPT scripts get the isolated world's `window` and cannot provide a synchronous page object. When you need the real page `window`, use `@grant unsafeWindow` or `@inject-into page`.",
      },
    ],
  }),

  permissions: defineArticle({
    product: "userscripts",
    slug: "permissions",
    section: "features",
    title: "Scope and permissions",
    description: "How @match, @include, @exclude, run timing and injection worlds determine script behavior.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "A script's reach is defined by its metadata. The install page parses the rules into a readable site list, and saving validates them again so invalid rules are never silently ignored.",
      },
      { type: "h2", text: "Match rules" },
      {
        type: "table",
        head: ["Directive", "Purpose"],
        rows: [
          ["`@match`", "Limits pages using Chrome match patterns; highest priority."],
          ["`@include`", "Adds matches, supporting glob and regex rules."],
          ["`@exclude`", "Removes pages from the matched set."],
          ["`@exclude-match`", "Removes pages using match patterns."],
        ],
      },
      { type: "h2", text: "Run timing" },
      {
        type: "table",
        head: ["Value", "Timing"],
        rows: [
          ["`document-start`", "As the document begins loading; the DOM may not exist yet."],
          ["`document-end`", "After the DOM is parsed; resources may still be loading."],
          ["`document-idle`", "After the page is idle; the safest default."],
        ],
      },
      { type: "h2", text: "Injection worlds" },
      {
        type: "table",
        head: ["World", "Capabilities"],
        rows: [
          ["MAIN", "The real page `window` and page objects; GM APIs are bridged."],
          ["USER_SCRIPT", "Isolated from the page with the full GM API; no synchronous page object."],
        ],
      },
      { type: "h2", text: "Updates check permissions" },
      {
        type: "p",
        text: "If a new version expands `@match`, adds a `@grant` or introduces new external code, the update waits for your confirmation. The manager never silently widens a script's reach.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Least privilege",
        text: "Declare only the sites and GM APIs the script actually needs. A narrower scope makes updates easier to judge and reduces the chance of being blocked by site security policy.",
      },
      { type: "h2", text: "Inspect the effective scope" },
      {
        type: "ul",
        items: [
          "The script list shows the number of parsed sites.",
          "Editor → Metadata marks invalid or overly broad rules.",
          "The popup shows which scripts match the current page and lets you toggle them.",
        ],
      },
    ],
  }),

  "updates-backup": defineArticle({
    product: "userscripts",
    slug: "updates-backup",
    section: "features",
    title: "Updates and backups",
    description: "Automatic update checks, permission-aware upgrades, the recycle bin and JSON / ZIP backups.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Updates and backups solve different problems: updates keep scripts current, backups let you recover after a device change or a mistake. Both are managed in Settings → Data.",
      },
      { type: "h2", text: "Automatic updates" },
      {
        type: "steps",
        items: [
          {
            title: "Open Settings → Updates",
            text: "Confirm automatic updates are on and choose the check interval.",
          },
          {
            title: "Keep the install source",
            text: "Only scripts installed from a URL can check for updates automatically; file-installed scripts need the new version installed again.",
          },
          {
            title: "Handle permission changes",
            text: "When a new version requests more permissions, the update pauses for confirmation.",
          },
        ],
      },
      { type: "h2", text: "Check manually" },
      {
        type: "p",
        text: "The script list header offers “Check for updates”. Results are grouped into updates available, up to date and failed; failures show the source address and the error.",
      },
      { type: "h2", text: "Back up" },
      {
        type: "steps",
        items: [
          {
            title: "Open Settings → Data",
            text: "This page shows counts for scripts, the recycle bin, values and resources.",
          },
          {
            title: "Choose a format",
            text: "JSON is easy to inspect and version-control; ZIP is good for a complete backup.",
          },
          {
            title: "Save the file",
            text: "The backup includes script source, metadata, values and resources, and may contain sensitive data.",
          },
        ],
      },
      { type: "h2", text: "Restore" },
      {
        type: "steps",
        items: [
          {
            title: "Import the backup",
            text: "Choose the file in Settings → Data, or drop it in.",
          },
          {
            title: "Preview the contents",
            text: "Before importing, review script counts, conflicts and whether settings are included.",
          },
          {
            title: "Choose a conflict policy",
            text: "Scripts with the same name can be overwritten or skipped.",
          },
          {
            title: "Finish the import",
            text: "Scripts are re-registered after import; matching pages pick them up after a refresh.",
          },
        ],
      },
      { type: "h2", text: "Recycle bin" },
      {
        type: "p",
        text: "Deleting a script moves it to the recycle bin instead of destroying it immediately. Recycled scripts do not run and can be restored or permanently deleted.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Backup files can contain sensitive data",
        text: "Scripts may include cookies, tokens or site data. Keep backup files safe and never upload them to a public repository.",
      },
    ],
  }),

  "agent-endpoint": defineArticle({
    product: "userscripts",
    slug: "agent-endpoint",
    section: "features",
    title: "Connect Lumo (agent endpoint)",
    description: "Enable the MCP endpoint, copy the extension ID, and configure the allowlist and write access.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "The agent endpoint lets Lumo access the Userscripts library over standard MCP. It is off by default; only extensions you explicitly enable and allow can open a session.",
      },
      { type: "h2", text: "What it can do" },
      {
        type: "ul",
        items: [
          "Read the script list, metadata and source.",
          "Create, edit, enable/disable, install and trash scripts (requires write access).",
          "Query runtime state and registration results.",
          "Record every write in the audit log, with rate limiting.",
        ],
      },
      { type: "h2", text: "Step 1: enable the endpoint" },
      {
        type: "steps",
        items: [
          {
            title: "Open Settings → Agent",
            text: "In the Userscripts options page, choose Settings → Agent.",
          },
          {
            title: "Enable agent access",
            text: "When it is off, no extension can open an MCP session.",
          },
          {
            title: "Decide on write access",
            text: "Read-only is enough for inspection; turn on writes when the agent should modify scripts.",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-agent",
        caption: "Settings → Agent: endpoint switch, extension ID, allowlist, write access and recent activity.",
      },
      { type: "h2", text: "Step 2: copy the extension ID" },
      {
        type: "p",
        text: "Use the copy action under Identity. The same 32-character ID is shown on the Lumo Userscripts card in `chrome://extensions`. For unpacked installs, the ID can change after a reload.",
      },
      { type: "h2", text: "Step 3: add it in Lumo" },
      {
        type: "steps",
        items: [
          {
            title: "Open Lumo's MCP settings",
            text: "Settings → MCP → Extensions.",
          },
          {
            title: "Paste the ID",
            text: "Choose “Add extension” and paste the 32-character Userscripts ID.",
          },
          {
            title: "Approve the request",
            text: "If Userscripts shows an access request, confirm the requester is Lumo and choose “Allow and enable”.",
          },
        ],
      },
      { type: "h2", text: "Authorization and the allowlist" },
      {
        type: "p",
        text: "Only extension IDs in the allowlist can open a session. Approving a request adds Lumo; you can also add or remove IDs manually under “Allowed extensions”. After removal, an existing session fails on its next call. Lumo's own extension ID can be copied from Lumo's Settings → MCP → Extensions → Current extension.",
      },
      { type: "h2", text: "Write access" },
      {
        type: "table",
        head: ["Setting", "Behavior"],
        rows: [
          ["Write access off", "The agent can only read the script list and source."],
          ["Write access on", "The agent can create, edit, enable/disable, install and trash scripts."],
          ["New scripts need review", "Agent-created scripts are saved disabled until you inspect them."],
        ],
      },
      { type: "h2", text: "Audit and rate limiting" },
      {
        type: "ul",
        items: [
          "“Recent agent activity” shows the tool name, target script, time and result.",
          "Writes are rate-limited over a sliding window so the library cannot be bulk-edited.",
          "The audit stores argument hashes, not script source.",
        ],
      },
      { type: "h2", text: "Disconnect" },
      {
        type: "steps",
        items: [
          {
            title: "Remove from the allowlist",
            text: "Remove Lumo's extension ID; later sessions are rejected.",
          },
          {
            title: "Turn off the endpoint",
            text: "Turn off “Allow agent access” and no extension can connect.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Be careful with write access",
        text: "With writes on, the agent can modify your scripts. Keep “New scripts need review” on and check recent activity regularly.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Connection steps in Lumo",
            text: "Probing, adding the ID and connection states from Lumo's side.",
            href: "/docs/lumo/extension-services",
            cta: "Read",
          },
          {
            title: "Logs and diagnostics",
            text: "Check runtime state and errors when a connection fails.",
            href: "/docs/userscripts/diagnostics",
            cta: "Troubleshoot",
          },
        ],
      },
    ],
  }),

  diagnostics: defineArticle({
    product: "userscripts",
    slug: "diagnostics",
    section: "features",
    title: "Logs and diagnostics",
    description: "Inspect runtime health, script registration, logs and per-page controls.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Diagnostics answer three questions: is the runtime available, is the script registered, and why did a call fail. It is faster than reinstalling.",
      },
      { type: "h2", text: "Logs" },
      {
        type: "steps",
        items: [
          {
            title: "Open the Logs page",
            text: "Choose “Logs” in the options page.",
          },
          {
            title: "Filter by script",
            text: "Select one script or all scripts to see registration, runtime and message errors.",
          },
          {
            title: "Clear the log",
            text: "Clear it before reproducing a problem for a cleaner result.",
          },
        ],
      },
      { type: "h2", text: "Runtime health" },
      {
        type: "p",
        text: "Runtime status shows whether `chrome.userScripts` is available, whether both engines loaded, how many scripts are registered and when the last check ran. When the runtime is unavailable, scripts do not execute.",
      },
      { type: "h2", text: "Registration diagnostics" },
      {
        type: "steps",
        items: [
          {
            title: "Compare registered counts",
            text: "Compare the registered count with the number of enabled scripts.",
          },
          {
            title: "Re-register",
            text: "Use “Re-register scripts” to rebuild every registration.",
          },
          {
            title: "Read the error",
            text: "A failed registration names the script and the reason, such as an invalid match rule.",
          },
        ],
      },
      { type: "h2", text: "Per-page controls in the popup" },
      {
        type: "ul",
        items: [
          "Shows which scripts match the current page.",
          "Lets you enable or disable a single script without opening full settings.",
          "Shows whether the current page has a runtime error.",
        ],
      },
      { type: "h2", text: "Common errors" },
      {
        type: "table",
        head: ["Error", "Cause", "Fix"],
        rows: [
          ["User scripts unavailable", "Chrome has not allowed user scripts, or the version is too old", "Turn on “Allow user scripts” and confirm Chrome 138+."],
          ["Script not registered", "Invalid match rules or registration skipped", "Fix the metadata and re-register."],
          ["No matching page", "`@match` does not cover the current site", "Check the rule or add `@include`."],
          ["Insufficient permission", "A GM API was not declared or was revoked", "Add `@grant` to the header and reinstall."],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Clear the log before reproducing",
        text: "Old entries hide new problems. Clear the log, refresh the page and keep only this run's registration and runtime records.",
      },
    ],
  }),

  settings: defineArticle({
    product: "userscripts",
    slug: "settings",
    section: "features",
    title: "Settings reference",
    description: "General, updates, data, agent and appearance settings.",
    updated: "2026-11-04",
    blocks: [
      {
        type: "p",
        text: "Settings are grouped by purpose: General decides how scripts are injected, Updates decides how new versions are found, Data handles backup and restore, and Agent controls external access. Appearance is a separate page and only affects the interface.",
      },
      { type: "h2", text: "General" },
      {
        type: "table",
        head: ["Setting", "Effect"],
        rows: [
          ["Enable script injection", "The manager-level master switch; turning it off pauses every script without uninstalling."],
          ["Default run timing", "Used by new scripts that do not declare `@run-at`."],
          ["Default injection world", "Used by new scripts that do not declare `@inject-into`."],
          ["Force isolated execution", "Prefer the USER_SCRIPT world to reduce conflicts with page globals."],
        ],
      },
      { type: "h2", text: "Updates" },
      {
        type: "table",
        head: ["Setting", "Effect"],
        rows: [
          ["Automatic updates", "Check scripts with an install source at the chosen interval."],
          ["Check interval", "How often automatic checks run."],
          ["Confirm permission changes", "Pause an update when a new version requests more permissions."],
        ],
      },
      { type: "h2", text: "Data" },
      {
        type: "p",
        text: "The Data page shows counts for scripts, the recycle bin, values and resources, and provides JSON / ZIP export and import. Import previews contents and conflicts first.",
      },
      { type: "h2", text: "Agent" },
      {
        type: "p",
        text: "Controls the MCP endpoint, allowlist and write access. See [Connect Lumo](/docs/userscripts/agent-endpoint) for the full steps.",
      },
      { type: "h2", text: "Appearance (separate page)" },
      {
        type: "ul",
        items: [
          "Three palettes: Paper, Graphite and Midnight.",
          "Five accents, separate from the palette.",
          "Interface scaling for different screen densities.",
          "English and Simplified Chinese.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Settings stay on this device",
        text: "All settings, scripts and values are stored locally and do not sync to other devices. Export a backup before changing browsers.",
      },
    ],
  }),
};
