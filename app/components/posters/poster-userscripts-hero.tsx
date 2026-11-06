import { useTranslation } from "react-i18next";
import { UserscriptsDashboardMock } from "@/components/mockups/userscripts-dashboard-mock";
import {
  PosterChips,
  PosterHeading,
  PosterShell,
} from "./poster-parts";

export function UserscriptsPosterHero() {
  const { t } = useTranslation();

  return (
    <PosterShell tone="userscripts">
      <div className="grid h-full grid-cols-[430px_minmax(0,1fr)] items-center gap-12">
        <div className="min-w-0">
          <PosterHeading
            eyebrow={t("posters.userscripts.items.hero.eyebrow")}
            title={t("posters.userscripts.items.hero.title")}
            description={t("posters.userscripts.items.hero.subtitle")}
            titleSize={64}
            descriptionClassName="max-w-[390px]"
          />
          <PosterChips
            tone="userscripts"
            className="mt-7 max-w-[410px]"
            items={
              t("posters.userscripts.items.hero.chips", {
                returnObjects: true,
              }) as string[]
            }
          />
        </div>

        <div className="relative min-w-0">
          <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-brand-emerald/10 via-brand-cyan/5 to-transparent blur-2xl" />
          <UserscriptsDashboardMock className="relative w-[660px] max-w-full" />
        </div>
      </div>
    </PosterShell>
  );
}
