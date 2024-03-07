import { type z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type artWorkDataSchema } from "@/server/api/types";

type Artwork = z.infer<typeof artWorkDataSchema>;
type FavoriteArtworks = {
  artworks: Partial<Artwork>[];
  isInFavorites: (artworkId: number) => boolean;
  addArtwork: (artwork: Artwork) => void;
  removeArtwork: (artworkId: number) => void;
};

export const useArtworkStore = create(
  persist<FavoriteArtworks>(
    (set, get) => ({
      artworks: [],
      addArtwork: (artwork) =>
        set((state) => ({
          artworks: [
            ...state.artworks,
            {
              id: artwork.id,
              title: artwork.title,
              image_id: artwork.image_id,
            },
          ],
        })),
      removeArtwork: (artworkId) =>
        set((state) => ({
          artworks: state.artworks.filter(
            (artwork) => artwork.id !== artworkId,
          ),
        })),
      isInFavorites: (artworkId) =>
        get().artworks.some((artwork) => artwork.id === artworkId),
    }),
    {
      name: "location-storage", // Unique name for sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage for persistence
    },
  ),
);
