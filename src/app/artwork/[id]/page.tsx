import { api } from "@/trpc/server";
import { HeroImageViewer } from "@/components/ImageViewer";
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useArtworkStore } from "@/store/favoriteArtwork";
import { FavoritesActions } from "@/components/FavoritesActions";

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
      <div className={"relative"}>
        <HeroImageViewer artwork={artwork} imageId={artwork?.image_id} />
        <FavoritesActions artwork={artwork} />
      </div>

      <h3 className={"text-2xl font-semibold"}>
        {artwork.title} by {artist.title}
      </h3>

      <p className={"text-sm"}>
        {artwork.description?.replace(/<\/?p>|&quot;|<em>|<\/em>/g, "")}
      </p>

      {artwork.date_start && artwork.date_end && artist.title && (
        <p className={"text-xs"}>
          {artist.title} started working on this piece in {artwork.date_start}{" "}
          and finsihed in {artwork.date_end}
        </p>
      )}
    </main>
  );
}
