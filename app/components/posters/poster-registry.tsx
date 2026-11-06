import type { ComponentType } from "react";
import type { PosterProduct } from "./poster-catalog";
import { LumoPosterHero } from "./poster-lumo-hero";
import { LumoPosterLoop } from "./poster-lumo-loop";
import { LumoPosterTools } from "./poster-lumo-tools";
import { LumoPosterSplit } from "./poster-lumo-split";
import { LumoPosterLocal } from "./poster-lumo-local";
import { UserscriptsPosterHero } from "./poster-userscripts-hero";
import { UserscriptsPosterEditor } from "./poster-userscripts-editor";
import { UserscriptsPosterAgent } from "./poster-userscripts-agent";
import { UserscriptsPosterControl } from "./poster-userscripts-control";
import { UserscriptsPosterLifecycle } from "./poster-userscripts-lifecycle";

/**
 * One component per poster. The catalogue owns the reading order and the
 * labels; this map only resolves an id to its artwork, so adding a poster is a
 * new file plus one entry — never a change inside a sibling poster.
 */
const REGISTRY: Record<
  PosterProduct,
  Record<string, ComponentType>
> = {
  lumo: {
    hero: LumoPosterHero,
    loop: LumoPosterLoop,
    tools: LumoPosterTools,
    split: LumoPosterSplit,
    local: LumoPosterLocal,
  },
  userscripts: {
    hero: UserscriptsPosterHero,
    editor: UserscriptsPosterEditor,
    agent: UserscriptsPosterAgent,
    control: UserscriptsPosterControl,
    lifecycle: UserscriptsPosterLifecycle,
  },
};

export function posterComponent(
  product: PosterProduct,
  id: string,
): ComponentType | undefined {
  return REGISTRY[product][id];
}
