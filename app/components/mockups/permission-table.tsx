import { useTranslation } from "react-i18next";

export function PermissionTable() {
  const { t } = useTranslation();
  const table = t("userscripts.control.table", {
    returnObjects: true,
  }) as { head: string[]; rows: string[][] };

  return (
    <div className="overflow-hidden rounded-card border border-border bg-card shadow-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {table.head.map((head) => (
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
            {table.rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-border/70 last:border-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      cellIndex === 0
                        ? "px-4 py-2.5 font-mono text-[11px] text-foreground"
                        : "px-4 py-2.5 text-xs text-muted-foreground"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
