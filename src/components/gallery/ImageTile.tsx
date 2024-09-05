import { Image } from "../../model/image";
import { default as NextImage } from "next/image";
import ReactDOMServer from "react-dom/server";
import Shimmer from "../Shimmer";
import { ReactElement } from "react";

interface Props {
  image: Image;
}

export default function ImageTile({ image }: Readonly<Props>): ReactElement {
  return (
    <div className="relative group">
      <NextImage
        className="w-full rounded-50 cursor-pointer"
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
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-20 rounded-50 bg-gradient-to-t from-black to-transparant opacity-0 group-hover:opacity-40 transition-opacity" />
      <div className="hidden md:block px-6 py-4 absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xl text-txt-white font-medium">
          {image.title}
        </span>
      </div>
    </div>
  );
}
