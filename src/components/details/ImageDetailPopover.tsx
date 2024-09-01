"use client";

import { Image, ImageExif } from "../../model/image";
import { ReactElement, useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";
import ImageDescription from "./ImageDescription";
import ImageCarousel from "./ImageCarousel";
import useImageStore from "../../store/image.store";

interface Props {
  imageId: string;
  onClose: () => void;
  showCarouel?: boolean;
}

export default function ImageDetailPopover({ imageId, onClose, showCarouel }: Readonly<Props>): ReactElement {

  const imageStore = useImageStore();
  const [image, setImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[] | null>(null);
  const [imageExif, setImageExif] = useState<Partial<ImageExif | null>>(null);

  useEffect(() => {
    if (images) return;
    imageStore.getImages().then(setImages);
  }, [images, imageStore]);

  useEffect(() => {
    if (image || !images) return;
    setImage(images.find((image) => image.id === imageId) ?? null);
  }, [images, image, imageId]);

  useEffect(() => {
    if (!image) return;
    imageStore.getExif(image).then(setImageExif);
  }, [image, imageStore]);

  return (
    <div
      className="z-10 fixed left-0 top-0 w-full h-full bg-bg-light-transparant bg-opacity-60 firefox:bg-opacity-60 backdrop-filter backdrop-blur-lg"
    >
      <div className="flex flex-col md:flex-row justify-between">

        <div className="flex flex-col-reverse md:flex-col w-full h-screen mx-auto md:w-2/3 lg:w-3/4">
          <div className="md:hidden h-screen max-h-30vh">
            <ImageDescription image={image} exif={imageExif} onClose={onClose} />
          </div>
          <ImageViewer image={image} />
          {showCarouel && <ImageCarousel selectedImageId={imageId} images={images} />}
        </div>

        <div className="hidden md:block md:w-1/3 lg:w-1/4 md:h-screen shrink-0 flex-none">
          <ImageDescription image={image} exif={imageExif} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
