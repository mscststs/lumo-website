import { defineArticle, type DocCollection } from "./types";

export const zh: DocCollection = {
  introduction: defineArticle({
    slug: "introduction",
    category: "start",
    title: "介绍",
    description: "Lumo 是什么、它交付的两个产品，以及连接它们的边界。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo 是一套浏览器原生工具。它不替换浏览器，也不把你的工作搬进另一个应用。它为你已经在用的浏览器补上两种精确能力：**理解**与**控制**。",
      },
      { type: "h2", text: "两个产品，一条边界" },
      {
        type: "p",
        text: "两个产品刻意保持独立。它们有各自的权限、存储与发布节奏。共享的是设计语言和本地优先的立场，而不是运行时。",
      },
      {
        type: "ul",
        items: [
          "**Lumo** —— 一个拥有完整智能体循环的 AI 侧边栏：读取当前页面，通过 MCP 调用浏览器与 DevTools 工具，直到任务完成。",
          "**Lumo Userscripts** —— 基于原生 `chrome.userScripts` 的用户脚本管理器，带真正的编辑器、GM API、备份与诊断，并额外提供智能体可操作的 MCP 端点。",
          "**本站** —— 品牌门面、产品文档，以及共享设计系统的参考实现。",
        ],
      },
      { type: "h2", text: "它为什么不同" },
      {
        type: "ul",
        items: [
          "**本地优先。** 对话、文件、设置与脚本正文都留在你的设备上。没有 Lumo 账号，也没有中转服务器。",
          "**自带模型。** Lumo 连接你配置的模型服务，使用你的密钥。本地模型是一等选项。",
          "**原生平台 API。** 用户脚本管理器通过 `chrome.userScripts` 注册脚本，而不是用 content script 模拟。",
          "**原生智能体能力，而非外挂。** Lumo Userscripts 的端点是标准 MCP，智能体直接创建与编辑脚本，而不是反过来指导用户操作。",
          "**把工艺当作约束。** 四条设计法则——渐进式隐藏、交互归一化、渐进式披露、物理级动效——是评审清单的一部分。",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "本站也是系统的一部分",
        text: "官网使用与扩展相同的 OKLCH 令牌、字号阶梯、动效曲线与交互规则。读文档，也是在读正在运行的设计系统。",
      },
      { type: "h2", text: "接下来" },
      {
        type: "steps",
        items: [
          {
            title: "安装一个产品",
            text: "想要理解页面，从 Lumo 开始；想要逐站点控制，从 Lumo Userscripts 开始。",
          },
          {
            title: "阅读架构",
            text: "看看扩展运行时、模型层与这个静态站点如何拼在一起。",
          },
          {
            title: "使用设计系统",
            text: "令牌、明暗两套外壳、动效与可访问性规则都被写成可执行的约束。",
          },
        ],
      },
    ],
  }),

  "getting-started": defineArticle({
    slug: "getting-started",
    category: "start",
    title: "开始使用",
    description: "安装两个产品、在本地运行本站，并知道哪些命令真正重要。",
    updated: "2025-11-01",
    blocks: [
      {
        type: "p",
        text: "Lumo 有三种运行方式：Chrome 应用商店、GitHub Actions 产物，或本地构建。用户脚本管理器通过 GitHub Releases 分发。本站是一个标准的 Vite 项目。",
      },
      { type: "h2", text: "安装 Lumo" },
      {
        type: "steps",
        items: [
          {
            title: "Chrome 应用商店",
            text: "稳定渠道。会自动更新，但每个版本都要等 Google 审核，因此可能落后于 `main`。",
          },
          {
            title: "GitHub Actions 产物",
            text: "下载最新的 `lumo-chrome-mv3` 产物，解压，打开 `chrome://extensions`，开启开发者模式，选择“加载已解压的扩展程序”。",
          },
          {
            title: "从源码构建",
            text: "克隆仓库、安装依赖、构建，然后加载 `.output/chrome-mv3`。",
          },
        ],
      },
      {
        type: "code",
        lang: "bash",
        title: "从源码构建 Lumo",
        code: "git clone https://github.com/mscststs/lumo.git\ncd lumo\nnpm install\nnpm run build\n# chrome://extensions → 加载已解压的扩展程序 → .output/chrome-mv3",
      },
      { type: "h2", text: "安装 Lumo Userscripts" },
      {
        type: "p",
        text: "用户脚本需要 **Chrome 138 或更新版本**，以及原生 `chrome.userScripts` API。Chrome 会要求你为该扩展允许一次用户脚本。",
      },
      {
        type: "ol",
        items: [
          "从 GitHub Releases 下载最新压缩包，或从源码构建。",
          "打开 `chrome://extensions`，开启开发者模式，加载已解压的目录。",
          "在扩展卡片上开启 **允许用户脚本**。",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "这个开关是必须的",
        text: "没有“允许用户脚本”，管理器仍然可以安装和编辑脚本，但 Chrome 不会执行它们。",
      },
      { type: "h2", text: "在本地运行本站" },
      {
        type: "code",
        lang: "bash",
        title: "网站",
        code: "npm install\nnpm run dev       # http://localhost:5173\nnpm run typecheck\nnpm run test\nnpm run build     # 预渲染所有路由到 build/client",
      },
      {
        type: "table",
        head: ["命令", "作用"],
        rows: [
          ["`npm run dev`", "带 HMR 的 React Router 开发服务器。"],
          ["`npm run build`", "预渲染所有路由并写出静态 HTML。"],
          ["`npm run preview`", "通过 Wrangler 预览 `build/client`。"],
          ["`npm run typecheck`", "生成路由类型，再运行 `tsc --noEmit`。"],
          ["`npm run test`", "Vitest：i18n 对齐、文档完整性、主题对比度。"],
          ["`npm run deploy`", "把 `build/client` 作为 Worker 静态资产部署。"],
        ],
      },
    ],
  }),

  architecture: defineArticle({
    slug: "architecture",
    category: "platform",
    title: "架构",
    description: "三个代码库、两套扩展运行时，以及一条静态交付流水线。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo 拆成三个仓库，让权限、发布节奏与故障域保持分离。设计语言是三者之间唯一刻意共享的东西。",
      },
      { type: "h2", text: "产品运行时" },
      {
        type: "p",
        text: "两个扩展都是 Chrome MV3 上的 WXT 项目。React 渲染界面；Tailwind 与 shadcn 风格原语提供组件层；Motion 负责布局与入场动效。",
      },
      {
        type: "table",
        head: ["层", "Lumo", "Lumo Userscripts"],
        rows: [
          ["外壳", "WXT + MV3", "WXT + MV3"],
          ["界面", "React 19 + Tailwind 4", "React 19 + Tailwind 4"],
          ["状态", "Zustand + chrome.storage", "Zustand + chrome.storage + IndexedDB"],
          ["AI / 工具", "Vercel AI SDK 智能体循环 + MCP", "可选 MCP 提供方端点"],
          ["编辑器", "CodeMirror 6 / Streamdown", "CodeMirror 6 / Shiki"],
          ["动效", "Motion", "Motion"],
        ],
      },
      { type: "h2", text: "站点运行时" },
      {
        type: "p",
        text: "本站使用 **React Router 8 framework mode**，设置 `ssr: false` 并全量预渲染。构建时把每个路由渲染成 HTML，运行时水合成普通 SPA。生产环境没有服务器。",
      },
      {
        type: "code",
        lang: "ts",
        title: "react-router.config.ts",
        code: "export default {\n  ssr: false,\n  prerender: async ({ getStaticPaths }) => [\n    ...getStaticPaths(),\n    ...docPaths,\n  ],\n} satisfies Config;",
      },
      {
        type: "p",
        text: "静态产物在 `build/client`。Cloudflare Workers 以静态资产方式直接托管；每个已知路由都有对应文件，未知 URL 会落到生成的 `404.html`。",
      },
      { type: "h2", text: "共享设计语言" },
      {
        type: "ul",
        items: [
          "OKLCH 语义令牌，覆盖明暗两套外壳。",
          "相同的字号阶梯、圆角、材质与动效曲线。",
          "相同的四条设计法则，在营销面与工具面上有不同的落地方式。",
          "i18next 资源，中英文 key 严格对齐。",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "单向依赖",
        text: "官网可以记录产品，但绝不能 import 产品运行时代码。文档会漂移；共享 import 会让发布互相耦合。",
      },
    ],
  }),

  mcp: defineArticle({
    slug: "mcp",
    category: "platform",
    title: "MCP 与浏览器工具",
    description: "Lumo 如何把浏览器暴露成强类型工具面，以及信任边界在哪里。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo 不把命令列表硬编码进模型提示词。它运行一个或多个 **Model Context Protocol** Server，让 Agent 在运行时发现工具。内置浏览器工具与远程 Server 使用同一套协议。",
      },
      { type: "h2", text: "内置 Server" },
      {
        type: "table",
        head: ["Server", "能力"],
        rows: [
          ["Browser Core", "标签页、窗口、导航、书签、历史、Cookie、下载。"],
          ["Page Interaction", "页面读取、无障碍快照、点击、表单填写、键盘、截图。"],
          ["Network Monitor", "请求捕获、URL 拦截、重定向、请求头改写。"],
          ["DevTools Advanced", "CDP 会话、可信输入、设备/网络模拟、控制台捕获。"],
          ["File Manager", "读取、写入、修补、预览与下载 IndexedDB 中的文件。"],
        ],
      },
      { type: "h2", text: "传输方式" },
      {
        type: "ul",
        items: [
          "**HTTP Streamable** —— 远程 Server 的首选，适合请求/响应形态。",
          "**SSE** —— 支持通过长连接推送事件的 Server。",
          "内置 Server 在进程内注册，不离开扩展。",
        ],
      },
      {
        type: "code",
        lang: "json",
        title: "简化后的工具结果",
        code: "{\n  \"tool\": \"page.read\",\n  \"input\": { \"tabId\": 42 },\n  \"result\": {\n    \"title\": \"定价 — Northwind\",\n    \"sections\": 3,\n    \"words\": 1284\n  }\n}",
      },
      { type: "h2", text: "扩展提供方与 WebMCP" },
      {
        type: "p",
        text: "同源扩展可以通过 `chrome.runtime.Port` 提供 MCP。Lumo 用一次 L0 探测发现它，检查 `enabled / authorized / ready`，然后建立标准 MCP 会话。声明了 WebMCP 工具的页面则以「按标签页」的形式加入。两者和远程服务进入同一份注册表，模型看到的是一张工具列表。",
      },
      {
        type: "ul",
        items: [
          "远程服务走 HTTP Streamable 或 SSE；扩展提供方走运行端口。",
          "禁用某个来源后，下一步就不再出现它的工具，无需重建提示词。",
          "工具名带命名空间；冲突时绝不静默覆盖其他服务。",
        ],
      },
      { type: "h2", text: "安全边界" },
      {
        type: "ul",
        items: [
          "每次工具调用都在对话中显式可见；Agent 循环可以在中途停止。",
          "外部 Server 默认关闭，必须由用户主动添加。",
          "工具结果被视为不可信内容；页面文本不能悄悄扩大权限。",
          "扩展只申请功能真正需要的 Chrome 权限，并在文档中逐项说明。",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "远程工具是你没写过的代码",
        text: "只连接你信任的 MCP Server。Server 既可能返回数据，也可能返回指令；Lumo 保持工具调用可见，但无法审计第三方实现。",
      },
      { type: "h2", text: "添加一个 Server" },
      {
        type: "steps",
        items: [
          {
            title: "打开 MCP 设置",
            text: "设置 → MCP → 添加外部 Server。",
          },
          {
            title: "选择传输方式",
            text: "填写 HTTP Streamable 或 SSE 端点。认证头保存在本地。",
          },
          {
            title: "检查工具",
            text: "Lumo 会发现工具列表并显示连接状态，然后你才能在对话中启用。",
          },
        ],
      },
    ],
  }),

  "userscripts-runtime": defineArticle({
    slug: "userscripts-runtime",
    category: "products",
    title: "用户脚本运行时",
    description: "两套执行引擎、元数据匹配、GM API 与权限模型。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts 通过原生 `chrome.userScripts` API 注册每个脚本。运行时有两套引擎：页面世界 runner 与隔离的 USER_SCRIPT host。两者都通过带 nonce 的 `MessageChannel` 与扩展通信。同一个管理器还可以选择通过 MCP 暴露脚本，见 [连接智能体](/docs/agent-connections)。",
      },
      { type: "h2", text: "执行模型" },
      {
        type: "table",
        head: ["引擎", "世界", "适用场景"],
        rows: [
          ["`us-runner`", "MAIN", "需要页面真实 `window`，或声明 `@grant unsafeWindow` 的脚本。"],
          ["`us-host`", "USER_SCRIPT", "需要与页面全局隔离，同时仍使用 GM API 的脚本。"],
        ],
      },
      {
        type: "p",
        text: "`@inject-into page` 与 `@grant none` 的脚本运行在页面世界。USER_SCRIPT 脚本拿到隔离世界的 `window`，无法提供同步的页面对象。",
      },
      { type: "h2", text: "元数据" },
      {
        type: "code",
        lang: "javascript",
        title: "脚本头",
        code: "// ==UserScript==\n// @name        GitHub focus mode\n// @namespace   https://example.com/\n// @version     1.4.2\n// @match       *://*.github.com/*\n// @run-at      document-idle\n// @grant       GM_setValue\n// @grant       GM_getValue\n// ==/UserScript==",
      },
      {
        type: "p",
        text: "管理器在保存时校验元数据，支持 `@match` / `@include` / `@exclude` 的 glob 与正则规则，并把相对 `@require` / `@resource` URL 解析到安装来源。",
      },
      { type: "h2", text: "GM API" },
      {
        type: "ul",
        items: [
          "值：`GM_setValue`、`GM_getValue`、`GM_deleteValue`、`GM_listValues`。",
          "网络：`GM_xmlhttpRequest` 用于跨域请求。",
          "浏览器：`GM_cookie`、`GM_download`、`GM_notification`、`GM_setClipboard`。",
          "页面：`GM_addStyle`、`GM_addElement`、`unsafeWindow`。",
          "外壳：`GM_registerMenuCommand`、标签页状态与 Promise 化的 `GM.*` 别名。",
        ],
      },
      { type: "h2", text: "权限" },
      {
        type: "table",
        head: ["权限", "用途"],
        rows: [
          ["`userScripts`", "通过 Chrome 原生 API 动态注册。"],
          ["`storage`, `unlimitedStorage`", "设置与有界元数据。"],
          ["`tabs`, `activeTab`, `webNavigation`, `scripting`", "标签页上下文与诊断。"],
          ["`declarativeNetRequest`", "把 `.user.js` 导航重定向到安装页。"],
          ["`cookies`, `downloads`", "支撑 `GM_cookie` 与 `GM_download`。"],
          ["`notifications`, `contextMenus`, `alarms`, `clipboardWrite`", "GM API 与后台任务。"],
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "更新会检查权限",
        text: "如果新版本需要更多访问权，更新会等待用户决定。管理器绝不会悄悄扩大脚本的触达范围。",
      },
    ],
  }),

  "design-system": defineArticle({
    slug: "design-system",
    category: "design",
    title: "设计系统",
    description: "产品与本站共享的令牌、明暗两套外壳、动效曲线与可访问性规则。",
    updated: "2025-11-01",
    blocks: [
      {
        type: "p",
        text: "设计系统是一组可执行的约束，不是情绪板。下面每个值都在 `app/styles/globals.css` 或 `app/lib/theme/registry.ts` 中有对应实现；一旦漂移，测试就会失败。",
      },
      { type: "h2", text: "四条法则" },
      {
        type: "ul",
        items: [
          "**渐进式隐藏** —— 功能通过形态与状态自解释，而不是靠帮助文本。",
          "**交互归一化** —— 同一个动作在任何地方都有相同的形状、热区与焦点处理。",
          "**渐进式披露** —— 先给决策，把内部细节折叠到被请求为止。",
          "**物理级动效** —— 动效解释因果；退场比入场更快。",
        ],
      },
      { type: "h2", text: "令牌" },
      {
        type: "table",
        head: ["分组", "规则"],
        rows: [
          ["颜色", "只用 OKLCH。组件消费语义令牌，绝不出现 hex/rgb/hsl 字面量。"],
          ["字体", "拉丁用 Inter Variable，中文回退系统字体；代码与标识用 JetBrains Mono。"],
          ["圆角", "控件 10px、卡片 16px、浮层 20px、舞台 24px。"],
          ["材质", "surface / card / panel / float 四档阴影；暗色用顶部高光替代软阴影。"],
          ["间距", "8pt 基准；区块节奏 `clamp(72px, 10vw, 144px)`。"],
        ],
      },
      {
        type: "code",
        lang: "css",
        title: "主强调色",
        code: ":root {\n  --accent-h: 258;\n  --accent-c: 0.17;\n  --accent-l: 0.552;\n}\n\n--color-primary: oklch(var(--accent-l) var(--accent-c) var(--accent-h));",
      },
      { type: "h2", text: "主题" },
      {
        type: "ul",
        items: [
          "**纸白** —— 温暖中性浅色。长时间阅读不会像纯白那样发冷。",
          "**午夜** —— 冷调深蓝，层级更分明。所有暗色表面都解析到这里。",
          "主题菜单只切换亮色、暗色与跟随系统；强调色固定。",
          "暗色表面按亮度分层：背景 → 卡片 → 浮层 → hover。边框亮度高于所有表面。",
        ],
      },
      { type: "h2", text: "动效" },
      {
        type: "table",
        head: ["令牌", "曲线", "用途"],
        rows: [
          ["`--ease-standard`", "`cubic-bezier(0.2, 0, 0, 1)`", "hover、颜色、宽度。"],
          ["`--ease-emphasis`", "`cubic-bezier(0.16, 1, 0.3, 1)`", "入场、Hero 揭示。"],
          ["`--ease-exit`", "`cubic-bezier(0.4, 0, 1, 1)`", "退场，比入场短 25–40%。"],
        ],
      },
      { type: "h2", text: "可访问性" },
      {
        type: "ul",
        items: [
          "每个可交互元素都有可见焦点环；移除焦点环视为缺陷。",
          "目标尺寸：触控 44px，密集桌面面 32px，绝对下限 24px。",
          "对比度：正文与元数据至少 4.5:1；大字 3:1。",
          "`prefers-reduced-motion` 移除大幅位移动画，同时保持状态变化可读。",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "测试令牌，而不是截图",
        text: "对比度由测试套件从 OKLCH 计算。一套配色不能因为在一台显示器上看着还行就上线。",
      },
    ],
  }),

  i18n: defineArticle({
    slug: "i18n",
    category: "engineering",
    title: "国际化",
    description: "路径级 locale、同步预渲染、严格 key 对齐与 hreflang。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Locale 是 URL 的一部分。英文无前缀，中文在 `/zh`，因此每个页面在两种语言下都可分享、可缓存、可索引。",
      },
      { type: "h2", text: "语言由 URL 决定" },
      {
        type: "p",
        text: "`/zh/...` 是中文，`/...` 是英文，两者都不会被改写。只有 `/` 这个本身不含语言的路径会在首帧前选一次语言：先看已存偏好，再看来源页面，最后看 `navigator.languages`。",
      },
      {
        type: "ul",
        items: [
          "在新标签页打开英文链接就停留在英文，与上次读的语言无关。",
          "每个渲染出的页面与语言菜单都会写入偏好，因此偏好始终等于你最近读的语言。",
          "爬虫与自动化浏览器永不跳转。",
          "两种语言都已预渲染；脚本只选择入口，不生成页面。",
        ],
      },
      { type: "h2", text: "路由" },
      {
        type: "p",
        text: "链接只写一次、并且不带语言（`/lumo`、`/docs/mcp`）。`LocaleLink`、`LocaleNavLink` 与 `useLocaleNavigate` 会按当前 URL 的语言补前缀，因此调用点不可能漏掉前缀，译文里也不会存语言。",
      },
      {
        type: "code",
        lang: "ts",
        title: "Locale 工具",
        code: "localePath('zh', '/docs/mcp')      // '/zh/docs/mcp'\nlocalePath('zh', '/zh/docs/mcp')  // '/zh/docs/mcp'（幂等）\nstripLocale('/zh/docs/mcp')        // '/docs/mcp'\nswitchLocaleHref(location, 'en')   // 路径 + 查询 + hash，整体换语言",
      },
      {
        type: "p",
        text: "路由表按 locale 生成，因此产品页与它的翻译是同一个组件。Locale Provider 从 `useLocation()` 读取当前语言，并选择对应的 i18next 实例。",
      },
      { type: "h2", text: "同步预渲染" },
      {
        type: "p",
        text: "i18next 使用 `initAsync: false` 和打包资源初始化。这使初始化同步完成，是静态生成的前提：中文路由在构建时就必须包含中文 HTML，而不是等水合后才有。",
      },
      {
        type: "code",
        lang: "ts",
        title: "每个 locale 一个实例",
        code: "const instance = i18next.createInstance();\ninstance.init({\n  lng: locale,\n  resources,\n  initAsync: false,\n});",
      },
      { type: "h2", text: "内容" },
      {
        type: "ul",
        items: [
          "界面文案在 `app/lib/i18n/resources/{en,zh}.ts`。",
          "长文档在 `app/content/docs/{en,zh}.ts`，使用同一套 `DocBlock` 模型。",
          "测试会比较中英文 key 树；缺 key 会在运行时之前失败。",
          "技术标识（`chrome.userScripts`、`GM_setValue`）保持英文。",
        ],
      },
      { type: "h2", text: "SEO" },
      {
        type: "ul",
        items: [
          "每个路由输出自己的 title、description、canonical、Open Graph 与 Twitter 标签。",
          "`hreflang` 列出同一文档的所有语言，并用 `x-default` 指向默认语言。",
          "canonical 不带尾斜杠；`drop-trailing-slash` 让资产层与所有链接保持一致。",
          "构建后从预渲染 HTML 生成 sitemap。",
        ],
      },
      { type: "h2", text: "新增语言" },
      {
        type: "steps",
        items: [
          {
            title: "新增资源",
            text: "创建翻译对象，并按英文结构做类型约束。",
          },
          {
            title: "扩展 manifest",
            text: "把 locale 加进 `LOCALES` 与 `LOCALE_META`。路由生成与语言菜单会自动接管。",
          },
          {
            title: "新增内容",
            text: "翻译文档集合。完整性测试会列出缺失的 slug。",
          },
          {
            title: "预渲染",
            text: "把 locale 加进 `react-router.config.ts` 的文档路径列表。",
          },
        ],
      },
    ],
  }),

  deployment: defineArticle({
    slug: "deployment",
    category: "engineering",
    title: "部署",
    description: "静态预渲染、Cloudflare Workers 静态资产、响应头、重定向与自定义域名。",
    updated: "2025-11-01",
    blocks: [
      {
        type: "p",
        text: "本站没有运行时服务器。`react-router build` 把每个路由预渲染到 `build/client`；Cloudflare Workers 把这些文件当作静态资产托管，只对未知 URL 回退到生成的 `404.html`。",
      },
      { type: "h2", text: "构建" },
      {
        type: "code",
        lang: "bash",
        title: "本地验证",
        code: "npm install\nnpm run typecheck\nnpm run test\nnpm run build\nnpm run preview   # Wrangler 托管 build/client",
      },
      {
        type: "p",
        text: "构建产物包含每个路由的 HTML，以及 React Router 用于客户端导航的 `.data` 文件。不要压平或重命名这些文件。",
      },
      { type: "h2", text: "Cloudflare Workers" },
      {
        type: "steps",
        items: [
          {
            title: "创建 Worker 项目",
            text: "在 Cloudflare 控制台的 Workers & Pages 中创建 Worker，导入本仓库。",
          },
          {
            title: "设置构建与部署",
            text: "构建命令 `npm run typecheck && npm test && npm run build`，部署命令 `npx wrangler deploy`，Node 22。",
          },
          {
            title: "任意域名都可用",
            text: "不需要构建变量：canonical、OG、JSON-LD 与 sitemap 的源会在边缘替换为请求域名，`*.workers.dev`、预览域名与自定义域名都能直接用。",
          },
          {
            title: "部署",
            text: "推送到 main，或在本地登录 Wrangler 后运行 `npm run deploy`。",
          },
        ],
      },
      {
        type: "code",
        lang: "toml",
        title: "wrangler.toml",
        code: "name = \"lumo-website\"\nmain = \"./src/worker.ts\"\ncompatibility_date = \"2025-01-01\"\n\n[assets]\ndirectory = \"./build/client\"\nbinding = \"ASSETS\"\nhtml_handling = \"auto-trailing-slash\"\nnot_found_handling = \"404-page\"\nrun_worker_first = true",
      },
      { type: "h2", text: "响应头与重定向" },
      {
        type: "table",
        head: ["文件", "作用"],
        rows: [
          ["`public/_headers`", "安全响应头与不可变资源缓存。"],
          ["`404.html`（构建生成）", "未知 URL 的品牌化 404 响应；已知路由由各自的 HTML 文件提供。"],
          ["`public/robots.txt`", "爬虫策略与 sitemap 位置。"],
          ["`scripts/build-sitemap.mjs`", "遍历预渲染 HTML 并写出 `sitemap.xml`。"],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "顺序很重要",
        text: "Workers 静态资产会先提供已存在的文件。如果某个路由 404，先确认它的预渲染 HTML 是否存在，再改 404 回退页。",
      },
      { type: "h2", text: "自定义域名" },
      {
        type: "ol",
        items: [
          "在 Worker → Settings → Domains & Routes 添加自定义域名，按提示配置 DNS。",
          "换域名无需重新配置：canonical 与 sitemap 跟随请求域名。",
          "在 Search Console 提交生成的 `sitemap.xml`。",
        ],
      },
    ],
  }),

  faq: defineArticle({
    slug: "faq",
    category: "start",
    title: "常见问题",
    description: "关于数据、浏览器、模型、脚本触达与自托管的简短回答。",
    updated: "2025-11-06",
    blocks: [
      { type: "h2", text: "Lumo 开源吗？" },
      {
        type: "p",
        text: "扩展仓库是公开的。Lumo 目前没有许可证文件；Lumo Userscripts 使用 MIT。重新分发构建产物前请先阅读仓库。",
      },
      { type: "h2", text: "Lumo 会把我的页面发到服务器吗？" },
      {
        type: "p",
        text: "没有 Lumo 中转。模型请求从你的浏览器直接发往你配置的服务。如果你选择本地模型，页面内容不会离开这台机器。",
      },
      { type: "h2", text: "支持哪些浏览器？" },
      {
        type: "ul",
        items: [
          "Lumo：支持 MV3 的 Chrome 与 Chromium 系浏览器。Firefox 版可从源码构建。",
          "Lumo Userscripts：Chrome 138+，并开启“允许用户脚本”。",
        ],
      },
      { type: "h2", text: "智能体能创建用户脚本吗？" },
      {
        type: "p",
        text: "可以。在 Lumo Userscripts 中开启端点并批准调用方后，智能体立即获得 `list`、`get` 与 `diagnostics`；创建、编辑、启停、安装与删除还需要额外开启「允许写入」，并且每次写入都会记入审计。",
      },
      { type: "h2", text: "可以用本地模型吗？" },
      {
        type: "p",
        text: "可以。配置 Ollama 或本地网关这类 OpenAI 兼容端点。视觉与工具调用能力取决于你选择的模型。",
      },
      { type: "h2", text: "用户脚本会在 chrome:// 页面运行吗？" },
      {
        type: "p",
        text: "不会。Chrome 不允许扩展注入特权页面、Web Store 或其他扩展。管理器会显示权限空态，而不是假装脚本已经运行。",
      },
      { type: "h2", text: "更新如何工作？" },
      {
        type: "p",
        text: "Lumo Userscripts 会检查脚本更新，并在新版本需要更多权限时先询问。Lumo 本身通过 Chrome 应用商店更新，或替换已解压的构建。",
      },
      { type: "h2", text: "可以自托管本站吗？" },
      {
        type: "p",
        text: "可以。它是静态 Vite 构建。运行 `npm run build`，把 `build/client` 放到任意静态托管上；若没有 Worker 做源站改写，则设置 `VITE_SITE_URL`，让 canonical 与社交 URL 指向你的域名。",
      },
      {
        type: "callout",
        tone: "note",
        title: "仍然卡住？",
        text: "在对应仓库开 issue。附上浏览器版本、产品版本，以及确切的状态或日志行。",
      },
    ],
  }),

  "agent-loop": defineArticle({
    slug: "agent-loop",
    category: "platform",
    title: "智能体循环",
    description:
      "一次发送如何变成多次模型步骤、工具调用与可验证的结果，以及边界在哪里。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "一次对话补全只回答一次。智能体的一轮会继续下去：模型规划、调用工具、读取返回结果，再判断目标是否达成。Lumo 在 Vercel AI SDK 之上实现这个循环，并把每一步都展示在过程记录里。",
      },
      { type: "h2", text: "一轮里有什么" },
      {
        type: "p",
        text: "一轮从用户消息与附件开始，加上系统提示词和工具目录。它结束于模型给出最终答案、用户按下停止，或达到配置的上限。",
      },
      {
        type: "ol",
        items: [
          "组装上下文：对话、页面或选区附件、文件引用，以及已启用的工具列表。",
          "调用模型并流式接收各部分：推理、文本，以及零个或多个工具调用。",
          "执行每个工具调用（模型一次发出多个时并行执行），并追加结构化结果。",
          "把扩大的上下文送回模型，从第 2 步重复，直到模型不再调用工具而直接回答。",
        ],
      },
      { type: "h2", text: "步数预算" },
      {
        type: "p",
        text: "默认预算是不限步数。浏览类任务合理地需要几十步，任何固定上限都会变成「任务做到一半停下，让用户输入继续」。",
      },
      {
        type: "ul",
        items: [
          "`0` 表示不设上限，也是默认值；它不是步数。",
          "低于 `MIN_MAX_STEPS`（10）的自定义上限会被抬高，因为更低的上限几乎会截断所有真实任务。",
          "`20` 与 `60` 作为预设，提供给希望有可预期上限的用户。",
        ],
      },
      {
        type: "code",
        lang: "ts",
        title: "唯一的预算判断",
        code: "export function stepAllowed(step: number, maxSteps: number): boolean {\n  return maxSteps === 0 || step < maxSteps;\n}",
      },
      { type: "h2", text: "工具执行" },
      {
        type: "ul",
        items: [
          "工具目录在每次请求时从所有已连接的 MCP 服务组装，因此禁用服务后，下一步就不会再出现它的工具。",
          "每次调用渲染成可折叠卡片，包含输入、状态与输出；失败默认展开。",
          "工具返回的图片会从后续提示词中移除并替换为说明，避免 base64 占满上下文窗口。",
          "一轮被中断时仍在运行的工具调用会显示为已中断，而不是永远转圈。",
        ],
      },
      { type: "h2", text: "上下文与压缩" },
      {
        type: "p",
        text: "上下文环估算的是下一次请求的成本，而不是这段对话已经花掉的成本。当估算超过模型窗口时，旧轮次会被折叠成检查点，以摘要形式回放；原始消息仍然留在过程记录中可读。",
      },
      {
        type: "table",
        head: ["信号", "来源", "改变什么"],
        rows: [
          ["上下文环", "提示词估算 + 提供方实时用量", "下一次请求距离窗口还有多远"],
          ["压缩检查点", "旧轮次折叠为摘要", "回放给模型的内容"],
          ["步骤用量", "每步 token 统计", "助手消息上的用量明细"],
          ["停止原因", "提供方 finish reason", "回复是否标记为中断"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "过程记录才是事实来源",
        text: "压缩只改变提示词投影，从不改变已存储的对话。用户永远可以翻回被摘要的原始消息。",
      },
      { type: "h2", text: "停止与继续" },
      {
        type: "ul",
        items: [
          "停止会中止进行中的请求，并结算每一个未完成的工具调用。",
          "重试会重新发送失败的那一轮，带有限次数的退避。",
          "重新生成会为助手消息创建新变体，旧变体仍可切换查看。",
        ],
      },
      { type: "h2", text: "模型提供方也是循环的一部分" },
      {
        type: "p",
        text: "循环与协议无关。支持三种线协议，以及 OpenCode 的厂商档案——后者会派生端点与会话标识。",
      },
      {
        type: "table",
        head: ["档案", "协议", "端点", "说明"],
        rows: [
          ["OpenAI Chat", "Chat Completions", "`POST {baseUrl}/chat/completions`", "通用默认值，适配大多数网关。"],
          ["OpenAI Responses", "Responses", "`POST {baseUrl}/responses`", "推理与内置工具形态。"],
          ["Anthropic", "Messages", "`POST {baseUrl}/messages`", "Claude 模型、视觉与推理强度。"],
          ["OpenCode", "三种都支持", "由厂商档案派生", "客户端标识与稳定的会话亲和。"],
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "OpenCode 是厂商类型，不是协议",
        text: "如果使用 OpenCode 端点，请把提供方的厂商类型设为 OpenCode。它会派生协议路径、发送客户端标识请求头，并带上按会话的 ID。自定义提供方指向同一路径时缺少这些请求头，OpenCode 会拒绝请求。",
      },
      {
        type: "callout",
        tone: "note",
        title: "推理强度是模型级设置",
        text: "推理强度按模型保存，未设置时不会写入请求，因此空值永远不会覆盖提供方的默认行为。",
      },
    ],
  }),

  "agent-connections": defineArticle({
    slug: "agent-connections",
    category: "products",
    title: "智能体连接",
    description:
      "从 Lumo 发起连接，或从 Lumo Userscripts 授权——两个方向，同一份契约。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts 可以把脚本暴露给 MCP 客户端。实际使用中的宿主是 Lumo，但契约并不关心是谁连接：任何能探测、获得授权并打开运行端口的扩展，都会得到同一套工具面。",
      },
      { type: "h2", text: "两个方向，一份契约" },
      {
        type: "p",
        text: "有两种开始方式，最终都会落到同一个会话。Lumo 可以发现提供方；提供方也可以把一个未知调用方视为需要决策的请求。",
      },
      {
        type: "table",
        head: ["起点", "发生什么", "用户在哪里决定"],
        rows: [
          ["从 Lumo 发起", "在「设置 → MCP → 扩展」添加提供方的 32 位扩展 ID。", "在 Lumo 中，第一次探测之前。"],
          ["从 Lumo Userscripts 授权", "提供方在探测中返回 `authorized: false`，并把请求排入队列。", "在提供方的「设置 → 智能体」，或批准对话框。"],
          ["无论哪种", "批准后 Lumo 打开 `lumo:mcp` 端口并列出工具。", "除非策略变化，不再提示。"],
        ],
      },
      { type: "h2", text: "从 Lumo 发起连接" },
      {
        type: "steps",
        items: [
          {
            title: "打开 MCP 设置",
            text: "设置 → MCP → 扩展。同一面板会显示 Lumo 自己的扩展 ID，审批时需要它。",
          },
          {
            title: "添加提供方 ID",
            text: "粘贴 Lumo Userscripts 的 32 位 ID。ID 只包含字母 a–p。",
          },
          {
            title: "让探测运行",
            text: "Lumo 发送一次 L0 探测。端点关闭、未授权或运行时不可用都会被报告为具体状态，而不是握手失败。",
          },
          {
            title: "批准并连接",
            text: "如果提供方要求审批，打开它的设置并允许 Lumo 的 ID。回到 Lumo 后它会重试探测并建立 MCP 会话。",
          },
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "ID 不是名称",
        text: "提供方的名称是自报值，只用于展示。授权始终比较 `sender.id`，因为名称可以冒充任何东西。",
      },
      { type: "h2", text: "从 Lumo Userscripts 授权" },
      {
        type: "steps",
        items: [
          {
            title: "打开端点",
            text: "设置 → 智能体 → 智能体访问。它默认关闭，关闭时任何扩展都发现不了它。",
          },
          {
            title: "决定是否允许写入",
            text: "「允许写入」是第二个开关。保持关闭时只暴露 `list`、`get` 与 `diagnostics`。",
          },
          {
            title: "添加调用方",
            text: "把 Lumo 的扩展 ID 粘贴到「允许的扩展」。面板也提供复制自身 ID 的按钮。",
          },
          {
            title: "处理请求队列",
            text: "待处理请求会出现在同一区块，并以中断对话框呈现。可以批准、忽略，或仅在本会话稍后处理。",
          },
        ],
      },
      { type: "h2", text: "未就绪时用户看到什么" },
      {
        type: "table",
        head: ["提供方状态", "Lumo 显示", "修复方式"],
        rows: [
          ["未安装 / 无端点", "扩展未安装，或未暴露智能体端点。", "检查 ID，然后重装或重新构建。"],
          ["端点关闭", "`<名称>` 中的智能体访问已关闭。", "在提供方中开启智能体访问。"],
          ["未授权", "`<名称>` 不允许当前扩展。", "把 Lumo 的 ID 加入提供方允许列表。"],
          ["等待审批", "`<名称>` 正在等待你批准此扩展。", "打开提供方设置并批准。"],
          ["未就绪", "提供方自己的原因说明。", "阅读原因；通常是 `chrome.userScripts` 不可用。"],
        ],
      },
      { type: "h2", text: "安全地写入" },
      {
        type: "ul",
        items: [
          "端点开启且调用方已授权后，只读工具即可使用。",
          "写入工具还需要「允许写入」；关闭后影响的是下一次调用，而不是下一次会话。",
          "复核模式会把新脚本创建为禁用状态，并标记待复核。",
          "每次写入限制为每分钟 30 次，并记录在活动列表；参数只保存哈希。",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "智能体不是另一套权限系统",
        text: "智能体创建的脚本，与你手写的脚本拥有同样的 `@match` 与 `@grant` 触达范围。复核模式存在的意义，就是让新脚本在你看到之前不能运行。",
      },
      { type: "h2", text: "排查" },
      {
        type: "table",
        head: ["症状", "可能原因", "处理"],
        rows: [
          ["工具过一会儿消失", "MV3 回收了 service worker，端口关闭。", "再次调用工具；Lumo 会懒重连并重新初始化。"],
          ["工具存在但写入全部失败", "「允许写入」关闭，或触发限流窗口。", "开启写入，或等待一分钟。"],
          ["批准提示反复出现", "调用方 ID 不在允许列表。", "在「设置 → 智能体 → 允许的扩展」添加。"],
          ["`authorized: true` 但没有工具", "`chrome.userScripts` 不可用，或没有安装脚本。", "运行 `diagnostics`，再检查「允许用户脚本」。"],
          ["连接到了错误的扩展", "32 位 ID 粘贴错误。", "从提供方的智能体区块复制 ID，不要手输。"],
        ],
      },
      {
        type: "p",
        text: "线格式、状态矩阵与限制见 [扩展提供方协议](/docs/agent-protocol)。消费这些工具的循环见 [智能体循环](/docs/agent-loop)。",
      },
    ],
  }),

  "agent-protocol": defineArticle({
    slug: "agent-protocol",
    category: "engineering",
    title: "扩展协议",
    description:
      "L0 探测与 L1 MCP 会话：线格式、状态机、不变量与限制。",
    updated: "2025-11-06",
    blocks: [
      {
        type: "p",
        text: "这是 MCP 宿主（Lumo）与任何提供工具的 Chrome 扩展之间的契约。它只有两层：一条回答「提供方是否可用」的自定义消息，以及其余全部走标准 MCP。",
      },
      { type: "h2", text: "两层结构" },
      {
        type: "p",
        text: "MCP 的 `initialize` 无法在不失败握手的情况下表达「已安装但关闭」或「未授权」，宿主也就无法告诉用户该修什么。L0 用来表达这些状态；L1 保持完全标准。",
      },
      {
        type: "code",
        lang: "json",
        title: "L0 请求（chrome.runtime.sendMessage）",
        code: "{\n  \"channel\": \"lumo:probe\",\n  \"version\": 1,\n  \"id\": \"probe-42\",\n  \"client\": { \"id\": \"<lumo extension id>\", \"name\": \"Lumo\", \"version\": \"1.0.19\" }\n}",
      },
      {
        type: "code",
        lang: "json",
        title: "L0 响应——策略失败时 ok 仍为 true",
        code: "{\n  \"ok\": true,\n  \"service\": { \"namespace\": \"userscripts\", \"name\": \"Lumo Userscripts\", \"version\": \"1.0.1\" },\n  \"status\": {\n    \"enabled\": true,\n    \"authorized\": false,\n    \"ready\": true,\n    \"pendingApproval\": true\n  }\n}",
      },
      { type: "h2", text: "第 1 层：运行端口上的 MCP" },
      {
        type: "ul",
        items: [
          "端口名固定为 `lumo:mcp`，探测频道固定为 `lumo:probe`。",
          "JSON-RPC、`initialize`、能力协商、`tools/list` 与 `tools/call` 都由双方官方 MCP SDK 处理。",
          "端口关闭不等于服务消失：MV3 可能回收 service worker。宿主保留逻辑会话与工具缓存，下一次调用时懒重连。",
          "重连会重新执行 `initialize`。提供方为每个端口新建 `McpServer`，不能复用旧的初始化结果。",
        ],
      },
      { type: "h2", text: "状态机" },
      {
        type: "table",
        head: ["探测结果", "宿主状态", "用户可见结果"],
        rows: [
          ["sendMessage 拒绝", "error", "扩展未安装，或没有智能体端点。"],
          ["1500ms 超时", "error", "原始错误信息。"],
          ["`ok: false`", "error", "协议错误信息。"],
          ["缺少 service 或 status", "error", "探测响应不完整。"],
          ["`enabled: false`", "error", "提供方中的智能体访问已关闭。"],
          ["`authorized: false` + 待审批", "error", "正在提供方中等待你的批准。"],
          ["`authorized: false`", "error", "调用方不在允许列表。"],
          ["`ready: false`", "error", "提供方自己的原因说明。"],
          ["全部通过", "connected", "工具出现，并显示数量。"],
        ],
      },
      { type: "h2", text: "不变量" },
      {
        type: "ol",
        items: [
          "名称与版本固定：`lumo:probe`、`lumo:mcp`、探测版本 `1`。",
          "`isExtensionId()` 是唯一的 ID 判据：`/^[a-p]{32}$/`。所有输入路径都必须经过它。",
          "策略失败时探测仍返回 `ok: true`；只有协议失败才返回 `ok: false`。",
          "授权比较 `sender.id`。`client.name` 与 `service.name` 只用于展示。",
          "L1 需要同时满足 `enabled && authorized`。`ready` 描述能力，不是权限。",
          "提供方在每次工具调用时重新校验策略，因此开关立即生效。",
          "端口关闭不代表服务被删除；重连必须重新初始化。",
          "L0 只携带元数据，工具与业务数据在授权后只走 L1。",
        ],
      },
      { type: "h2", text: "工具命名空间与限制" },
      {
        type: "table",
        head: ["规则", "值", "原因"],
        rows: [
          ["单提供方工具上限", "64", "保持模型可见目录有界。"],
          ["命名空间长度", "≤ 16", "给工具名留出空间。"],
          ["工具名长度", "≤ 40", "提供方侧约束。"],
          ["合计长度", "≤ 57", "低于 OpenAI function name 的 64 字符上限。"],
          ["保留命名空间", "`browser`、`page`、`file`、`network`、`devtools`、`webmcp`、`ext`", "避免与内置工具冲突。"],
          ["重名处理", "先到先得", "绝不静默覆盖其他服务的工具。"],
        ],
      },
      { type: "h2", text: "审计与限流" },
      {
        type: "ul",
        items: [
          "每次写入记录工具名、发送方 ID、结果、目标 UUID 与参数哈希。",
          "脚本源码永远不会进入审计日志。",
          "写入按调用方使用滑动窗口：每 60 秒 30 次。",
          "业务失败以 `isError: true` 的成功 MCP 调用返回，让模型读到原因，而不是丢掉整轮。",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "不要随意放宽这些限制",
        text: "57 字符合计来自硬性的提供方上限。未经核对所有模型集成就提高命名空间或工具预算，会让工具调用以「模型失败」的形态坏掉。",
      },
      { type: "h2", text: "实现一个提供方" },
      {
        type: "steps",
        items: [
          {
            title: "声明边界",
            text: "在 manifest 中添加 `externally_connectable`。宿主未打包时 ID 每次安装都会变，因此需要 `ids: ['*']`。",
          },
          {
            title: "同步注册两个监听器",
            text: "在 background 顶层调用 `chrome.runtime.onMessageExternal` 与 `onConnectExternal`，不要放进异步回调。",
          },
          {
            title: "写一个带缓冲的 Transport",
            text: "在端口上实现 MCP `Transport` 接口，并在授权完成前缓冲入站消息。",
          },
          {
            title: "每个端口一个服务",
            text: "用官方 SDK 注册工具，并按当前策略生成 instructions。",
          },
          {
            title: "持久化并复核策略",
            text: "保存端点、允许列表、写入与复核开关；每次工具调用开始时重新解析。",
          },
        ],
      },
      {
        type: "p",
        text: "Lumo Userscripts 是参考实现：`lib/agent/protocol.ts`、`probe.ts`、`transport.ts`、`mcp-server.ts`、`tools.ts`、`policy.ts` 与 `audit.ts`。宿主侧位于 `lib/mcp/extension-*.ts`。",
      },
    ],
  }),

};
