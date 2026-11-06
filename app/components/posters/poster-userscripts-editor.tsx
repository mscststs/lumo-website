import { useTranslation } from "react-i18next";
import { CodeEditorMock } from "@/components/mockups/code-editor-mock";
import {
  PosterChips,
  PosterHeading,
  PosterShell,
} from "./poster-parts";

export function UserscriptsPosterEditor() {
  const { t } = useTranslation();

  return (
    <PosterShell tone="userscripts">
      <div className="grid h-full grid-cols-[420px_minmax(0,1fr)] items-center gap-12">
        <div className="min-w-0">
          <PosterHeading
            eyebrow={t("posters.userscripts.items.editor.eyebrow")}
            title={t("posters.userscripts.items.editor.title")}
            description={t("posters.userscripts.items.editor.subtitle")}
            descriptionClassName="max-w-[380px]"
          />
          <PosterChips
            tone="userscripts"
            className="mt-7 max-w-[400px]"
            items={
              t("posters.userscripts.items.editor.chips", {
                returnObjects: true,
              }) as string[]
            }
          />
        </div>

        <div className="relative min-w-0">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-brand-cyan/10 via-brand-emerald/5 to-transparent blur-2xl" />
          <CodeEditorMock className="relative h-[536px] w-[666px] max-w-full" />
        </div>
      </div>
    </PosterShell>
  );
}
