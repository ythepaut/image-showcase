"use client";

import { useParams, useRouter } from "next/navigation";
import ImageDetailPopover from "../../../../components/details/ImageDetailPopover";
import { ElementRef, ReactPortal, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const dynamic = "force-dynamic";

export default function PictureDetailsPage(): ReactPortal {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const close = () => {
    dialogRef.current?.close();
    router.push("/", { scroll: false });
    document.body.style.overflow = "auto";
  };

  // FIXME: Workaround for body scroll issue
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <dialog ref={dialogRef}>
      <ImageDetailPopover imageId={id} onClose={close} showCarouel={true} />
    </dialog>,
    document.getElementById("modal-root")!
  );
}
