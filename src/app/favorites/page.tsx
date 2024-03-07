"use client";

import { useArtworkStore } from "@/store/favoriteArtwork";
import { TileImageViewer } from "@/components/ImageViewer";

export default function Favorites() {
  const { artworks } = useArtworkStore();
  return (
    <main className="flex min-h-screen flex-col gap-4 bg-gradient-to-b from-slate-100 to-slate-200 px-12 py-4 text-slate-900">
      <div className={"grid w-full grid-cols-1 gap-2 md:grid-cols-3"}>
        {artworks.map((artwork) => (
          <TileImageViewer key={String(artwork.id)} artwork={artwork} />
        ))}
      </div>
    </main>
  );
}
