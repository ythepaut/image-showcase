import { render, screen } from "@testing-library/react";
import { Image } from "../../../src/model/image";
import { expect } from "@jest/globals";
import ImageTile from "../../../src/components/gallery/ImageTile";

describe("ImageTile", () => {
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
    render(<ImageTile image={image} onClick={() => {}} />);

    // Then
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("alt", image.alt);
  });
});
