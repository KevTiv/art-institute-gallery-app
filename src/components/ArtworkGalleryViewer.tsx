"use client";

import { HeroImageViewer, TileImageViewer } from "@/components/ImageViewer";
import { type z } from "zod";
import { type getAllArtworks } from "@/server/api/types";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { ArtworksPagination } from "@/components/artworksPagination";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";

type ArtworkGalleryViewerProps = {
  allArtworksResponse?: z.infer<typeof getAllArtworks>;
};

export function ArtworkGalleryViewer({
  allArtworksResponse,
}: ArtworkGalleryViewerProps) {
  const [searchTerm, setSearchTerm] = useState<string>();
  const params = useSearchParams();
  const page = Number(params.get("page") ?? 1);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading } = api.artInstituteOfChicago.getAllArtworks.useQuery(
    {
      pagination: {
        page,
        limit: 16,
      },
      search: debouncedSearch,
    },
    {
      queryKey: [
        "artInstituteOfChicago.getAllArtworks",
        { search: debouncedSearch },
      ],
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
      <div className="flex justify-between gap-4 px-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Artworks"
          className={"mx-2"}
        />
      </div>

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
