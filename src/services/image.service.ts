import { Image } from "../model/image";

export async function getAllImages(): Promise<Image[]> {
  const url = new URL("/api/images", window.location.origin);

  const response = await fetch(url.toString(), {cache: "force-cache"});
  if (!response.ok) return [];
  return await response.json();
}
