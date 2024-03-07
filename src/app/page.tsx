import { unstable_noStore as noStore } from "next/cache";
import { api } from "@/trpc/server";
import { ArtworkGalleryViewer } from "@/components/ArtworkGalleryViewer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Home() {
  noStore();
  const allArtworksResponse =
    await api.artInstituteOfChicago.getAllArtworks.query();

  return (
    <main className="flex min-h-screen flex-col gap-4  px-12 py-4 text-slate-900">
      <Suspense fallback={<Skeleton className="h-full w-full" />}>
        <h3 className={"mx-2 text-2xl font-semibold"}>Gallery Collection</h3>
        <ArtworkGalleryViewer allArtworksResponse={allArtworksResponse} />
      </Suspense>
    </main>
  );
}
