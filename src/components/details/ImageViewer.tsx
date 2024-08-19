"use client";

import { Image } from "../../model/image";
import { useEffect, useRef } from "react";
import BiggerPicture from "bigger-picture";

interface Props {
  image: Image;
}

export default function ImageViewer({ image }: Readonly<Props>) {

  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  // bp initialisation
  useEffect(() => {
    if (!imageWrapperRef.current) return;

    const bp = BiggerPicture({
      target: imageWrapperRef.current
    });
    bp.open({
      items: [{
        img: image.src,
        thumb: image.src,
        width: image.width,
        height: image.height,
        alt: image.title
      }],
      scale: 1,
      noClose: true,
      inline: true,
      intro: "fadeup",
      maxZoom: Math.max(1, Math.max(image.width / window.innerWidth, image.height / window.innerHeight))
    });

    return () => bp.close();
  }, [image]);

  return (
    <div className="w-full h-full content-center mx-auto">
      <div
        id="image-wrapper"
        data-testid="image-wrapper"
        ref={imageWrapperRef}
        className="relative h-full sm:mt-auto sm:mb-auto overflow-hidden before:content-[''] before:block"
      />
    </div>
  );
}
