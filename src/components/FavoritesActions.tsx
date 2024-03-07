"use client";

import { useArtworkStore } from "@/store/favoriteArtwork";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { type artWorkDataSchema } from "@/server/api/types";
import { type z } from "zod";

type FavoritesActionsProps = {
  artwork: z.infer<typeof artWorkDataSchema>;
};
export function FavoritesActions({ artwork }: FavoritesActionsProps) {
  const { addArtwork, isInFavorites, removeArtwork } = useArtworkStore();
  const isFavorite = isInFavorites(Number(artwork?.id));

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() =>
          !isFavorite
            ? addArtwork({
                id: artwork.id,
                title: artwork.title,
                image_id: artwork.image_id,
                artist_id: artwork.artist_id,
              })
            : removeArtwork(Number(artwork?.id))
        }
      >
        <Heart fill={isFavorite ? "bg-primary" : "transparent"} />
      </Button>
    </div>
  );
}
