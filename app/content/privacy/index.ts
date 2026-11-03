import type { Locale, ProductId } from "@/lib/site-manifest";
import { en } from "./en";
import { zh } from "./zh";
import type { PrivacyCollection, PrivacyDoc } from "./types";

export type { PrivacyDoc } from "./types";

export const PRIVACY_COLLECTIONS: Record<Locale, PrivacyCollection> = {
  en,
  zh,
};

/** The policy for one product in one language. Both always exist. */
export function getPrivacyDoc(locale: Locale, product: ProductId): PrivacyDoc {
  return PRIVACY_COLLECTIONS[locale][product];
}
