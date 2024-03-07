"use client";

import { HeroImageViewer, TileImageViewer } from "@/components/ImageViewer";
import { type z } from "zod";
import { type getAllArtworks } from "@/server/api/types";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { ArtworksPagination } from "@/components/artworksPagination";

type ArtworkGalleryViewerProps = {
  allArtworksResponse?: z.infer<typeof getAllArtworks>;
};

export function ArtworkGalleryViewer({
  allArtworksResponse,
}: ArtworkGalleryViewerProps) {
  const params = useSearchParams();
  const page = Number(params.get("page") ?? 1);
  const { data, isLoading } = api.artInstituteOfChicago.getAllArtworks.useQuery(
    {
      pagination: {
        page,
        limit: 16,
      },
    },
    {
      initialData: allArtworksResponse,
    },
  );

  const pagination = data?.pagination;
  const artworks = data?.data;
  const randomArtwork = artworks?.[Math.floor(Math.random() * artworks.length)];

  return (
    <>
      <HeroImageViewer
        artwork={randomArtwork}
        imageId={randomArtwork?.image_id}
      />

      <div className={"grid w-full grid-cols-1 gap-2 md:grid-cols-3"}>
        {!isLoading &&
          artworks
            ?.filter((artwork) => artwork.id !== randomArtwork?.id)
            .map((artwork) => (
              <TileImageViewer key={String(artwork.id)} artwork={artwork} />
            ))}
      </div>

      {Number(pagination?.total_pages) > 1 && <ArtworksPagination />}
    </>
  );
}
