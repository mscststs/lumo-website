import { cn } from "@/lib/utils";

const SOURCES = {
  brand: "/brand/lumo-mark.svg",
  lumo: "/brand/lumo-mark.svg",
  userscripts: "/brand/userscripts-mark.svg",
} as const;

export type BrandVariant = keyof typeof SOURCES;

/**
 * Product artwork as an `<img>` of the source SVG. Rendered externally rather
 * than inlined because both files carry gradient/filter ids; inlining more than
 * one copy per page would make those ids collide.
 */
export function BrandMark({
  variant = "brand",
  className,
}: {
  variant?: BrandVariant;
  className?: string;
}) {
  return (
    <img
      src={SOURCES[variant]}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("h-8 w-8 shrink-0 select-none object-contain", className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-[1.0625rem] font-semibold tracking-[-0.03em] text-foreground",
        className,
      )}
    >
      Lumo
    </span>
  );
}
