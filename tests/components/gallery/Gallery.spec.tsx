import { render, screen } from "@testing-library/react";
import { Image } from "../../../src/model/image";
import { expect } from "@jest/globals";
import Gallery from "../../../src/components/gallery/Gallery";

jest.mock("../../../src/components/details/ImageDetailPopover", () => () => (
  <div />
));

describe("Gallery", () => {
  it("should render", () => {
    // Given
    const images: Image[] = [
      {
        src: "/test.png",
        title: "image1",
        width: 100,
        height: 100
      },
      {
        src: "/test2.png",
        title: "image2",
        width: 100,
        height: 100
      }
    ];

    // When
    render(<Gallery images={images} />);

    // Then
    const imageElements = screen.getAllByRole("img");
    expect(imageElements).toHaveLength(2);
  });
});
