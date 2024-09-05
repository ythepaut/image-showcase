"use client";

import Gallery from "../components/gallery/Gallery";
import useImageStore from "../store/image.store";
import { Image } from "../model/image";
import { useEffect, useState } from "react";

export default function HomePage() {

  const imageStore = useImageStore();
  const [images, setImages] = useState<Image[] | null>(null);

  useEffect(() => {
    if (images) return;
    imageStore.getImages().then(setImages);
  }, [images, imageStore]);

  return (
    <section className="p-2 bg-bg-light" aria-label="Gallery Section">
      <Gallery images={images ?? []} />
    </section>
  );
}
