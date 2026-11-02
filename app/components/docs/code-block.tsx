import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Copy } from "lucide-react";
import type { HighlighterCore } from "shiki/core";
import { cn } from "@/lib/utils";

const SUPPORTED = new Set(["bash", "json", "toml", "typescript"]);

let highlighter: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] =
      await Promise.all([
        import("shiki/core"),
        import("shiki/engine/javascript"),
      ]);
    return createHighlighterCore({
      themes: [
        import("shiki/themes/github-light.mjs"),
        import("shiki/themes/github-dark.mjs"),
      ],
      langs: [
        import("shiki/langs/typescript.mjs"),
        import("shiki/langs/json.mjs"),
        import("shiki/langs/bash.mjs"),
        import("shiki/langs/toml.mjs"),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  })().catch((error: unknown) => {
    highlighter = null;
    throw error;
  });
  return highlighter;
}

function normalizeLang(lang: string): string {
  // TypeScript's grammar is a superset of the JavaScript snippets used in the
  // docs; loading both grammars would duplicate ~175 kB for no benefit.
  if (lang === "ts" || lang === "tsx" || lang === "javascript") {
    return "typescript";
  }
  return SUPPORTED.has(lang) ? lang : "typescript";
}

export function CodeBlock({
  code,
  lang = "typescript",
  title,
  className,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const { t } = useTranslation();
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const normalized = normalizeLang(lang);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    getHighlighter()
      .then((instance) => {
        if (cancelled) return;
        setHtml(
          instance.codeToHtml(code, {
            lang: normalized,
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: "light",
            tokenizeMaxLineLength: 2000,
            tokenizeTimeLimit: 500,
          }),
        );
      })
      .catch(() => {
        // The plain <pre> below is a complete fallback.
      });
    return () => {
      cancelled = true;
    };
  }, [code, normalized]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard permission is optional; the code stays selectable.
    }
  };

  return (
    <div
      className={cn(
        "code-view overflow-hidden rounded-card border border-border bg-code-bg",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-3.5 py-2">
        <div className="flex min-w-0 items-center gap-2">
          {title ? (
            <span className="truncate text-xs font-medium text-foreground">
              {title}
            </span>
          ) : null}
          <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
            {normalized}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-control px-2 text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={copied ? t("docs.copiedCode") : t("docs.copyCode")}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? t("docs.copiedCode") : t("common.copy")}
        </button>
      </div>

      <div className="scrollbar-lumo overflow-x-auto p-4" data-line-numbers="">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="shiki">
            <code>
              {code.split("\n").map((line, index) => (
                <span key={index} className="line block">
                  {line || " "}
                </span>
              ))}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}
