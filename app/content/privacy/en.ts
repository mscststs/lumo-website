import type { PrivacyCollection } from "./types";

/**
 * English policies. Mirrors `PRIVACY.md` in each product repository — when the
 * upstream file changes, this document and `zh.ts` change with it (a test keeps
 * both languages structurally identical).
 */
export const en: PrivacyCollection = {
  lumo: {
    product: "lumo",
    title: "Lumo privacy policy",
    summary:
      "Lumo is an open-source Chrome extension. This policy describes how the sidebar handles — and does not handle — your data.",
    updated: "2026-08-14",
    blocks: [
      {
        type: "p",
        text: "Lumo is an open-source Chrome extension that provides an AI-powered sidebar assistant inside your browser. This policy describes how Lumo handles, or does not handle, user data.",
      },
      { type: "h2", text: "Data collection" },
      {
        type: "p",
        text: "**Lumo does not collect, store, transmit, or share any personal data or user information.**",
      },
      { type: "p", text: "Specifically, Lumo does not:" },
      {
        type: "ul",
        items: [
          "Collect browsing history, bookmarks, or download records",
          "Track user behaviour or analytics",
          "Store personally identifiable information (PII)",
          "Transmit any data to servers owned or operated by the Lumo developers",
          "Use cookies or any tracking technologies",
          "Access user data for advertising or marketing purposes",
        ],
      },
      { type: "h2", text: "Third-party model providers" },
      {
        type: "p",
        text: "Lumo connects to third-party large language model APIs — OpenAI, Anthropic, Google, a local runtime, or any other provider — **solely on the basis of the API key and configuration you supply**. You are fully responsible for:",
      },
      {
        type: "ul",
        items: [
          "Choosing which provider to connect to",
          "Providing your own credentials",
          "Understanding and accepting that provider's privacy policy and terms of service",
        ],
      },
      {
        type: "p",
        text: "Anything sent to a third-party API — conversation messages, selected page content — is governed by that provider's policy. Lumo is only a local client: it does not intercept, log, or retain what you exchange with the provider you chose.",
      },
      { type: "h2", text: "Local storage" },
      {
        type: "p",
        text: "Lumo may store the following **locally on your device** through the browser's extension storage APIs:",
      },
      {
        type: "ul",
        items: [
          "Preferences and settings, such as theme and language",
          "The API keys and endpoint configuration you provide",
          "Conversation history",
        ],
      },
      {
        type: "p",
        text: "This data stays on your device, is never transmitted to a server operated by the Lumo developers, and can be removed at any time from the extension's settings or by uninstalling the extension.",
      },
      { type: "h2", text: "Permissions" },
      {
        type: "p",
        text: "Lumo requests browser permissions — access to the active tab, the side panel — only to provide its core functionality: letting the assistant read and work with the page you are on. These permissions are never used to collect or transmit user data.",
      },
      { type: "h2", text: "Children's privacy" },
      {
        type: "p",
        text: "Lumo does not knowingly collect any information from children under 13 years of age.",
      },
      { type: "h2", text: "Changes to this policy" },
      {
        type: "p",
        text: "Updates appear in this document with a new revision date. The project is open source, so every change is visible in the repository's history.",
      },
      { type: "h2", text: "Open source" },
      {
        type: "p",
        text: "Lumo is fully open source. The complete source is at [github.com/mscststs/lumo](https://github.com/mscststs/lumo); you can read the code and verify everything this policy states.",
      },
      { type: "h2", text: "Contact" },
      {
        type: "p",
        text: "Questions or concerns: open an issue on the [GitHub repository](https://github.com/mscststs/lumo/issues).",
      },
      {
        type: "callout",
        tone: "note",
        text: "This policy applies to the Lumo browser extension distributed through the Chrome Web Store and to builds compiled from source.",
      },
    ],
  },

  userscripts: {
    product: "userscripts",
    title: "Lumo Userscripts privacy policy",
    summary:
      "Lumo Userscripts is an open-source userscript manager. This policy describes how it handles — and does not handle — your data.",
    updated: "2026-10-30",
    blocks: [
      {
        type: "p",
        text: "Lumo Userscripts is an open-source Chrome extension for managing and running userscripts. This policy describes how it handles, or does not handle, user data.",
      },
      { type: "h2", text: "Data collection" },
      {
        type: "p",
        text: "**Lumo Userscripts does not collect, store, transmit, or share any personal data or user information.**",
      },
      { type: "p", text: "Specifically, it does not:" },
      {
        type: "ul",
        items: [
          "Collect browsing history, bookmarks, or download records",
          "Track user behaviour or analytics",
          "Store personally identifiable information (PII)",
          "Transmit any data to servers owned or operated by the project maintainers",
          "Use cookies or any tracking technologies",
          "Access user data for advertising or marketing purposes",
        ],
      },
      { type: "h2", text: "User scripts" },
      {
        type: "p",
        text: "Scripts, their source code, metadata and execution logs are stored locally on your device. A script runs only on pages matched by the rules you configure, and the extension never uploads script content anywhere.",
      },
      { type: "h2", text: "Local storage" },
      {
        type: "p",
        text: "Lumo Userscripts may store the following **locally on your device** through the browser's extension storage APIs:",
      },
      {
        type: "ul",
        items: [
          "Preferences and settings, such as theme, language and interface scale",
          "Installed userscripts and their metadata",
          "Script execution configuration and local logs",
        ],
      },
      {
        type: "p",
        text: "This data stays on your device, is never transmitted to a server operated by the project maintainers, and can be removed at any time from the extension's settings or by uninstalling the extension.",
      },
      { type: "h2", text: "Permissions" },
      {
        type: "p",
        text: "Lumo Userscripts requests browser permissions — `storage`, `scripting`, `activeTab` and side panel access — only to provide its core functionality: installing, editing and running userscripts on pages you choose. These permissions are never used to collect or transmit user data.",
      },
      { type: "h2", text: "Third-party content" },
      {
        type: "p",
        text: "A userscript may itself contact third-party services. That behaviour is defined by the script's author and sits outside the extension's control, so review a script before installing it.",
      },
      { type: "h2", text: "Children's privacy" },
      {
        type: "p",
        text: "Lumo Userscripts does not knowingly collect any information from children under 13 years of age.",
      },
      { type: "h2", text: "Changes to this policy" },
      {
        type: "p",
        text: "Updates appear in this document with a new revision date. The project is open source, so every change is visible in the repository's history.",
      },
      { type: "h2", text: "Open source" },
      {
        type: "p",
        text: "The complete source is at [github.com/mscststs/lumo-userscript-manager](https://github.com/mscststs/lumo-userscript-manager); you can read the code and verify everything this policy states.",
      },
      { type: "h2", text: "Contact" },
      {
        type: "p",
        text: "Questions or concerns: open an issue on the [GitHub repository](https://github.com/mscststs/lumo-userscript-manager/issues).",
      },
      {
        type: "callout",
        tone: "note",
        text: "This policy applies to the Lumo Userscripts browser extension distributed through the Chrome Web Store and to builds compiled from source.",
      },
    ],
  },
};
