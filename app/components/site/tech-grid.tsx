import { Reveal } from "@/components/motion/reveal";

export function TechGrid({
  items,
}: {
  items: { name: string; detail: string }[];
}) {
  return (
    <Reveal>
      <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item.name}
            className="group flex flex-col gap-1 bg-card px-5 py-5 transition-colors hover:bg-accent/50"
          >
            <span className="font-mono text-[10px] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {item.name}
            </span>
            <span className="text-xs text-muted-foreground">{item.detail}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
