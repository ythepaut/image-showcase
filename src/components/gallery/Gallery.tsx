import { Image } from "../../model/image";
import ImageTile from "./ImageTile";
import { useEffect, useState } from "react";

const SCREEN_WIDTH_XL = 1280;
const SCREEN_WIDTH_MD = 768;

interface Props {
  images: Image[];
}

export default function Gallery({ images }: Readonly<Props>) {
  const [columns, setColumns] = useState<number>(1);

  // Window width handling for column count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= SCREEN_WIDTH_XL) setColumns(3);
      else if (window.innerWidth >= SCREEN_WIDTH_MD) setColumns(2);
      else setColumns(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Arranging the images into the columns
  // Each image is added to the column with the lowest height
  const columnHeights: number[] = Array(columns).fill(0);
  const columnWrappers: Image[][] = Array.from({ length: columns }, () => []);
  images.forEach((image: Image) => {
    const shortestColumnIdx = columnHeights.indexOf(Math.min(...columnHeights));
    columnWrappers[shortestColumnIdx].push(image);
    columnHeights[shortestColumnIdx] += image.height / image.width;
  });

  return (
    <div
      className={`gap-0 ${
        columns === 1 ? "columns-1" : columns === 2 ? "columns-2" : "columns-3"
      }`}
    >
      {columnWrappers.flat().map((image: Image) => (
        <ImageTile image={image} key={image.src} />
      ))}
    </div>
  );
}
