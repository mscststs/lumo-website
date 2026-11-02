import type { ReactNode } from "react";
import { Link } from "react-router";

const TOKEN_RE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/**
 * Minimal inline Markdown for docs: code, bold and links. Long-form content
 * stays a data model rather than MDX so search, TOC and translation parity all
 * read the same source.
 */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(TOKEN_RE).filter((part) => part !== "");

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const label = link[1] ?? "";
          const href = link[2] ?? "#";
          return href.startsWith("/") ? (
            <Link key={index} to={href}>
              {label}
            </Link>
          ) : (
            <a key={index} href={href} target="_blank" rel="noreferrer noopener">
              {label}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function plainInline(text: string): ReactNode {
  return <InlineText text={text} />;
}
