"use client";

import { constructArtImageUrl } from "@/lib/utils";
import { type artWorkDataSchema } from "@/server/api/types";
import { type z } from "zod";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ImageViewerProps = {
  imageId?: string | null;
  artwork?: z.infer<typeof artWorkDataSchema>;
  isLoading?: boolean;
  showTitle?: boolean;
};
export function HeroImageViewer({
  imageId,
  artwork,
  isLoading,
  showTitle = true,
}: ImageViewerProps) {
  return !isLoading ? (
    <Link
      className="relative min-h-[30vh] w-full"
      href={`/artwork/${artwork?.id}`}
    >
      <img
        className={"z-0 h-full w-full px-2 py-6"}
        src={constructArtImageUrl(imageId) ?? ""}
        alt={artwork?.title ?? ""}
      />
      {showTitle && (
        <h3
          className={
            "absolute bottom-12 z-10 flex w-full max-w-4xl flex-col px-12 text-xl font-bold font-semibold mix-blend-lighten"
          }
        >
          {artwork?.title}{" "}
          <span className={"text-secondary text-clip text-lg "}>
            {artwork?.artist_display}
          </span>
        </h3>
      )}
    </Link>
  ) : (
    <Skeleton className={"min-h-[30vh] w-full"} />
  );
}

export function TileImageViewer({ artwork, isLoading }: ImageViewerProps) {
  const imgsrc = useMemo(
    () => constructArtImageUrl(artwork?.image_id) ?? "",
    [artwork],
  );

  return !isLoading ? (
    <Link
      className="relative w-full overflow-hidden overflow-hidden"
      href={`/artwork/${artwork?.id}`}
    >
      <img
        className={"z-0 h-full w-full overflow-hidden rounded-md"}
        src={imgsrc}
        alt={artwork?.title ?? ""}
      />

      <h3
        className={
          "text-secondary absolute bottom-6 z-10 flex w-full max-w-md flex-col text-clip p-2 text-xs font-bold mix-blend-lighten"
        }
      >
        {artwork?.title}
      </h3>
    </Link>
  ) : (
    <Skeleton className={"aspect-auto w-full"} />
  );
}
