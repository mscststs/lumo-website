import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts a metric up when it enters the viewport. The server-rendered HTML
 * already contains the final value, so crawlers and no-JS readers see the real
 * number; the animation is progressive enhancement.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!match) return;
    const prefix = match[1] ?? "";
    const target = Number(match[2]);
    const suffix = match[3] ?? "";
    if (!Number.isFinite(target)) return;

    const controls = animate(0, target, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const rounded = target % 1 === 0 ? Math.round(latest) : latest.toFixed(1);
        setDisplay(`${prefix}${rounded}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
