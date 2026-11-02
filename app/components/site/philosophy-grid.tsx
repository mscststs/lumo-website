import {
  EyeOff,
  Layers,
  MousePointer2,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const ICONS: LucideIcon[] = [EyeOff, MousePointer2, Layers, Waves];

export function PhilosophyGrid({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
        const Icon = ICONS[index] ?? EyeOff;
        return (
          <StaggerItem key={item.title}>
            <div className="group flex h-full flex-col gap-4 rounded-card border border-border bg-card p-5 shadow-surface transition-colors hover:border-primary/25">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-muted/50 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
