import { Image } from "../../model/image";
import { default as NextImage } from "next/image";
import ReactDOMServer from "react-dom/server";
import Shimmer from "../Shimmer";

interface Props {
  image: Image;
  onClick: () => void;
}

export default function ImageTile({ image, onClick }: Readonly<Props>) {
  return (
    <div className="p-1">
      <NextImage
        data-pswp-width={image.width}
        data-pswp-height={image.height}
        className="w-full rounded-50 cursor-pointer"
        onClick={onClick}
        src={image.src}
        alt={image.title}
        width={image.width}
        height={image.height}
        quality={1}
        unoptimized={false}
        placeholder={`data:image/svg+xml,${encodeURIComponent(
          ReactDOMServer.renderToString(
            <Shimmer width={image.width} height={image.height} />
          )
        )}`}
      />
    </div>
  );
}
