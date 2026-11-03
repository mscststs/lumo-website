import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * `tailwind-merge` only knows Tailwind's stock text sizes, so a project size such
 * as `text-display-lg` looks like a text *colour* to it and silently cancels the
 * neighbouring `text-foreground`. Registering the custom scale keeps size and
 * colour independent — `cn("text-display-lg", "text-foreground")` keeps both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "2xs",
            "eyebrow",
            "display-sm",
            "display-md",
            "display-lg",
            "display-xl",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
