import { Image } from "../model/image";

export async function getAllImages(url: string): Promise<Image[]> {
  return new Promise<Image[]>((resolve, reject) => {
    fetch(url, {cache: "force-cache"})
      .then((response) => {
        if (!response.ok) {
          reject("Failed to fetch images");
        } else {
          resolve(response.json());
        }
      })
      .catch((error) => reject(error));
  });
}
