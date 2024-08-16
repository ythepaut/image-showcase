import { render, screen } from "@testing-library/react";
import { Image } from "../../../src/model/image";
import { expect } from "@jest/globals";
import Gallery from "../../../src/components/gallery/Gallery";

jest.mock("../../../src/components/ImageDetailModal", () => () => (
  <div />
));

describe("Gallery", () => {
  it("should render", () => {
    // Given
    const images: Image[] = [
      {
        src: "/test.png",
        alt: "image1",
        width: 100,
        height: 100,
        id: "1"
      },
      {
        src: "/test2.png",
        alt: "image2",
        width: 100,
        height: 100,
        id: "2"
      }
    ];

    // When
    render(<Gallery images={images} />);

    // Then
    const imageElements = screen.getAllByRole("img");
    expect(imageElements).toHaveLength(2);
  });
});
