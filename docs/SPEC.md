# Lumo Website — 产品与技术规格（SPEC）

> 状态：已确认，作为实施基线。
> 关联文档：[`AGENTS.md`](../AGENTS.md)、[`DESIGN.md`](./DESIGN.md)、参考项目 `../lumo` 与 `../lumo-userscript-manager`。

---

## 1. 目标与边界

### 1.1 目标

为 **Lumo** 品牌建立统一官网，承载三件事：

1. **品牌入口**：一句话说清 Lumo 是谁、做哪两件产品、为什么值得信任。
2. **产品主页**：为 `Lumo`（AI 浏览器侧边栏）与 `Lumo Userscripts`（用户脚本管理器）各提供一页沉浸式产品主页。
3. **技术文档**：可搜索、可深链、双语的产品与工程文档，承担开发者信任建设。

### 1.2 非目标

- 不实现账号、支付、博客 CMS、用户社区或真实下载托管。
- 不在站内伪造产品截图；所有产品视觉由代码复刻，数据为演示数据。
- 不引入服务端运行时。站点为**纯静态预渲染**，以 Cloudflare Workers 静态资产托管。

### 1.3 成功标准

| 维度 | 标准 |
| --- | --- |
| 体验 | 首屏 LCP < 2.0s（本地构建产物、4G 模拟），CLS < 0.02 |
| 响应式 | 360 / 390 / 768 / 1024 / 1440 五档无横向溢出、无控件挤压 |
| 主题 | 亮/暗/跟随系统三选一（暗色固定 Midnight），首帧无闪白 |
| 国际化 | 中文/英文全站覆盖，路径级 locale（URL 决定语言，链接不存语言），`/` 入口按偏好路由，`hreflang` 完整 |
| 可访问性 | 键盘全可达、可见焦点、对比度 AA、`prefers-reduced-motion` 降级 |
| SEO | 每路由独立 title/description/OG/canonical，静态 HTML 可被爬虫直接读取 |
| 工程质量 | `typecheck`、`test`、`build` 全绿；构建产物可直接作为 Worker 资产上线 |

---

## 2. 品牌与叙事

### 2.1 品牌定位

**Lumo — A quieter, more capable web.**

Lumo 不把浏览器变成另一个操作系统，而是把「理解」和「控制」做成两件安静、精确的工具：

- **Lumo**：理解你正在看的页面，用 AI Agent + MCP 工具完成浏览器内的真实任务。
- **Lumo Userscripts**：让你精确控制每一个站点，用原生 MV3 能力运行、编辑、管理用户脚本。

共同品牌承诺：**Local-first · Craft-driven · Calm by default**。

### 2.2 文案语气

- 陈述结果与能力，不写操作指令。
- 短句、动词开头、可验证。避免「革命性」「颠覆」。
- 技术名词保留原文：MCP、MV3、GM API、WXT、IndexedDB。
- 中文不做机械直译，允许重写为更自然的产品语言。

### 2.3 视觉母题

1. **光（Lumo / lumen）**：极光渐变、发光点、柔和的径向光晕。
2. **层（Layer）**：浏览器窗口、侧边栏、面板、卡片，以「层」表达产品结构。
3. **精密（Precision）**：1px 边框、光学对齐、克制的阴影、等宽技术标识。
4. **运动（Momentum）**：滚动驱动的位移、共享布局滑块、物理阻尼。

---

## 3. 信息架构

### 3.1 路由表

| 路径（EN） | 路径（ZH） | 页面 | 说明 |
| --- | --- | --- | --- |
| `/` | `/zh` | 首页 | 品牌入口、双产品 Tab 舞台 |
| `/lumo` | `/zh/lumo` | Lumo 产品主页 | Hero 拼接、能力舞台、MCP、模型、隐私、安装 |
| `/userscripts` | `/zh/userscripts` | Userscripts 产品主页 | Hero 拼接、安装流、编辑器、GM API、权限、外观 |
| `/posters` | `/zh/posters` | 海报 | 双产品 Tab，各 5 张固定 1280 × 800 海报；仅页脚资源入口 |
| `/docs` | `/zh/docs` | 文档首页 | 产品选择、搜索、各产品必读 |
| `/docs/:product` | `/zh/docs/:product` | 产品文档首页 | 该产品概览、侧栏、TOC |
| `/docs/:product/:slug` | `/zh/docs/:product/:slug` | 产品文档正文 | 侧栏、TOC、代码高亮、上一篇/下一篇 |
| `/lumo/privacy` | `/zh/lumo/privacy` | Lumo 隐私政策 | 直接渲染产品仓库的 PRIVACY.md |
| `/userscripts/privacy` | `/zh/userscripts/privacy` | Userscripts 隐私政策 | 直接渲染产品仓库的 PRIVACY.md |
| `*` | `*` | 404 | 品牌化错误页 |

### 3.2 全局导航

- **Products**：下拉面板，两个产品条目（图标 + 名称 + 一句定位）。
- **Docs**：直接进入文档首页。
- **右侧**：搜索（⌘K）、主题菜单、语言菜单、GitHub、主 CTA「Get Lumo」。
- **移动端**：Sheet 抽屉，产品区 + 文档 / 两个产品隐私 + 主题/语言 + CTA。
- 版本动态不做独立页面：完整历史在 GitHub Releases，页面不再维护第二份时间线。

### 3.3 页脚

五列：品牌陈述 + 产品 + 源码 + 资源 + 法务/社交。资源列只放海报入口；海报不出现在 Header、移动端菜单或命令面板中。法务列直接指向两个产品的隐私政策（不再有站点级隐私页）。底部为版权、构建标记、主题/语言快捷入口。

---

## 4. 设计语言（从两个产品抽象）

### 4.1 设计立场

官网是**产品橱窗**，不是文档站或工具界面。因此：

1. **信息密度让位于叙事节奏**：每个 Hero 只讲一件事。
2. **视觉复刻必须可信**：mockup 的间距、字号、控件形态来自真实产品，而不是随意拼贴。
3. **动效解释空间关系**：滚动时面板分层位移，而不是元素随机漂浮。
4. **任何一屏都不需要解释才能看懂**：标题 + 一句结果 + 一个真实动作。

### 4.2 四条法则（沿用 AGENTS.md）

| 法则 | 官网落地 |
| --- | --- |
| 渐进式隐藏 | 产品下拉默认收起；移动端只保留必要动作；搜索框在导航中表现为快捷键提示而非大输入框 |
| 交互归一 | 所有外链、CTA、主题菜单、语言菜单的 hover/active/focus 统一；所有 Hero 的圆角、边框、光晕同一套 token |
| 渐进式披露 | 首页用 Tab 一次展开一个产品，产品页逐层展开能力；文档侧栏分组折叠；权限表按需展开 |
| 物理级动效 | 滚动 reveal 使用同一曲线；面板视差有层级关系；退场快于入场；`prefers-reduced-motion` 全降级 |

### 4.3 设计令牌（详见 DESIGN.md）

- 颜色：OKLCH；亮色 Paper、暗色 Midnight 两套外壳；固定 azure 主题色。
- 字体：Inter Variable（拉丁）+ 系统中文字体栈；JetBrains Mono（代码/技术标识）。
- 字号：展示级 `clamp()`；正文 16–18px；技术元数据 12–13px。
- 圆角：控件 10px / 卡片 16px / 舞台 24px / 浮层 20px / 胶囊 full。
- 阴影：`surface` / `panel` / `card` / `float` 四档材质；暗色用顶部高光替代软阴影。
- 动效：`standard` / `emphasis` / `exit` 三条曲线；场景化时长 120–700ms。

### 4.4 布局

- 容器：`max-w-[1200px]`，桌面左右 32px，平板 24px，移动 20px。
- 栅格：12 列；产品舞台 7/5 或 5/7 交替。
- 间距：8pt 基准；区块垂直节奏 `clamp(72px, 10vw, 144px)`。
- 层级：页面背景 → 舞台 → 卡片 → 浮层，亮度/阴影单调递增。

---

## 5. 页面蓝图

### 5.1 首页 `/`

1. **Hero**：品牌主张 + 双 CTA + 中央浏览器/侧边栏/脚本面板组合 mockup + 极光背景 + 滚动视差。
2. **产品线 Tab 舞台**：居中的胶囊式分段控件（Lumo / Lumo Userscripts，Apple 风格滑片指示器 + 弹簧过渡）切换同一块渐变舞台，不设区块标题；每个面板包含产品标识、一句定位、标题、描述、3 条能力与进入产品页的 CTA，右侧是该产品的真实 mockup。两个面板都写入预渲染 HTML，非激活面板以 `data-[state=inactive]:hidden` 隐藏，因此静态文档仍保留完整产品文案。
3. **最终 CTA**：大渐变面板，双产品入口。

首页不承载技术底座、关键能力带与文档入口：技术栈与协议归产品页与文档，首页只留产品叙事。能力舞台不再与产品双卡并列重复——Tab 舞台本身就是产品介绍。

### 5.2 Lumo 产品页 `/lumo`

1. **Hero**：产品图标 + 「会动手的浏览器智能体」定位 + 安装/文档 CTA + 智能体循环侧边栏 mockup + 极光。
2. **Anchor nav**：Overview / Agent loop / Tools / Split view / Models / Privacy / Install（滚动高亮）。
3. **Stage 1 — 智能体循环**：多步循环示意图 + 步数预算、并行工具、停止/重试、上下文压缩。
4. **Stage 2 — 工具面**：5 个内置 MCP server（含 DevTools Advanced）+ 远程 MCP、扩展提供方、WebMCP；CDP 四项工具独立舞台。
5. **Stage 3 — 分屏工作区**：可切换单栏 / 二栏 / 三栏的真实 SplitView 示意，每个面板独立会话、模型与工具调用。
6. **Stage 4 — 模型提供方**：三种 API 类型 + 自带密钥；真实 Models 设置窗口 mockup + 协议矩阵。OpenCode 仅作为厂商类型出现在文档。
7. **Stage 5 — 数据边界**：local-first 示意图 + 隐私承诺。
8. **能力网格**：快捷动作、附件、OCR、本地文件、对话历史、对话调试。
9. **安装步骤**：Chrome Web Store / GitHub Actions / 源码构建。
10. **交叉推荐**：Userscripts 卡片。

### 5.3 Userscripts 产品页 `/userscripts`

1. **Hero**：产品图标 + 「用一句话得到的脚本」定位 + 安装/文档 CTA + 真实 Scripts 页面 mockup（含 agent 创建的脚本）。
2. **Anchor nav**：Overview / Agent / Install / Editor / Runtime / Control。
3. **Stage 1 — 智能体集成**：审批对话框、L0/L1 桥接图、9 个工具面、端点/写入/复核三个开关。
4. **Stage 2 — 安装一次，处处运行**：URL/文件/剪贴板三入口安装流。
5. **Stage 3 — 真正的编辑器**：CodeMirror 6 全宽编辑器 mockup + 元数据校验 + 覆盖。
6. **Stage 4 — 原生运行时**：chrome.userScripts 双引擎 + GM API 网格 + 代码片段。
7. **Stage 5 — 始终可控**：权限表、备份/恢复、日志/诊断、回收站，以及智能体写入审计。
8. **安装步骤**：Chrome 138+ / Allow User Scripts。
9. **交叉推荐**：Lumo 卡片。

### 5.4 海报 `/posters`

- **入口**：只出现在页脚「资源 / Resources」列；Header、移动端菜单、命令面板不提供入口。
- **结构**：双产品 Tab（Lumo / Lumo Userscripts）；每个产品 5 张海报，顺序固定，预渲染 HTML 同时保留两个 Tab 的全部海报（非激活面板 `data-[state=inactive]:hidden`）。
- **画布**：每张海报固定 `1280 × 800`，外层 `MockScaler` 只做整体 `transform: scale()`；内部全部使用像素尺寸，任何视口下都不会触发换行、折叠或溢出。
- **内容**：纯色或品牌渐变背景、角落产品标记、大标题 + 产品界面/框架图 + 可选副标题；界面部分复用 `components/mockups` 的产品复刻，不伪造第二套视觉。
- **维护**：每张海报一个独立组件（`components/posters/poster-<product>-<id>.tsx`），`poster-catalog.ts` 管顺序与 i18n 标签，`poster-registry.tsx` 只做 id → 组件映射。
- **HTML-in-Canvas（Chrome 157+）**：检测到 `canvas.content === "drawable"` 时，每张海报改由 `<canvas content="drawable">` 承载，画布网格为 `1280 × 800 × devicePixelRatio`，`drawElementImage()` 把 DOM 快照按设备像素绘制；海报名称旁出现「Download PNG / 下载 PNG」按钮。文件名固定为 `<product>-<name>-<index>-<locale>.png`（例如 `lumo-agent-loop-02-en.png`、`lumo-userscripts-智能体端点-03-zh.png`）。不支持时退回普通 DOM，不显示下载按钮；服务端预渲染永远输出 fallback，避免宣称未验证的能力。
- **Lumo 五张**：品牌 + 侧边栏截图、智能体循环、工具面、三栏分屏、模型/密钥/本地优先。
- **Userscripts 五张**：品牌 + Scripts 窗口、CodeMirror 编辑器、智能体端点桥接、安装与权限控制、版本/备份/诊断生命周期。

### 5.5 文档 `/docs`

- **定位**：用户文档，只说明怎么使用与配置；不再承载架构、设计系统、部署等工程说明。
- **首页**：搜索框（⌘K）与两个产品入口卡；每张卡列出该产品的必读文章（安装、必做配置、FAQ）。
- **产品文档首页**：`/docs/lumo` 与 `/docs/userscripts`，渲染该产品的 `overview` 文章；侧栏只显示当前产品的分组与文章。
- **正文页**：左侧产品切换 + 分组导航、正文（标题/段落/列表/步骤/提示/表格/代码/界面 mock）、右侧 TOC（scroll spy）、上一篇/下一篇、移动端目录 Sheet。
- **阅读顺序**：总体介绍 → 安装 → 必做配置（Lumo 模型 / Userscripts 允许用户脚本）→ 常见问题 → 子功能指南。
- **产品切换**：`DocsSidebar` 顶部的分段控件；切换产品进入该产品概览，不混排两个产品的文章。
- **搜索**：客户端索引标题、描述、H2/H3 与产品；⌘K 打开；结果标注产品并按产品作用域跳转。
- **Mock**：文档内容通过 `mock` block 引用界面复刻（`chrome://extensions`、Lumo 模型/MCP 设置、Userscripts 通用/智能体设置），用于逐步提示配置位置。
- **Lumo 文章**：`overview`、`install`、`models`、`faq`、`chat`、`mcp`、`extension-services`、`webmcp`、`settings`、`data`、`troubleshooting`。
- **Userscripts 文章**：`overview`、`install`、`enable-userscripts`、`faq`、`install-scripts`、`editor`、`gm-api`、`permissions`、`updates-backup`、`agent-endpoint`、`diagnostics`、`settings`。

### 5.6 产品隐私政策 `/lumo/privacy`、`/userscripts/privacy`

- 每个产品一页，直接展示该产品仓库 `PRIVACY.md` 的中英双语版本，不做站点级汇总页。
- 正文使用文档的 `DocBlock` 模型与排版（标题、段落、列表、提示块、右栏 TOC、锚点），因此法律文本与技术文档共享一套阅读体验。
- 内容在 `app/content/privacy/{en,zh}.ts`：`updated` 与上游文件日期一致；测试保证中英结构完全一致、锚点唯一、内链不带语言前缀。
- 页头提供「在 GitHub 查看原文」，页尾提供返回所属产品与另一产品政策的交叉链接。
- 旧 `/privacy` 通过 `_redirects` 301 到 `/lumo/privacy`；`/changelog` 301 回首页。

---

## 6. 组件清单

### 6.1 基础（shadcn 风格）

Button、Badge、Card、Separator、Tooltip、DropdownMenu、NavigationMenu、Dialog、Sheet、Tabs、Accordion、ScrollArea、ToggleGroup、Input、Kbd、Skeleton、Command。

### 6.2 品牌与布局

BrandMark、ProductMark、SiteHeader、MobileNav、SiteFooter、Container、SectionHeading、Eyebrow、GradientText、ThemeMenu、LanguageMenu、SearchTrigger、CommandPalette、ScrollProgress。

### 6.3 动效

Reveal、Stagger、Parallax、TiltCard、Aurora、GridPattern、NoiseOverlay、Marquee、CountUp、MagneticButton。

### 6.4 Mockup（产品视觉复刻）

BrowserFrame、MockScaler、SidebarChatMock、McpServerCard、ProviderMarquee、PrivacyDiagram、UserscriptsDashboardMock、InstallFlowMock、CodeEditorMock、GmApiGrid、PermissionTable、PaletteShowcase、FeatureStage、MetricBand、DocsPreview。

### 6.5 文档

DocsSidebar、DocsToc、DocBlocks、CodeBlock、Callout、StepList、DataTable、DocsSearch、DocsPager、DocsBreadcrumb、ReadingProgress。

---

## 7. 技术架构

### 7.1 选型

| 层 | 选择 | 理由 |
| --- | --- | --- |
| 构建 | **Vite 8 + React Router 8 framework mode** | 官方 Vite 集成；路由、meta、预渲染一体 |
| 渲染 | `ssr: false` + `prerender` 全量静态化 | 纯静态 HTML，Worker 静态资产直接托管；SEO 完整 |
| UI | React 19 + Tailwind CSS 4 + shadcn 风格源码组件 + Radix | 与两个产品同栈；可控、可移植 |
| 动效 | `motion` | 与产品一致；布局动画、滚动驱动、手势 |
| i18n | `i18next` + `react-i18next` | 与产品一致；路径级 locale |
| 图标 | `lucide-react` | 与产品一致；矢量、可 tree-shake |
| 代码高亮 | `shiki`（按需动态加载） | 与产品一致；双主题 token |
| 测试 | `vitest` + `@testing-library/react` + `jsdom` | 与产品一致 |
| 部署 | **Cloudflare Worker + 静态资产** | Edge 只做资产投递与源站改写，不做 SSR；`_headers` / `_redirects` 兼容；任意域名零构建变量；流水线在 Cloudflare 侧（Git 导入） |

### 7.2 为什么不是普通 SPA

普通 Vite SPA 首屏只有空 `<div>`，营销站/文档站的 SEO 与首屏体验都吃亏。React Router 8 的 `ssr:false + prerender` 在构建期把每个路由渲染成静态 HTML，运行时仍是 SPA 导航，不需要任何服务端；Edge 只负责把占位源换成请求域源。这是「Vite + React + Cloudflare Worker 静态资产」的现代最优解。

### 7.3 目录结构

```
app/
  root.tsx                 # HTML 骨架、主题 preload、错误边界
  routes.ts                # 路由表（含 locale 前缀生成）
  entry.client.tsx         # 可选，默认即可
  routes/
    site-layout.tsx        # Header / Footer / 全局浮层
    home.tsx
    lumo.tsx
    userscripts.tsx
    posters.tsx           # 双产品海报画廊（固定 1280 × 800）
    docs-layout.tsx        # 产品作用域侧栏 / TOC
    docs-index.tsx         # 产品选择
    docs-article.tsx       # /docs/:product 与 /docs/:product/:slug
    lumo-privacy.tsx       # 产品隐私政策（每个产品一个 route module）
    userscripts-privacy.tsx
    not-found.tsx
  components/
    ui/                    # shadcn primitives
    brand/                 # BrandMark / ProductMark
    site/                  # Header / Footer / CommandPalette / ThemeMenu / LocaleLink
    motion/                # Reveal / Parallax / Aurora / ...
    mockups/               # 产品视觉复刻
    posters/               # 每张海报一个组件 + catalog/registry + 共用框
    docs/                  # DocsSidebar / Toc / Blocks / DocMock
    privacy/               # 产品隐私政策页面（复用 DocBlocks + Toc）
    home/ lumo/ userscripts/
  content/
    docs/en/               # 英文文档（lumo / userscripts）
    docs/zh/               # 中文文档（lumo / userscripts）
    privacy/{en,zh}.ts     # 产品隐私政策（与上游 PRIVACY.md 同步）
  lib/
    i18n/                  # 初始化、locale 解析、资源
    theme/                 # 主题注册表、应用、preload
    seo.ts                 # meta / canonical / hreflang / JSON-LD
    site-manifest.ts       # locale 工具、站点路由表、产品隐私路径
    utils.ts
  styles/
    globals.css            # 令牌、主题块、动画、基础层
public/
  brand/*.svg
  _headers
  _redirects
  robots.txt
  sitemap.xml (构建生成)
react-router.config.ts
vite.config.ts
src/worker.ts              # 资产投递 + 源站改写（无 SSR）
wrangler.toml
```

### 7.4 国际化

- 路径级 locale：默认英文无前缀，中文 `/zh`。
- **URL 拥有语言**：`/zh/...` 是中文，`/...` 是英文，任何显式路径都不会被改写。只有 `/`（唯一不带语言的路径）在首帧前选一次语言：已存偏好 → 来源页面语言 → `navigator.languages`。因此在新标签页打开英文链接不会因为偏好是中文而跳到 `/zh`。
- 爬虫（UA/`navigator.webdriver`）永不重定向；内联脚本与 `resolveLocaleRedirect` 由同一组测试用例约束。
- 渲染出的 locale 会写入偏好，语言菜单在跳转前显式写入。
- `LocaleProvider` 从 `useLocation()` 推导 locale（无 `locale` prop），同步 `i18n.changeLanguage` 与 `<html lang>`；因此门户（下拉、Sheet）里的链接也不会错语言。
- **链接只写一次、不带语言**：`/lumo`、`/docs/lumo/mcp`。`LocaleLink` / `LocaleNavLink` / `useLocaleNavigate`（`components/site/locale-link.tsx`）按当前 URL 补前缀；`localePath` 幂等，已带前缀的显式目标保持原样（语言菜单、跨语言链接）。
- 文档正文里的内链同样不带语言前缀；测试会扫描内容与关键组件，发现 `"/zh/` 字面量即失败。
- 语言切换保持当前文档语义并保留 query 与 hash（`switchLocaleHref`）。
- `hreflang`、`og:locale`、`canonical` 由 `seo.ts` 统一生成；`hreflang` 列出全部 locale 并附 `x-default`。
- 测试保证两套 key 完全一致。

### 7.5 主题

- 单轴：`mode`（light/dark/system）；亮色固定 Paper，暗色固定 Midnight，主题色固定 azure。
- DOM：`<html class="dark">`。
- 首帧：root `<head>` 内联 classic script 同步读 `localStorage` 镜像并写 DOM，避免闪白。
- 主题菜单：只有模式切换。
- 无 JS 时：保持预渲染的浅色外壳。

### 7.6 动效

- `Reveal`：`whileInView`，`once: true`，位移 16–28px + 透明度，600ms `emphasis`。
- `Parallax`：`useScroll` + `useTransform`，仅桌面启用，移动端降级为静态。
- `TiltCard`：指针跟随 ±4°，`spring` 阻尼，`pointer: coarse` 禁用。
- Hero 极光：CSS 动画 + `motion` 组合，避免大面积 JS 重绘。
- 所有动画受 `MotionConfig reducedMotion="user"` 与 CSS `prefers-reduced-motion` 双重保护。

### 7.7 SEO

- 每个 route module 导出 `meta()`：title、description、OG、Twitter、canonical、hreflang。
- `root.tsx` 输出 JSON-LD（Organization + WebSite）。
- `public/robots.txt` + 构建后生成 `sitemap.xml`。
- 静态 HTML 已含正文，不依赖 JS 执行。

### 7.8 Cloudflare Workers（静态资产 + 源站改写）

- `wrangler.toml`：`main = "./src/worker.ts"` + `[assets] directory = "./build/client"`、`binding = "ASSETS"`、`html_handling = "drop-trailing-slash"`、`not_found_handling = "404-page"`、`run_worker_first = true`。
- **尾斜杠唯一形态**：`/docs/lumo/mcp` 由 `docs/lumo/mcp/index.html` 直接响应，`/docs/lumo/mcp/` 307 到无斜杠形式；canonical、sitemap、站内链接三者一致，硬加载不再多一跳。
- `src/worker.ts` 不渲染任何东西：取资产后，把构建占位源 `SITE_ORIGIN_PLACEHOLDER`（`https://site.invalid`）整篇替换为请求域源；只处理 `text/html`、`application/xml`、`text/xml`、`text/plain`，其余直接透传。
- 因此**无需任何构建变量**：`*.workers.dev`、预览域名、自定义域名都会得到正确的 canonical / hreflang / OG / JSON-LD / `sitemap.xml` / `robots.txt`。浏览器内 `siteOrigin()` 返回 `window.location.origin`，客户端导航与静态 HTML 一致。
- 每个已知路由都有预渲染 HTML，无需任何运行时重写。
- 未知 URL 由构建生成的 `404.html` 返回真实 404 状态；`/zh/*` 的未命中由 Worker 换成预渲染的 `/zh/404`，因此中文站点不会返回英文 404 文档。
- `public/_redirects` 不做 SPA 重写；`public/_headers` 负责安全头与资产缓存，二者由资产层直接生效。
- 流水线：Cloudflare Workers Builds 从 Git 仓库导入，构建命令 `npm run typecheck && npm test && npm run build`，部署命令 `npx wrangler deploy`；仓库内不放置 CI 工作流。
- 本地：`npm run preview`（`wrangler dev`）验证 `build/client`，源站改写、转发与 404 行为与生产一致。

---

## 8. 响应式与可访问性

| 断点 | 行为 |
| --- | --- |
| `< 640` | 单列；Hero 标题 clamp 到 40px；产品卡纵向；文档侧栏进 Sheet；导航收进菜单 |
| `640–1023` | 双列能力网格；Hero mockup 缩放；锚点导航横向滚动 |
| `1024–1279` | 12 列布局；产品舞台 7/5；文档三栏（侧栏 + 正文 + TOC） |
| `≥ 1280` | 容器 1200px；Hero mockup 完整视差；最大标题 88px |

- 所有可交互元素 ≥ 44×44（移动）/ 32×32（桌面密集区）。
- 焦点环全局 2px + 2px offset，永不移除。
- 文本对比度 AA；主题色按钮标签按色相单独校准。
- 图标与文字基线对齐：图标 `shrink-0`，标签 `min-w-0`，行内 `items-center`。
- 长文本 `text-pretty`，标题 `text-balance`；技术标识 `whitespace-nowrap`。

---

## 9. 测试与验收

### 9.1 自动化

- `npm run typecheck`：`react-router typegen && tsc --noEmit`。
- `npm run test`：
  - i18n key 对齐（en/zh 完全一致）。
  - 文档 registry 完整性（每篇文章有标题、描述、分类、双语、非空 blocks）。
  - 主题注册表与 CSS 令牌一致；主题色对比度 ≥ 4.5。
  - locale 路径映射（`/lumo` ↔ `/zh/lumo`，docs slug 保持）。
  - 关键组件 smoke render（Header、Footer、ThemeMenu、DocsSidebar）。
- `npm run build`：预渲染全部路由成功。

### 9.2 手工验收

- 360 / 390 / 768 / 1024 / 1440 截图检查。
- 亮/暗/跟随系统切换，暗色为 Midnight，首帧无闪白。
- 中英文切换，路径保持。
- 键盘 Tab 遍历 Header → Hero → 内容 → Footer；⌘K 搜索；Esc 关闭。
- `prefers-reduced-motion` 下无位移动画。
- Lighthouse：Performance / Accessibility / Best Practices / SEO ≥ 95。

---

## 10. 实施顺序

1. 工程骨架、依赖、Vite/React Router/Cloudflare 配置。
2. 设计令牌、主题系统、i18n、全局样式。
3. shadcn primitives、品牌组件、SiteHeader/Footer、CommandPalette。
4. 动效组件与 mockup 组件。
5. 首页。
6. Lumo 产品页。
7. Userscripts 产品页。
8. 文档系统与 12 篇文章（双语）。
9. 产品隐私政策、404、SEO 资源。
10. 测试、构建、Cloudflare 部署文件、截图验收。
