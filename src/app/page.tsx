import Gallery from "../components/gallery/Gallery";
import { Image } from "../model/image";
import { getAllImages } from "../services/image.service";

export default async function HomePage() {
  const images: Image[] = await getAllImages(process.env.imagesUrl ?? "");
  return (
    <section className="p-2 bg-bg-light" aria-label="Gallery Section">
      <Gallery images={images} />
    </section>
  );
}
