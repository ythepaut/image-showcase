"use client";

import { Image, ImageExif } from "../../model/image";
import { useEffect, useState } from "react";
import { getExif } from "../../services/exif";
import ImageViewer from "./ImageViewer";
import ImageDescription from "./ImageDescription";
import ImageCarousel from "./ImageCarousel";

interface Props {
  image: Image;
  images: Image[];
  onClose: () => void;
  onSelectImage: (image: Image) => void;
}

export default function ImageDetailPopover({ image, images, onClose, onSelectImage }: Readonly<Props>) {

  const [imageExif, setImageExif] = useState<Partial<ImageExif | null>>(null);

  // FIXME: Workaround for body scroll issue
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setImageExif(null);
    getExif(image).then(setImageExif);
  }, [image]);

  return (
    <div
      className="z-10 fixed left-0 top-0 w-full h-full bg-bg-light-transparant bg-opacity-60 firefox:bg-opacity-60 backdrop-filter backdrop-blur-lg"
    >
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col-reverse md:flex-col w-full h-screen content-center mx-auto">

          <div className="md:hidden h-screen max-h-30vh">
            <ImageDescription image={image} exif={imageExif} onClose={onClose} />
          </div>
          <ImageViewer image={image} />
          <ImageCarousel selectedImage={image} images={images} onImageSelect={onSelectImage} />

        </div>

        <div className="md:w-1/3 lg:w-1/4 md:h-screen">
          <ImageDescription image={image} exif={imageExif} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
