import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import PictureDetailsPage from "../../../../src/app/photo/[id]/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  useParams: () => ({ id: "42" })
}));

jest.mock("../../../../src/components/details/ImageDetailPopover", () => () => <div data-testid="ImageDetailPopover" />);

describe("PictureDetailsPage", () => {
  it ("should render", () => {
    // When
    render(PictureDetailsPage());

    // Then
    expect(screen.getByTestId("ImageDetailPopover")).toBeInTheDocument();
  });
});
