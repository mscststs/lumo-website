/**
 * The header and mobile menu advertise one product at a time: the page you are
 * on owns the GitHub link and the install button. On site-level pages (home,
 * docs, legal) there is no single owner, so both actions stay out of the way.
 */

import { LINKS } from "./site";
import { PRODUCTS, SITE_ROUTES, stripLocale, type ProductId } from "./site-manifest";

export type ProductCta = {
  product: ProductId;
  /** GitHub repository owned by the product. */
  repo: string;
  /** In-page install section; locale prefixes are added by `LocaleLink`. */
  installHref: string;
  installLabelKey: "nav.installLumo" | "nav.installUserscripts";
  repoAriaKey: "a11y.lumoGithub" | "a11y.userscriptsGithub";
};

const PRODUCT_CTA: Record<ProductId, ProductCta> = {
  lumo: {
    product: "lumo",
    repo: LINKS.lumoRepo,
    installHref: `${SITE_ROUTES.lumo}#install`,
    installLabelKey: "nav.installLumo",
    repoAriaKey: "a11y.lumoGithub",
  },
  userscripts: {
    product: "userscripts",
    repo: LINKS.userscriptsRepo,
    installHref: `${SITE_ROUTES.userscripts}#install`,
    installLabelKey: "nav.installUserscripts",
    repoAriaKey: "a11y.userscriptsGithub",
  },
};

/**
 * Resolve the product a path belongs to. Only the product landing page owns the
 * CTA: sub-pages such as privacy policies are site documents, not shops.
 */
export function productCtaForPath(pathname: string): ProductCta | null {
  const path = stripLocale(pathname);
  const entry = PRODUCTS.find((product) => product.path === path);
  return entry ? PRODUCT_CTA[entry.id] : null;
}
