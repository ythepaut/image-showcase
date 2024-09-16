import { type NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const response = await fetch(url as string, {
      method: "GET"
    });
    const contentType = response.headers.get("content-type") ?? "application/octet-stream";
    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", buffer.length.toString());

    res.status(200).send(buffer);
  } catch (error) {
    console.warn(`Could not fetch image :\n${error}`);
    res.status(500).json({ error: `Failed to fetch image \"${url}\"` });
  }
}
