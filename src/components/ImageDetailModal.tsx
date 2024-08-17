import { Image } from "../model/image";
import { useEffect } from "react";
import BiggerPicture from "bigger-picture";

interface Props {
  image: Image;
  onClose: () => void;
}

export default function ImageDetailModal({ image, onClose }: Readonly<Props>) {

  // FIXME: Workaround for body scroll issue
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const bp = BiggerPicture({
      target: document.getElementById("image-wrapper")!
    });
    bp.open({
      items: [{
        img: image.src,
        thumb: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt
      }],
      scale: 1,
      noClose: true,
      inline: true,
      intro: "fadeup",
      maxZoom: Math.max(image.width / window.innerWidth, image.height / window.innerHeight)
    });

    return () => bp.close();
  }, [image]);

  return (
    <div className="z-10 fixed left-0 top-0 w-full h-full bg-bg-light-transparant bg-opacity-60 firefox:bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full h-full content-center ml-auto mr-auto">
          <div
            id="image-wrapper"
            className="relative h-screen max-h-70vh md:max-h-screen sm:mt-auto sm:mb-auto overflow-hidden before:content-[''] before:block"
          />
        </div>

        <div className="bg-bg-light md:w-1/3 lg:w-1/4 h-screen p-200">
          <button
            className="mt-50 mr-50 text-4xl text-text-light"
            onClick={onClose}
          >
              &times;
          </button>
          <br />
          <br />
          {image.alt}
        </div>
      </div>
    </div>
  );
}
