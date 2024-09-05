import HomePage from "../../src/app/page";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import useImageStore from "../../src/store/image.store";
import { act } from "react";

jest.mock("../../src/components/gallery/Gallery", () => () => <div />);

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  } as Response)
) as jest.Mock;

jest.mock("../../src/store/image.store", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    getImages: jest.fn().mockResolvedValue([]),
  }),
}));

describe("Home Page", () => {
  it("should render", async () => {
    // When
    await act(() => render(<HomePage />));

    // Then
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("should fetch image config", async () => {
    // When
    await act(() => render(<HomePage />));

    // Then
    expect(useImageStore).toHaveBeenCalled();
  });
});
