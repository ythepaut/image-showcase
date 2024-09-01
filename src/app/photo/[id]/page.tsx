"use client";

import { useParams, useRouter } from "next/navigation";
import React, { ReactElement } from "react";
import ImageDetailPopover from "../../../components/details/ImageDetailPopover";

export const dynamic = "force-dynamic";

export default function PictureDetailsPage(): ReactElement {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  return (
    <section className="p-2 bg-bg-light-secondary h-screen" aria-label="Gallery Section">
      <ImageDetailPopover imageId={id} onClose={() => router.push("/")} showCarouel={false} />
    </section>
  );
}
