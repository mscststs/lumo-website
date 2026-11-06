/**
 * HTML-in-Canvas (Chrome 157+) support.
 *
 * The API is still absent from TypeScript's DOM lib, so this module owns the
 * small amount of typing the poster surface needs and keeps the feature
 * detection SSR-safe. Everything else in the app can stay on plain DOM.
 */

export type HtmlInCanvasCanvas = HTMLCanvasElement & {
  /** Reflected `content` attribute. Missing support reports `fallback`. */
  content: "drawable" | "fallback";
  /** Schedule one `paint` in the next rendering opportunity. */
  requestPaint: () => void;
};

export type HtmlInCanvasContext = CanvasRenderingContext2D & {
  /**
   * Draw a `drawable` element's latest snapshot. The four-argument overload is
   * enough for posters: fit the whole element into a destination box.
   */
  drawElementImage: (
    element: Element,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) => void;
};

export function supportsHtmlInCanvas(): boolean {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("content", "drawable");
  return (canvas as HtmlInCanvasCanvas).content === "drawable";
}

/** A filesystem-safe slug that still preserves CJK poster names. */
export function fileSafeSlug(value: string): string {
  const slug = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "poster";
}

/** `lumo-agent-loop-02-en.png` — product, poster name, index and locale. */
export function posterFileName(
  productSlug: string,
  label: string,
  index: number,
  locale: string,
): string {
  return `${productSlug}-${fileSafeSlug(label)}-${String(index).padStart(2, "0")}-${locale}.png`;
}

/**
 * Export the canvas exactly as the browser rasterized it. Because the canvas
 * grid is sized to 1280 × 800 × devicePixelRatio, `toBlob` produces a
 * resolution-appropriate PNG without any extra scaling step.
 */
export async function downloadCanvasAsPng(
  canvas: HTMLCanvasElement,
  fileName: string,
): Promise<void> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });
  if (!blob) throw new Error("Canvas export failed");

  const url = URL.createObjectURL(blob);
  try {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = "noopener";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  } finally {
    // Give the browser time to start the download before revoking the URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
