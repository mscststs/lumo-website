import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Braces,
  Check,
  Cloud,
  Database,
  KeyRound,
  Laptop,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PosterHeading,
  PosterShell,
  PosterStatus,
} from "./poster-parts";

const PROVIDER_ICONS: LucideIcon[] = [MessagesSquare, Sparkles, Braces];
const PROVIDER_ENDPOINTS = [
  "POST /v1/chat/completions",
  "POST /v1/responses",
  "POST /v1/messages",
];

function ChainNode({
  icon: Icon,
  title,
  detail,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-[14px] border border-border/60 bg-background/70 px-3 py-3 text-center">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-card/70 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <p className="w-full truncate text-[11px] font-semibold text-foreground">
        {title}
      </p>
      <p className="line-clamp-2 w-full text-[9px] leading-[1.4] text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

export function LumoPosterLocal() {
  const { t } = useTranslation();
  const providers = t("lumo.providers.items", {
    returnObjects: true,
  }) as Record<string, { name: string; detail: string }>;
  const providerKeys = ["chat", "responses", "anthropic"] as const;
  const bullets = t("lumo.privacy.bullets", {
    returnObjects: true,
  }) as string[];

  return (
    <PosterShell tone="lumo">
      <div className="grid h-full grid-cols-[430px_minmax(0,1fr)] items-center gap-12">
        <div className="min-w-0">
          <PosterHeading
            eyebrow={t("posters.lumo.items.local.eyebrow")}
            title={t("posters.lumo.items.local.title")}
            description={t("posters.lumo.items.local.subtitle")}
            descriptionClassName="max-w-[400px]"
          />

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-medium text-primary">
            <KeyRound className="h-3.5 w-3.5" />
            {t("posters.lumo.items.local.byok")}
          </div>

          <ul className="mt-5 flex flex-col gap-2.5">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-[11px] leading-[1.5] text-foreground/80"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2.5">
            {providerKeys.map((key, providerIndex) => {
              const provider = providers[key];
              const Icon = PROVIDER_ICONS[providerIndex] ?? Sparkles;
              return (
                <div
                  key={key}
                  className="flex min-w-0 flex-col rounded-[16px] border border-border/60 bg-card/55 p-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <p className="mt-2.5 truncate text-[11px] font-semibold text-foreground">
                    {provider?.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-muted-foreground">
                    {provider?.detail}
                  </p>
                  <code className="mt-2 truncate rounded-md border border-border/60 bg-background/70 px-1.5 py-1 font-mono text-[8px] text-muted-foreground">
                    {PROVIDER_ENDPOINTS[providerIndex]}
                  </code>
                </div>
              );
            })}
          </div>

          <div className="rounded-[18px] border border-border/60 bg-card/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[12px] font-semibold text-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                {t("common.localFirst")}
              </span>
              <PosterStatus
                label={t("lumo.privacy.diagram.providerDetail")}
                tone="success"
              />
            </div>

            <div className="mt-3 flex items-stretch gap-2">
              <ChainNode
                icon={Laptop}
                title={t("lumo.privacy.diagram.device")}
                detail={t("lumo.privacy.diagram.storage")}
              />
              <span className="flex w-5 shrink-0 items-center justify-center text-muted-foreground">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <ChainNode
                icon={Database}
                title={t("lumo.privacy.diagram.storageDetail")}
                detail={t("common.localFirst")}
              />
              <span className="flex w-5 shrink-0 items-center justify-center text-muted-foreground">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <ChainNode
                icon={Cloud}
                title={t("lumo.privacy.diagram.provider")}
                detail={t("lumo.privacy.diagram.providerDetail")}
              />
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-success/30 bg-success/5 px-3 py-2 text-[10px] text-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t("posters.lumo.items.local.note")}
            </div>
          </div>
        </div>
      </div>
    </PosterShell>
  );
}
