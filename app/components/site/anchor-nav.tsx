import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function AnchorNav({
  items,
  ariaLabel,
}: {
  items: { id: string; label: string }[];
  ariaLabel: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const id = useId();
  const idsKey = items.map((item) => item.id).join("|");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // The observer only depends on which sections exist, not their labels.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur">
      <nav
        aria-label={ariaLabel}
        className="container-page no-scrollbar flex items-center gap-1 overflow-x-auto"
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative shrink-0 px-3 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {isActive ? (
                <motion.span
                  layoutId={`anchor-${id}`}
                  aria-hidden="true"
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 520, damping: 40 }}
                />
              ) : null}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
