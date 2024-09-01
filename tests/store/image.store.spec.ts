import { Image, ImageExif } from "../../src/model/image";
import { getAllImages } from "../../src/services/image.service";
import { renderHook } from "@testing-library/react";
import useImageStore from "../../src/store/image.store";
import { act } from "react";
import { expect } from "@jest/globals";
import { getExif } from "../../src/services/exif.service";

jest.mock("../../src/services/image.service");
jest.mock("../../src/services/exif.service");

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
);

describe("useImageStore", () => {
  const image: Image = {
    id: "1",
    src: "/test.png",
    title: "alt",
    width: 100,
    height: 200
  }
  const exif: Partial<ImageExif> = {
    width: 100,
    height: 200
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return images from the store if already loaded", async () => {
    // Given
    (getAllImages as jest.Mock).mockResolvedValue([image]);

    // When
    const { result } = renderHook(() => useImageStore());

    // Then
    await act(async () => {
      const images = await result.current.getImages();
      expect(images).toEqual([image]);
    });

    await act(async () => {
      const images = await result.current.getImages();
      expect(images).toEqual([image]);
    });

    expect(getAllImages).toHaveBeenCalledTimes(1);
  });

  it("should return exif data from the store if already loaded", async () => {
    // Given
    (getExif as jest.Mock).mockResolvedValue(exif);

    // When
    const { result } = renderHook(() => useImageStore());

    // Then
    await act(async () => {
      const exif = await result.current.getExif(image);
      expect(exif).toEqual(exif);
    });

    await act(async () => {
      const exif = await result.current.getExif(image);
      expect(exif).toEqual(exif);
    });

    expect(getExif).toHaveBeenCalledTimes(1);
  });
});
