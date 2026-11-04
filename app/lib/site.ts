/**
 * External destinations and deployment facts. Keeping them here means a URL
 * change is one edit, not a grep across marketing pages.
 */

import { resolveSiteOrigin } from "./site-origin";

/**
 * Absolute origin used at build time and during prerendering. When
 * `VITE_SITE_URL` is not set this is a placeholder that the Worker swaps for the
 * request origin; `siteOrigin()` resolves the real value in the browser.
 */
export const SITE_URL = resolveSiteOrigin(
  import.meta.env.VITE_SITE_URL as string | undefined,
);

/**
 * The origin absolute URLs should point at right now: the live document origin
 * in the browser, the build-time origin during prerendering.
 */
export function siteOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin === "null"
      ? SITE_URL
      : window.location.origin;
  }
  return SITE_URL;
}

/** Social preview image for the current origin. */
export function ogImageUrl(): string {
  return `${siteOrigin()}/brand/og.png`;
}

export const LINKS = {
  lumoStore:
    "https://chromewebstore.google.com/detail/lumo/cgfnadidpooocnkalljpdmelmaponefa",
  lumoRepo: "https://github.com/mscststs/lumo",
  lumoActions: "https://github.com/mscststs/lumo/actions/workflows/build.yml",
  lumoPrivacy: "https://github.com/mscststs/lumo/blob/main/PRIVACY.md",
  userscriptsStore:
    "https://chromewebstore.google.com/detail/cifapeigdoopgjmliljlbboidgncpdeg",
  userscriptsRepo: "https://github.com/mscststs/lumo-userscript-manager",
  userscriptsReleases:
    "https://github.com/mscststs/lumo-userscript-manager/releases",
  userscriptsPrivacy:
    "https://github.com/mscststs/lumo-userscript-manager/blob/main/PRIVACY.md",
} as const;
