import type { NextApiRequest, NextApiResponse } from "next";
import exifr from "exifr";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    res.status(200).json(await exifr.parse(url));
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Failed to get image EXIF" });
  }

}
