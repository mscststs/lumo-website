import {
  AlertTriangle,
  ArrowRight,
  Info,
  Lightbulb,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "./code-block";
import { DocMock } from "./doc-mocks";
import { InlineText } from "./inline-text";
import { LocaleLink } from "@/components/site/locale-link";
import { slugifyHeading, type CalloutTone, type DocBlock } from "@/content/docs/types";
import { cn } from "@/lib/utils";

const CALLOUT = {
  note: {
    icon: Info,
    className: "border-primary/25 bg-primary/5",
    iconClass: "text-primary",
  },
  tip: {
    icon: Lightbulb,
    className: "border-success/25 bg-success/5",
    iconClass: "text-success",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-warning/25 bg-warning/5",
    iconClass: "text-warning",
  },
} satisfies Record<
  CalloutTone,
  { icon: typeof Info; className: string; iconClass: string }
>;

function Heading({
  level,
  text,
}: {
  level: 2 | 3;
  text: string;
}) {
  const id = slugifyHeading(text);
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="group scroll-mt-28">
      <InlineText text={text} />
      <a
        href={`#${id}`}
        aria-label={text}
        className="ml-2 align-middle text-sm text-muted-foreground opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
      >
        #
      </a>
    </Tag>
  );
}

export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  const { t } = useTranslation();
  return (
    <div className="prose-lumo">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return <Heading key={index} level={2} text={block.text} />;
          case "h3":
            return <Heading key={index} level={3} text={block.text} />;
          case "p":
            return (
              <p key={index}>
                <InlineText text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <CodeBlock
                key={index}
                code={block.code}
                lang={block.lang}
                title={block.title}
                className="my-6 not-prose"
              />
            );
          case "callout": {
            const tone = CALLOUT[block.tone];
            const Icon = tone.icon;
            return (
              <div
                key={index}
                className={cn(
                  "my-6 flex gap-3 rounded-card border p-4 not-prose",
                  tone.className,
                )}
              >
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", tone.iconClass)} />
                <div className="min-w-0">
                  {block.title ? (
                    <p className="text-sm font-semibold text-foreground">
                      {block.title}
                    </p>
                  ) : null}
                  <p className="text-sm leading-6 text-muted-foreground">
                    <InlineText text={block.text} />
                  </p>
                </div>
              </div>
            );
          }
          case "table":
            return (
              <div
                key={index}
                className="my-6 overflow-x-auto rounded-card border border-border not-prose"
              >
                <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      {block.head.map((head) => (
                        <th
                          key={head}
                          className="px-4 py-2.5 text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-border/70 last:border-0"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={cn(
                              "px-4 py-2.5 align-top text-xs leading-5",
                              cellIndex === 0
                                ? "font-mono text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            <InlineText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "steps":
            return (
              <ol key={index} className="my-6 flex flex-col gap-3 not-prose">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex gap-3 rounded-card border border-border bg-card p-4 shadow-surface"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                      {itemIndex + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
                        <InlineText text={item.text} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "kv":
            return (
              <dl
                key={index}
                className="my-6 divide-y divide-border overflow-hidden rounded-card border border-border not-prose"
              >
                {block.items.map((item) => (
                  <div
                    key={item.k}
                    className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="font-mono text-xs text-muted-foreground">
                      {item.k}
                    </dt>
                    <dd className="text-sm text-foreground">
                      <InlineText text={item.v} />
                    </dd>
                  </div>
                ))}
              </dl>
            );
          case "quote":
            return (
              <blockquote key={index} className="my-6">
                <InlineText text={block.text} />
                {block.cite ? (
                  <footer className="mt-2 text-xs not-italic text-muted-foreground">
                    — {block.cite}
                  </footer>
                ) : null}
              </blockquote>
            );
          case "mock":
            return (
              <DocMock key={index} id={block.id} caption={block.caption} />
            );
          case "cards":
            return (
              <div
                key={index}
                className="my-6 grid grid-cols-1 gap-3 not-prose sm:grid-cols-2"
              >
                {block.items.map((item) => (
                  <LocaleLink
                    key={item.href}
                    to={item.href}
                    className="group flex h-full flex-col gap-1.5 rounded-card border border-border bg-card p-4 shadow-surface transition-colors hover:border-primary/25"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="text-sm leading-6 text-muted-foreground">
                      <InlineText text={item.text} />
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-1 text-xs font-medium text-primary">
                      {item.cta ?? t("common.readDocs")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </LocaleLink>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
