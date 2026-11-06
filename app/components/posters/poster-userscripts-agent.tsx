import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Check,
  KeyRound,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import {
  PosterHeading,
  PosterShell,
  PosterStatus,
} from "./poster-parts";

const TOOLS = [
  "userscripts_list",
  "userscripts_create",
  "userscripts_edit",
  "userscripts_set_enabled",
];

function PortNode({
  variant,
  name,
  detail,
}: {
  variant: "lumo" | "userscripts";
  name: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-[14px] border border-border/60 bg-background/70 px-3 py-3 text-center">
      <BrandMark variant={variant} className="h-8 w-8" />
      <p className="w-full truncate text-[11px] font-semibold text-foreground">
        {name}
      </p>
      <p className="w-full truncate text-[9px] text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

function GovernanceCard({
  icon: Icon,
  title,
  detail,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 rounded-[14px] border border-border/60 bg-card/55 p-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <p className="truncate text-[11px] font-semibold text-foreground">
        {title}
      </p>
      <p className="line-clamp-2 text-[9px] leading-[1.4] text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

export function UserscriptsPosterAgent() {
  const { t } = useTranslation();
  const bullets = t("userscripts.agent.bullets", {
    returnObjects: true,
  }) as string[];

  return (
    <PosterShell tone="userscripts" variant="solid">
      <div className="grid h-full grid-cols-[400px_minmax(0,1fr)] items-center gap-12">
        <div className="min-w-0">
          <PosterHeading
            eyebrow={t("posters.userscripts.items.agent.eyebrow")}
            title={t("posters.userscripts.items.agent.title")}
            description={t("posters.userscripts.items.agent.subtitle")}
            titleSize={56}
            descriptionClassName="max-w-[380px]"
          />

          <ul className="mt-6 flex flex-col gap-2.5">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-[11px] leading-[1.5] text-foreground/80"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-brand-emerald/25 bg-brand-emerald/10 text-brand-emerald">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-2.5 rounded-[14px] border border-border/60 bg-card/55 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-foreground">
                {t("mockUi.agentDialogTitle")}
              </p>
              <p className="truncate text-[9px] text-muted-foreground">
                {t("mockUi.agentDialogGrants")}
              </p>
            </div>
            <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-primary px-2.5 text-[10px] font-medium text-primary-foreground">
              <ShieldCheck className="h-3 w-3" />
              {t("mockUi.approve")}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="rounded-[18px] border border-border/60 bg-card/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-muted-foreground">
                {t("posters.userscripts.items.agent.runtime")}
              </span>
              <PosterStatus
                label={t("posters.userscripts.items.agent.mcp")}
                tone="primary"
              />
            </div>

            <div className="mt-3 flex items-stretch gap-2">
              <PortNode
                variant="lumo"
                name={t("lumo.productName")}
                detail={t("posters.userscripts.items.agent.host")}
              />
              <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-1 text-center">
                <span className="font-mono text-[8px] text-muted-foreground">
                  {t("posters.userscripts.items.agent.probe")}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 64 8"
                  className="h-2 w-12 text-border"
                >
                  <path
                    d="M0 4h56M52 1l4 3-4 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-mono text-[8px] text-muted-foreground">
                  {t("posters.userscripts.items.agent.port")}
                </span>
              </div>
              <PortNode
                variant="userscripts"
                name={t("userscripts.productName")}
                detail={t("posters.userscripts.items.agent.provider")}
              />
            </div>
          </div>

          <div className="rounded-[18px] border border-border/60 bg-card/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-foreground">
                {t("posters.userscripts.items.agent.tools")}
              </span>
              <code className="font-mono text-[9px] text-muted-foreground">
                tools/list · tools/call
              </code>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {TOOLS.map((tool) => (
                <code
                  key={tool}
                  className="flex h-8 items-center gap-2 truncate rounded-lg border border-border/60 bg-background/70 px-2.5 font-mono text-[9px] text-foreground/80"
                >
                  <ArrowRight className="h-2.5 w-2.5 shrink-0 text-brand-emerald" />
                  <span className="truncate">{tool}</span>
                </code>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <GovernanceCard
              icon={ShieldCheck}
              title={t("mockUi.agentAllowed")}
              detail={t("posters.userscripts.items.agent.allowlistDetail")}
            />
            <GovernanceCard
              icon={KeyRound}
              title={t("mockUi.agentAllowWrites")}
              detail={t("posters.userscripts.items.agent.writesDetail")}
            />
            <GovernanceCard
              icon={ScrollText}
              title={t("mockUi.agentActivity")}
              detail={t("posters.userscripts.items.agent.auditDetail")}
            />
          </div>
        </div>
      </div>
    </PosterShell>
  );
}
