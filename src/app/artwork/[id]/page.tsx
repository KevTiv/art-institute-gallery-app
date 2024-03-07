import { api } from "@/trpc/server";
import { HeroImageViewer } from "@/components/ImageViewer";
import React from "react";

type ArtworkPageParams = {
  params: { id: string };
};
export default async function Artwork({ params }: ArtworkPageParams) {
  const { data: artwork } = await api.artInstituteOfChicago.getArtwork.query({
    artworkId: params.id,
  });
  const { data: artist } = await api.artInstituteOfChicago.getArtist.query({
    artisitId: String(artwork.artist_id),
  });

  return (
    <main className="flex min-h-screen flex-col gap-4 bg-gradient-to-b from-slate-100 to-slate-200 px-12 py-4 text-slate-900">
      <HeroImageViewer artwork={artwork} imageId={artwork?.image_id} />

      <h3>
        {artwork.title} by {artist.title}
      </h3>
      {artwork.description}

      <h3>{artist.title}</h3>

      <div>{artist.birth_date}</div>
      <div>{artist.death_date}</div>
      <div>{artist.description}</div>
    </main>
  );
}
