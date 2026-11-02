import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";

export function MetricBand({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 bg-card px-5 py-6 text-center"
          >
            <span className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
              <CountUp value={item.value} />
            </span>
            <span className="text-xs leading-5 text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
