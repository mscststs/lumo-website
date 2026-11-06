import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CanvasHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import {
  POSTER_HEIGHT,
  POSTER_WIDTH,
} from "@/components/posters/poster-catalog";
import {
  downloadCanvasAsPng,
  supportsHtmlInCanvas,
  type HtmlInCanvasCanvas,
  type HtmlInCanvasContext,
} from "@/lib/html-in-canvas";

const CANVAS_PROPS = { content: "drawable" } as CanvasHTMLAttributes<HTMLCanvasElement> & {
  content: string;
};
const DRAWABLE_PROPS = { drawable: "" } as HTMLAttributes<HTMLDivElement> & {
  drawable: string;
};

/**
 * Feature detection is client-only: the pre-rendered document must never claim
 * a capability the server cannot verify. The first client render therefore
 * matches the static DOM, then the surface upgrades to a canvas.
 */
export function useHtmlInCanvasSupport(): boolean {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    setSupported(supportsHtmlInCanvas());
  }, []);
  return supported;
}

/**
 * The poster surface: a normal DOM frame by default, an HTML-in-Canvas surface
 * when the browser supports it.
 *
 * The canvas grid is `1280 × 800 × devicePixelRatio`, while its CSS box stays
 * 1280 × 800. The existing poster scaler can then transform the canvas like any
 * other fixed poster; the bitmap is already at device resolution.
 */
export function PosterCanvas({
  supported,
  children,
  onCanvasChange,
  onReady,
}: {
  supported: boolean;
  children: ReactNode;
  onCanvasChange: (canvas: HTMLCanvasElement | null) => void;
  onReady: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!supported) return;

    const canvas = canvasRef.current as HtmlInCanvasCanvas | null;
    const drawable = drawableRef.current;
    if (!canvas || !drawable) return;

    const ctx = canvas.getContext("2d") as HtmlInCanvasContext | null;
    onCanvasChange(canvas);

    let disposed = false;
    let readyNotified = false;
    let fontsLoaded =
      typeof document === "undefined" ||
      !document.fonts ||
      document.fonts.status === "loaded";

    const maybeReady = () => {
      if (disposed || readyNotified || !fontsLoaded) return;
      readyNotified = true;
      onReady();
    };

    if (!fontsLoaded && document.fonts) {
      void document.fonts.ready.then(() => {
        fontsLoaded = true;
        if (!disposed) canvas.requestPaint();
      });
    }

    const resize = () => {
      if (disposed) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = Math.max(1, Math.round(POSTER_WIDTH * dpr));
      const height = Math.max(1, Math.round(POSTER_HEIGHT * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      canvas.requestPaint();
    };

    const paint = () => {
      if (disposed || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawElementImage(drawable, 0, 0, canvas.width, canvas.height);
      maybeReady();
    };

    canvas.addEventListener("paint", paint);
    window.addEventListener("resize", resize);

    const intersection =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              canvas.requestPaint();
            }
          });
    intersection?.observe(canvas);

    resize();

    return () => {
      disposed = true;
      intersection?.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("paint", paint);
      onCanvasChange(null);
    };
  }, [supported, onCanvasChange, onReady]);

  if (!supported) {
    return (
      <div style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT }}>{children}</div>
    );
  }

  return (
    <canvas
      {...CANVAS_PROPS}
      ref={canvasRef}
      className="dark block bg-background"
      style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT }}
    >
      <div
        {...DRAWABLE_PROPS}
        ref={drawableRef}
        className="poster-canvas-static"
        style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT }}
      >
        {children}
      </div>
    </canvas>
  );
}

export function PosterDownloadButton({
  canvas,
  ready,
  fileName,
}: {
  canvas: HTMLCanvasElement | null;
  ready: boolean;
  fileName: string;
}) {
  const { t } = useTranslation();
  const [state, setState] = useState<"idle" | "working" | "error">("idle");

  useEffect(() => {
    setState("idle");
  }, [canvas, fileName]);

  const handleClick = useCallback(async () => {
    if (!canvas || !ready || state === "working") return;
    setState("working");
    try {
      await downloadCanvasAsPng(canvas, fileName);
      setState("idle");
    } catch {
      setState("error");
    }
  }, [canvas, fileName, ready, state]);

  const label = !ready
    ? t("posters.preparing")
    : state === "working"
      ? t("posters.downloading")
      : state === "error"
        ? t("posters.downloadFailed")
        : t("posters.download");

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!ready || state === "working"}
      title={label}
      className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-2xs font-medium text-muted-foreground shadow-surface transition-colors hover:border-primary/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Download className="h-3.5 w-3.5 shrink-0" />
      <span aria-live="polite">{label}</span>
    </button>
  );
}
