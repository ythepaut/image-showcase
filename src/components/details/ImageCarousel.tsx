"use client";

import { Image } from "../../model/image";
import { default as NextImage } from "next/image";
import { ReactElement, useEffect, useRef } from "react";
import Link from "next/link";

interface Props {
  selectedImage: Image | null;
  images: Image[] | null;
}

export default function ImageCarousel({ selectedImage, images }: Readonly<Props>): ReactElement {

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
      {images && images.map(image => (
        <Link key={image.id} href={`/photo/${image.id}`} passHref>
          <NextImage
            className={`object-cover flex-none ${selectedImage?.id === image.id ? "w-[40px] h-[40px] md:w-[64px] md:h-[64px] cursor-default" : "w-[32px] h-[32px] md:w-[56px] md:h-[56px]"} rounded-50`}
            src={image.src}
            alt={image.title}
            width={image.width}
            height={image.height}
            quality={1}
            unoptimized={false}
          />
        </Link>
      ))}

      {!images && Array.from(Array(20), (_, i) => i).map(i => (
        <div
          key={i}
          className="object-cover flex-none w-[32px] h-[32px] md:w-[56px] md:h-[56px] bg-grey-400 rounded-50 animate-pulse"
        />
      ))}
    </div>
  );
}
