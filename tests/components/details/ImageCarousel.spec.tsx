import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import ImageCarousel from "../../../src/components/details/ImageCarousel";

describe("ImageCarousel", () => {
  it("should render", () => {
    // Given
    const image1 = {
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 200
    };
    const image2 = {
      src: "/test2.png",
      title: "alt2",
      width: 200,
      height: 400
    };

    // When
    render(<ImageCarousel selectedImage={image1} images={[image1, image2]} onImageSelect={() => {}} />);

    // Then
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
