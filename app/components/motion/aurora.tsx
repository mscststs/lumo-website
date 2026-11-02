import { cn } from "@/lib/utils";

const TONES = {
  lumo: [
    "bg-brand-cyan/25",
    "bg-brand-violet/22",
    "bg-brand-blue/20",
  ],
  userscripts: [
    "bg-brand-emerald/22",
    "bg-brand-cyan/20",
    "bg-brand-blue/18",
  ],
  neutral: ["bg-primary/18", "bg-brand-cyan/16", "bg-brand-violet/14"],
} as const;

/** Soft colour field behind a hero. Pure CSS animation; no scroll listener. */
export function Aurora({
  tone = "neutral",
  className,
}: {
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const [one, two, three] = TONES[tone];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "animate-aurora absolute -left-[12%] -top-[30%] h-[70%] w-[60%] rounded-full blur-[90px]",
          one,
        )}
      />
      <div
        className={cn(
          "animate-aurora absolute -right-[10%] top-[-10%] h-[60%] w-[55%] rounded-full blur-[100px] [animation-delay:-6s]",
          two,
        )}
      />
      <div
        className={cn(
          "animate-aurora absolute bottom-[-35%] left-[25%] h-[65%] w-[60%] rounded-full blur-[110px] [animation-delay:-12s]",
          three,
        )}
      />
    </div>
  );
}
