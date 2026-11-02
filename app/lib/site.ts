/**
 * External destinations and deployment facts. Keeping them here means a URL
 * change is one edit, not a grep across marketing pages.
 */

const configuredSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = (
  configuredSiteUrl && configuredSiteUrl.length > 0
    ? configuredSiteUrl
    : "https://lumo-website.example.com"
).replace(/\/$/, "");

export const SITE_VERSION = "0.2.0";

export const LINKS = {
  lumoStore:
    "https://chromewebstore.google.com/detail/lumo/cgfnadidpooocnkalljpdmelmaponefa",
  lumoRepo: "https://github.com/mscststs/lumo",
  lumoActions: "https://github.com/mscststs/lumo/actions/workflows/build.yml",
  lumoPrivacy: "https://github.com/mscststs/lumo/blob/main/PRIVACY.md",
  userscriptsRepo: "https://github.com/mscststs/lumo-userscript-manager",
  userscriptsReleases:
    "https://github.com/mscststs/lumo-userscript-manager/releases",
  userscriptsPrivacy:
    "https://github.com/mscststs/lumo-userscript-manager/blob/main/PRIVACY.md",
  siteRepo: "https://github.com/mscststs/lumo-website",
  githubOrg: "https://github.com/mscststs",
} as const;

export const DOCS_EDIT_BASE = `${LINKS.siteRepo}/edit/main`;

export const OG_IMAGE = `${SITE_URL}/brand/og.png`;
