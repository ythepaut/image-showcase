import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ImageDetailPopover from "../../../src/components/details/ImageDetailPopover";
import { expect } from "@jest/globals";
import { Image } from "../../../src/model/image";
import useImageStore from "../../../src/store/image.store";

jest.mock("../../../src/store/image.store");

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
    const mockUseImageStore = useImageStore as jest.MockedFunction<typeof useImageStore>;
    const image: Image = {
      id: "1",
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 200
    };
    mockUseImageStore.mockReturnValue({
      getImages: jest.fn(async () => [image]),
      getExif: jest.fn(async () => {})
    });


    // When
    render(<ImageDetailPopover imageId={image.id} onClose={() => {}} showCarouel={true} />)

    // Then
    await waitFor(() => {
      expect(mockUseImageStore().getExif).toHaveBeenCalledWith(image);
    });
    expect(screen.getAllByTestId("image-description")).toBeTruthy();
    expect(screen.getByTestId("image-viewer")).toBeInTheDocument();
    expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
  });
});
