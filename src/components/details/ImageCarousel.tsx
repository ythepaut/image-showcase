"use client";

import { Image } from "../../model/image";
import { default as NextImage } from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  selectedImage: Image;
  images: Image[];
  onImageSelect: (image: Image) => void;
}

export default function ImageCarousel({ selectedImage, images, onImageSelect }: Readonly<Props>) {

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        carousel.scrollLeft += event.deltaY;
      };
      carousel.addEventListener("wheel", handleWheel);
      return () => carousel.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <div
      className="flex w-full px-1 pb-4 md:pb-1 pt-1 md:pt-4 space-x-1 md:place-items-end overflow-x-auto overflow-y-clip scroll-smooth"
      ref={carouselRef}
    >
      {images.map(image => (
        <NextImage
          key={image.title}
          className={`object-cover flex-none ${selectedImage === image ? "w-[40px] h-[40px] md:w-[64px] md:h-[64px]" : "w-[32px] h-[32px] md:w-[56px] md:h-[56px] cursor-pointer"} rounded-50`}
          onClick={() => onImageSelect(image)}
          src={image.src}
          alt={image.title}
          width={image.width}
          height={image.height}
          quality={1}
          unoptimized={false}
        />
      ))}
    </div>
  );
}
