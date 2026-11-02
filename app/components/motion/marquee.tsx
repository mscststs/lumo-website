import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Edge-faded infinite strip. The content is rendered twice; the duplicate is
 * hidden from assistive technology and the animation translates exactly -50%.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  duration = 38,
}: {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        "group mask-fade-x relative overflow-hidden",
        className,
      )}
    >
      <div
        className="animate-marquee flex w-max items-center gap-3 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((item, index) => (
          <div key={`a-${index}`} className={cn("shrink-0", itemClassName)}>
            {item}
          </div>
        ))}
        {items.map((item, index) => (
          <div
            key={`b-${index}`}
            aria-hidden="true"
            className={cn("shrink-0", itemClassName)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
