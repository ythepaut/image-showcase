import Gallery from "../../components/gallery/Gallery";
import { Image } from "../../model/image";

const fetchImages = async () => {
  const response = await fetch("http://localhost:3000/assets/images.json");
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
