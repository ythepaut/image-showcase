import { render, screen } from "@testing-library/react";
import React from "react";
import ImageDetailModal from "../../src/components/ImageDetailModal";
import { Image } from "../../src/model/image";
import { expect } from "@jest/globals";

jest.mock("bigger-picture", () => {
  return () => {
    return {
      open: () => {},
      close: () => {}
    }
  };
});

describe("ImageDetailModal", () => {
  it("should render", () => {
    // Given
    const image: Image = {
      src: "/test.png",
      alt: "alt",
      width: 100,
      height: 100,
      id: "1"
    };

    // When
    render(<ImageDetailModal image={image} onClose={() => {}} />);

    // Then
    const imageTitleLabel = screen.getByText(image.alt);
    expect(imageTitleLabel).toBeInTheDocument();
  });
});
