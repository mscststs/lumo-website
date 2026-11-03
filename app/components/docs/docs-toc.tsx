import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHeadings, type DocBlock } from "@/content/docs/types";
import { cn } from "@/lib/utils";

/**
 * Section list for any `DocBlock[]` document — docs articles and the product
 * privacy policies share one heading model, so they share one table of
 * contents.
 */
export function DocsToc({ blocks }: { blocks: DocBlock[] }) {
  const { t } = useTranslation();
  const headings = useMemo(() => getHeadings({ blocks }), [blocks]);
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label={t("a11y.toc")} className="flex flex-col gap-3">
      <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {t("docs.toc")}
      </p>
      {headings.length === 0 ? (
        <p className="text-xs text-muted-foreground">{t("docs.noToc")}</p>
      ) : (
        <ul className="flex flex-col border-l border-border">
          {headings.map((heading) => {
            const isActive = active === heading.id;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() => setActive(heading.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "-ml-px block border-l-2 py-1.5 text-xs leading-5 transition-colors",
                    heading.level === 2 ? "pl-3" : "pl-6",
                    isActive
                      ? "border-primary font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
