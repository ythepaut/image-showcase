import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ImageDetailPopover from "../../../src/components/details/ImageDetailPopover";
import { getExif } from "../../../src/services/exif";
import { expect } from "@jest/globals";

jest.mock("../../../src/services/exif", () => ({
    getExif: jest.fn().mockResolvedValue({})
  })
);

jest.mock("../../../src/components/details/ImageDescription", () => {
  return () => <div data-testid="image-description" />;
});
jest.mock("../../../src/components/details/ImageViewer", () => {
  return () => <div data-testid="image-viewer" />;
});
jest.mock("../../../src/components/details/ImageCarousel", () => {
  return () => <div data-testid="image-carousel" />;
});

describe("ImageDetailPopover", () => {
  it("should render and trigger EXIF retrieval", async () => {
    // Given
    const image = {
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 200
    };

    // When
    render(<ImageDetailPopover image={image} images={[image]} onClose={() => {}} onSelectImage={() => {}} />)

    // Then
    await waitFor(() => {
      expect(getExif).toHaveBeenCalledWith(image);
    });
    expect(screen.getAllByTestId("image-description")).toBeTruthy();
    expect(screen.getByTestId("image-viewer")).toBeInTheDocument();
    expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
  });
});
