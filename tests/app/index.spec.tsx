import HomePage from "../../src/app/page";
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

process.env.imagesUrl = "http://localhost:3000/assets/test.json";

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
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/assets/test.json", { cache: "force-cache" });
  });
});
