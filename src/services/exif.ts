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

  let shutterSpeed = rawExif.ISOSpeed;
  if (!shutterSpeed && rawExif.ShutterSpeedValue) {
    shutterSpeed = 1 / rawExif.ShutterSpeedValue;
  }
  if (!shutterSpeed && rawExif.ExposureTime) {
    shutterSpeed = 1 / rawExif.ExposureTime;
  }

  return {
    dimensions: width && height ? [width, height] : undefined,
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
      aperture: Math.round(rawExif.FNumber),
      iso: rawExif.ISO,
      compensation: rawExif.ExposureCompensation
    },
    rawExif
  };
}
