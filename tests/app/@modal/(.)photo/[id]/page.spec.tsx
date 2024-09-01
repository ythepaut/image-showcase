import { render, screen, fireEvent } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import PictureDetailsPage from "../../../../../src/app/@modal/(.)photo/[id]/page";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn()
}));

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");
  return {
    __esModule: true,
    ...originalModule,
    createPortal: jest.fn()
  };
});

jest.mock("../../../../../src/components/details/ImageDetailPopover", () => ({
  __esModule: true,
  default: function MockImageDetailPopover({ onClose }: { onClose: () => void }) {
    return (
      <div>
        <p>ImageDetailPopover</p>
        <button name="close" onClick={onClose}>Close</button>
      </div>
    );
  },
}));

describe("PictureDetailsPage", () => {
  const mockUseParams = useParams as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: "123" });
    mockUseRouter.mockReturnValue({ push: jest.fn() });
    (createPortal as jest.Mock).mockImplementation((element, _) => element);
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the dialog and ImageDetailPopover", () => {
    // When
    render(<PictureDetailsPage />);

    // Then
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("ImageDetailPopover")).toBeInTheDocument();
  });

  it("should close the dialog and reset body overflow on close", () => {
    // Given
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    // When
    render(<PictureDetailsPage />);
    const closeButton = screen.getByRole("button", {hidden: true, name: /close/i});
    fireEvent.click(closeButton);

    // Then
    expect(mockPush).toHaveBeenCalledWith("/", { scroll: false });
  });
});
