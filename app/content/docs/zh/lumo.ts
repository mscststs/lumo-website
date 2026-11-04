import { defineArticle } from "../types";

export const lumoDocs = {
  overview: defineArticle({
    product: "lumo",
    slug: "overview",
    section: "start",
    title: "Lumo 概览",
    description: "一个在侧边栏里读页面、调用工具、执行多步任务的浏览器智能体。",
    blocks: [
      {
        type: "p",
        text: "Lumo 是 Chrome 侧边栏里的 AI 智能体。它读取你正在看的页面，通过工具完成点击、填写、截图、抓取和调试，并在每一步都留下可见记录。它不接管浏览器，也不把你的工作搬到另一个应用。",
      },
      {
        type: "mock",
        id: "lumo-chat",
        caption: "侧边栏里的智能体循环：工具调用逐行展开，随时可以停止。",
      },
      { type: "h2", text: "它能做什么" },
      {
        type: "ul",
        items: [
          "**理解页面**：读取正文、选区、可访问性树、截图与标签页信息。",
          "**执行任务**：点击、填表、滚动、下载、切换标签页，多步执行直到完成。",
          "**连接工具**：内置浏览器工具、远程 MCP 服务、WebMCP 页面与其他扩展提供的工具共用一张工具列表。",
          "**使用你自己的模型**：OpenAI 兼容接口、Anthropic 与本地网关，密钥只保存在本机。",
        ],
      },
      { type: "h2", text: "两个产品，一条连接" },
      {
        type: "p",
        text: "Lumo Userscripts 是另一个独立扩展，负责逐站点运行用户脚本。它可以把脚本库通过标准 MCP 端点开放给 Lumo，让智能体直接创建、修改和启停脚本。两个扩展各自安装、各自授权，连接方式见 [扩展服务](/docs/lumo/extension-services)。",
      },
      {
        type: "cards",
        items: [
          {
            title: "Lumo Userscripts",
            text: "用原生 chrome.userScripts 运行脚本，并把脚本库作为工具开放给 Lumo。",
            href: "/docs/userscripts",
            cta: "阅读 Userscripts 文档",
          },
          {
            title: "扩展服务",
            text: "把 Userscripts 的扩展 ID 添加到 Lumo，批准后即可在对话里调用脚本工具。",
            href: "/docs/lumo/extension-services",
            cta: "查看连接步骤",
          },
        ],
      },
      { type: "h2", text: "数据留在哪里" },
      {
        type: "ul",
        items: [
          "对话、设置、文件与调试记录保存在本机的扩展存储中。",
          "没有 Lumo 账号，也没有中转服务器。",
          "只有你主动发送的内容会提交给你配置的模型服务商。",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "模型需要你自己配置",
        text: "Lumo 不自带模型额度。安装后先完成 [模型配置](/docs/lumo/models)，否则侧边栏可以打开，但无法生成回复。",
      },
      { type: "h2", text: "接下来" },
      {
        type: "cards",
        items: [
          {
            title: "安装 Lumo",
            text: "从 Chrome 应用商店或最新构建安装，并把图标固定到工具栏。",
            href: "/docs/lumo/install",
            cta: "安装",
          },
          {
            title: "配置模型",
            text: "添加一个提供方、保存密钥、选择默认模型。",
            href: "/docs/lumo/models",
            cta: "开始配置",
          },
          {
            title: "常见问题",
            text: "没有回复、工具不可用、页面读取失败时先看这里。",
            href: "/docs/lumo/faq",
            cta: "查看 FAQ",
          },
        ],
      },
    ],
  }),

  install: defineArticle({
    product: "lumo",
    slug: "install",
    section: "start",
    title: "安装与更新",
    description: "从商店、最新构建或源码安装 Lumo，并完成第一次启动。",
    blocks: [
      {
        type: "p",
        text: "Lumo 支持 Chrome 与基于 Chromium 的浏览器。商店版本最省事；需要最新功能时，可以使用 GitHub Actions 产物或自行构建。",
      },
      { type: "h2", text: "从 Chrome 应用商店安装" },
      {
        type: "steps",
        items: [
          {
            title: "打开商店页面",
            text: "在 Chrome 应用商店搜索 Lumo，或直接打开商店详情页。",
          },
          {
            title: "添加到 Chrome",
            text: "确认权限后点击“添加至 Chrome”。",
          },
          {
            title: "固定图标",
            text: "点击工具栏的拼图图标，把 Lumo 固定到工具栏，之后可以一键打开侧边栏。",
          },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "商店版本会滞后",
        text: "每个版本都要经过 Google 审核，最近合并的功能通常还没进商店。需要尝鲜时使用下面的最新构建。",
      },
      { type: "h2", text: "安装最新构建" },
      {
        type: "ol",
        items: [
          "打开仓库的 GitHub Actions 页面，选择最近一次成功的构建。",
          "在 Artifacts 中下载 `lumo-chrome-mv3`。",
          "解压下载的压缩包。",
          "打开 `chrome://extensions`，开启右上角的“开发者模式”，点击“加载已解压的扩展程序”，选择解压后的目录。",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "未打包版本不会自动更新",
        text: "每次升级都要重新下载并加载。Chrome 启动时可能提示“停用开发者模式扩展”，这是未打包安装的正常行为。",
      },
      { type: "h2", text: "从源码构建（可选）" },
      {
        type: "code",
        lang: "bash",
        title: "构建 Lumo",
        code: "git clone https://github.com/mscststs/lumo.git\ncd lumo\nnpm install\nnpm run build\n# chrome://extensions → 加载已解压的扩展程序 → .output/chrome-mv3",
      },
      { type: "h2", text: "安装之后" },
      {
        type: "steps",
        items: [
          {
            title: "打开侧边栏",
            text: "点击工具栏的 Lumo 图标。侧边栏会在当前窗口右侧打开。",
          },
          {
            title: "打开设置",
            text: "在侧边栏顶部打开设置，或在 `chrome://extensions` 的 Lumo 卡片上点击“详情 → 扩展程序选项”。",
          },
          {
            title: "配置模型",
            text: "按 [模型配置](/docs/lumo/models) 添加提供方。没有模型时，发送按钮不会产生回复。",
          },
        ],
      },
      { type: "h2", text: "更新" },
      {
        type: "p",
        text: "商店版本会自动更新。未打包版本需要重新下载构建并替换目录，然后在 `chrome://extensions` 点击刷新。设置、对话与文件保存在扩展存储中，正常情况下升级不会清空。",
      },
      {
        type: "callout",
        tone: "note",
        title: "扩展 ID 可能变化",
        text: "从未打包目录重新加载时，扩展 ID 可能改变。如果你把 Lumo 的 ID 加到了 Userscripts 的允许列表，需要重新复制并更新。",
      },
    ],
  }),

  models: defineArticle({
    product: "lumo",
    slug: "models",
    section: "start",
    title: "配置模型（必做）",
    description: "添加模型提供方、保存密钥、选择默认模型，让侧边栏真正开始工作。",
    blocks: [
      {
        type: "p",
        text: "Lumo 不附带模型额度。它连接你选择的模型服务，使用你的密钥。完成这一步之前，侧边栏可以打开，但发送消息不会得到回复。",
      },
      { type: "h2", text: "打开模型设置" },
      {
        type: "steps",
        items: [
          {
            title: "打开设置",
            text: "侧边栏顶部 → 设置；或 `chrome://extensions` → Lumo → 详情 → 扩展程序选项。",
          },
          {
            title: "进入模型",
            text: "在左侧导航选择“模型”。这里管理提供方、模型与默认模型。",
          },
        ],
      },
      {
        type: "mock",
        id: "lumo-models",
        caption: "设置 → 模型：添加提供方、保存密钥、拉取模型列表并设置默认模型。",
      },
      { type: "h2", text: "支持的接口" },
      {
        type: "table",
        head: ["接口", "适用服务", "说明"],
        rows: [
          [
            "Chat Completions",
            "OpenAI、OpenRouter、Azure、大多数兼容网关",
            "最通用的 OpenAI 兼容协议。",
          ],
          [
            "Responses",
            "OpenAI Responses API",
            "支持 Responses 形态的服务使用这一项。",
          ],
          ["Anthropic", "Claude API", "直接连接 Anthropic 官方接口。"],
        ],
      },
      { type: "h2", text: "添加提供方" },
      {
        type: "steps",
        items: [
          {
            title: "点击“添加提供方”",
            text: "填写一个你认得出来的名称，例如“OpenAI · 生产”。",
          },
          {
            title: "选择协议",
            text: "按服务商文档选择 Chat Completions、Responses 或 Anthropic。",
          },
          {
            title: "填写 Base URL",
            text: "官方服务通常可以留空或使用默认值；兼容网关填写到 `/v1` 为止的地址。",
          },
          {
            title: "粘贴 API 密钥",
            text: "密钥保存在 `chrome.storage.local`，只随请求发送给你填写的地址。",
          },
          {
            title: "添加模型",
            text: "保存提供方后，在提供方卡片里添加模型 ID，或从可用模型列表中选择。",
          },
        ],
      },
      { type: "h3", text: "Base URL 怎么写" },
      {
        type: "ul",
        items: [
          "OpenAI 官方：使用默认地址，不需要填写。",
          "OpenRouter：`https://openrouter.ai/api/v1`。",
          "Azure OpenAI：填写资源端点，并按服务商要求填写部署名。",
          "本地网关：填写本机可访问的地址，例如 `http://localhost:11434/v1`。",
        ],
      },
      { type: "h3", text: "模型字段" },
      {
        type: "kv",
        items: [
          { k: "模型 ID", v: "服务商实际接受的名称，例如 `gpt-4.1` 或 `claude-sonnet-4-5`。" },
          { k: "上下文窗口", v: "用于计算上下文环与压缩时机；不确定时按服务商文档填写。" },
          { k: "视觉", v: "模型支持图片输入时开启，否则图片附件会被拒绝。" },
          { k: "推理强度", v: "仅对支持推理参数的模型生效，按需选择低、中、高。" },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "密钥只保存在本机",
        text: "Lumo 不经过中转服务器。密钥会随每次请求发送给你配置的 Base URL；如果使用第三方网关，请确认你信任该网关。",
      },
      { type: "h2", text: "验证配置" },
      {
        type: "steps",
        items: [
          {
            title: "测试连接",
            text: "在提供方卡片上使用测试或刷新模型列表，确认状态为已连接。",
          },
          {
            title: "设为默认",
            text: "在模型列表中选择默认模型。侧边栏顶部会显示当前模型。",
          },
          {
            title: "发送一条消息",
            text: "回到侧边栏，发送一句简单的问题。能收到流式回复即配置完成。",
          },
        ],
      },
      { type: "h2", text: "常见配置错误" },
      {
        type: "table",
        head: ["现象", "通常原因", "处理"],
        rows: [
          ["401 / Unauthorized", "密钥错误、过期或没有该模型权限", "重新粘贴密钥，确认服务商侧已开通模型。"],
          ["404 / Not Found", "Base URL 多了或少了路径", "检查是否包含 `/v1`，以及协议是否选对。"],
          ["CORS / 网络错误", "网关不允许浏览器直连", "换用允许浏览器请求的网关，或在本机代理。"],
          ["模型列表为空", "接口不支持模型发现", "手动添加模型 ID。"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "本地模型",
        text: "任何提供 OpenAI 兼容接口的本地服务都可以接入，例如 Ollama、LM Studio 或自建网关。把地址填成 `http://localhost:<port>/v1`，模型 ID 填本地服务里的名称。",
      },
      {
        type: "cards",
        items: [
          {
            title: "对话与页面上下文",
            text: "配置完成后，了解如何附加页面、粘贴长文本与查看上下文占用。",
            href: "/docs/lumo/chat",
            cta: "继续",
          },
          {
            title: "MCP 与工具",
            text: "让模型能够调用浏览器工具、远程服务与其他扩展。",
            href: "/docs/lumo/mcp",
            cta: "配置工具",
          },
        ],
      },
    ],
  }),

  faq: defineArticle({
    product: "lumo",
    slug: "faq",
    section: "faq",
    title: "常见问题",
    description: "安装、模型、页面读取、工具调用与数据存储的高频问题。",
    blocks: [
      {
        type: "p",
        text: "先按下面的顺序检查：模型是否配置、页面是否允许读取、工具是否连接。大多数问题都能在这三步内定位。",
      },
      { type: "h2", text: "Lumo 需要账号吗？" },
      {
        type: "p",
        text: "不需要。Lumo 没有账号系统，也不提供中转服务。你只需要自己的模型服务密钥。",
      },
      { type: "h2", text: "为什么发送后没有回复？" },
      {
        type: "p",
        text: "最常见的原因是还没有配置模型，或默认模型不可用。打开设置 → 模型，确认提供方状态为已连接，并且默认模型存在。",
      },
      { type: "h2", text: "为什么模型列表是空的？" },
      {
        type: "p",
        text: "有些兼容网关不实现模型发现接口。此时手动添加模型 ID 即可，不需要依赖自动拉取。",
      },
      { type: "h2", text: "为什么页面读取失败？" },
      {
        type: "p",
        text: "Chrome 内部页面、扩展页面、PDF 阅读器与部分受保护页面不允许内容脚本读取。切换到普通网页再试；如果仍然失败，检查页面是否还在加载。",
      },
      { type: "h2", text: "Lumo 会读取我所有的标签页吗？" },
      {
        type: "p",
        text: "不会主动遍历。只有你在对话里附加页面、使用标签页工具，或明确要求查看某个标签页时，对应内容才会进入上下文。",
      },
      { type: "h2", text: "为什么工具调用失败？" },
      {
        type: "p",
        text: "先看工具行里的错误信息。常见原因是页面已跳转、元素不存在、权限不足，或远程 MCP 服务断开。展开工具行可以看到输入与输出。",
      },
      { type: "h2", text: "为什么扩展服务显示未安装？" },
      {
        type: "p",
        text: "确认提供方扩展已安装并启用，并且 Lumo 里填的是 32 位扩展 ID。未打包扩展重新加载后 ID 可能变化，需要重新复制。",
      },
      { type: "h2", text: "对话和文件存在哪里？" },
      {
        type: "p",
        text: "对话、设置、文件与调试记录保存在本机的扩展存储中。卸载扩展会删除这些数据；需要保留时先导出或备份。",
      },
      { type: "h2", text: "可以用本地模型吗？" },
      {
        type: "p",
        text: "可以。任何提供 OpenAI 兼容接口的本地服务都能接入。把 Base URL 指向本机地址，模型 ID 填本地服务中的名称。",
      },
      { type: "h2", text: "怎么停止一次执行？" },
      {
        type: "p",
        text: "使用输入框上方的停止按钮。停止只结束当前这一轮，不会删除对话；你可以继续发送消息或重试。",
      },
      { type: "h2", text: "更新后设置会丢吗？" },
      {
        type: "p",
        text: "正常升级不会清空设置。商店版本自动更新；未打包版本替换目录后刷新即可。扩展 ID 变化时，需要更新其他扩展里的允许列表。",
      },
      {
        type: "callout",
        tone: "tip",
        title: "仍然卡住？",
        text: "打开 [故障排查](/docs/lumo/troubleshooting)，按模型、工具、页面三类逐项检查；也可以打开对话调试查看原始请求与工具结果。",
      },
      {
        type: "cards",
        items: [
          {
            title: "故障排查",
            text: "按错误类型定位模型、工具与页面问题。",
            href: "/docs/lumo/troubleshooting",
            cta: "排查",
          },
          {
            title: "数据与隐私",
            text: "了解本地保存的内容、发送给模型服务商的内容，以及如何清除数据。",
            href: "/docs/lumo/data",
            cta: "查看",
          },
        ],
      },
    ],
  }),

  chat: defineArticle({
    product: "lumo",
    slug: "chat",
    section: "features",
    title: "对话与页面上下文",
    description: "发送消息、附加页面、粘贴长文本，并控制智能体的执行。",
    blocks: [
      {
        type: "p",
        text: "侧边栏是 Lumo 的主界面。它把当前页面、你粘贴的内容与工具结果组织成一次请求，并在对话里保留完整过程。",
      },
      {
        type: "mock",
        id: "lumo-chat",
        caption: "侧边栏：顶部切换模型，消息上方是附件，工具调用是可展开的行。",
      },
      { type: "h2", text: "发送消息" },
      {
        type: "ul",
        items: [
          "在底部输入框输入问题，按 `Enter` 发送，`Shift + Enter` 换行。",
          "顶部模型选择器可以随时切换当前对话使用的模型。",
          "新对话会清空上下文；历史对话可以从侧边栏的历史入口重新打开。",
        ],
      },
      { type: "h2", text: "附加页面上下文" },
      {
        type: "steps",
        items: [
          {
            title: "打开目标页面",
            text: "在当前标签页打开你要问的网页。",
          },
          {
            title: "添加页面附件",
            text: "在输入框上方点击“页面”，选择当前标签页或从标签页列表中选择。",
          },
          {
            title: "提问",
            text: "附件会显示在用户消息上方，可以展开预览，也可以随时移除。",
          },
        ],
      },
      { type: "h2", text: "粘贴长文本" },
      {
        type: "p",
        text: "直接粘贴大段文本时，Lumo 会把它折叠成“粘贴”附件，而不是塞满输入框。附件只在本次请求中发送，不会自动写入历史之外的位置。",
      },
      { type: "h2", text: "图片与文件" },
      {
        type: "ul",
        items: [
          "支持图片输入的模型可以直接接收截图或图片附件。",
          "模型不支持视觉时，图片会被拒绝；先在模型设置里开启视觉。",
          "智能体生成的文件保存在文件管理器里，可以在设置 → 文件中查看和下载。",
        ],
      },
      { type: "h2", text: "上下文环" },
      {
        type: "p",
        text: "输入框右侧的圆环显示当前上下文窗口的占用。接近上限时 Lumo 会压缩较早的内容；需要精确控制时，减少附件或开启新对话。",
      },
      { type: "h2", text: "停止、重试与继续" },
      {
        type: "ul",
        items: [
          "执行过程中可以点击停止按钮，当前轮会结束，已产生的工具结果保留。",
          "失败的消息可以重试；重试不会重复已经成功的工具调用。",
          "需要换一个方向时，直接继续输入即可，不必新开对话。",
        ],
      },
      { type: "h2", text: "分屏与历史" },
      {
        type: "ul",
        items: [
          "分屏可以把两个对话并排放在同一个侧边栏里，适合对比或分工。",
          "历史对话支持搜索与删除；删除后无法恢复。",
          "每个对话独立保存模型、附件与工具记录。",
        ],
      },
      { type: "h2", text: "输入习惯" },
      {
        type: "table",
        head: ["操作", "行为"],
        rows: [
          ["`Enter`", "发送当前消息。"],
          ["`Shift + Enter`", "在输入框内换行。"],
          ["点击附件", "展开或收起附件预览。"],
          ["点击工具行", "展开输入与输出，查看智能体实际做了什么。"],
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "页面内容会被发送给模型",
        text: "附加页面意味着页面正文会随请求发送给你配置的模型服务商。处理敏感页面时，先移除附件或改用本地模型。",
      },
    ],
  }),

  mcp: defineArticle({
    product: "lumo",
    slug: "mcp",
    section: "features",
    title: "MCP 与工具",
    description: "内置浏览器工具、远程 MCP 服务与扩展提供方如何进入同一张工具列表。",
    blocks: [
      {
        type: "p",
        text: "Lumo 通过 Model Context Protocol 发现和调用工具。内置浏览器能力与外部服务使用同一套协议，所以模型看到的是一张统一的工具列表，而不是一堆硬编码命令。",
      },
      { type: "h2", text: "内置服务" },
      {
        type: "table",
        head: ["服务", "能力"],
        rows: [
          ["Browser Core", "标签页、窗口、导航、书签、历史、Cookie、下载。"],
          ["Page Interaction", "页面读取、无障碍快照、点击、表单填写、键盘、截图。"],
          ["Network Monitor", "请求捕获、URL 拦截、重定向、请求头改写。"],
          ["DevTools Advanced", "CDP 会话、可信输入、设备与网络模拟、控制台捕获。"],
          ["File Manager", "读取、写入、修补、预览与下载扩展存储中的文件。"],
        ],
      },
      { type: "h2", text: "外部 MCP 服务" },
      {
        type: "p",
        text: "外部服务在设置 → MCP 中管理。每个服务独立启停，连接状态与工具数量会直接显示在卡片上。",
      },
      { type: "h2", text: "添加外部服务" },
      {
        type: "steps",
        items: [
          {
            title: "打开 MCP 设置",
            text: "设置 → MCP → 添加服务。",
          },
          {
            title: "填写端点",
            text: "输入服务的 HTTP Streamable 或 SSE 地址。",
          },
          {
            title: "配置认证",
            text: "支持 OAuth 的服务会显示登录入口；使用静态密钥时填写 Authorization 头。",
          },
          {
            title: "检查工具",
            text: "连接成功后展开卡片，确认工具列表与描述符合预期。",
          },
        ],
      },
      { type: "h3", text: "传输方式" },
      {
        type: "kv",
        items: [
          { k: "HTTP Streamable", v: "远程服务的首选，适合请求/响应形态。" },
          { k: "SSE", v: "服务通过长连接推送事件时使用。" },
        ],
      },
      { type: "h3", text: "认证" },
      {
        type: "p",
        text: "受保护的远程服务支持 OAuth 2.1：发现资源元数据、动态注册客户端、授权码 + PKCE 与刷新令牌。手动填写的 Authorization 头优先于自动流程，凭据只保存在本机。",
      },
      {
        type: "mock",
        id: "lumo-mcp",
        caption: "设置 → MCP：内置服务常驻，外部服务与扩展提供方各自独立启停。",
      },
      { type: "h2", text: "连接状态" },
      {
        type: "table",
        head: ["状态", "含义"],
        rows: [
          ["已连接", "握手成功，工具可用。"],
          ["连接中", "正在建立会话或刷新工具列表。"],
          ["未连接", "服务已配置但尚未连接。"],
          ["错误", "端点不可达、认证失败或服务返回错误。"],
        ],
      },
      { type: "h2", text: "安全边界" },
      {
        type: "ul",
        items: [
          "每次工具调用都在对话中可见，可以随时停止。",
          "外部服务默认关闭，必须由你主动添加。",
          "工具结果被视为不可信内容，页面文本不能悄悄扩大权限。",
          "远程服务返回的指令不会自动执行，仍由模型决定下一步。",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "远程工具是你没写过的代码",
        text: "只连接你信任的 MCP 服务。服务既可能返回数据，也可能返回指令；Lumo 保持调用可见，但无法审计第三方实现。",
      },
      {
        type: "cards",
        items: [
          {
            title: "连接扩展服务",
            text: "把 Lumo Userscripts 的脚本库作为工具接入，包含 ID 从哪里来的完整步骤。",
            href: "/docs/lumo/extension-services",
            cta: "查看步骤",
          },
          {
            title: "页面提供的工具",
            text: "声明 WebMCP 工具的页面会以按标签页的方式加入工具列表。",
            href: "/docs/lumo/webmcp",
            cta: "了解 WebMCP",
          },
        ],
      },
    ],
  }),

  "extension-services": defineArticle({
    product: "lumo",
    slug: "extension-services",
    section: "features",
    title: "连接扩展服务（Lumo Userscripts）",
    description: "从复制扩展 ID 到批准连接，把 Userscripts 的脚本库接入 Lumo。",
    blocks: [
      {
        type: "p",
        text: "扩展服务让另一个 Chrome 扩展通过运行时端口向 Lumo 提供 MCP 工具。Lumo Userscripts 是内置支持的一个提供方：连接后，智能体可以直接读取、创建、修改和启停用户脚本。",
      },
      {
        type: "callout",
        tone: "note",
        title: "先决条件",
        text: "两个扩展都已安装并启用；Lumo Userscripts 已开启“允许用户脚本”；Lumo 已完成模型配置。",
      },
      { type: "h2", text: "它是怎么连接的" },
      {
        type: "p",
        text: "Lumo 先用一条探测消息确认对方是否安装、是否开启、是否授权、是否就绪，然后在名为 `lumo:mcp` 的端口上建立标准 MCP 会话。工具调用仍然走 MCP，探测只负责把“没装、关了、没授权”这些状态说清楚。",
      },
      { type: "h2", text: "步骤 1：在 Userscripts 中开启智能体访问" },
      {
        type: "steps",
        items: [
          {
            title: "打开 Userscripts 设置",
            text: "打开 Lumo Userscripts 的选项页，进入“设置 → 智能体”。",
          },
          {
            title: "开启允许智能体访问",
            text: "打开“允许智能体访问”。关闭时，任何扩展都无法建立会话。",
          },
          {
            title: "保持请求提示开启",
            text: "“扩展请求访问时打开设置”默认开启，新扩展连接时会弹到这一页等待你批准。",
          },
        ],
      },
      {
        type: "mock",
        id: "userscripts-agent",
        caption: "Userscripts → 设置 → 智能体：开启端点，复制扩展 ID，管理允许列表与写入权限。",
      },
      { type: "h3", text: "扩展 ID 从哪里来" },
      {
        type: "p",
        text: "有两个地方可以拿到 ID，内容完全一致：Userscripts 设置 → 智能体 → 身份 → 扩展 ID，点击复制；或者打开 `chrome://extensions`，在 Lumo Userscripts 卡片上查看 ID。未打包安装时 ID 每次重新加载都可能变化。",
      },
      {
        type: "mock",
        id: "chrome-extensions",
        caption: "chrome://extensions：复制扩展 ID，并确认“允许用户脚本”已打开。",
      },
      { type: "h2", text: "步骤 2：把 ID 添加到 Lumo" },
      {
        type: "steps",
        items: [
          {
            title: "打开 Lumo 的 MCP 设置",
            text: "设置 → MCP → 扩展。",
          },
          {
            title: "点击“添加扩展”",
            text: "在输入框中粘贴 Userscripts 的 32 位扩展 ID。",
          },
          {
            title: "保存",
            text: "Lumo 会立即探测该扩展。卡片出现后，名称与状态来自对方自报，不是本地猜测。",
          },
        ],
      },
      {
        type: "mock",
        id: "lumo-extension-dialog",
        caption: "Lumo → 设置 → MCP → 扩展：粘贴 32 位扩展 ID。",
      },
      { type: "h3", text: "Lumo 的 ID 从哪里来" },
      {
        type: "p",
        text: "在 Lumo 的“设置 → MCP → 扩展”里，“当前扩展”一栏显示并可以复制 Lumo 自己的 32 位 ID。批准 Userscripts 的访问请求时，这个 ID 也会出现在请求卡片上。",
      },
      { type: "h2", text: "步骤 3：批准连接" },
      {
        type: "steps",
        items: [
          {
            title: "回到 Userscripts",
            text: "如果 Userscripts 弹出了访问请求，确认请求方是 Lumo。",
          },
          {
            title: "允许并启用",
            text: "点击“允许并启用”。这会同时打开智能体访问，并把 Lumo 的扩展 ID 加入允许列表。",
          },
          {
            title: "回到 Lumo 刷新",
            text: "在扩展卡片上点击刷新，或等 Lumo 重新获得焦点后自动重试。",
          },
        ],
      },
      {
        type: "mock",
        id: "agent-approval",
        caption: "Userscripts 的访问请求：批准后会启用端点并把 Lumo 加入允许列表。",
      },
      { type: "h2", text: "步骤 4：验证工具" },
      {
        type: "steps",
        items: [
          {
            title: "展开扩展卡片",
            text: "确认状态为已连接，并显示工具数量。",
          },
          {
            title: "在对话中调用",
            text: "让 Lumo 列出用户脚本，或创建一个简单的脚本。工具行会显示实际调用与结果。",
          },
        ],
      },
      { type: "h2", text: "连接状态对照" },
      {
        type: "table",
        head: ["Lumo 显示", "含义", "处理"],
        rows: [
          ["未安装或未暴露端点", "找不到该 ID 对应的扩展", "确认扩展已安装并启用，ID 没有抄错。"],
          ["对方已关闭智能体访问", "Userscripts 的端点开关是关的", "打开 Userscripts → 设置 → 智能体 → 允许智能体访问。"],
          ["等待批准", "Userscripts 有未处理的访问请求", "回到 Userscripts 批准 Lumo，然后刷新。"],
          ["不允许此扩展", "Lumo 的 ID 不在允许列表", "把 Lumo 的扩展 ID 加入 Userscripts 的允许列表。"],
          ["未就绪", "对方运行时尚未准备好", "稍后刷新；必要时重启浏览器。"],
          ["已连接", "会话建立，工具可用", "无需操作。"],
        ],
      },
      { type: "h2", text: "写入权限" },
      {
        type: "ul",
        items: [
          "关闭“允许智能体修改脚本”后，智能体只能读取脚本库。",
          "开启后，智能体可以创建、编辑、启停、安装与移入回收站。",
          "“新脚本需要人工复核”会让智能体创建的脚本以禁用状态保存，等你检查后再启用。",
          "每次写入都会记录在 Userscripts 的最近操作里，写入频率也有限流。",
        ],
      },
      { type: "h2", text: "断开与移除" },
      {
        type: "steps",
        items: [
          {
            title: "在 Lumo 中关闭或移除",
            text: "关闭扩展卡片上的开关可以临时停用；点击删除并确认会移除配置。",
          },
          {
            title: "在 Userscripts 中撤销",
            text: "从允许列表移除 Lumo 的扩展 ID，之后任何会话都会被拒绝。",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "只添加你信任的扩展 ID",
        text: "扩展服务可以读取脚本正文与元数据。确认 ID 来自你安装的 Userscripts，而不是网页或陌生人发来的字符串。",
      },
      {
        type: "cards",
        items: [
          {
            title: "Userscripts 智能体端点",
            text: "从 Userscripts 一侧了解端点、允许列表、写入复核与审计。",
            href: "/docs/userscripts/agent-endpoint",
            cta: "阅读",
          },
          {
            title: "MCP 与工具",
            text: "了解远程 MCP 服务、连接状态与安全边界。",
            href: "/docs/lumo/mcp",
            cta: "返回 MCP",
          },
        ],
      },
    ],
  }),

  webmcp: defineArticle({
    product: "lumo",
    slug: "webmcp",
    section: "features",
    title: "页面提供的工具（WebMCP）",
    description: "声明了 WebMCP 工具的页面，会以按标签页的方式加入 Lumo 的工具列表。",
    blocks: [
      {
        type: "p",
        text: "WebMCP 让网页自己声明可以被智能体调用的工具。Lumo 把这些工具按标签页挂载：只有在你打开该页面时，它们才出现在工具列表里。",
      },
      { type: "h2", text: "工具从哪里来" },
      {
        type: "p",
        text: "页面通过 `document.modelContext` 或声明式表单属性注册工具。Lumo 读取工具名称、描述与参数结构，把它们当作普通 MCP 工具使用；页面关闭后工具随之消失。",
      },
      { type: "h2", text: "使用页面工具" },
      {
        type: "steps",
        items: [
          {
            title: "打开声明了工具的页面",
            text: "页面必须在前台标签页打开，并且已经完成注册。",
          },
          {
            title: "附加或提及该标签页",
            text: "在对话中附加页面，或直接让 Lumo 查看当前标签页。",
          },
          {
            title: "调用工具",
            text: "模型会看到该页面提供的工具；调用结果与其他工具一样显示在对话里。",
          },
        ],
      },
      { type: "h2", text: "边界" },
      {
        type: "ul",
        items: [
          "工具按标签页隔离，不会跨页面共享。",
          "页面关闭或导航后，工具立即失效。",
          "页面只能声明工具，不能读取 Lumo 的其他工具或对话内容。",
          "工具调用仍然受模型判断与你的停止操作控制。",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "站点需要自己实现 WebMCP",
        text: "普通网页不会自动拥有工具。只有明确实现 WebMCP 的站点，才会出现在这里。",
      },
      { type: "h2", text: "与扩展服务的区别" },
      {
        type: "ul",
        items: [
          "WebMCP 工具属于页面，生命周期跟随标签页。",
          "扩展服务属于扩展，生命周期跟随浏览器会话。",
          "两者都进入同一张工具列表，模型不需要区分来源。",
        ],
      },
    ],
  }),

  settings: defineArticle({
    product: "lumo",
    slug: "settings",
    section: "features",
    title: "设置项说明",
    description: "模型、OCR、MCP、文件、界面、系统提示词、命令与调试。",
    blocks: [
      {
        type: "p",
        text: "设置页按功能分组。模型与 MCP 决定 Lumo 能做什么，其余选项决定它如何呈现和记录。",
      },
      { type: "h2", text: "设置页导航" },
      {
        type: "table",
        head: ["入口", "用途"],
        rows: [
          ["模型", "提供方、密钥、模型与默认模型。"],
          ["OCR", "图片文字识别相关选项。"],
          ["MCP", "内置服务、远程服务与扩展提供方。"],
          ["文件", "查看、预览、下载与删除智能体生成的文件。"],
          ["界面", "主题、语言与显示偏好。"],
          ["系统提示词", "追加或替换系统提示词，改变助手的行为方式。"],
          ["命令", "管理可复用的快捷命令。"],
          ["对话调试", "查看原始请求、工具结果与错误，用于排查。"],
        ],
      },
      { type: "h2", text: "外观与语言" },
      {
        type: "p",
        text: "Lumo 跟随系统主题，也可以手动切换亮色与暗色。语言支持 English 与简体中文，切换后界面立即生效，不会清空对话。",
      },
      { type: "h2", text: "系统提示词" },
      {
        type: "p",
        text: "系统提示词决定助手的默认行为。除非你清楚影响，否则只追加规则，不要整段替换；替换后模型可能不再遵守 Lumo 的工具使用约定。",
      },
      { type: "h2", text: "命令" },
      {
        type: "p",
        text: "命令是带名称的提示词片段。适合重复使用的分析模板、写作规范或固定检查清单。命令只在本地保存。",
      },
      { type: "h2", text: "对话调试" },
      {
        type: "p",
        text: "调试页显示每次请求的模型、消息、工具调用与错误。遇到模型拒绝、工具参数错误或上下文溢出时，这里比对话界面更接近事实。",
      },
      {
        type: "callout",
        tone: "tip",
        title: "设置只影响本机",
        text: "所有设置保存在扩展存储中，不会同步到其他设备。更换浏览器或重装扩展前，先备份需要保留的内容。",
      },
    ],
  }),

  data: defineArticle({
    product: "lumo",
    slug: "data",
    section: "features",
    title: "数据与隐私",
    description: "Lumo 在本地保存什么、向模型服务商发送什么，以及如何清除数据。",
    blocks: [
      {
        type: "p",
        text: "Lumo 是本地优先的扩展。它没有账号系统，也没有中转服务器；数据的边界由你配置的模型服务商决定。",
      },
      { type: "h2", text: "本地保存的内容" },
      {
        type: "table",
        head: ["数据", "位置", "用途"],
        rows: [
          ["对话与消息", "扩展存储", "历史记录与继续对话。"],
          ["设置与密钥", "`chrome.storage.local`", "模型、MCP、界面与提示词配置。"],
          ["文件", "IndexedDB", "智能体生成或下载的文件。"],
          ["调试记录", "扩展存储", "请求、工具结果与错误排查。"],
        ],
      },
      { type: "h2", text: "发送给模型服务商的内容" },
      {
        type: "ul",
        items: [
          "你输入的消息与附件（页面正文、粘贴文本、图片）。",
          "为完成任务所需的工具定义与工具结果。",
          "对话历史中仍然在上下文窗口内的部分。",
        ],
      },
      { type: "h2", text: "不会收集的内容" },
      {
        type: "ul",
        items: [
          "没有 Lumo 账号，也没有使用统计上传。",
          "不会把密钥发送给 Lumo 的服务器——Lumo 没有服务器。",
          "不会主动扫描你未附加的标签页或浏览历史。",
        ],
      },
      { type: "h2", text: "清除数据" },
      {
        type: "steps",
        items: [
          {
            title: "删除对话",
            text: "在历史记录中逐条删除，或清空全部对话。",
          },
          {
            title: "清理文件",
            text: "设置 → 文件，删除不再需要的生成文件。",
          },
          {
            title: "卸载扩展",
            text: "在 `chrome://extensions` 移除 Lumo。卸载会删除本地存储，且无法恢复。",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "敏感页面请使用本地模型",
        text: "附加页面会把正文发送给你配置的模型服务商。处理合同、医疗或账号页面时，先移除附件，或切换到本机模型。",
      },
      {
        type: "cards",
        items: [
          {
            title: "Lumo 隐私政策",
            text: "完整的本地存储、第三方请求与数据保留说明。",
            href: "/lumo/privacy",
            cta: "阅读政策",
          },
          {
            title: "故障排查",
            text: "需要确认请求是否真的发出时，查看对话调试与错误信息。",
            href: "/docs/lumo/troubleshooting",
            cta: "排查",
          },
        ],
      },
    ],
  }),

  troubleshooting: defineArticle({
    product: "lumo",
    slug: "troubleshooting",
    section: "features",
    title: "故障排查",
    description: "按模型、工具、页面与扩展四类定位问题。",
    blocks: [
      {
        type: "p",
        text: "排查时先缩小范围：是模型没有返回，还是工具没有执行，还是页面根本没有被读取。对话调试页会给出最接近事实的记录。",
      },
      { type: "h2", text: "先检查这四项" },
      {
        type: "ol",
        items: [
          "设置 → 模型：提供方已连接，默认模型存在。",
          "设置 → MCP：需要的服务或扩展处于已连接状态。",
          "当前页面是普通网页，不是 `chrome://`、扩展页或受保护页面。",
          "侧边栏顶部显示的模型与预期一致。",
        ],
      },
      { type: "h2", text: "模型相关" },
      { type: "h3", text: "返回 401 或 Unauthorized" },
      {
        type: "p",
        text: "密钥无效、过期，或服务商没有开通该模型。重新粘贴密钥，并在服务商控制台确认权限。",
      },
      { type: "h3", text: "返回 404 或 Not Found" },
      {
        type: "p",
        text: "Base URL 路径不对，或协议选错。OpenAI 兼容网关通常需要以 `/v1` 结尾；Anthropic 使用官方接口地址。",
      },
      { type: "h3", text: "请求超时或网络错误" },
      {
        type: "p",
        text: "网关可能不允许浏览器直连，或本机服务没有启动。先确认地址能在浏览器中访问，再检查 CORS 设置。",
      },
      { type: "h2", text: "工具相关" },
      { type: "h3", text: "工具列表为空" },
      {
        type: "p",
        text: "内置服务默认存在；如果外部服务没有工具，展开卡片查看连接状态。扩展提供方需要对方已安装、开启并授权。",
      },
      { type: "h3", text: "工具调用失败" },
      {
        type: "p",
        text: "展开工具行查看错误。常见原因是元素已消失、页面跳转、参数类型不符，或远程服务在调用中途断开。",
      },
      { type: "h3", text: "扩展服务未连接" },
      {
        type: "p",
        text: "按 [扩展服务](/docs/lumo/extension-services) 的状态对照逐项检查：ID、端点开关、允许列表、运行时是否就绪。",
      },
      { type: "h2", text: "页面相关" },
      { type: "h3", text: "读取不到页面内容" },
      {
        type: "p",
        text: "Chrome 内部页面、扩展页面、PDF 阅读器与部分登录页不允许读取。等待页面加载完成，或换一个普通网页测试。",
      },
      { type: "h3", text: "截图是空白" },
      {
        type: "p",
        text: "受保护视频、跨域 iframe 与部分画布内容无法截图。确认页面在前台，并且没有被浏览器限制。",
      },
      { type: "h2", text: "扩展相关" },
      { type: "h3", text: "侧边栏打不开" },
      {
        type: "p",
        text: "先在 `chrome://extensions` 确认 Lumo 已启用，再点击工具栏图标。某些窗口类型不支持侧边栏，切换到普通浏览器窗口。",
      },
      { type: "h3", text: "更新后设置或连接丢失" },
      {
        type: "p",
        text: "未打包扩展重新加载后 ID 可能变化。重新复制 Lumo 的扩展 ID，更新 Userscripts 的允许列表，再刷新扩展服务。",
      },
      {
        type: "callout",
        tone: "tip",
        title: "用对话调试定位",
        text: "设置 → 对话调试可以看到原始请求、工具参数与错误响应。把错误信息与工具名对照，通常能直接判断是模型、网络还是页面问题。",
      },
    ],
  }),
};
