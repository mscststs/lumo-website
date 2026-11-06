/**
 * The poster catalogue is deliberately data-only.
 *
 * The gallery page, the footer entry and tests need to know how many posters
 * exist and what each one is called, but they must not pull ten visual
 * components into a test process just to count them. Components are resolved
 * by `poster-registry.tsx`; this file stays safe for any runtime.
 */

export const POSTER_WIDTH = 1280;
export const POSTER_HEIGHT = 800;

export const POSTER_PRODUCTS = ["lumo", "userscripts"] as const;
export type PosterProduct = (typeof POSTER_PRODUCTS)[number];

export interface PosterEntry {
  id: string;
  labelKey: string;
}

export const POSTER_CATALOG = {
  lumo: [
    { id: "hero", labelKey: "posters.lumo.items.hero.label" },
    { id: "loop", labelKey: "posters.lumo.items.loop.label" },
    { id: "tools", labelKey: "posters.lumo.items.tools.label" },
    { id: "split", labelKey: "posters.lumo.items.split.label" },
    { id: "local", labelKey: "posters.lumo.items.local.label" },
  ],
  userscripts: [
    { id: "hero", labelKey: "posters.userscripts.items.hero.label" },
    { id: "editor", labelKey: "posters.userscripts.items.editor.label" },
    { id: "agent", labelKey: "posters.userscripts.items.agent.label" },
    { id: "control", labelKey: "posters.userscripts.items.control.label" },
    {
      id: "lifecycle",
      labelKey: "posters.userscripts.items.lifecycle.label",
    },
  ],
} as const satisfies Record<PosterProduct, readonly PosterEntry[]>;

export type PosterId = (typeof POSTER_CATALOG)[PosterProduct][number]["id"];

export function posterCount(product: PosterProduct): number {
  return POSTER_CATALOG[product].length;
}
