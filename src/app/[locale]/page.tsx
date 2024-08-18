import Gallery from "../../components/gallery/Gallery";
import { Image } from "../../model/image";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const fetchImages = async () => {
  const response = await fetch(`${publicRuntimeConfig.appUrl}/assets/images.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return response.json();
};

export default async function HomePage() {
  const images: Image[] = await fetchImages();
  return (
    <section className="p-2 bg-bg-light" aria-label="Gallery Section">
      <Gallery images={images} />
    </section>
  );
}
