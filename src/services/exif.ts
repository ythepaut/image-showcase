import { ImageExif } from "../model/image";
import { DateTime } from "luxon";

export async function getExif(image: HTMLImageElement): Promise<Partial<ImageExif>> {
  const url = new URL("/api/exif", window.location.origin);
  url.searchParams.append("url", image.srcset);

  const response = await fetch(url.toString());

  if (!response.ok) {
    return {};
  }
  try {
    return mapRawExifToImageExif(await response.json());
  } catch (_) {
    return {};
  }
}

function mapRawExifToImageExif(rawExif: any): Partial<ImageExif> {
  const width = rawExif.ImageWidth ?? rawExif.ExifImageWidth;
  const height = rawExif.ImageHeight ?? rawExif.ExifImageHeight;
  const dimensions = width && height ? `${width}×${height}` : undefined;

  let shutterSpeed = rawExif.ISOSpeed;
  if (!shutterSpeed && rawExif.ExposureTime) {
    shutterSpeed = Math.round(1 / rawExif.ExposureTime);
  }
  if (!shutterSpeed && rawExif.ShutterSpeedValue) {
    shutterSpeed = Math.round(1/Math.pow(2, -rawExif.ShutterSpeedValue));
  }

  return {
    dimensions,
    width,
    height,
    createDate: rawExif.CreateDate
      ? DateTime.fromISO(rawExif.CreateDate, { zone: "utc" }).toFormat("dd/MM/yyyy HH:mm:ss")
      : undefined,
    artist: rawExif.Artist,
    focalLength: rawExif.FocalLengthIn35mmFormat ?? rawExif.FocalLength,
    camera: {
      brand: rawExif.Make,
      model: rawExif.Model,
      lens: rawExif.LensModel
    },
    exposure: {
      shutterSpeed,
      aperture: Math.round(rawExif.FNumber * 10) / 10,
      iso: rawExif.ISO,
      compensation: rawExif.ExposureCompensation
    },
    rawExif
  };
}
