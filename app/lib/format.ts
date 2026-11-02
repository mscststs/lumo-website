import type { Locale } from "./site-manifest";

const LOCALE_TAG: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
};

export function formatDate(isoDate: string, locale: Locale): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale]).format(value);
}

export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/u).filter(Boolean).length;
  const cjk = (text.match(/[\u3400-\u9fff]/gu) ?? []).length;
  const estimated = words / 220 + cjk / 420;
  return Math.max(1, Math.round(estimated));
}
