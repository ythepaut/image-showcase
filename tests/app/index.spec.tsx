import HomePage from "../../src/app/[locale]/page";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("../../src/components/gallery/Gallery", () => () => <div />);

// mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  } as Response)
);

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    appUrl: "http://localhost:3000",
  },
}));

describe("Home Page", () => {
  it("should render", async () => {
    // When
    render(await HomePage());

    // Then
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("should fetch image config", async () => {
    // When
    render(await HomePage());

    // Then
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/assets/images.json");
  });
});
