"use client";

import { Image } from "../../model/image";
import { default as NextImage } from "next/image";
import { ReactElement, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  selectedImageId: string;
  images: Image[] | null;
}

export default function ImageCarousel({ selectedImageId, images }: Readonly<Props>): ReactElement {

  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  useEffect(() => {
    if (!images) return;
    images.forEach(image => {
      router.prefetch(`/photo/${image.id}`);
    });
  }, [images, router]);

  return (
    <div
      className="flex px-1 pb-6 md:pb-1 pt-1 md:pt-4 space-x-1 md:place-items-end overflow-x-auto overflow-y-clip scroll-smooth"
      ref={carouselRef}
    >
      {images?.map(image => (
        <Link
          className={selectedImageId === image.id ? "flex-none w-[48px] h-[48px] md:w-[64px] md:h-[64px] cursor-default" : "flex-none w-[40px] h-[40px] md:w-[56px] md:h-[56px]"}
          key={image.id}
          href={`/photo/${image.id}`}
          passHref>
          <NextImage
            className="object-cover w-full h-full rounded-50"
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
          className="flex-none w-[40px] h-[40px] md:w-[56px] md:h-[56px] bg-grey-400 rounded-50 animate-pulse"
        />
      ))}
    </div>
  );
}
