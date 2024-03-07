"use client";

import { useArtworkStore } from "@/store/favoriteArtwork";
import { TileImageViewer } from "@/components/ImageViewer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";

export default function Favorites() {
  const { artworks } = useArtworkStore();
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <main className="flex min-h-screen flex-col gap-4 px-12 py-4 ">
        <div className={"grid w-full grid-cols-1 gap-2 md:grid-cols-3"}>
          {artworks.length > 0 ? (
            artworks.map((artwork) => (
              <TileImageViewer key={String(artwork.id)} artwork={artwork} />
            ))
          ) : (
            <div className={"flex h-full w-full items-center justify-center"}>
              <Link href="/">Nothing to show yet...</Link>
            </div>
          )}
        </div>
      </main>
    </Suspense>
  );
}
