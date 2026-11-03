import { cn } from "@/lib/utils";

/**
 * The 18px context-window gauge from the composer footer.
 *
 * Geometry is the product's: 18px box, 2.5px stroke, muted track, `-rotate-90`
 * so the arc starts at 12 o'clock. Shared by every mockup that reproduces a
 * composer, so a change to the gauge lands in all of them at once.
 */
export function ContextRing({
  value = 32,
  className,
}: {
  /** Percentage of the context window in use. */
  value?: number;
  className?: string;
}) {
  const size = 18;
  const stroke = 2.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(1, Math.max(0, value / 100));

  return (
    <span
      className={cn(
        "grid h-7 w-7 place-items-center text-muted-foreground",
        className,
      )}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted-foreground/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          className="stroke-current"
        />
      </svg>
    </span>
  );
}
