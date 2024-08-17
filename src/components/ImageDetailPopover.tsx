import { Image, ImageExif } from "../model/image";
import { useEffect, useRef, useState } from "react";
import BiggerPicture from "bigger-picture";
import { useTranslations } from "next-intl";
import { getExif } from "../services/exif";

const MAX_ZOOM = 30;
const DISPLAYED_EXIF_ATTRIBUTES: (keyof ImageExif)[] = ["artist", "createDate", "dimensions"];

interface Props {
  image: Image;
  onClose: () => void;
}

export default function ImageDetailPopover({ image, onClose }: Readonly<Props>) {

  const t = useTranslations();

  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const [imageExif, setImageExif] = useState<Partial<ImageExif | null>>(null);

  // Exif retrieval
  useEffect(() => {
    if (!imageWrapperRef.current) return;

    const observer = new MutationObserver((mutationsList, observer) => {
      if (!imageWrapperRef.current) return;
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const imgElement = imageWrapperRef.current.querySelector("img");
          if (imgElement) {
            getExif(imgElement).then(setImageExif);
            observer.disconnect();
            break;
          }
        }
      }
    });

    observer.observe(imageWrapperRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // FIXME: Workaround for body scroll issue
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Image zooming
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
        alt: image.title
      }],
      scale: 1,
      noClose: true,
      inline: true,
      intro: "fadeup",
      maxZoom: MAX_ZOOM
    });

    return () => bp.close();
  }, [image]);

  return (
    <div
      className="z-10 fixed left-0 top-0 w-full h-full bg-bg-light-transparant bg-opacity-60 firefox:bg-opacity-60 backdrop-filter backdrop-blur-lg"
    >
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full h-full content-center mx-auto">
          <div
            id="image-wrapper"
            ref={imageWrapperRef}
            className="relative h-screen max-h-70vh md:max-h-screen sm:mt-auto sm:mb-auto overflow-hidden before:content-[''] before:block"
          />
        </div>

        <div className="bg-bg-light md:w-1/3 lg:w-1/4 h-screen py-200 px-300">

          <div className="flex items-start justify-between">
            <h2 className="text-base font-semibold leading-6 text-txt">{image.title}</h2>

            <button
              className="relative ml-200 rounded-md bg-white text-grey-600 hover:text-grey-800 active:text-grey-900 transition-colors"
              title={t("common.close")}
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {imageExif &&
            <dl className="mt-200 space-y-8 sm:space-y-6">
              {DISPLAYED_EXIF_ATTRIBUTES
                .filter(key => imageExif[key])
                .map((key) => (
                  <div key={key}>
                    <dt className="text-md font-medium text-txt-muted sm:w-40 sm:flex-shrink-0">{t(`exif.${key}`)}</dt>
                    <dd className="mt-1 text-md text-txt sm:col-span-2">
                      {typeof imageExif[key] === "string" ? imageExif[key] : imageExif[key].join("×")}
                    </dd>
                  </div>
                ))}
            </dl>
          }

          {imageExif === null &&
            <div className="mt-200 space-y-8 sm:space-y-6 animate-pulse">
              <div className="space-y-4 sm:space-y-2">
                <div className="h-150 w-32 bg-grey-400 rounded-full" />
                <div className="h-150 w-48 bg-grey-400 rounded-full" />
              </div>
              <div className="space-y-4 sm:space-y-2">
                <div className="h-150 w-24 bg-grey-400 rounded-full" />
                <div className="h-150 w-40 bg-grey-400 rounded-full" />
              </div>
              <div className="space-y-4 sm:space-y-2">
                <div className="h-150 w-28 bg-grey-400 rounded-full" />
                <div className="h-150 w-36 bg-grey-400 rounded-full" />
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  );
}
