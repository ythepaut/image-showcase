import { Image, ImageExif } from "../model/image";
import { useEffect, useRef, useState } from "react";
import BiggerPicture from "bigger-picture";
import { useTranslations } from "next-intl";
import { getExif } from "../services/exif";
import { ArrowTopRightOnSquareIcon, CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
      maxZoom: Math.max(1, Math.max(image.width / window.innerWidth, image.height / window.innerHeight))
    });

    return () => bp.close();
  }, [image]);

  const cameraName = (!imageExif?.camera?.brand && !imageExif?.camera?.model)
    ? t("image-details.unknown-camera")
    : `${imageExif.camera?.brand} ${imageExif.camera?.model}`;

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

        <div className="bg-bg-light md:w-1/3 lg:w-1/4 h-full max-h-30vh md:max-h-screen md:h-screen flex flex-col">

          <div className="flex items-start justify-between py-4 px-6">
            <h2 className="text-base font-semibold leading-6 text-txt">{image.title}</h2>
            <button
              className="relative ml-4 rounded-md bg-white text-grey-600 hover:text-grey-800 active:text-grey-900 transition-colors"
              title={t("common.close")}
              onClick={onClose}
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-y-scroll flex-1 pb-4 px-6">
            {imageExif &&
              <dl className="md:mt-6 space-y-2 md:space-y-4">
                {DISPLAYED_EXIF_ATTRIBUTES
                  .filter(key => imageExif[key])
                  .filter(key => typeof imageExif[key] === "string")
                  .map((key) => (
                    <div key={key}>
                      <dt className="text-md font-medium text-txt-muted sm:w-40 sm:flex-shrink-0">
                        {t(`image-details.exif.${key}`)}
                      </dt>
                      <dd className="mt-1 text-md text-txt sm:col-span-2">{imageExif[key]}</dd>
                    </div>
                  ))}
              </dl>
            }

            {(imageExif?.camera || imageExif?.exposure) &&
              <div className="mt-4 md:mt-6">
                <span className="text-md font-medium text-txt-muted sm:w-40 sm:flex-shrink-0">
                  {t("image-details.camera-settings")}
                </span>
                <div className="flex space-x-4 mt-1">
                  <CameraIcon className="h-10 w-10" />
                  <div className="w-1/3">
                    <p className="text-md text-txt truncate" title={cameraName}>
                      {cameraName}
                    </p>
                    <p className="text-md text-txt truncate" title={imageExif.camera?.lens}>
                      {imageExif.camera?.lens}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1 grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    {!!imageExif.focalLength &&
                      <p className="text-md text-txt">{imageExif.focalLength}mm</p>
                    }
                    {!!imageExif.exposure?.aperture &&
                      <p className="text-md text-txt">f/{imageExif.exposure?.aperture}</p>
                    }
                    {!!imageExif.exposure?.shutterSpeed &&
                      <p className="text-md text-txt">1/{imageExif.exposure?.shutterSpeed}</p>
                    }
                    {!!imageExif.exposure?.iso &&
                      <p className="text-md text-txt">ISO&nbsp;{imageExif.exposure?.iso}</p>
                    }
                  </div>
                </div>
              </div>
            }

            {imageExif &&
              <div className="mt-4 md:mt-6">
                <a
                  className="flex items-start text-md font-medium text-blue hover:text-blue-dark transition sm:w-40 sm:flex-shrink-0"
                  href={`/api/exif?url=${encodeURIComponent(image.src)}`}
                  target="_blank"
                >
                  {t("image-details.view-exif")}&nbsp;
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </a>
              </div>
            }

            {imageExif === null &&
              <div className="mt-4 space-y-8 sm:space-y-6 animate-pulse">
                <div className="space-y-4 sm:space-y-2">
                  <div className="h-3 w-32 bg-grey-400 rounded-full" />
                  <div className="h-3 w-48 bg-grey-400 rounded-full" />
                </div>
                <div className="space-y-4 sm:space-y-2">
                  <div className="h-3 w-24 bg-grey-400 rounded-full" />
                  <div className="h-3 w-40 bg-grey-400 rounded-full" />
                </div>
                <div className="space-y-4 sm:space-y-2">
                  <div className="h-3 w-28 bg-grey-400 rounded-full" />
                  <div className="h-3 w-36 bg-grey-400 rounded-full" />
                </div>
              </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
}
