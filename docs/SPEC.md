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
- 不引入服务端运行时。站点为**纯静态预渲染**，部署在 Cloudflare Pages。

### 1.3 成功标准

| 维度 | 标准 |
| --- | --- |
| 体验 | 首屏 LCP < 2.0s（本地构建产物、4G 模拟），CLS < 0.02 |
| 响应式 | 360 / 390 / 768 / 1024 / 1440 五档无横向溢出、无控件挤压 |
| 主题 | 亮/暗/跟随系统 + 3 套调色板 + 5 个主题色轴，首帧无闪白 |
| 国际化 | 中文/英文全站覆盖，路径级 locale，首次访问按浏览器语言路由，`hreflang` 完整 |
| 可访问性 | 键盘全可达、可见焦点、对比度 AA、`prefers-reduced-motion` 降级 |
| SEO | 每路由独立 title/description/OG/canonical，静态 HTML 可被爬虫直接读取 |
| 工程质量 | `typecheck`、`test`、`build` 全绿；构建产物可直接部署 Pages |

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
| `/` | `/zh` | 首页 | 品牌入口、双产品、设计哲学、技术底座 |
| `/lumo` | `/zh/lumo` | Lumo 产品主页 | Hero 拼接、能力舞台、MCP、模型、隐私、安装 |
| `/userscripts` | `/zh/userscripts` | Userscripts 产品主页 | Hero 拼接、安装流、编辑器、GM API、权限、外观 |
| `/docs` | `/zh/docs` | 文档首页 | 搜索、分类、精选文章 |
| `/docs/:slug` | `/zh/docs/:slug` | 文档正文 | 侧栏、TOC、代码高亮、上一篇/下一篇 |
| `/changelog` | `/zh/changelog` | 版本动态 | 双产品发布节奏 |
| `/privacy` | `/zh/privacy` | 隐私说明 | 数据边界与权限说明 |
| `*` | `*` | 404 | 品牌化错误页 |

### 3.2 全局导航

- **Products**：下拉面板，两个产品卡（图标、定位、3 个能力点、进入箭头）。
- **Docs**：直接进入文档首页。
- **Changelog**：版本动态。
- **右侧**：搜索（⌘K）、主题菜单、语言菜单、GitHub、主 CTA「Get Lumo」。
- **移动端**：Sheet 抽屉，产品区 + 页面链接 + 主题/语言 + CTA。

### 3.3 页脚

四列：品牌陈述 + 产品 + 资源 + 法务/社交。底部为版权、构建标记、主题/语言快捷入口。

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
| 渐进式披露 | 首页先给双产品摘要，产品页逐层展开能力；文档侧栏分组折叠；权限表按需展开 |
| 物理级动效 | 滚动 reveal 使用同一曲线；面板视差有层级关系；退场快于入场；`prefers-reduced-motion` 全降级 |

### 4.3 设计令牌（详见 DESIGN.md）

- 颜色：OKLCH；Paper / Graphite / Midnight 三套调色板；azure / violet / emerald / amber / rose 五个主题色轴。
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

1. **Announcement**：产品发布胶囊（真实链接）。
2. **Hero**：品牌主张 + 双 CTA + 关键技术标签 + 中央浏览器/侧边栏/脚本面板组合 mockup + 极光背景 + 滚动视差。
3. **产品双卡**：Lumo / Userscripts，各含 mini mockup、定位句、3 个能力、进入链接。
4. **The Lumo way**：四条设计法则卡片，图标 + 一句解释。
5. **能力舞台**：两组交错 Hero（聊天理解页面 / 脚本管理站点），每组一个渐变舞台 + 产品 mockup + 亮点列表。
6. **技术底座**：WXT、React 19、Tailwind 4、AI SDK、MCP、IndexedDB、i18next、Cloudflare 的网格。
7. **能力带**：MCP、不限步数、BYOK、MV3 等定性能力，不展示具体数量。
8. **文档入口**：代码片段 + 文档分类链接。
9. **最终 CTA**：大渐变面板，双产品入口。

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

### 5.4 文档 `/docs`

- **首页**：搜索框（⌘K）、5 个分类卡、全部文章列表、最近更新。
- **正文页**：左侧分组导航（可折叠）、正文（标题/段落/列表/步骤/提示/表格/代码）、右侧 TOC（scroll spy）、阅读进度、复制代码、上一篇/下一篇、移动端目录 Sheet。
- **搜索**：客户端索引标题、描述、H2/H3；⌘K 打开；支持键盘上下/回车。
- **文章**：`introduction`、`getting-started`、`architecture`、`mcp`、`agent-loop`、`userscripts-runtime`、`agent-connections`、`design-system`、`i18n`、`deployment`、`agent-protocol`、`faq`。

### 5.5 Changelog `/changelog`

双产品时间线，包含版本、日期、3–5 条变更、GitHub 链接；顶部说明「本页只列关键版本，完整记录见 GitHub Releases」。

### 5.6 Privacy `/privacy`

按产品分节：收集什么、不收集什么、权限用途、数据存放位置、第三方 API、删除方式。复用参考项目 PRIVACY.md 的事实，不编造承诺。

---

## 6. 组件清单

### 6.1 基础（shadcn 风格）

Button、Badge、Card、Separator、Tooltip、DropdownMenu、NavigationMenu、Dialog、Sheet、Tabs、Accordion、ScrollArea、ToggleGroup、Input、Kbd、Skeleton、Command。

### 6.2 品牌与布局

BrandMark、ProductMark、SiteHeader、MobileNav、SiteFooter、Container、SectionHeading、Eyebrow、GradientText、AnnouncementPill、ThemeMenu、LanguageMenu、SearchTrigger、CommandPalette、ScrollProgress。

### 6.3 动效

Reveal、Stagger、Parallax、TiltCard、Aurora、GridPattern、NoiseOverlay、Marquee、CountUp、MagneticButton。

### 6.4 Mockup（产品视觉复刻）

BrowserFrame、SidebarChatMock、McpServerCard、ProviderMarquee、PrivacyDiagram、UserscriptsDashboardMock、InstallFlowMock、CodeEditorMock、GmApiGrid、PermissionTable、PaletteShowcase、FeatureStage、MetricBand、DocsPreview。

### 6.5 文档

DocsSidebar、DocsToc、DocBlocks、CodeBlock、Callout、StepList、DataTable、DocsSearch、DocsPager、DocsBreadcrumb、ReadingProgress。

---

## 7. 技术架构

### 7.1 选型

| 层 | 选择 | 理由 |
| --- | --- | --- |
| 构建 | **Vite 8 + React Router 8 framework mode** | 官方 Vite 集成；路由、meta、预渲染一体 |
| 渲染 | `ssr: false` + `prerender` 全量静态化 | 纯静态 HTML，Cloudflare Pages 直接托管；SEO 完整 |
| UI | React 19 + Tailwind CSS 4 + shadcn 风格源码组件 + Radix | 与两个产品同栈；可控、可移植 |
| 动效 | `motion` | 与产品一致；布局动画、滚动驱动、手势 |
| i18n | `i18next` + `react-i18next` | 与产品一致；路径级 locale |
| 图标 | `lucide-react` | 与产品一致；矢量、可 tree-shake |
| 代码高亮 | `shiki`（按需动态加载） | 与产品一致；双主题 token |
| 测试 | `vitest` + `@testing-library/react` + `jsdom` | 与产品一致 |
| 部署 | **Cloudflare Pages** | 静态产物 + `_headers` / `_redirects`；流水线在 Cloudflare 侧（Git 导入） |

### 7.2 为什么不是普通 SPA

普通 Vite SPA 首屏只有空 `<div>`，营销站/文档站的 SEO 与首屏体验都吃亏。React Router 8 的 `ssr:false + prerender` 在构建期把每个路由渲染成静态 HTML，运行时仍是 SPA 导航，不需要任何服务端。这是「Vite + React + Cloudflare Pages」的现代最优解。

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
    docs-layout.tsx
    docs-index.tsx
    docs-article.tsx
    changelog.tsx
    privacy.tsx
    not-found.tsx
  components/
    ui/                    # shadcn primitives
    brand/                 # BrandMark / ProductMark
    site/                  # Header / Footer / CommandPalette / ThemeMenu
    motion/                # Reveal / Parallax / Aurora / ...
    mockups/               # 产品视觉复刻
    docs/                  # DocsSidebar / Toc / Blocks / Search
    home/ lumo/ userscripts/
  content/
    docs/en.ts             # 英文文档内容
    docs/zh.ts             # 中文文档内容
    changelog.ts
  lib/
    i18n/                  # 初始化、locale 解析、资源
    theme/                 # 主题注册表、应用、preload
    seo.ts                 # meta / canonical / hreflang / JSON-LD
    routes.ts              # locale-aware href 工具
    utils.ts
  styles/
    globals.css            # 令牌、palette、动画、基础层
public/
  brand/*.svg
  _headers
  _redirects
  robots.txt
  sitemap.xml (构建生成)
react-router.config.ts
vite.config.ts
wrangler.toml
```

### 7.4 国际化

- 路径级 locale：默认英文无前缀，中文 `/zh`。
- 首次访问：`<head>` 内联脚本读取已存偏好；无偏好时按 `navigator.languages` 选择。中文浏览器从无前缀路径跳到 `/zh`，英文浏览器留在原地。
- 显式 `/zh` URL 永远不被重定向；同源深链不切换语言；爬虫（UA/`navigator.webdriver`）不重定向。
- 渲染出的 locale 会写入偏好，语言菜单在跳转前显式写入；`/` 后续访问因此保持选择。
- `LocaleProvider` 从 `useLocation()` 推导 locale，同步 `i18n.changeLanguage` 与 `<html lang>`。
- 所有 UI 文案在 `app/lib/i18n/resources/en.ts` / `zh.ts`；文档正文在 `app/content/docs/*`。
- 语言切换保持当前路径语义（`/lumo` ↔ `/zh/lumo`，`/docs/mcp` ↔ `/zh/docs/mcp`）。
- `hreflang`、`og:locale`、`canonical` 由 `seo.ts` 统一生成。
- 测试保证两套 key 完全一致。

### 7.5 主题

- 三轴：`mode`（light/dark/system）、`palette`（paper/graphite/midnight）、`accent`（5 色）。
- DOM：`<html class="dark" data-palette="midnight" data-accent="violet">`。
- 首帧：root `<head>` 内联 classic script 同步读 `localStorage` 镜像并写 DOM，避免闪白。
- 主题菜单：模式 + 调色板 + 主题色，使用同一套预览芯片。
- 无 JS 时：`@media (prefers-color-scheme: dark)` 兜底。

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

### 7.8 Cloudflare Pages

- `wrangler.toml`：`pages_build_output_dir = "./build/client"`。
- 每个已知路由都有预渲染 HTML；非根路径由 Pages 规范化为尾斜杠。
- 未知 URL 由构建生成的 `404.html` 返回真实 404 状态；React Router 在客户端渲染对应语言的 404。
- `public/_redirects` 不再做 SPA 重写；`public/_headers` 负责安全头与资产缓存。
- 流水线：在 Cloudflare Pages 侧从 Git 仓库导入，构建命令 `npm run typecheck && npm test && npm run build`，输出目录 `build/client`；仓库内不放置 CI 工作流。
- 本地：`npm run preview` 验证 `build/client`。

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
- 亮/暗/午夜 + 5 主题色切换，首帧无闪白。
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
9. Changelog、Privacy、404、SEO 资源。
10. 测试、构建、Cloudflare 部署文件、截图验收。
