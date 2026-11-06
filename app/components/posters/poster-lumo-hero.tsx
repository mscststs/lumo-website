import { useTranslation } from "react-i18next";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { SidebarChatMock } from "@/components/mockups/sidebar-chat-mock";
import {
  PosterChips,
  PosterDocument,
  PosterHeading,
  PosterShell,
} from "./poster-parts";

export function LumoPosterHero() {
  const { t } = useTranslation();

  return (
    <PosterShell tone="lumo">
      <div className="grid h-full grid-cols-[430px_minmax(0,1fr)] items-center gap-10">
        <div className="min-w-0">
          <PosterHeading
            eyebrow={t("posters.lumo.items.hero.eyebrow")}
            title={t("posters.lumo.items.hero.title")}
            description={t("posters.lumo.items.hero.subtitle")}
            titleSize={64}
            descriptionClassName="max-w-[390px]"
          />
          <PosterChips
            tone="lumo"
            className="mt-7 max-w-[420px]"
            items={
              t("posters.lumo.items.hero.chips", {
                returnObjects: true,
              }) as string[]
            }
          />
        </div>

        <div className="relative min-w-0">
          <BrowserFrame
            tabs={[
              {
                label: t("home.hero.mock.tab"),
                active: true,
                tone: "lumo",
              },
              { label: t("common.docs"), tone: "neutral" },
            ]}
            url={t("home.hero.mock.url")}
            className="w-full"
            contentClassName="grid h-[480px] grid-rows-1 grid-cols-[minmax(0,1fr)_286px]"
          >
            <PosterDocument />
            <div className="min-w-0 border-l border-border bg-muted/20 p-1.5">
              <SidebarChatMock
                mode="lumo"
                className="h-full min-h-0 rounded-none border-0 shadow-none"
              />
            </div>
          </BrowserFrame>
        </div>
      </div>
    </PosterShell>
  );
}
