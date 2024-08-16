import { Image } from "../model/image";
import ReactDOMServer from "react-dom/server";
import Shimmer from "./Shimmer";
import { default as NextImage } from "next/image";
import { useEffect } from "react";
import PhotoSwipe from "photoswipe";
import PhotoSwipeLightbox from "photoswipe/lightbox";

interface Props {
  image: Image;
  onClose: () => void;
}

export default function ImageDetailModal({ image, onClose }: Readonly<Props>) {

  // Initialise picture zoom
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${image.alt}`,
      children: "a",
      pswpModule: PhotoSwipe
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, [image.alt]);

  // FIXME: Workaround for body scroll issue
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  return (
    <div
      className="z-10 fixed left-0 top-0 w-full h-full bg-bg-light-transparant bg-opacity-60 firefox:bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="flex flex-col md:flex-row justify-between">

        <div className="md:w-3/5 content-center ml-auto mr-auto">
          <div id={image.alt}>
            <a href={image.src} target="_blank">
              <NextImage
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                className="w-full h-auto max-h-90vh md:rounded-100 object-contain cursor-zoom-in"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                quality={100}
                unoptimized={true}
                placeholder={`data:image/svg+xml,${encodeURIComponent(
                  ReactDOMServer.renderToString(
                    <Shimmer width={image.width} height={image.height} />
                  )
                )}`}
              />
            </a>
          </div>
        </div>

        <div className="bg-bg-light md:w-1/3 md:h-screen h-screen p-200">
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
