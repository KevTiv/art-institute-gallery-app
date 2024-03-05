import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const hello = await api.artInstituteOfChicago.getAllArtworks.query();
  const hello2 = await api.artInstituteOfChicago.getAllArtists.query();

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900">
      <header className={"flex w-full justify-between gap-3 px-4 py-2"}>
        <h1 className="text-center text-xl">Welcome to mock Gallery</h1>
        <div>
          <Link className={"text-xl"} href={"/"}>
            Random
          </Link>
          <Link className={"text-xl"} href={"/"}>
            Favorites
          </Link>
        </div>
      </header>
      {hello.data[0]?.artist_display} - {hello2.data[0]?.id}
    </main>
  );
}
