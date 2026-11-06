import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Images } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { MockScaler } from "@/components/mockups/mock-scaler";
import {
  POSTER_CATALOG,
  POSTER_HEIGHT,
  POSTER_PRODUCTS,
  POSTER_WIDTH,
  posterCount,
  type PosterProduct,
} from "@/components/posters/poster-catalog";
import {
  PosterCanvas,
  PosterDownloadButton,
  useHtmlInCanvasSupport,
} from "@/components/posters/poster-canvas";
import { posterComponent } from "@/components/posters/poster-registry";
import { Eyebrow } from "@/components/site/section-heading";
import { useLocale } from "@/lib/i18n";
import { posterFileName } from "@/lib/html-in-canvas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { translate } from "@/lib/i18n/translate";
import { pageMeta } from "@/lib/seo";
import { getLocale, localePath, SITE_ROUTES } from "@/lib/site-manifest";
import { cn } from "@/lib/utils";

export function meta({ location }: { location: { pathname: string } }) {
  const locale = getLocale(location.pathname);
  return pageMeta({
    locale,
    path: localePath(locale, SITE_ROUTES.posters),
    title: translate(locale, "seo.posters.title"),
    description: translate(locale, "seo.posters.description"),
  });
}

function PosterFigure({
  product,
  id,
  labelKey,
  index,
  total,
  supported,
}: {
  product: PosterProduct;
  id: string;
  labelKey: string;
  index: number;
  total: number;
  supported: boolean;
}) {
  const { t } = useTranslation();
  const locale = useLocale();
  const Poster = posterComponent(product, id);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  const handleCanvasChange = useCallback((next: HTMLCanvasElement | null) => {
    setCanvas(next);
    if (!next) setReady(false);
  }, []);
  const handleReady = useCallback(() => setReady(true), []);

  if (!Poster) return null;

  const label = t(labelKey);
  const productSlug = product === "lumo" ? "lumo" : "lumo-userscripts";
  const fileName = posterFileName(productSlug, label, index, locale);

  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div
        role="img"
        aria-label={`${t(product === "lumo" ? "lumo.productName" : "userscripts.productName")} — ${t(labelKey)}`}
        className="min-w-0"
      >
        <MockScaler
          designWidth={POSTER_WIDTH}
          designHeight={POSTER_HEIGHT}
          className="rounded-stage border border-border shadow-panel"
        >
          <PosterCanvas
            supported={supported}
            onCanvasChange={handleCanvasChange}
            onReady={handleReady}
          >
            <Poster />
          </PosterCanvas>
        </MockScaler>
      </div>

      <figcaption className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted-foreground">
            {t("posters.itemIndex", {
              index: String(index).padStart(2, "0"),
              total: String(total).padStart(2, "0"),
            })}
          </p>
          <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2">
            <h2 className="min-w-0 truncate text-base font-semibold text-foreground">
              {label}
            </h2>
            {supported ? (
              <PosterDownloadButton
                canvas={canvas}
                ready={ready}
                fileName={fileName}
              />
            ) : null}
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-2xs text-muted-foreground">
          {t("posters.ratio")}
        </span>
      </figcaption>
    </figure>
  );
}

export default function PostersPage() {
  const { t } = useTranslation();
  const supported = useHtmlInCanvasSupport();
  const [active, setActive] = useState<PosterProduct>("lumo");

  const onValueChange = (value: string) => {
    setActive(value === "userscripts" ? "userscripts" : "lumo");
  };

  return (
    <section className="relative overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-24">
      <div className="container-page relative">
        <div className="flex max-w-3xl flex-col gap-4">
          <Eyebrow>
            <span className="inline-flex items-center gap-2">
              <Images className="h-3.5 w-3.5" />
              {t("posters.eyebrow")}
            </span>
          </Eyebrow>
          <h1 className="text-balance text-display-md font-semibold text-foreground">
            {t("posters.title")}
          </h1>
          <p className="max-w-[62ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {t("posters.description")}
          </p>
        </div>

        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-2xs text-muted-foreground shadow-surface">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t("posters.note")}
        </p>

        <Tabs
          value={active}
          onValueChange={onValueChange}
          className="mt-10 flex flex-col"
        >
          <TabsList
            aria-label={t("posters.tabsLabel")}
            className="grid w-full max-w-md grid-cols-2 gap-1 rounded-full border-transparent bg-muted/70 p-1.5"
          >
            {POSTER_PRODUCTS.map((product) => {
              const count = posterCount(product);
              const selected = active === product;
              return (
                <TabsTrigger
                  key={product}
                  value={product}
                  className={cn(
                    "h-11 min-w-0 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    "data-[state=active]:text-foreground",
                  )}
                >
                  <BrandMark variant={product} className="h-5 w-5 shrink-0" />
                  <span className="min-w-0 truncate">
                    {t(
                      product === "lumo"
                        ? "nav.productLumoName"
                        : "nav.productUserscriptsName",
                    )}
                  </span>
                  <span
                    className={cn(
                      "ms-auto shrink-0 rounded-full px-1.5 font-mono text-[10px] tabular-nums",
                      selected
                        ? "bg-primary/10 text-primary"
                        : "bg-background/60 text-muted-foreground",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {POSTER_PRODUCTS.map((product) => {
            const entries = POSTER_CATALOG[product];
            return (
              <TabsContent
                key={product}
                value={product}
                forceMount
                className="mt-8 data-[state=inactive]:hidden"
              >
                <div className="flex flex-col gap-12">
                  {entries.map((entry, entryIndex) => (
                    <PosterFigure
                      key={entry.id}
                      product={product}
                      id={entry.id}
                      labelKey={entry.labelKey}
                      index={entryIndex + 1}
                      total={entries.length}
                      supported={supported}
                    />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
