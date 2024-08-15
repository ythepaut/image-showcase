import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import React from "react";
import Shimmer from "../../src/components/Shimmer";

describe("Shimmer", () => {
  it("should render", () => {
    // When
    render(<Shimmer width={100} height={100} />);

    // Then
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
  });
});
