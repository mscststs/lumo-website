import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Presents a mockup as a fixed-design canvas, scaled to the available width.
 *
 * A mockup is a picture of an interface, not an interface: reflowing it on
 * narrow screens (side panel dropping under the document, columns merging)
 * invents a layout the product never has. So the canvas is always authored at
 * its design width and then scaled down as a whole — the composition stays
 * identical from 360px to 1440px, only its size changes.
 *
 * Only `transform: scale()` animates, so no layout is recalculated; the outer
 * box carries the scaled height so surrounding rhythm stays exact. The static
 * HTML falls back to an `aspect-ratio` placeholder, and the first client pass
 * replaces it with the measured box before paint (`useLayoutEffect`).
 */
export function MockScaler({
  designWidth,
  designHeight,
  maxScale = 1,
  className,
  children,
}: {
  /** Width in px the mockup is authored at. */
  designWidth: number;
  /** Design height in px, used only for the pre-hydration placeholder. */
  designHeight: number;
  /** Never scale past the design size. */
  maxScale?: number;
  className?: string;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState<{ scale: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;

    let lastWidth = -1;
    let lastStageHeight = -1;

    const measure = () => {
      const width = frame.clientWidth;
      const stageHeight = stage.offsetHeight;
      if (!width || !stageHeight) return;
      // The frame height is written by this effect, so bail out unless the
      // container width or the canvas height actually changed.
      if (width === lastWidth && stageHeight === lastStageHeight) return;
      lastWidth = width;
      lastStageHeight = stageHeight;
      const scale = Math.min(maxScale, width / designWidth);
      setBox({ scale, height: stageHeight * scale });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [designWidth, maxScale]);

  const placeholder: CSSProperties = {
    aspectRatio: `${designWidth} / ${designHeight}`,
  };

  return (
    <div
      ref={frameRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={box ? { height: box.height } : placeholder}
    >
      <div
        ref={stageRef}
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: designWidth,
          transform: `scale(${box?.scale ?? 1})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
