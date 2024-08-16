import { Image } from "../../model/image";
import { default as NextImage } from "next/image";
import ReactDOMServer from "react-dom/server";
import Shimmer from "../Shimmer";

interface Props {
  image: Image;
}

export default function ImageTile({ image }: Readonly<Props>) {
  return (
    <div className="p-50">
      <NextImage
        className="w-full rounded-50"
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        placeholder={`data:image/svg+xml,${encodeURIComponent(
          ReactDOMServer.renderToString(
            <Shimmer width={image.width} height={image.height} />
          )
        )}`}
      />
    </div>
  );
}
