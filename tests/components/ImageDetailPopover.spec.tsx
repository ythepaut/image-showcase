import { render, screen } from "@testing-library/react";
import React from "react";
import ImageDetailPopover from "../../src/components/ImageDetailPopover";
import { Image } from "../../src/model/image";
import { expect } from "@jest/globals";

jest.mock("next-intl", () => {
  return {
    useTranslations: () => {
      return (key: string) => key;
    }
  };
});

jest.mock("bigger-picture", () => {
  return () => {
    return {
      open: () => {},
      close: () => {}
    }
  };
});

describe("ImageDetailPopover", () => {
  it("should render", () => {
    // Given
    const image: Image = {
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 100
    };

    // When
    render(<ImageDetailPopover image={image} onClose={() => {}} />);

    // Then
    const imageTitleLabel = screen.getByText(image.title);
    expect(imageTitleLabel).toBeInTheDocument();
  });
});
