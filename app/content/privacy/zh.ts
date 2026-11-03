import type { PrivacyCollection } from "./types";

/**
 * 中文政策。结构与英文完全一致（有测试保证），内容对应各产品仓库的
 * `PRIVACY.md`；上游更新时两份一起改。
 */
export const zh: PrivacyCollection = {
  lumo: {
    product: "lumo",
    title: "Lumo 隐私政策",
    summary:
      "Lumo 是开源的 Chrome 扩展。本政策说明侧边栏如何处理——以及不处理——你的数据。",
    updated: "2026-08-14",
    blocks: [
      {
        type: "p",
        text: "Lumo 是一个开源的 Chrome 扩展，在浏览器内提供 AI 侧边栏助手。本政策说明 Lumo 如何处理（或不处理）用户数据。",
      },
      { type: "h2", text: "数据收集" },
      {
        type: "p",
        text: "**Lumo 不收集、不存储、不传输、也不共享任何个人数据或用户信息。**",
      },
      { type: "p", text: "具体而言，Lumo 不会：" },
      {
        type: "ul",
        items: [
          "收集浏览历史、书签或下载记录",
          "追踪用户行为或做统计分析",
          "存储可识别个人身份的信息（PII）",
          "向 Lumo 开发者自建或运营的服务器传输任何数据",
          "使用 Cookie 或任何追踪技术",
          "为广告或营销目的访问用户数据",
        ],
      },
      { type: "h2", text: "第三方模型服务商" },
      {
        type: "p",
        text: "Lumo 连接第三方大语言模型 API——OpenAI、Anthropic、Google、本地运行时或其他任意服务商——**完全基于你自己提供的 API Key 与配置**。以下事项由你负责：",
      },
      {
        type: "ul",
        items: [
          "选择连接哪个服务商",
          "提供自己的凭据",
          "理解并接受该服务商的隐私政策与服务条款",
        ],
      },
      {
        type: "p",
        text: "发送给第三方 API 的内容——对话消息、选中的页面内容——受该服务商的政策约束。Lumo 只是本地客户端：它不会拦截、记录或保留你与服务商之间的任何交换。",
      },
      { type: "h2", text: "本地存储" },
      {
        type: "p",
        text: "Lumo 可能通过浏览器的扩展存储 API，把以下数据**保存在你的设备本地**：",
      },
      {
        type: "ul",
        items: [
          "偏好与设置，例如主题与语言",
          "你提供的 API Key 与端点配置",
          "对话历史",
        ],
      },
      {
        type: "p",
        text: "这些数据留在你的设备上，不会传输到 Lumo 开发者运营的服务器；你可以随时在扩展设置中清除，或直接卸载扩展。",
      },
      { type: "h2", text: "权限" },
      {
        type: "p",
        text: "Lumo 申请的浏览器权限——访问当前标签页、侧边栏——仅用于提供核心功能：让助手读取并操作你正在浏览的页面。这些权限永远不会用于收集或传输用户数据。",
      },
      { type: "h2", text: "儿童隐私" },
      {
        type: "p",
        text: "Lumo 不会有意收集 13 岁以下儿童的任何信息。",
      },
      { type: "h2", text: "政策变更" },
      {
        type: "p",
        text: "政策更新会在本文档中体现，并标注新的修订日期。项目完全开源，因此每一次改动都可以在仓库历史中查到。",
      },
      { type: "h2", text: "开源" },
      {
        type: "p",
        text: "Lumo 完全开源，完整源码位于 [github.com/mscststs/lumo](https://github.com/mscststs/lumo)。你可以直接阅读代码，核实本政策中的每一条陈述。",
      },
      { type: "h2", text: "联系我们" },
      {
        type: "p",
        text: "如有疑问或顾虑，请在 [GitHub 仓库](https://github.com/mscststs/lumo/issues)提交 issue。",
      },
      {
        type: "callout",
        tone: "note",
        text: "本政策适用于通过 Chrome 应用商店分发的 Lumo 浏览器扩展，以及从源码编译的版本。",
      },
    ],
  },

  userscripts: {
    product: "userscripts",
    title: "Lumo Userscripts 隐私政策",
    summary:
      "Lumo Userscripts 是开源的用户脚本管理器。本政策说明它如何处理——以及不处理——你的数据。",
    updated: "2026-10-30",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts 是一个用于管理与运行用户脚本的开源 Chrome 扩展。本政策说明它如何处理（或不处理）用户数据。",
      },
      { type: "h2", text: "数据收集" },
      {
        type: "p",
        text: "**Lumo Userscripts 不收集、不存储、不传输、也不共享任何个人数据或用户信息。**",
      },
      { type: "p", text: "具体而言，它不会：" },
      {
        type: "ul",
        items: [
          "收集浏览历史、书签或下载记录",
          "追踪用户行为或做统计分析",
          "存储可识别个人身份的信息（PII）",
          "向项目维护者自建或运营的服务器传输任何数据",
          "使用 Cookie 或任何追踪技术",
          "为广告或营销目的访问用户数据",
        ],
      },
      { type: "h2", text: "用户脚本" },
      {
        type: "p",
        text: "脚本、脚本源码、元数据与执行日志都保存在你的设备本地。脚本只在你配置的匹配规则命中的页面上运行，扩展本身不会把脚本内容上传到任何地方。",
      },
      { type: "h2", text: "本地存储" },
      {
        type: "p",
        text: "Lumo Userscripts 可能通过浏览器的扩展存储 API，把以下数据**保存在你的设备本地**：",
      },
      {
        type: "ul",
        items: [
          "偏好与设置，例如主题、语言与界面缩放",
          "已安装的用户脚本及其元数据",
          "脚本执行配置与本地日志",
        ],
      },
      {
        type: "p",
        text: "这些数据留在你的设备上，不会传输到项目维护者运营的服务器；你可以随时在扩展设置中清除，或直接卸载扩展。",
      },
      { type: "h2", text: "权限" },
      {
        type: "p",
        text: "Lumo Userscripts 申请的浏览器权限——`storage`、`scripting`、`activeTab` 与侧边栏访问——仅用于提供核心功能：在你选择的页面上安装、编辑与运行用户脚本。这些权限永远不会用于收集或传输用户数据。",
      },
      { type: "h2", text: "第三方内容" },
      {
        type: "p",
        text: "用户脚本本身可能会访问第三方服务。这类行为由脚本作者定义，不在扩展的控制范围内，因此安装前请先阅读脚本内容。",
      },
      { type: "h2", text: "儿童隐私" },
      {
        type: "p",
        text: "Lumo Userscripts 不会有意收集 13 岁以下儿童的任何信息。",
      },
      { type: "h2", text: "政策变更" },
      {
        type: "p",
        text: "政策更新会在本文档中体现，并标注新的修订日期。项目完全开源，因此每一次改动都可以在仓库历史中查到。",
      },
      { type: "h2", text: "开源" },
      {
        type: "p",
        text: "完整源码位于 [github.com/mscststs/lumo-userscript-manager](https://github.com/mscststs/lumo-userscript-manager)。你可以直接阅读代码，核实本政策中的每一条陈述。",
      },
      { type: "h2", text: "联系我们" },
      {
        type: "p",
        text: "如有疑问或顾虑，请在 [GitHub 仓库](https://github.com/mscststs/lumo-userscript-manager/issues)提交 issue。",
      },
      {
        type: "callout",
        tone: "note",
        text: "本政策适用于通过 Chrome 应用商店分发的 Lumo Userscripts 浏览器扩展，以及从源码编译的版本。",
      },
    ],
  },
};
