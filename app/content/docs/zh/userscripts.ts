import { defineArticle } from "../types";

export const userscriptsDocs = {
  overview: defineArticle({
    product: "userscripts",
    slug: "overview",
    section: "start",
    title: "Lumo Userscripts 概览",
    description: "用原生 chrome.userScripts 运行、编辑和管理用户脚本，并把它开放给智能体。",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts 是 Chrome MV3 用户脚本管理器。它用浏览器原生的 `chrome.userScripts` 注册脚本，提供真正的编辑器、GM API、备份、诊断，以及一个可以被 Lumo 调用的标准 MCP 端点。",
      },
      {
        type: "mock",
        id: "userscripts-dashboard",
        caption: "脚本列表：启用状态、运行范围、更新与操作都在一行里。",
      },
      { type: "h2", text: "它能做什么" },
      {
        type: "ul",
        items: [
          "从 URL、文件或剪贴板安装脚本，安装页先展示运行范围与权限。",
          "用 CodeMirror 6 编辑脚本，校验元数据、值、资源与覆盖项。",
          "通过 `@match`、`@include`、`@exclude` 精确控制脚本在哪些页面运行。",
          "运行完整的 GM API，并在 MAIN 世界或隔离的 USER_SCRIPT 世界之间选择。",
          "自动检查更新，权限变化时先征求你的同意。",
          "导出与导入 JSON / ZIP 备份，回收站可以恢复误删脚本。",
          "把脚本库通过 MCP 开放给 Lumo，让智能体直接创建、修改和启停脚本。",
        ],
      },
      { type: "h2", text: "脚本在哪里运行" },
      {
        type: "p",
        text: "每个脚本由 `chrome.userScripts` 单独注册。需要页面真实 `window` 的脚本运行在 MAIN 世界；需要与页面隔离、同时使用 GM API 的脚本运行在 USER_SCRIPT 世界。两套引擎都通过带 nonce 的 `MessageChannel` 与扩展通信。",
      },
      { type: "h2", text: "和 Lumo 的关系" },
      {
        type: "p",
        text: "Lumo Userscripts 可以独立使用，不需要安装 Lumo。安装 Lumo 后，你可以把 Userscripts 作为扩展服务接入，让智能体读取、创建和修改脚本；两个扩展各自授权，互不替代。",
      },
      {
        type: "cards",
        items: [
          {
            title: "连接 Lumo",
            text: "在 Userscripts 中开启智能体访问，复制扩展 ID，再到 Lumo 中添加。",
            href: "/docs/userscripts/agent-endpoint",
            cta: "查看步骤",
          },
          {
            title: "Lumo 侧说明",
            text: "从 Lumo 的角度了解扩展服务、探测与连接状态。",
            href: "/docs/lumo/extension-services",
            cta: "阅读",
          },
        ],
      },
      { type: "h2", text: "接下来" },
      {
        type: "cards",
        items: [
          {
            title: "安装",
            text: "从 Chrome 应用商店或最新版本安装，并固定到工具栏。",
            href: "/docs/userscripts/install",
            cta: "安装",
          },
          {
            title: "开启用户脚本",
            text: "Chrome 默认不允许扩展执行用户脚本，这一步必须完成。",
            href: "/docs/userscripts/enable-userscripts",
            cta: "开始配置",
          },
          {
            title: "常见问题",
            text: "脚本不运行、更新被停用、数据在哪里。",
            href: "/docs/userscripts/faq",
            cta: "查看 FAQ",
          },
        ],
      },
    ],
  }),

  install: defineArticle({
    product: "userscripts",
    slug: "install",
    section: "start",
    title: "安装与更新",
    description: "安装 Lumo Userscripts，并知道商店版本与未打包版本的区别。",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts 需要 **Chrome 138 或更新版本**，因为它依赖原生的 `chrome.userScripts` API。安装后还必须为扩展打开“允许用户脚本”。",
      },
      { type: "h2", text: "从 Chrome 应用商店安装" },
      {
        type: "steps",
        items: [
          {
            title: "打开商店页面",
            text: "在 Chrome 应用商店搜索 Lumo Userscripts，或打开商店详情页。",
          },
          {
            title: "添加到 Chrome",
            text: "确认权限后点击“添加至 Chrome”。",
          },
          {
            title: "固定图标",
            text: "点击工具栏的拼图图标，把 Lumo Userscripts 固定到工具栏。",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "还差一步",
        text: "安装完成不等于脚本可以运行。继续阅读 [开启用户脚本](/docs/userscripts/enable-userscripts)，打开 Chrome 的“允许用户脚本”开关。",
      },
      { type: "h2", text: "安装最新版本" },
      {
        type: "ol",
        items: [
          "打开仓库的 GitHub Releases 页面，下载最新的压缩包。",
          "解压到固定目录，避免之后移动。",
          "打开 `chrome://extensions`，开启右上角的“开发者模式”。",
          "点击“加载已解压的扩展程序”，选择解压后的目录。",
        ],
      },
      { type: "h2", text: "从源码构建（可选）" },
      {
        type: "code",
        lang: "bash",
        title: "构建 Lumo Userscripts",
        code: "git clone https://github.com/mscststs/lumo-userscript-manager.git\ncd lumo-userscript-manager\nnpm install\nnpm run build\n# chrome://extensions → 加载已解压的扩展程序 → .output/chrome-mv3",
      },
      { type: "h2", text: "安装之后" },
      {
        type: "steps",
        items: [
          {
            title: "打开脚本列表",
            text: "点击工具栏图标打开弹窗，再进入“管理脚本”打开完整页面。",
          },
          {
            title: "打开允许用户脚本",
            text: "在 `chrome://extensions` 的扩展卡片或详情页中打开“允许用户脚本”。",
          },
          {
            title: "安装第一个脚本",
            text: "从 URL 或文件安装，安装页会列出运行范围与权限。",
          },
        ],
      },
      { type: "h2", text: "更新" },
      {
        type: "p",
        text: "商店版本自动更新。未打包版本需要重新下载并替换目录，然后在 `chrome://extensions` 点击刷新。更新会保留脚本、设置与备份数据。",
      },
    ],
  }),

  "enable-userscripts": defineArticle({
    product: "userscripts",
    slug: "enable-userscripts",
    section: "start",
    title: "开启用户脚本（必做）",
    description: "打开 Chrome 的“允许用户脚本”，并确认管理器没有暂停脚本注入。",
    blocks: [
      {
        type: "p",
        text: "Chrome 默认不允许扩展执行用户脚本。安装 Lumo Userscripts 后，必须在浏览器里为它打开一次“允许用户脚本”，否则脚本会显示已安装，但不会在页面上执行。",
      },
      { type: "h2", text: "第一步：打开 Chrome 的允许开关" },
      {
        type: "steps",
        items: [
          {
            title: "打开扩展程序页",
            text: "在地址栏输入 `chrome://extensions`。",
          },
          {
            title: "找到 Lumo Userscripts",
            text: "在卡片上确认扩展已启用。未打包安装时，还需要打开右上角的“开发者模式”。",
          },
          {
            title: "打开“允许用户脚本”",
            text: "在卡片或“详情”页中打开“允许用户脚本”。Chrome 可能要求你确认一次。",
          },
          {
            title: "重新加载页面",
            text: "回到要运行脚本的网页并刷新。已经打开的页面不会自动注入。",
          },
        ],
      },
      {
        type: "mock",
        id: "chrome-extensions",
        caption: "chrome://extensions：扩展卡片上的“允许用户脚本”必须打开；同一张卡片上可以复制扩展 ID。",
      },
      {
        type: "callout",
        tone: "warning",
        title: "这个开关是必须的",
        text: "没有“允许用户脚本”，管理器仍然可以安装、编辑和备份脚本，但 Chrome 不会执行它们。",
      },
      { type: "h2", text: "第二步：确认管理器没有暂停注入" },
      {
        type: "steps",
        items: [
          {
            title: "打开设置",
            text: "进入 Lumo Userscripts 的选项页，选择“设置 → 通用”。",
          },
          {
            title: "保持“启用脚本注入”开启",
            text: "这是管理器自己的总开关。关闭后所有脚本暂停，但不会被卸载。",
          },
          {
            title: "检查默认运行时机",
            text: "如果脚本依赖页面早期状态，确认默认运行时机与注入环境符合脚本需要。",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-general",
        caption: "Userscripts → 设置 → 通用：“启用脚本注入”是管理器层的总开关。",
      },
      { type: "h2", text: "两个开关的区别" },
      {
        type: "table",
        head: ["开关", "位置", "关闭后的结果"],
        rows: [
          ["允许用户脚本", "Chrome 扩展页", "Chrome 拒绝执行任何用户脚本，管理器无法绕过。"],
          ["启用脚本注入", "管理器 → 设置 → 通用", "管理器暂停所有脚本，脚本仍然保留。"],
        ],
      },
      { type: "h2", text: "验证" },
      {
        type: "steps",
        items: [
          {
            title: "安装一个测试脚本",
            text: "使用 `@match` 指向一个你常访问的站点。",
          },
          {
            title: "打开匹配的页面",
            text: "刷新页面，确认脚本效果出现。",
          },
          {
            title: "查看日志",
            text: "如果没有任何反应，打开管理器的“日志”页，看是否有注册失败或运行时错误。",
          },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "浏览器重启后仍然有效",
        text: "“允许用户脚本”是持久设置，不需要每次启动都重新打开。只有重新加载未打包扩展或更换浏览器配置时才需要再检查。",
      },
    ],
  }),

  faq: defineArticle({
    product: "userscripts",
    slug: "faq",
    section: "faq",
    title: "常见问题",
    description: "脚本不运行、更新、权限、数据与智能体连接的高频问题。",
    blocks: [
      {
        type: "p",
        text: "用户脚本问题通常只有三类：Chrome 没有允许、脚本没有匹配当前页面、脚本本身报错。先按这三类排查。",
      },
      { type: "h2", text: "为什么脚本安装了却不运行？" },
      {
        type: "p",
        text: "先确认 `chrome://extensions` 里的“允许用户脚本”已打开，再确认管理器设置里的“启用脚本注入”没有被关闭，最后检查脚本的 `@match` 是否覆盖当前页面。",
      },
      { type: "h2", text: "需要哪个 Chrome 版本？" },
      {
        type: "p",
        text: "Chrome 138 或更新版本。旧版本没有稳定的 `chrome.userScripts` API，管理器无法注册脚本。",
      },
      { type: "h2", text: "脚本数据存在哪里？" },
      {
        type: "p",
        text: "脚本、值、资源与设置保存在本机的扩展存储与 IndexedDB 中。没有云同步，也不会自动上传。",
      },
      { type: "h2", text: "卸载扩展会删除脚本吗？" },
      {
        type: "p",
        text: "会。卸载扩展会删除本地数据。需要保留时，先在“设置 → 数据”导出 JSON 或 ZIP 备份。",
      },
      { type: "h2", text: "为什么安装页提示脚本需要更多权限？" },
      {
        type: "p",
        text: "脚本声明的 `@match`、`@grant`、`@require` 或 `@resource` 会扩大它能触达的范围。安装页把这些权限逐项列出，确认来源可信后再安装。",
      },
      { type: "h2", text: "可以从 Tampermonkey 导入吗？" },
      {
        type: "p",
        text: "没有直接导入 Tampermonkey 数据库的入口。可以把脚本从原地址重新安装，或导出 `.user.js` 文件后从文件安装。",
      },
      { type: "h2", text: "为什么更新后脚本被停用？" },
      {
        type: "p",
        text: "新版本如果申请了更多权限，更新会等待你确认。这是权限感知更新，避免脚本悄悄扩大访问范围。",
      },
      { type: "h2", text: "为什么某些站点不执行？" },
      {
        type: "p",
        text: "Chrome 内部页面、扩展页面、Web Store 与部分受保护页面不允许注入。检查脚本的 `@exclude` 与站点的 CSP 限制。",
      },
      { type: "h2", text: "智能体连接失败怎么办？" },
      {
        type: "p",
        text: "确认 Userscripts 已开启“允许智能体访问”，Lumo 填的是正确的 32 位扩展 ID，并且 Lumo 的 ID 在允许列表里。按 [智能体端点](/docs/userscripts/agent-endpoint) 的状态表逐项检查。",
      },
      { type: "h2", text: "如何备份？" },
      {
        type: "p",
        text: "设置 → 数据 → 导出。JSON 适合查看与版本控制，ZIP 适合完整备份。导入前会先预览内容与冲突。",
      },
      { type: "h2", text: "支持 Firefox 吗？" },
      {
        type: "p",
        text: "项目包含 Firefox 构建配置，但主要目标与文档以 Chrome MV3 为准。Firefox 的用户脚本 API 行为不同，不能保证与 Chrome 完全一致。",
      },
      { type: "h2", text: "脚本会同步到其他设备吗？" },
      {
        type: "p",
        text: "不会。没有跨设备同步；请使用 JSON / ZIP 备份手动迁移。",
      },
      {
        type: "callout",
        tone: "tip",
        title: "先看日志",
        text: "管理器的“日志”页会记录脚本注册、运行时错误与消息失败。大多数“脚本没反应”的问题，日志里已经有原因。",
      },
      {
        type: "cards",
        items: [
          {
            title: "日志与诊断",
            text: "查看运行时健康、注册状态与错误。",
            href: "/docs/userscripts/diagnostics",
            cta: "排查",
          },
          {
            title: "权限与运行范围",
            text: "理解 @match、运行时机与注入环境。",
            href: "/docs/userscripts/permissions",
            cta: "阅读",
          },
        ],
      },
    ],
  }),

  "install-scripts": defineArticle({
    product: "userscripts",
    slug: "install-scripts",
    section: "features",
    title: "安装脚本",
    description: "从 URL、文件或剪贴板安装脚本，并在安装页确认权限。",
    blocks: [
      {
        type: "p",
        text: "安装入口有三个：URL、文件与新建。无论从哪来，安装页都会先展示脚本身份、运行范围与权限，确认后才写入脚本库。",
      },
      { type: "h2", text: "从 URL 安装" },
      {
        type: "steps",
        items: [
          {
            title: "复制脚本地址",
            text: "地址应以 `.user.js` 结尾，或返回 `application/javascript`。",
          },
          {
            title: "打开安装页",
            text: "在管理器中选择“安装脚本”，粘贴 URL。",
          },
          {
            title: "确认权限",
            text: "检查运行范围、GM API、外部代码与网络访问。",
          },
          {
            title: "安装并启用",
            text: "脚本写入脚本库并默认启用；之后可以在列表里随时暂停。",
          },
        ],
      },
      { type: "h2", text: "从文件安装" },
      {
        type: "steps",
        items: [
          {
            title: "选择文件",
            text: "在安装页拖入 `.user.js`，或点击选择文件。",
          },
          {
            title: "检查元数据",
            text: "确认名称、版本、作者与 `@match` 与你的预期一致。",
          },
          {
            title: "安装",
            text: "安装页会解析 `@require` 与 `@resource`，相对地址按安装来源解析。",
          },
        ],
      },
      { type: "h2", text: "从剪贴板或新建" },
      {
        type: "steps",
        items: [
          {
            title: "新建脚本",
            text: "在脚本列表点击“新建脚本”，进入编辑器。",
          },
          {
            title: "填写元数据",
            text: "至少填写 `@name`、`@version` 与 `@match`。",
          },
          {
            title: "保存",
            text: "保存后脚本立即注册；匹配的页面刷新后生效。",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-install",
        caption: "安装页：来源、身份、权限与安装动作都在同一屏。",
      },
      { type: "h2", text: "安装页会显示什么" },
      {
        type: "table",
        head: ["区域", "内容"],
        rows: [
          ["运行范围", "`@match`、`@include`、`@exclude` 解析后的站点列表。"],
          ["权限", "GM API 与浏览器能力，例如 `GM_xmlhttpRequest`、`GM_cookie`。"],
          ["网络", "脚本可以请求的外部地址。"],
          ["外部代码", "`@require` 与 `@resource` 引入的文件。"],
        ],
      },
      { type: "h2", text: "安装之后" },
      {
        type: "ul",
        items: [
          "脚本默认启用，可以在列表里关闭。",
          "安装来源会被保留，用于检查更新与解析相对资源。",
          "更新时如果权限扩大，会等待你确认。",
          "删除的脚本会进入回收站，可以恢复。",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "只安装你信任的脚本",
        text: "用户脚本可以读取和修改页面内容。安装页的权限列表是判断依据，不要跳过它直接安装来源不明的脚本。",
      },
    ],
  }),

  editor: defineArticle({
    product: "userscripts",
    slug: "editor",
    section: "features",
    title: "编辑器与元数据",
    description: "用 CodeMirror 6 编辑脚本，校验元数据，并管理值与资源。",
    blocks: [
      {
        type: "p",
        text: "编辑器把整块空间留给代码，元数据、值、资源与信息作为标签页存在。保存即写入脚本库并重新注册。",
      },
      {
        type: "mock",
        id: "userscripts-editor",
        caption: "编辑器：整宽代码面板、下划线标签条与保存动作。",
      },
      { type: "h2", text: "打开编辑器" },
      {
        type: "steps",
        items: [
          {
            title: "从列表进入",
            text: "点击脚本行，或使用行末的编辑动作。",
          },
          {
            title: "切换标签页",
            text: "在“代码 / 元数据 / 值 / 资源 / 信息”之间切换。",
          },
          {
            title: "保存",
            text: "使用保存按钮或快捷键。保存后脚本按新版本重新注册。",
          },
        ],
      },
      { type: "h2", text: "元数据" },
      {
        type: "code",
        lang: "javascript",
        title: "脚本头",
        code: "// ==UserScript==\n// @name        GitHub focus mode\n// @namespace   https://example.com/\n// @version     1.4.2\n// @match       *://*.github.com/*\n// @run-at      document-idle\n// @grant       GM_setValue\n// @grant       GM_getValue\n// ==/UserScript==",
      },
      { type: "h2", text: "校验与覆盖" },
      {
        type: "ul",
        items: [
          "保存前会校验元数据语法、必填字段与匹配规则。",
          "无效的 `@match` 会在元数据标签页直接标红，不会静默丢弃。",
          "覆盖项可以临时改写运行时机与注入环境，不修改脚本正文。",
        ],
      },
      { type: "h2", text: "值编辑器" },
      {
        type: "p",
        text: "值编辑器显示脚本通过 `GM_setValue` 写入的数据，可以查看、修改或删除。值按脚本隔离，不会跨脚本共享。",
      },
      { type: "h2", text: "资源查看器" },
      {
        type: "p",
        text: "资源查看器列出 `@require` 与 `@resource` 引入的文件及其大小。资源随脚本保存，不会在每次运行时重新下载。",
      },
      { type: "h2", text: "运行时机与注入环境" },
      {
        type: "table",
        head: ["设置", "影响"],
        rows: [
          ["`@run-at`", "脚本在文档生命周期的哪个阶段执行。"],
          ["`@inject-into`", "运行在页面世界还是隔离世界。"],
          ["`@grant`", "决定可用的 GM API；`@grant none` 会倾向页面世界。"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "一次只编辑一个脚本",
        text: "当前版本每个编辑器窗口只承载一个脚本。需要对照修改时，打开两个标签页而不是拆分布局。",
      },
    ],
  }),

  "gm-api": defineArticle({
    product: "userscripts",
    slug: "gm-api",
    section: "features",
    title: "GM API",
    description: "值存储、跨域请求、Cookie、下载、通知、样式与菜单命令。",
    blocks: [
      {
        type: "p",
        text: "GM API 由扩展的 service worker 提供。脚本通过消息通道调用，权限在安装时声明，在每次调用时仍然受脚本身份约束。",
      },
      { type: "h2", text: "值存储" },
      {
        type: "code",
        lang: "javascript",
        title: "读写脚本值",
        code: "await GM_setValue('theme', 'dark');\nconst theme = await GM_getValue('theme', 'light');\nconst keys = await GM_listValues();\nawait GM_deleteValue('theme');",
      },
      { type: "h2", text: "网络请求" },
      {
        type: "code",
        lang: "javascript",
        title: "跨域请求",
        code: "const response = await GM_xmlhttpRequest({\n  method: 'GET',\n  url: 'https://api.example.com/items',\n  headers: { Accept: 'application/json' },\n});\nconsole.log(response.responseText);",
      },
      { type: "h2", text: "浏览器能力" },
      {
        type: "ul",
        items: [
          "`GM_cookie`：读取、写入与删除 Cookie。",
          "`GM_download`：下载文件并跟踪进度。",
          "`GM_notification`：系统通知。",
          "`GM_setClipboard`：写入剪贴板。",
          "`GM_registerMenuCommand`：注册扩展菜单命令。",
        ],
      },
      { type: "h2", text: "页面能力" },
      {
        type: "ul",
        items: [
          "`GM_addStyle`：向页面插入样式。",
          "`GM_addElement`：创建并插入元素。",
          "`unsafeWindow`：访问页面真实 `window`，仅在 MAIN 世界可用。",
          "`GM.*` Promise 别名：与现代异步写法一致。",
        ],
      },
      { type: "h2", text: "菜单命令" },
      {
        type: "code",
        lang: "javascript",
        title: "注册菜单命令",
        code: "GM_registerMenuCommand('切换专注模式', () => {\n  document.body.classList.toggle('focus-mode');\n});",
      },
      { type: "h2", text: "权限与安全" },
      {
        type: "p",
        text: "每个 GM API 都对应安装页上的权限项。脚本不能调用未声明的能力；更新如果新增权限，会等待你确认。",
      },
      {
        type: "callout",
        tone: "note",
        title: "隔离世界拿不到同步页面对象",
        text: "USER_SCRIPT 脚本拿到的是隔离世界的 `window`，无法提供同步的页面对象。需要真实页面 `window` 时，使用 `@grant unsafeWindow` 或 `@inject-into page`。",
      },
    ],
  }),

  permissions: defineArticle({
    product: "userscripts",
    slug: "permissions",
    section: "features",
    title: "运行范围与权限",
    description: "@match、@include、@exclude、运行时机与注入环境如何决定脚本行为。",
    blocks: [
      {
        type: "p",
        text: "脚本的触达范围由元数据决定。安装页会把规则解析成可读的站点列表，保存时再次校验，避免无效规则被静默忽略。",
      },
      { type: "h2", text: "匹配规则" },
      {
        type: "table",
        head: ["指令", "作用"],
        rows: [
          ["`@match`", "按 Chrome 匹配模式限定页面，优先级最高。"],
          ["`@include`", "补充匹配，支持 glob 与正则。"],
          ["`@exclude`", "从匹配结果中排除页面。"],
          ["`@exclude-match`", "按匹配模式排除页面。"],
        ],
      },
      { type: "h2", text: "运行时机" },
      {
        type: "table",
        head: ["值", "时机"],
        rows: [
          ["`document-start`", "文档开始加载，DOM 可能还不存在。"],
          ["`document-end`", "DOM 已解析，资源可能仍在加载。"],
          ["`document-idle`", "页面空闲后执行，最安全。"],
        ],
      },
      { type: "h2", text: "注入环境" },
      {
        type: "table",
        head: ["环境", "能力"],
        rows: [
          ["MAIN", "页面真实 `window`，可访问页面对象；GM API 通过桥接。"],
          ["USER_SCRIPT", "与页面隔离，GM API 完整；拿不到同步页面对象。"],
        ],
      },
      { type: "h2", text: "更新会检查权限" },
      {
        type: "p",
        text: "新版本如果扩大 `@match`、增加 `@grant` 或引入新的外部代码，更新会等待你确认。管理器不会悄悄扩大脚本的触达范围。",
      },
      {
        type: "callout",
        tone: "warning",
        title: "最小权限原则",
        text: "只声明脚本真正需要的站点与 GM API。范围越窄，更新时越容易判断风险，也越不容易被站点安全策略拦截。",
      },
      { type: "h2", text: "检查当前生效范围" },
      {
        type: "ul",
        items: [
          "脚本列表会显示解析后的站点数量。",
          "编辑器 → 元数据会标出无效或过宽的规则。",
          "弹窗显示当前页面匹配到的脚本，可以直接启停。",
        ],
      },
    ],
  }),

  "updates-backup": defineArticle({
    product: "userscripts",
    slug: "updates-backup",
    section: "features",
    title: "更新与备份",
    description: "自动检查更新、权限感知升级、回收站与 JSON / ZIP 备份。",
    blocks: [
      {
        type: "p",
        text: "更新与备份解决两个不同的问题：更新让脚本保持最新，备份让你在换设备或误删后恢复。两者都在设置 → 数据中管理。",
      },
      { type: "h2", text: "自动更新" },
      {
        type: "steps",
        items: [
          {
            title: "打开设置 → 更新",
            text: "确认自动更新开启，并选择检查间隔。",
          },
          {
            title: "保留安装来源",
            text: "从 URL 安装的脚本才能自动检查更新；从文件安装的脚本需要重新安装新版本。",
          },
          {
            title: "处理权限变化",
            text: "新版本申请更多权限时，更新会暂停并等待确认。",
          },
        ],
      },
      { type: "h2", text: "手动检查" },
      {
        type: "p",
        text: "脚本列表顶部提供“检查更新”。结果会按“有更新 / 已是最新 / 检查失败”分组，失败项会显示来源地址与错误。",
      },
      { type: "h2", text: "备份" },
      {
        type: "steps",
        items: [
          {
            title: "打开设置 → 数据",
            text: "这里显示脚本、回收站、值与资源的数量。",
          },
          {
            title: "选择格式",
            text: "JSON 便于查看与版本控制；ZIP 适合完整备份。",
          },
          {
            title: "保存文件",
            text: "备份包含脚本正文、元数据、值与资源，可能含有敏感数据。",
          },
        ],
      },
      { type: "h2", text: "恢复" },
      {
        type: "steps",
        items: [
          {
            title: "导入备份",
            text: "在设置 → 数据中选择文件，或直接拖入。",
          },
          {
            title: "预览内容",
            text: "导入前会显示脚本数量、冲突与是否包含设置。",
          },
          {
            title: "选择冲突策略",
            text: "同名脚本可以覆盖或跳过。",
          },
          {
            title: "完成导入",
            text: "导入后脚本会重新注册；匹配页面刷新后生效。",
          },
        ],
      },
      { type: "h2", text: "回收站" },
      {
        type: "p",
        text: "删除脚本会先进入回收站，而不是立即销毁。回收站中的脚本不会运行，可以恢复或永久删除。",
      },
      {
        type: "callout",
        tone: "warning",
        title: "备份文件可能包含敏感数据",
        text: "脚本可能包含 Cookie、令牌或站点数据。备份文件要妥善保管，不要上传到公开仓库。",
      },
    ],
  }),

  "agent-endpoint": defineArticle({
    product: "userscripts",
    slug: "agent-endpoint",
    section: "features",
    title: "连接 Lumo（智能体端点）",
    description: "开启 MCP 端点、复制扩展 ID、配置允许列表与写入权限。",
    blocks: [
      {
        type: "p",
        text: "智能体端点让 Lumo 通过标准 MCP 访问 Userscripts 的脚本库。端点默认关闭，只有你明确开启并允许的扩展才能建立会话。",
      },
      { type: "h2", text: "它能做什么" },
      {
        type: "ul",
        items: [
          "读取脚本列表、元数据与正文。",
          "创建、编辑、启停、安装与移入回收站（需要写入权限）。",
          "查询运行时状态与注册结果。",
          "每次写操作都会记录审计，并受频率限制。",
        ],
      },
      { type: "h2", text: "第一步：开启端点" },
      {
        type: "steps",
        items: [
          {
            title: "打开设置 → 智能体",
            text: "在 Userscripts 的选项页选择“设置 → 智能体”。",
          },
          {
            title: "开启允许智能体访问",
            text: "关闭时，任何扩展都无法建立 MCP 会话。",
          },
          {
            title: "决定是否允许写入",
            text: "只读模式足够查看；需要智能体改脚本时再打开写入。",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-agent",
        caption: "设置 → 智能体：端点开关、扩展 ID、允许列表、写入权限与最近操作。",
      },
      { type: "h2", text: "第二步：复制扩展 ID" },
      {
        type: "p",
        text: "在“身份”一栏点击复制。也可以在 `chrome://extensions` 的 Lumo Userscripts 卡片上查看同一个 32 位 ID。未打包安装重新加载后 ID 可能变化。",
      },
      { type: "h2", text: "第三步：在 Lumo 中添加" },
      {
        type: "steps",
        items: [
          {
            title: "打开 Lumo 的 MCP 设置",
            text: "设置 → MCP → 扩展。",
          },
          {
            title: "粘贴 ID",
            text: "点击“添加扩展”，粘贴 Userscripts 的 32 位 ID。",
          },
          {
            title: "批准请求",
            text: "如果 Userscripts 弹出访问请求，确认请求方是 Lumo 后点击“允许并启用”。",
          },
        ],
      },
      { type: "h2", text: "授权与允许列表" },
      {
        type: "p",
        text: "只有允许列表中的扩展 ID 能建立会话。批准一次请求会把 Lumo 加入列表；也可以在“允许的扩展”中手动添加或移除。移除后，已有会话在下一次调用时失败。Lumo 自己的扩展 ID 可以在 Lumo 的“设置 → MCP → 扩展 → 当前扩展”中复制。",
      },
      { type: "h2", text: "写入权限" },
      {
        type: "table",
        head: ["设置", "行为"],
        rows: [
          ["允许写入关闭", "智能体只能读取脚本列表与正文。"],
          ["允许写入开启", "智能体可以创建、编辑、启停、安装与移入回收站。"],
          ["新脚本需要人工复核", "智能体创建的脚本以禁用状态保存，等待你检查。"],
        ],
      },
      { type: "h2", text: "审计与限流" },
      {
        type: "ul",
        items: [
          "“最近的智能体操作”显示工具名、目标脚本、时间与结果。",
          "写入操作按滑动窗口限流，避免脚本库被批量改动。",
          "审计只记录参数哈希，不保存脚本源码。",
        ],
      },
      { type: "h2", text: "断开连接" },
      {
        type: "steps",
        items: [
          {
            title: "从允许列表移除",
            text: "移除 Lumo 的扩展 ID，后续会话会被拒绝。",
          },
          {
            title: "关闭端点",
            text: "关闭“允许智能体访问”，所有扩展都无法再连接。",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "写入权限要谨慎",
        text: "开启写入后，智能体可以修改你的脚本。建议同时开启“新脚本需要人工复核”，并定期检查最近操作。",
      },
      {
        type: "cards",
        items: [
          {
            title: "Lumo 侧连接步骤",
            text: "从 Lumo 的角度查看探测、添加 ID 与连接状态。",
            href: "/docs/lumo/extension-services",
            cta: "阅读",
          },
          {
            title: "日志与诊断",
            text: "连接失败时查看运行时状态与错误。",
            href: "/docs/userscripts/diagnostics",
            cta: "排查",
          },
        ],
      },
    ],
  }),

  diagnostics: defineArticle({
    product: "userscripts",
    slug: "diagnostics",
    section: "features",
    title: "日志与诊断",
    description: "查看运行时健康、脚本注册状态、日志与本页控制。",
    blocks: [
      {
        type: "p",
        text: "诊断页回答三个问题：运行时是否可用、脚本是否注册、调用为什么失败。它比重新安装更快定位问题。",
      },
      { type: "h2", text: "日志" },
      {
        type: "steps",
        items: [
          {
            title: "打开日志页",
            text: "在选项页选择“日志”。",
          },
          {
            title: "按脚本筛选",
            text: "选择单个脚本或全部脚本，查看注册、运行与消息错误。",
          },
          {
            title: "清空日志",
            text: "复现问题前先清空，结果更干净。",
          },
        ],
      },
      { type: "h2", text: "运行时健康" },
      {
        type: "p",
        text: "运行时状态显示 `chrome.userScripts` 是否可用、两套引擎是否加载、已注册脚本数量与最后检查时间。状态不可用时，脚本不会执行。",
      },
      { type: "h2", text: "注册诊断" },
      {
        type: "steps",
        items: [
          {
            title: "查看已注册数量",
            text: "与脚本列表中的启用数量对比。",
          },
          {
            title: "重新注册",
            text: "使用“重新注册脚本”让管理器重建全部注册。",
          },
          {
            title: "检查错误",
            text: "注册失败会显示具体脚本与原因，例如无效匹配规则。",
          },
        ],
      },
      { type: "h2", text: "弹窗里的本页控制" },
      {
        type: "ul",
        items: [
          "显示当前页面匹配到的脚本。",
          "可以直接启停单个脚本，不必打开完整设置。",
          "显示当前页面是否有运行时错误。",
        ],
      },
      { type: "h2", text: "常见错误" },
      {
        type: "table",
        head: ["错误", "原因", "处理"],
        rows: [
          ["用户脚本不可用", "Chrome 未允许用户脚本，或版本过低", "打开“允许用户脚本”，确认 Chrome 138+。"],
          ["脚本未注册", "匹配规则无效或注册被跳过", "修正元数据，重新注册。"],
          ["无匹配页面", "`@match` 没有覆盖当前站点", "检查规则或添加 `@include`。"],
          ["权限不足", "GM API 未声明或已被撤销", "在脚本头补上 `@grant`，重新安装。"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "先清空日志再复现",
        text: "旧日志会掩盖新问题。清空后刷新页面，只保留这一次的注册与运行记录。",
      },
    ],
  }),

  settings: defineArticle({
    product: "userscripts",
    slug: "settings",
    section: "features",
    title: "设置项说明",
    description: "通用、更新、数据、智能体与外观设置。",
    blocks: [
      {
        type: "p",
        text: "设置页按用途分组：通用决定脚本如何注入，更新决定如何检查新版本，数据负责备份与恢复，智能体控制外部访问；外观是独立页面，只影响界面。",
      },
      { type: "h2", text: "通用" },
      {
        type: "table",
        head: ["设置", "作用"],
        rows: [
          ["启用脚本注入", "管理器层的总开关；关闭后暂停所有脚本，但不卸载。"],
          ["默认运行时机", "新建脚本未声明 `@run-at` 时使用的值。"],
          ["默认注入环境", "新建脚本未声明 `@inject-into` 时使用的值。"],
          ["强制隔离运行", "优先使用 USER_SCRIPT 世界，减少与页面全局的冲突。"],
        ],
      },
      { type: "h2", text: "更新" },
      {
        type: "table",
        head: ["设置", "作用"],
        rows: [
          ["自动更新", "按间隔检查有安装来源的脚本。"],
          ["检查间隔", "自动检查的频率。"],
          ["权限变化时确认", "新版本申请更多权限时暂停更新，等待你决定。"],
        ],
      },
      { type: "h2", text: "数据" },
      {
        type: "p",
        text: "数据页显示脚本、回收站、值与资源的统计，并提供 JSON / ZIP 导出与导入。导入前会预览内容与冲突。",
      },
      { type: "h2", text: "智能体" },
      {
        type: "p",
        text: "控制 MCP 端点、允许列表与写入权限。完整步骤见 [连接 Lumo](/docs/userscripts/agent-endpoint)。",
      },
      { type: "h2", text: "外观（独立页面）" },
      {
        type: "ul",
        items: [
          "三套调色板：Paper、Graphite、Midnight。",
          "五种强调色，与调色板分离。",
          "界面缩放，适配不同屏幕密度。",
          "English 与简体中文。",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "设置保存在本机",
        text: "所有设置、脚本与值都保存在本地，不会同步到其他设备。更换浏览器前先导出备份。",
      },
    ],
  }),
};
