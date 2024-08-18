import { act, render, RenderResult, screen, waitFor } from "@testing-library/react";
import React from "react";
import ImageDetailPopover from "../../src/components/ImageDetailPopover";
import { expect } from "@jest/globals";
import { getExif } from "../../src/services/exif";

jest.mock("next-intl", () => ({
    useTranslations: () => {
      return (key: string) => key;
    }
  })
);

jest.mock("bigger-picture", () => {
  return () => ({
    open: () => {},
    close: () => {}
  });
});

jest.mock("../../src/services/exif", () => ({
    getExif: jest.fn()
  })
);

describe("ImageDetailPopover", () => {
  it("should render and trigger EXIF retrieval", async () => {
    // Given
    const image = {
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 100
    };
    const imageElement = document.createElement("img");
    imageElement.src = image.src;

    getExif.mockResolvedValue({
      createDate: "2021-08-05T00:00:00Z",
      dimensions: [100, 100],
      artist: "Bob Dupont",
    });

    // When
    let renderResult: RenderResult;
    await act(async () => {
      renderResult = render(<ImageDetailPopover image={image} onClose={() => {}} />);
    });
    await act(async () => {
      const imageWrapper = renderResult.container.querySelector("#image-wrapper");
      imageWrapper?.appendChild(imageElement);
    });

    // Then
    await waitFor(() => {
      expect(getExif).toHaveBeenCalledWith(imageElement);
    });

    // Title
    const imageTitleLabel = screen.getByText(image.title);
    expect(imageTitleLabel).toBeInTheDocument();
    // Artist from exif
    const artistLabel = screen.getByText("Bob Dupont");
    expect(artistLabel).toBeInTheDocument();
    // Image
    const imageElementRendered = screen.getByRole("img");
    expect(imageElementRendered).toBeInTheDocument();
    expect(imageElementRendered).toHaveAttribute("src", image.src);
  });
});
