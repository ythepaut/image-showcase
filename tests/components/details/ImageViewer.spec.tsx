import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import ImageViewer from "../../../src/components/details/ImageViewer";

jest.mock("bigger-picture", () => {
  return () => ({
    open: () => {},
    close: () => {}
  });
});

describe("ImageViewer", () => {
  it("should render", () => {
    // Given
    const image = {
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 200
    };

    // When
    render(<ImageViewer image={image} />);

    // Then
    expect(screen.getByTestId("image-wrapper")).toBeInTheDocument();
  });
});
