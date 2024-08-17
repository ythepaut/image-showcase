import { getExif } from "../../src/services/exif";
import { expect } from "@jest/globals";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("EXIF Service", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should call exif endpoint with image srcset", async () => {
    // Given
    const image = document.createElement("img");
    image.srcset = "http://localhost/image.png";
    fetchMock.mockResponseOnce(JSON.stringify({}));

    // When
    await getExif(image);

    // Then
    expect(fetchMock).toHaveBeenCalledWith("http://localhost/api/exif?url=http%3A%2F%2Flocalhost%2Fimage.png");
  });

  it("should handle server error", async () => {
    // Given
    const image = document.createElement("img");
    image.srcset = "http://localhost/image.png";
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

    // When
    const exif = await getExif(image);

    // Then
    expect(exif).toEqual({});
  });

  it("should map exif", async () => {
    // Given
    const image = document.createElement("img");
    image.srcset = "http://localhost/image.png";
    fetchMock.mockResponseOnce(JSON.stringify({
      CreateDate: "2025-01-01T00:00:00Z",
      Artist: "Alice Durand",
      Make: "Camera brand",
      Model: "Camera model",
      LensModel: "Lens model",
      FNumber: 2.8,
      ISO: 100,
      ExposureCompensation: 0.3,
      ImageWidth: 1000,
      ImageHeight: 1000
    }));

    // When
    const exif = await getExif(image);

    // Then
    expect(exif).toEqual({
      createDate: "01/01/2025 00:00:00",
      artist: "Alice Durand",
      camera: {
        brand: "Camera brand",
        model: "Camera model",
        lens: "Lens model"
      },
      exposure: {
        aperture: 3,
        compensation: 0.3,
        iso: 100,
      },
      dimensions: [1000, 1000],
      rawExif: {
        CreateDate: "2025-01-01T00:00:00Z",
        Artist: "Alice Durand",
        Make: "Camera brand",
        Model: "Camera model",
        LensModel: "Lens model",
        FNumber: 2.8,
        ISO: 100,
        ExposureCompensation: 0.3,
        ImageWidth: 1000,
        ImageHeight: 1000
      }
    });
  });
});
