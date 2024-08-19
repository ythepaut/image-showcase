import { render, screen } from "@testing-library/react";
import ImageDescription from "../../../src/components/details/ImageDescription";
import { Image, ImageExif } from "../../../src/model/image";
import { expect } from "@jest/globals";

jest.mock("next-intl", () => ({
    useTranslations: () => {
      return (key: string) => key;
    }
  })
);

describe("ImageDescription", () => {
  it("should render", () => {
    // Given
    const image: Image = {
      src: "/test.png",
      title: "alt",
      width: 100,
      height: 200
    }
    const exif: Partial<ImageExif> = {
      createDate: "2021-08-05T00:00:00Z",
      dimensions: "100x100",
      artist: "Bob Dupont",
      focalLength: 50,
      camera: {
        brand: "camBrand",
        model: "camModel",
        lens: "lensModel"
      },
      exposure: {
        shutterSpeed: 50,
        iso: 12800,
        aperture: 5.6,
        compensation: 2
      }
    };

    // When
    render(<ImageDescription image={image} exif={exif} onClose={() => {}} />);

    // Then
    // Title
    const imageTitleLabel = screen.getByText(image.title);
    expect(imageTitleLabel).toBeInTheDocument();
    // Artist from exif
    const artistLabel = screen.getByText(exif.artist!);
    expect(artistLabel).toBeInTheDocument();
    // Camera and settings
    const cameraLabel = screen.getByText(`${exif.camera?.brand} ${exif.camera?.model}`);
    expect(cameraLabel).toBeInTheDocument();
    const lensLabel = screen.getByText(exif.camera?.lens!);
    expect(lensLabel).toBeInTheDocument();
    const focalLengthLabel = screen.getByText(`${exif.focalLength}mm`);
    expect(focalLengthLabel).toBeInTheDocument();
    const shutterSpeedLabel = screen.getByText(`1/${exif.exposure?.shutterSpeed}`);
    expect(shutterSpeedLabel).toBeInTheDocument();
  });
});
