import { getExif } from "../../src/services/exif.service";
import { expect } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import { Image } from "../../src/model/image";

fetchMock.enableMocks();

describe("EXIF Service", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should call exif endpoint with image srcset", async () => {
    // Given
    const image: Image = {
      id: "1",
      src: "http://localhost/image.png",
      title: "alt",
      width: 100,
      height: 200
    }
    fetchMock.mockResponseOnce(JSON.stringify({}));

    // When
    await getExif(image);

    // Then
    expect(fetchMock).toHaveBeenCalledWith("http://localhost/api/exif?url=http%3A%2F%2Flocalhost%2Fimage.png", { cache: "force-cache" });
  });

  it("should handle server error", async () => {
    // Given
    const image: Image = {
      id: "1",
      src: "http://localhost/image.png",
      title: "alt",
      width: 100,
      height: 200
    }
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

    // When
    const exif = await getExif(image);

    // Then
    expect(exif).toEqual({});
  });

  it("should map exif", async () => {
    // Given
    const image: Image = {
      id: "1",
      src: "http://localhost/image.png",
      title: "alt",
      width: 100,
      height: 200
    }
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
      ImageHeight: 2000
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
        aperture: 2.8,
        compensation: 0.3,
        iso: 100,
      },
      dimensions: "1000×2000",
      width: 1000,
      height: 2000,
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
        ImageHeight: 2000
      }
    });
  });
});
