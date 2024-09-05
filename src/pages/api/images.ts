import { type NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(process.env.IMAGES_URL as string, {
      method: "GET"
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.warn(`Could not fetch images :\n${error}`);
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
