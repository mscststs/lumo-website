import type { Locale } from "@/lib/site-manifest";

export type ChangelogProduct = "lumo" | "userscripts" | "site";

export interface ChangelogEntry {
  id: string;
  date: string;
  product: ChangelogProduct;
  version: string;
  title: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    id: "site-0-2-0",
    date: "2025-11-06",
    product: "site",
    version: "0.2.0",
    title: {
      en: "Agent docs, browser-language routing and faithful product UI",
      zh: "智能体文档、浏览器语言路由与忠实的产品界面",
    },
    highlights: {
      en: [
        "First visits now follow the browser language; the choice is remembered and crawlers still get the canonical URL.",
        "Lumo and Userscripts pages rebuilt around the agent loop, DevTools via CDP, MCP sources, split view and the userscript agent endpoint.",
        "Three new docs: the agent loop, agent connections, and the extension-provider protocol.",
        "Product mockups now reproduce the real side panel, options window, editor and approval dialog.",
      ],
      zh: [
        "首次访问按浏览器语言跳转，记住用户选择，同时不影响爬虫读取规范 URL。",
        "Lumo 与 Userscripts 页面围绕智能体循环、CDP DevTools、MCP 来源、分屏与用户脚本智能体端点重写。",
        "新增三篇文档：智能体循环、智能体连接与扩展提供方协议。",
        "产品视觉重新复刻真实侧边栏、设置窗口、编辑器与审批对话框。",
      ],
    },
  },
  {
    id: "site-0-1-0",
    date: "2025-11-01",
    product: "site",
    version: "0.1.0",
    title: {
      en: "The Lumo website launches",
      zh: "Lumo 官网上线",
    },
    highlights: {
      en: [
        "New brand home with both products in one place.",
        "Nine bilingual documentation articles, searchable with ⌘K.",
        "Static pre-rendering on Cloudflare Pages with per-route metadata.",
      ],
      zh: [
        "新的品牌首页，把两个产品放在同一个入口。",
        "九篇双语文档，支持 ⌘K 搜索。",
        "基于 Cloudflare Pages 的静态预渲染，每个路由独立元数据。",
      ],
    },
  },
  {
    id: "lumo-1-0-19",
    date: "2025-10-31",
    product: "lumo",
    version: "1.0.19",
    title: {
      en: "MCP protocol negotiation and a cleaner debug view",
      zh: "MCP 协议协商与更清晰的调试视图",
    },
    highlights: {
      en: [
        "MCP now negotiates the protocol era instead of reporting a failed probe.",
        "Token usage breakdowns scroll correctly and use icon metrics.",
        "The AI SDK provider packages are unified on one line.",
      ],
      zh: [
        "MCP 改为协商协议版本，而不是把探测失败当成结论。",
        "Token 用量明细可以正确滚动，并改用图标指标。",
        "AI SDK 的 provider 包统一到同一条版本线。",
      ],
    },
  },
  {
    id: "userscripts-1-0-1",
    date: "2025-10-30",
    product: "userscripts",
    version: "1.0.1",
    title: {
      en: "The manager framework is complete",
      zh: "管理器框架完成",
    },
    highlights: {
      en: [
        "Native chrome.userScripts registration for every script.",
        "CodeMirror 6 editor with metadata validation and overrides.",
        "Paper / Graphite / Midnight palettes and five accents.",
        "JSON and ZIP backup, recycle bin and update checks.",
      ],
      zh: [
        "每个脚本都通过原生 chrome.userScripts 注册。",
        "CodeMirror 6 编辑器，支持元数据校验与覆盖。",
        "纸白 / 石墨 / 午夜三套调色板与五个主题色。",
        "JSON 与 ZIP 备份、回收站与更新检查。",
      ],
    },
  },
  {
    id: "lumo-1-0-18",
    date: "2025-10-24",
    product: "lumo",
    version: "1.0.18",
    title: {
      en: "Options flows move into dialogs",
      zh: "设置流程迁入对话框",
    },
    highlights: {
      en: [
        "MCP add flows open in dialogs instead of navigating away.",
        "Chat enters the streaming phase as soon as a turn is sent.",
        "The context ring no longer draws a glyph at its centre.",
      ],
      zh: [
        "添加 MCP Server 改为对话框，不再离开当前页面。",
        "发送消息后立即进入流式状态。",
        "上下文环中心不再绘制多余符号。",
      ],
    },
  },
];

export function getChangelog(): ChangelogEntry[] {
  return CHANGELOG;
}
