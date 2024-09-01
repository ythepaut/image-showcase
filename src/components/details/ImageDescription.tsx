import { Image, ImageExif } from "../../model/image";
import { ArrowTopRightOnSquareIcon, CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";

const DISPLAYED_EXIF_ATTRIBUTES: (keyof ImageExif)[] = ["artist", "createDate", "dimensions"];

interface Props {
  image: Image | null;
  exif: Partial<ImageExif> | null;
  onClose: () => void;
}

export default function ImageDescription({ image, exif, onClose }: Readonly<Props>): ReactElement {

  const t = useTranslations();

  const cameraName = (!exif?.camera?.brand && !exif?.camera?.model)
    ? t("image-details.unknown-camera")
    : `${exif.camera?.brand} ${exif.camera?.model}`;

  return (
    <div className="bg-bg-light flex flex-col h-full">
      <div className="flex items-start justify-between py-4 px-6">
        {image
          ? <h2 className="text-base font-semibold leading-6 text-txt">{image.title}</h2>
          : <div className="h-6 w-32 bg-grey-400 rounded-full animate-pulse" />
        }
        <button
          className="relative ml-4 rounded-md bg-white text-grey-600 hover:text-grey-800 active:text-grey-900 transition-colors"
          title={t("common.close")}
          onClick={onClose}
        >
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 pb-4 px-6">
        {exif &&
          <dl className="space-y-2 md:space-y-4">

            {DISPLAYED_EXIF_ATTRIBUTES
              .filter(key => exif[key])
              .filter(key => typeof exif[key] === "string")
              .map((key) => (
                <div key={key}>
                  <dt className="text-md font-medium text-txt-muted sm:w-40 sm:flex-shrink-0">
                    {t(`image-details.exif.${key}`)}
                  </dt>
                  <dd className="mt-1 text-md text-txt sm:col-span-2">{exif[key]}</dd>
                </div>
              ))}
          </dl>
        }

        {(exif?.camera || exif?.exposure) &&
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
                <p className="text-md text-txt truncate" title={exif.camera?.lens}>
                  {exif.camera?.lens}
                </p>
              </div>
              <div className="min-w-0 flex-1 grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                {!!exif.focalLength &&
                  <p className="text-md text-txt">{exif.focalLength}mm</p>
                }
                {!!exif.exposure?.aperture &&
                  <p className="text-md text-txt">f/{exif.exposure?.aperture}</p>
                }
                {!!exif.exposure?.shutterSpeed &&
                  <p className="text-md text-txt">1/{exif.exposure?.shutterSpeed}</p>
                }
                {!!exif.exposure?.iso &&
                  <p className="text-md text-txt">ISO&nbsp;{exif.exposure?.iso}</p>
                }
              </div>
            </div>
          </div>
        }

        {image && exif &&
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

        {exif === null &&
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
  );
}
