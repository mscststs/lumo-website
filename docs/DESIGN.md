# Lumo Website — 设计规范

> 适用范围：品牌首页、两页产品主页、技术文档、产品隐私政策与 404。
> 实现载体：`app/styles/globals.css`（令牌与基础层）、`app/lib/theme/registry.ts`（主题注册表）、`app/components/ui/*`（基础组件）、`app/components/site/*`（页面骨架）、`app/components/mockups/*`（产品视觉复刻）。
> 本文是可执行规范：每条规则都对应代码位置，改动前先读对应章节。

---

## 0. 设计立场

官网是**产品橱窗**，不是文档站，也不是工具界面。用户来这里是为了回答三个问题：

1. 这是谁？
2. 它解决什么问题？
3. 我凭什么相信它？

因此：

1. **每一屏只讲一件事。** 一个 Hero 只承载一个主张，一个舞台只展示一种能力。
2. **产品视觉必须可信。** Mockup 的字号、间距、控件形态来自真实产品，而不是随意拼贴。
3. **动效解释空间关系。** 面板分层位移、共享布局滑块、退场快于入场；不做随机漂浮。
4. **文案只陈述结果。** 不写「请点击这里」「在此输入」。按钮、图标、状态必须自解释。

### 0.1 四条设计法则

| 法则 | 官网落地 | 依据 |
| --- | --- | --- |
| 渐进式隐藏 | 产品下拉默认收起；移动端只保留必要动作；搜索是快捷键而不是常驻大输入框 | 认知负荷理论；Hick–Hyman 定律 |
| 交互归一化 | 所有 CTA、下拉、主题/语言菜单、焦点环共用一套形态与物理反馈 | Jakob 定律；一致性降低学习成本 |
| 渐进式披露 | 首页先给双产品摘要，产品页逐层展开能力，文档侧栏分组折叠 | Nielsen 渐进披露；Miller 7±2 |
| 物理级动效 | 滚动 reveal 只做位移；面板视差有层级；退场短于入场 | 迪士尼 slow-in/slow-out；Material motion |

### 0.2 十条可执行原则

1. 一个视图只有一个 primary 动作；Hero 的主 CTA 永远指向产品。
2. 可点击区域 ≥ 44×44（触控）/ 32×32（桌面密集区）/ 24×24（绝对下限）。
3. 焦点环永不消失。删除 `:focus-visible` 视为缺陷。
4. 正文与元数据对比度 ≥ 4.5:1；大字 ≥ 3:1。
5. 标签允许换行/换行到下一行，**控件不允许把标签挤成省略号**。
6. 任何加载态必须有与最终内容同高的骨架，禁止布局跳动。
7. 页头固定在视口顶部，滚动只发生在页头下方；标题不随内容滚走。
8. 颜色只从语义令牌取；组件内不出现十六进制 / `rgb()` / `hsl()` 字面量（`meta theme-color` 除外）。
9. 动画时长 120–700ms；`prefers-reduced-motion` 下全部降级。
10. 所有可见文案来自 i18n 资源或 locale 内容资源。

---

## 1. 排版

### 1.1 字体

| 用途 | 字体 | 理由 |
| --- | --- | --- |
| 拉丁正文 / 标题 | Inter Variable | 中性、可变字重、屏幕阅读稳定 |
| 中文回退 | PingFang SC → Hiragino Sans GB → Microsoft YaHei UI → Noto Sans CJK SC | 与两个扩展一致 |
| 代码 / 技术标识 | JetBrains Mono Variable | 等宽、可读的 `@match`、URL、API 名 |

字重仅用 400 / 500 / 600 / 650 / 700；`font-synthesis-weight: none` 防止伪粗体。

### 1.2 阶梯

展示级字号使用 `clamp()`，随视口缩放；正文保持 16–18px。

| Token | 值 | 用途 |
| --- | --- | --- |
| `text-2xs` | 11px | 元数据、徽标、键帽 |
| `text-eyebrow` | 12px / 0.14em | 眉标 |
| `text-sm` | 14px | 辅助说明、控件 |
| `text-base` | 16px | 正文默认 |
| `text-lg` | 18px | 强调正文 |
| `text-display-sm` | `clamp(28px, 2.8vw, 40px)` | 区块标题 |
| `text-display-md` | `clamp(36px, 3.8vw, 52px)` | 页面标题 |
| `text-display-lg` | `clamp(44px, 4.4vw, 60px)` | 产品页 Hero |
| `text-display-xl` | `clamp(52px, 6.4vw, 88px)` | 首页 Hero |

规则：

- 行宽：说明文字上限 `62ch`，正文 `68ch`。
- `text-balance` 只用于 ≤2 行标题；`text-pretty` 用于段落。
- 数字一律 `tabular-nums`（版本、日期、统计）。
- 中文不做负字距；`tracking-[-0.0x]` 只用于拉丁大标题。
- 技术标识、URL、`@match`、API 名保持等宽，不翻译。

---

## 2. 色彩系统

### 2.1 为什么是 OKLCH

- OKLCH 的 `L` 是感知亮度，同一 L 在不同色相上亮度一致，适合建立统一的明暗阶梯。
- 暗色主题可以按亮度分层（background → card → popover → hover），而不是叠半透明黑。
- 主题色由 `H`（色相）、`C`、`L` 三个变量描述，明暗外壳各自覆盖明度与彩度。

### 2.2 三层令牌

```
primitive（不直接使用）
  └ semantic（--color-background / --color-primary / …）
      └ component（组件只消费 semantic，禁止自造颜色）
```

语义令牌清单见 `app/styles/globals.css` 的 `@theme` 块。

### 2.3 明暗两套外壳

| Scheme | 名称 | 背景 |
| --- | --- | --- |
| light | Paper 纸白 | `oklch(0.985 0.002 95)` |
| dark | Midnight 午夜 | `oklch(0.196 0.026 262)` |

用户只能选择模式（light / dark / system），暗色固定为 Midnight：冷蓝暗色在卡片、浮层与边框上分层更清晰。

暗色分层顺序必须单调递增：`background < sidebar < card < popover < muted/accent`。边框亮度高于所有表面，否则卡片边界消失。

### 2.4 主题色

主题色固定为蔚蓝，切换色相的能力不再暴露给用户：

```css
:root {
  --accent-h: 258;
  --accent-c: 0.17;
  --accent-l: 0.552;
}

--color-primary: oklch(var(--accent-l) var(--accent-c) var(--accent-h));
```

暗色主题 primary 固定 `L=0.78`、彩度 ×0.78，标签用 `L=0.185`。`tests/theme.test.ts` 重算这组值的对比度。

### 2.5 品牌渐变

舞台渐变只使用品牌原语，不直接写在组件里：

- Lumo：cyan → blue → violet。
- Userscripts：emerald → cyan → blue。
- Neutral：primary → cyan → violet。

`stage` 的几何（圆角、边框、三层径向光晕、网格遮罩）完全一致，只有 `--stage-glow-*` 变量不同。

### 2.6 Tint 规则

`bg-<color>/10` + `border-<color>/25` + `text-<color>`。禁止 `bg-primary/50` 这类会破坏对比的中间值。

---

## 3. 主题工程

### 3.1 单一模式偏好

| 字段 | 取值 | 回答 |
| --- | --- | --- |
| `mode` | `light` / `dark` / `system` | 亮暗偏好 |

DOM 只描述「现在画的是哪套」：

```
<html class="dark">
```

- `.dark`：驱动 Tailwind `dark:` 变体与 Shiki 暗色分支，同时切换到 Midnight 令牌。
- 旧版本落盘的 `palette` / `accent` 字段在归一化时丢弃，只保留合法的 `mode`。

### 3.2 首帧防闪烁

1. `app/root.tsx` 的 `<head>` 内联 `THEME_PRELOAD_SCRIPT`，同步读 `localStorage` 镜像。
2. 脚本在样式表绘制前写入 `class` / `data-*` / `background-color`。
3. `ThemeProvider` 在水合后才接管，避免用服务端默认值覆盖已存偏好。
4. 无 JS 时保持预渲染的浅色外壳，不猜测系统偏好，避免半套令牌造成的低对比。

### 3.3 新增模式

1. 扩展 `THEME_MODES`，并补齐 `en.ts` / `zh.ts` 的 `theme.*` 文案。
2. 在 `isDarkResolved` / `applyThemeToDocument` 中定义它解析到哪套外壳。
3. 主题菜单自动多出一项，无需改组件。
4. 跑 `tests/theme.test.ts`。

---

## 4. 形状与材质

### 4.1 圆角

| Token | 值 | 用途 |
| --- | --- | --- |
| `rounded-md` | 6px | 徽标、键帽、行内 chip |
| `rounded-control` | 10px | 按钮、输入框、菜单项 |
| `rounded-panel` | 20px | 浮层、浏览器 mockup、侧边面板 |
| `rounded-card` | 16px | 卡片、对话框、文档块 |
| `rounded-stage` | 24px | Hero 舞台 |
| `rounded-full` | ∞ | 胶囊、状态点、swatch |

圆角表达归属：控件之间可以共用 10px；卡片必须比内部控件更圆，否则会读成同一层。

### 4.2 边框

- 统一 1px，颜色取 `--color-border`；输入框用 `--color-input` 以表达可编辑。
- 分隔线只用 `Separator` / `divide-*`，不用 margin 假装分隔。
- 舞台边框取 `--color-stage-border`，比卡片边框更亮，保证渐变上仍有边界。

### 4.3 材质

| Token | 用途 | 亮色 | 暗色 |
| --- | --- | --- | --- |
| `shadow-surface` | 静置卡片 | 极轻接触阴影 | 1px 顶部高光 |
| `shadow-card` | 内容卡片 | 接触阴影 + 柔和环境阴影 | 顶部高光 + 紧落影 |
| `shadow-panel` | 浏览器 mockup、侧栏 | 面板级环境阴影 | 顶部高光 + 深落影 |
| `shadow-float` | 浮层、对话框、浮动卡 | 远距离柔和阴影 | 顶部高光 + 深落影 |
| `shadow-button` | 实心按钮 | 顶部受光边 + 接触阴影 | 更亮受光边 + 深落影 |

### 4.4 z-index

| z | 层 |
| --- | --- |
| 30 | Product anchor nav / sticky |
| 40 | Site header |
| 50 | Dialog / Sheet / Command palette |
| 60 | Scroll progress |
| 70 | Skip link |

---

## 5. 动效

### 5.1 曲线与时长

| Token | 值 | 场景 |
| --- | --- | --- |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | hover、颜色、宽度 |
| `--ease-emphasis` | `cubic-bezier(0.16, 1, 0.3, 1)` | 入场、Hero reveal、Sheet |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | 退场，比入场短 25–40% |

时长：hover 100–150ms；展开 180–220ms；Hero reveal 600–700ms；对话框 160–180ms；退场 90–160ms。

### 5.2 场景表

| 场景 | 实现 | 说明 |
| --- | --- | --- |
| Hero reveal | `Reveal` 只做 `translateY` | 不做透明度隐藏；确保 no-JS/爬虫可见 |
| 滚动视差 | `Parallax` + `useScroll` | 仅桌面，移动端降级 |
| 指针倾斜 | `TiltCard` ±3.5° | `pointer: coarse` 不启用 |
| 极光 | CSS `lumo-aurora` | 18s 循环，纯 transform/opacity |
| 跑马灯 | CSS `lumo-marquee` | hover 暂停，两端 mask 渐隐 |
| 导航指示器 | `motion` `layoutId` | 下划线在 tab 间滑动 |
| Dialog / Sheet | CSS keyframes + `data-state` | Radix 负责延迟卸载 |
| 统计数字 | `CountUp` + `animate` | SSR 输出最终值，客户端再动画 |
| 文档代码 | Shiki 动态加载 | 未加载前显示同样行高的纯文本 |
| reduced motion | `MotionConfig reducedMotion="user"` + CSS | 大位移全部降级 |

### 5.3 反模式

- 不使用 `opacity: 0` 作为滚动 reveal 的初始态：观察器漏触发时内容会消失。
- 不在高频交互上使用 spring；弹簧只用于共享布局。
- 不做页面级 cross-fade；路由切换应即时硬切。

---

## 6. 组件规范

### 6.1 Button

| variant | 用途 | 背景 | 文字 |
| --- | --- | --- | --- |
| `default` | 每视图唯一主操作 | `primary` | `primary-foreground` |
| `outline` | 与内容并列的次级操作 | `card/70` + border | `foreground` |
| `ghost` | 行内 / 工具栏 / 图标 | 透明，hover `accent` | `muted-foreground → foreground` |
| `secondary` | 已激活的切换态 | `secondary` | `secondary-foreground` |
| `destructive` | 破坏性操作 | `destructive` | `destructive-foreground` |
| `link` | 正文内跳转 | 透明 | `primary` |

尺寸：`sm` 36 / `default` 40 / `lg` 48 / `icon` 40 / `iconSm` 36。
材质：实心按钮带 `shadow-button`；outline 带 `shadow-surface`；ghost 无阴影。
状态：`hover` 颜色过渡 150ms；`active` `scale(0.985)`；`disabled` opacity 45%；`focus-visible` 全局 2px ring。

### 6.2 Badge

- `default`：中性元数据。
- `accent`：能力/版本高亮。
- `outline`：低强调标签。
- `success` / `warning` / `destructive`：状态。

### 6.3 Card

`rounded-card border bg-card shadow-surface`。hover 只改边框到 `primary/25`，不放大、不漂浮。

### 6.4 Site Header

- 固定顶部，64px；顶部透明，滚动 >8px 后 `glass-strong` + 底边框。
- 左：品牌标记 + 字标 + Products 下拉 + Docs。
- 右：搜索（⌘K）、主题、语言、GitHub、主 CTA。
- 移动端：搜索图标 + 菜单 Sheet；Sheet 内含产品卡、页面链接、主题/语言、CTA。
- 产品下拉：两列产品卡，每卡包含品牌标记、名称、定位、描述、进入箭头。

### 6.5 Hero Stage

- `stage` 基底：`rounded-stage`、1px 边框、三层径向光晕、网格遮罩。
- 产品页 Hero：文字 5 / 视觉 7；FeatureStage：文字 4.5 / 视觉 5.5，交替方向。
- 视觉必须放在 `TiltCard` 或 `Parallax` 中，但移动端不倾斜。
- 浮动卡只在 `xl` 显示，避免与主视觉重叠。只出现在首页 Hero；产品页 Hero 不再叠加浮动徽标，卡片边缘必须完整。
- 两个产品页 Hero 统一由 `components/site/product-hero.tsx` 渲染：品牌标记 + 眉标 → 标题 → 一句说明 → 两个 CTA → 舞台。左右两页的文字宽度、间距、CTA 形态必须一致，不得就地拼装。
- Hero 标题断行由文案中的 `\n` 决定（中文按语义断，交给浏览器会在词中间断开）；`text-display-lg` 不带字距，负字距只加在拉丁标题上。
- 双 CTA 在 `sm` 以上并排、允许 `flex-wrap`，`sm` 以下全宽堆叠；主按钮文案控制在一行可容纳的长度（如 `Add to Chrome` / `添加到 Chrome`）。

### 6.6 Mockup

所有 mockup 使用真实产品的字号与控件比例：

- SidebarChatMock：复刻真实侧边栏——32px 头部（无图标模型选择 + 三个 28px 图标按钮）、全宽助手列、`rounded-2xl` 用户气泡，气泡上方是右对齐的附件卡（`页面` / `粘贴`：图标 + 标签 + 截断预览 + 折叠箭头）；工具调用是单行可折叠行（chevron + wrench + 名称 + `key: value` 输入摘要 + 状态，展开后为 `输入` / `输出` 代码块，成功调用默认收起）；底部是 `rounded-xl` 双边框输入框与 18px SVG 上下文环。助手消息按真实顺序排列：工具调用在前，总结文本在后。
- UserscriptsDashboardMock：复刻 options 窗口——56px 导航 rail + 抬升内容面板、单行页头、工具栏、固定列脚本行、开关与动作。mock 根节点是容器查询容器：自身宽度 < 30rem 时 rail 收为图标，< 35rem 时隐藏时间列，因此同一组件在首页双列舞台与产品页 hero 中都不会挤压文字。
- MockScaler：把 `BrowserFrame` 这类「界面截图」当作固定设计画布（首页 Hero 为 1024 × 500）。画布只按容器宽度等比 `scale`，**从不重排**——侧栏永远在文档右侧，不会在窄屏掉到下方；缩放高度回写给外层盒，章节节奏保持精确。静态 HTML 用 `aspect-ratio` 占位，首帧 `useLayoutEffect` 测出真实盒后替换，避免塌陷与跳动。
- 因此画布内部禁止使用 `sm:` / `lg:` 断点类（断点跟随视口而不是画布，会破坏「只缩放」）；设计尺寸写死即可。
- AgentAccessMock：复刻审批对话框与遮罩；AgentSettingsMock：复刻设置 → 智能体（端点/写入/复核/允许列表/活动）。
- CodeEditorMock：全宽 CodeMirror 6、下划线标签条、保存快捷键、状态栏；不设元数据侧栏。
- LumoProviderMock / LumoMcpSettingsMock：复刻真实设置页的分组导航、卡片密度与状态徽标。
- SplitViewShowcase：复刻分屏视图——每个面板是完整的 `ChatPanel`（48px 头部、附件卡 + 右对齐气泡、可折叠工具行、`rounded-xl` 双边框输入框与 18px 上下文环），面板角色按产品规则分配：最左面板块拥有分屏按钮、最右面板拥有设置、其余面板拥有关闭。舞台为 1120 × 544 固定画布（`MockScaler`），三个 360px 面板的真实比例在任何视口下都不重排；1 / 2 / 3 由 `ToggleGroup` 切换，面板宽度过渡 300ms。分隔条是 8px 的列，指针抓住后实时改写宽度比例（按画布缩放换算位移），并在 360px 处夹紧——与「多宽才放得下」是同一条规则，因此「可拖动」是操作而非文案。
- AgentLoopDiagram / AgentBridgeDiagram：不是产品截图，而是用同一套令牌解释循环与协议的工程示意。

Mockup 是装饰性内容：根节点 `aria-hidden="true"`，周围有真实标题与说明。

### 6.7 Docs

- 侧栏：顶部产品分段控件（Lumo / Userscripts），下方只显示当前产品的分组导航；选中项 `bg-accent` + 左侧小圆点；移动端进 Sheet。
- 产品切换进入该产品概览，不保留另一产品的文章列表；`/docs` 只做产品选择与必读入口。
- `mock` block 在正文中渲染界面复刻：固定设计画布、编号步骤标记落在真实控件位置，图注说明“看哪一步”。
- 正文：`prose-lumo`，H2 24px / H3 18px；链接 primary；行内 code 用 `muted` + border。
- TOC：右侧 sticky，scroll spy；移动端折叠为 `<details>`。
- 代码块：Shiki 双主题，复制按钮，行号由 CSS 计数器绘制。
- 分页：上一篇/下一篇卡片，右对齐的 next。
- 所有文档内容为结构化 `DocBlock[]`，双语同构。

### 6.8 搜索

- ⌘K / Ctrl+K 打开；`/` 也可打开（非输入态）。
- 自定义过滤：页面按 label/path 包含匹配；文档走 `searchDocs` 评分；动作按关键词匹配。
- 键盘：↑↓ 移动、↵ 打开、Esc 关闭。
- 结果按「快捷入口 / 文档 / 操作」分组；无结果时显示空态。

---

## 7. 响应式

| 断点 | 行为 |
| --- | --- |
| `< 640` | 单列；Hero 标题 52px；产品卡纵向；技术网格 2 列；文档侧栏进 Sheet |
| `640–1023` | 双列卡片；Hero 视觉缩放；锚点导航横向滚动 |
| `1024–1279` | 产品舞台 5/7；文档两栏（侧栏 + 正文） |
| `≥ 1280` | 营销容器 1200px；文档壳 1320px 三栏；浮动 mockup 出现 |
| `≥ 1440` | Hero 最大标题 88px；视差完整 |

- 使用 `dvh` 而非 `vh`。
- 所有容器左右内边距：移动 20px / 平板 32px / 桌面 40px。
- 长文本 `min-w-0` + `truncate` / `line-clamp`；按钮文字 `whitespace-nowrap`，由 `flex-wrap` 承担换行。
- 移动端不渲染 `xl` 浮动卡，不启用 tilt/parallax。

---

## 8. 可访问性

| 要求 | 实现 |
| --- | --- |
| 焦点可见 | 全局 `:focus-visible` 2px ring + 2px offset |
| 目标尺寸 | 触控 44px；桌面 32px；绝对下限 24px |
| 对比度 | `tests/theme.test.ts` 从 OKLCH 计算；正文 ≥ 4.5:1 |
| 键盘 | Dialog 焦点陷阱（Radix）；⌘K；↑↓/↵；Esc；锚点导航可用 Tab |
| 语义 | `header` / `nav` / `main` / `footer`；`aria-current`；`aria-pressed`；`aria-label` |
| 装饰图形 | Mockup 根节点 `aria-hidden`；品牌图 `alt=""` |
| 动效 | `prefers-reduced-motion` 降级；`MotionConfig reducedMotion="user"` |
| 强制颜色 | `forced-colors: active` 下使用系统 `Highlight` |
| 高对比 | `prefers-contrast: more` 加强边框与次要文字 |

---

## 9. 国际化与文案

- 路径级 locale：英文无前缀，中文 `/zh`；`hreflang` 与 `x-default` 完整。
- UI 文案在 `app/lib/i18n/resources/{en,zh}.ts`；长文档在 `app/content/docs/{en,zh}/{lumo,userscripts}.ts`。
- 测试保证两套 key 树完全一致、插值占位符一致。
- 文案只描述**状态与结果**：`Local-first`、`3 active`、`Metadata valid`。
- 不写操作指令（「请点击这里」「在此输入」）。
- 枚举值本地化，技术标识保持原文。
- 语言切换保持当前文档：`/lumo` ↔ `/zh/lumo`，`/docs/lumo/mcp` ↔ `/zh/docs/lumo/mcp`。

---

## 10. 页面蓝图

### 10.1 首页 `/`

```
Header
Hero: H1 → CTAs → browser + chat + floating cards
Products: two product stages — 文案只留名称、定位、入口；mock 按 01 → 02 依次升起，整块舞台即入口链接
Stage Lumo: chat with page
Stage Userscripts: manager dashboard
Technical foundation: 8-cell stack grid + metrics
Documentation: terminal + doc links
CTA: gradient panel
Footer
```

### 10.2 Lumo `/lumo`

```
Hero (agent-loop side panel) → sticky anchor nav
Agent loop stage (loop diagram) → Tool surface (built-in + MCP sources + DevTools spotlight)
Split view stage (interactive 1/2/3-pane showcase) → Models stage (real Models mock + 3 API types)
Privacy stage → Everything else grid → Install (3 cards) → Cross-sell Userscripts → Footer
```

### 10.3 Userscripts `/userscripts`

```
Hero (Scripts dashboard mock) → sticky anchor nav
Agent stage (approval dialog) → Contract (bridge diagram + 3 policy cards + tool table)
Install stage → Editor stage → Runtime (facts + GM API + code) → Control (permissions + features)
Install requirements → Cross-sell Lumo → Footer
```

### 10.4 Docs `/docs` / `/docs/:product` / `/docs/:product/:slug`

```
Docs index: hero + search + two product cards (required reading)
Product docs: product switcher + grouped sidebar | Content | TOC
Article: breadcrumb → title → meta → mobile TOC → blocks (incl. mock) → pager
```

- 文档是用户文档：每个产品有自己的分组、文章顺序与 TOC；切换产品进入该产品概览。
- 阅读顺序固定为「开始使用（安装 + 必做配置）→ 常见问题 → 功能指南」。
- 配置类文章通过 `mock` block 引用界面复刻，编号提示落在真实控件位置。

### 10.5 产品隐私政策 / 404

- 隐私政策：与文档正文同构——面包屑、产品标识、标题与摘要、更新日期与原文链接、右栏 TOC、文档排版、页尾返回/互链卡片。
- Privacy：stage hero + six local-first cards + product PRIVACY.md links。
- 404：品牌标记 + 404 + 标题 + 说明 + 首页/搜索入口。

---

## 11. 审查清单（提交前）

- [ ] 新增颜色来自语义令牌，并补了 `-foreground`
- [ ] 新增/修改主题跑过 `tests/theme.test.ts`
- [ ] 两套语言 key 一致，无硬编码可见文案
- [ ] 所有按钮/输入有可访问名称，键盘可达
- [ ] 加载态与最终内容同高
- [ ] 360px / 390px / 768px / 1024px / 1440px 无横向溢出
- [ ] 页头固定，锚点 `scroll-mt` 正确
- [ ] 装饰性 mockup 有 `aria-hidden`
- [ ] 破坏性操作有确认（当前站点无破坏性操作）
- [ ] `prefers-reduced-motion` 下仍可用
- [ ] `npm run typecheck && npm run test && npm run build` 全绿

---

## 12. 实现对照

| 规范 | 文件 |
| --- | --- |
| 令牌、主题块、动效 keyframes、prose、Shiki | `app/styles/globals.css` |
| 主题注册表、preload 脚本 | `app/lib/theme/registry.ts` |
| 主题 Provider | `app/lib/theme/index.tsx` |
| i18n 资源 / Provider / 翻译 | `app/lib/i18n/*` |
| 文档模型与集合 | `app/content/docs/*` |
| SEO / canonical / hreflang | `app/lib/seo.ts` |
| 路由与 locale 工具 | `app/routes.ts`、`app/lib/site-manifest.ts` |
| 基础组件 | `app/components/ui/*` |
| 站点骨架 | `app/components/site/*` |
| 动效 | `app/components/motion/*` |
| 产品视觉复刻 | `app/components/mockups/*` |
| 文档组件 | `app/components/docs/*` |
| 页面 | `app/routes/*` |
| 主题/文档/i18n/路由测试 | `tests/*` |
| Cloudflare 配置 | `wrangler.toml`、`public/_headers`、`public/_redirects`、`scripts/build-sitemap.mjs`（404/sitemap） |
| 预渲染、404 与 sitemap | `react-router.config.ts`、`scripts/build-sitemap.mjs` |
