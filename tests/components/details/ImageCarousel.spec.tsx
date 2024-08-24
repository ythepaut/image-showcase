import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import ImageCarousel from "../../../src/components/details/ImageCarousel";
import { Image } from "../../../src/model/image";

describe("ImageCarousel", () => {
  it("should render", () => {
    // Given
    const image1: Image = {
      id: "1",
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 200
    };
    const image2: Image = {
      id: "2",
      src: "/test2.png",
      title: "alt2",
      width: 200,
      height: 400
    };

    // When
    render(<ImageCarousel selectedImage={image1} images={[image1, image2]} />);

    // Then
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
