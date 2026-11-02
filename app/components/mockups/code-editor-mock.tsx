import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ChevronDown,
  FileCode2,
  Info,
  MoreHorizontal,
  Save,
  ScrollText,
  Settings,
} from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

const TOKEN_RE =
  /(\/\/.*$|\/\*.*?\*\/|'[^']*'|"[^"]*"|\b(?:const|let|if|else|true|false|return|function|await|async|new)\b|\bGM_[A-Za-z]+\b|\b\d+\b|@[a-z-]+)/g;

function renderToken(token: string, index: number) {
  if (token.startsWith("//") || token.startsWith("/*")) {
    return (
      <span key={index} className="text-muted-foreground">
        {token}
      </span>
    );
  }
  if (/^['"]/.test(token)) {
    return (
      <span key={index} className="text-success">
        {token}
      </span>
    );
  }
  if (/^@[a-z-]+$/.test(token)) {
    return (
      <span key={index} className="text-brand-violet">
        {token}
      </span>
    );
  }
  if (/^(const|let|if|else|true|false|return|function|await|async|new)$/.test(token)) {
    return (
      <span key={index} className="text-primary-ink">
        {token}
      </span>
    );
  }
  if (/^GM_/.test(token)) {
    return (
      <span key={index} className="text-warning">
        {token}
      </span>
    );
  }
  if (/^\d+$/.test(token)) {
    return (
      <span key={index} className="text-destructive">
        {token}
      </span>
    );
  }
  return <span key={index}>{token}</span>;
}

function CodeLine({
  line,
  index,
  active,
}: {
  line: string;
  index: number;
  active?: boolean;
}) {
  const tokens = line.split(TOKEN_RE).filter((token) => token !== "");
  return (
    <div
      className={cn(
        "flex min-h-[1.125rem] items-baseline",
        active && "bg-primary/[0.06]",
      )}
    >
      <span className="w-6 shrink-0 select-none pr-1.5 text-right font-mono text-[9px] text-muted-foreground/60">
        {index + 1}
      </span>
      <code className="whitespace-pre font-mono text-[10px] leading-[1.125rem] text-foreground">
        {tokens.map(renderToken)}
      </code>
    </div>
  );
}

/**
 * Reconstruction of the script editor page.
 *
 * The real editor hands every pixel to the code panel: `PageLayout` is
 * `width="full" scroll={false}`, the heading is one 56px row (back, icon, name,
 * version, Save), the tab strip is an underline nav, and CodeMirror fills the
 * rest on `bg-code-bg`. There is no metadata side column — metadata is a tab.
 */
export function CodeEditorMock({ className }: { className?: string }) {
  const { t } = useTranslation();
  const tabs = t("userscripts.editor.mock.tabs", {
    returnObjects: true,
  }) as string[];
  const code = t("userscripts.editor.mock.code", {
    returnObjects: true,
  }) as string[];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-w-0 overflow-hidden rounded-panel border border-border bg-sidebar shadow-float",
        className,
      )}
    >
      <aside className="flex w-10 shrink-0 flex-col py-2 sm:w-12">
        <div className="flex h-9 items-center justify-center">
          <BrandMark variant="userscripts" className="h-6 w-6" />
        </div>
        <div className="mt-1 flex flex-col gap-0.5 px-1">
          {[FileCode2, Settings, ScrollText, Info].map((Icon, index) => (
            <span
              key={index}
              className={cn(
                "flex h-7 items-center justify-center rounded-control",
                index === 0
                  ? "border border-border/60 bg-card text-primary shadow-surface"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>
      </aside>

      <div className="my-1.5 mr-1.5 flex min-w-0 flex-1 flex-col overflow-hidden rounded-card border border-border/70 bg-background shadow-panel">
        <div className="flex min-h-11 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-2.5 py-2">
          <div className="flex min-w-0 flex-1 basis-40 items-center gap-2">
            <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] border border-border bg-gradient-to-br from-brand-cyan/20 to-brand-violet/10 text-brand-cyan">
              <FileCode2 className="h-3 w-3" />
            </span>
            <span className="min-w-0 truncate text-xs font-semibold text-foreground">
              {t("userscripts.editor.mock.file")}
            </span>
            <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
              v1.4.2
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Kbd className="hidden h-5 text-[9px] sm:inline-flex">
              {t("userscripts.editor.mock.shortcut")}
            </Kbd>
            <span className="inline-flex h-7 items-center gap-1 rounded-md bg-primary px-2 text-[10px] font-medium text-primary-foreground shadow-button">
              <Save className="h-3 w-3" />
              {t("userscripts.editor.mock.save")}
            </span>
            <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 overflow-hidden border-b border-border px-2.5">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={cn(
                "relative shrink-0 py-1.5 text-[10px] font-medium",
                index === 0 ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {tab}
              {index === 0 ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
              ) : null}
            </span>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden bg-code-bg py-2">
          {code.map((line, index) => (
            <CodeLine key={index} line={line} index={index} active={index === 8} />
          ))}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-border px-2.5 py-1 text-[9px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ChevronDown className="h-2.5 w-2.5" />
            {t("userscripts.editor.mock.status")}
          </span>
          <span className="font-mono tabular-nums">
            {t("userscripts.editor.mock.cursor")}
          </span>
        </div>
      </div>
    </div>
  );
}
