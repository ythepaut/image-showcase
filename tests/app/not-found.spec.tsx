import { render, screen } from "@testing-library/react";
import NotFoundPage from "../../src/app/not-found";
import { expect } from "@jest/globals";

jest.mock("next-intl/server", () => ({
  getTranslations: () => (key: string) => key,
}));

describe("Not Found Page", () => {
  it("should render", async () => {
    // When
    render(await NotFoundPage());

    // Then
    expect(screen.getByTestId("not-found-message")).toBeInTheDocument();
  });
});
