import { NextApiRequest, NextApiResponse } from "next";
import {default as getExifAPI} from "../../../src/pages/api/exif";
import { expect } from "@jest/globals";


jest.mock("exifr", () => ({
  parse: jest.fn().mockResolvedValue({ImageWidth: 42}),
}));

describe("Exif API", () => {
  it("should return the exif data for an image", async () => {
    // Given
    const req: NextApiRequest = {
      query: {
        url: "https://example.com/image.jpg"
      }
    } as unknown as NextApiRequest;

    const res: NextApiResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as NextApiResponse;

    // When
    await getExifAPI(req, res);

    // Then
    expect(require("exifr").parse).toHaveBeenCalledWith("https://example.com/image.jpg");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ImageWidth: 42});
  });

  it("should fail if url is invalid", async () => {
    // Given
    const req: NextApiRequest = {
      query: {}
    } as unknown as NextApiRequest;

    const res: NextApiResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as NextApiResponse;

    // When
    await getExifAPI(req, res);

    // Then
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should fail if exifr fails", async () => {
    // Given
    const req: NextApiRequest = {
      query: {
        url: "https://example.com/image.jpg"
      }
    } as unknown as NextApiRequest;

    const res: NextApiResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as NextApiResponse;

    jest.spyOn(require("exifr"), "parse").mockRejectedValue(new Error("Failed"));

    // When
    await getExifAPI(req, res);

    // Then
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
