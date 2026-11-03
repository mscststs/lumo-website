import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { BrandMark } from "@/components/brand/brand-mark";
import { SectionHeading } from "@/components/site/section-heading";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { LocaleProvider } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n/translate";

describe("core render paths", () => {
  it("renders the brand mark as decorative art", () => {
    const { container } = render(<BrandMark variant="lumo" />);
    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("src", "/brand/lumo-mark.svg");
  });

  it("renders section copy through i18next", () => {
    render(
      <I18nextProvider i18n={getI18n("en")}>
        <SectionHeading
          eyebrow="Platform"
          title="Built on primitives that last."
          description="A short description."
        />
      </I18nextProvider>,
    );
    expect(
      screen.getByRole("heading", { name: "Built on primitives that last." }),
    ).toBeInTheDocument();
  });

  it("renders the docs sidebar with the active document group", () => {
    render(
      <MemoryRouter initialEntries={["/docs/mcp"]}>
        <LocaleProvider>
          <DocsSidebar />
        </LocaleProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "MCP and browser tools" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText("Start here")).toBeInTheDocument();
  });
});
