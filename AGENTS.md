# Lumo Website — Agent 开发指南

这是 **Lumo 品牌官网**：一个面向最终用户与开发者的产品门面，包含品牌首页、两页产品主页（Lumo / Lumo Userscripts）、技术文档、版本动态与隐私说明。

技术栈与两个产品仓库保持一致：**Vite + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui（Radix）+ Motion + i18next**。构建采用 **React Router 8 framework mode**，`ssr: false` + 全量预渲染，产物是纯静态 HTML，由 **Cloudflare Worker**（仅资产 + 源站改写，无 SSR）托管。

参考项目：

- `../lumo`：AI 浏览器侧边栏产品；其 `AGENTS.md`、`.agents/skills`、`assets/globals.css` 是重要来源。
- `../lumo-userscript-manager`：用户脚本管理器；其 `docs/DESIGN.md` 是设计语言的主要依据。

> 本文件从 `../lumo/AGENTS.md` 移植，并针对官网场景重写。四条产品设计法则、输出语言、分析与实施流程保持不变。

---

## 背景与技术规范

- **Vite 8 + React Router 8**：路由、meta、预渲染由 React Router 统一管理。
- **React 19 + Tailwind CSS 4 + TypeScript**：严格模式，禁止 `any`。
- **shadcn/ui + Radix UI**：所有基础控件使用源码级组件，不引入黑盒 UI 库。
- **Motion**：滚动 reveal、视差、共享布局、指针跟随；尊重 `prefers-reduced-motion`。
- **i18next + react-i18next**：至少简体中文与英文；**路径级 locale**（英文无前缀，中文 `/zh`）。
- **Cloudflare Worker（静态资产 + 源站改写）**：`wrangler.toml` 的 `[assets]` 指向 `build/client`，`src/worker.ts` 只做两件事——通过 `ASSETS` 取资产、把构建占位源 `https://site.invalid` 替换成请求域源，因此**任意域名、零构建变量**都能得到正确的 canonical / OG / sitemap。`_headers` 与构建生成的 `404.html`（`not_found_handling = "404-page"`）照常生效；不使用运行时 SSR。
- **SEO**：每个路由静态输出 title/description/OG/canonical/hreflang；正文必须在 HTML 中。

---

## 解决方案要求

### 基本要求

1. **i18n 国际化**：所有可见文案必须来自 i18n 资源或 locale 内容资源，禁止在组件中硬编码可见文案。语言切换保持当前页面语义。
2. **响应式设计**：所有页面在 360 / 390 / 768 / 1024 / 1440 宽度下不得出现横向溢出；按钮、标签、图标不得互相挤压；长文本必须 `min-w-0` + `truncate` / `line-clamp`。
3. **多主题**：亮色 / 暗色 / 跟随系统；至少两套暗色调色板；主题色轴可切换；首帧无闪白。字体大小通过 `<html>` rem 缩放全局生效。
4. **静态可读**：核心内容必须在预渲染 HTML 中；不得依赖客户端 fetch 才能看到正文。
5. **性能克制**：路由级代码分割；Shiki、命令面板等重依赖动态加载；动效优先 CSS/transform/opacity。

### 产品要求

符合 **Linear-style / Craft-driven Product Philosophy** 的设计哲学。
所有前端展示的功能与组件，必须通过以下四项核心设计法则的审查。

#### 1. 渐进式隐藏（Invisible Assistance）

> 「真正的好功能，不需要任何解释性文本。」

- **消灭提示文本**：严禁出现 "请点击这里"、"请在此输入" 等低效文案。组件的形式、位置和状态必须具备自解释性。
- **拒绝画蛇添足**：删除所有 "点击 X 以达到 Y 目的" 的交互性废话。不把用户当傻瓜，保持页面的高信息密度与纯净度。
- **情境触发显隐**：功能只在适宜的场景出现。例如：移动端不渲染桌面端的 hover 浮层；文档 TOC 在窄屏改为 Sheet，而不是压缩成不可读的一列。

#### 2. 交互归一化（Coherent Familiarity）

> 「交互即肌肉记忆。相似的动作，必须带来绝对一致的物理反馈。」

- **组件形态归一**：按钮、下拉、弹窗、浮层、主题菜单、语言菜单的视觉样式、交互热区与弹出方向必须完全统一。
- **深层体验同构**：相同的 CTA 在 Header、Hero、页尾必须表现一致；相同的 Hero 舞台在不同产品页必须共享圆角、光晕、边框与滚动节奏。

#### 3. 渐进式披露（Progressive Disclosure）

> 「掌控复杂度的秘诀，在于精细化管理用户的认知负载。」

- **状态实时共鸣**：Loading、Empty、Error、Reduced Motion 都必须被设计，不允许出现空白或跳变。
- **视界视觉留白**：首页先给双产品摘要，产品页逐层展开能力，文档侧栏分组折叠。永远把最开阔的视觉空间留给核心操作与核心叙事。

#### 4. 物理级动效（Cinematic Momentum）

> 「动效不是装饰，而是视觉重心的物理位移指南。」

- **视觉惯性守恒**：从左侧消失的元素必须推动其余元素平滑填补；面板分层滚动时，前景必须比背景移动得快；退场快于入场。
- **反视觉疲劳**：仅在 Hero、舞台、页面切换等大元素上使用宏观动画；高频交互只用 100–180ms 的轻量过渡。

---

## 设计语言（摘要）

完整规范见 [`docs/DESIGN.md`](docs/DESIGN.md)。

- **颜色**：OKLCH；Paper / Graphite / Midnight；azure / violet / emerald / amber / rose。
- **字体**：Inter Variable + 系统中文字体栈；JetBrains Mono。
- **形状**：控件 10px、卡片 16px、舞台 24px、浮层 20px。
- **材质**：surface / panel / card / float 四档；暗色用顶部高光。
- **动效**：standard `cubic-bezier(0.2,0,0,1)`、emphasis `cubic-bezier(0.16,1,0.3,1)`、exit `cubic-bezier(0.4,0,1,1)`。
- **对齐**：图标 `shrink-0`、标签 `min-w-0`、行内 `items-center`；不许用 margin 伪造分隔线。

---

## 规范

1. 你的问题、分析与解决方案需要贴合当前项目的架构和实现，优先在脚手架和项目内查找原因、配置和实现方法。

2. 总是依据最前沿的互联网 web 项目的实施方法，当有多种方案备选时，总是优先推荐抽象最合理、后期维护性更好的。

3. 你的分析、解决流程必须精准，你总是能高效发现众多差异或者问题中最关键的问题。

4. 你必须先根据用户的意图进行分析、总结，并查到关键的模块、功能和流程，然后再根据分析结果给出解决方案。**用户明确授权「先写 spec，再全面实施」时，spec 即确认。**

## 输出

你的执行过程、分析与思考，必须使用 **简体中文** 来输出，除非是专用的名词。

## 步骤

1. 尝试解读用户意图和需求，并敏捷发掘相关的模块。如果有多个方向不确定，快速询问用户。

2. 获取需求后，结合代码结构，敏锐发现关键文件、模块、入口，并根据调用链、依赖关系、模块内实现，甚至 npm 包原始实现，进行分析，找出问题的根源和解决方案。

3. 充分分析和研究后，给出一个或多个可行方案，列出优缺点，等待用户确认；用户已明确要求直接实施时，以 `docs/SPEC.md` 作为确认基线。

4. 实施时注意模块变更、上下游参数变化，同步修改调用链上的所有依赖，确保功能完整。

5. 实施完毕后充分测试：`npm run typecheck && npm run test && npm run build`，并做响应式与主题的手工/截图验收。

---

## 目录约定

```
app/
  routes/        路由模块（React Router route modules）
  components/    ui / brand / site / motion / mockups / docs / 页面局部
  content/       双语文档内容、changelog 数据
  lib/           i18n / theme / seo / routing / utils
  styles/        globals.css（令牌、palette、动画、基础层）
public/          品牌 SVG、_headers、_redirects、robots.txt（404.html 由构建生成）
docs/            SPEC.md、DESIGN.md
```

- 颜色只能从语义令牌取；组件内不得出现十六进制 / `rgb()` / `hsl()` 字面量。
- 图标只用 `lucide-react`；品牌标记使用 `public/brand/*.svg`。
- 动效统一使用 `motion` 与 CSS 令牌；禁止引入第二套动画库。
- 文档内容使用结构化 `DocBlock[]`，不写 MDX；这样搜索、TOC、双语校验可以共用一套模型。
- 新增主题 / 主题色必须同步 `lib/theme/registry.ts`、`globals.css` 与测试。
- 新增语言必须同步 `lib/i18n/resources`、`lib/routing.ts`、`react-router.config.ts` 的预渲染路径。
