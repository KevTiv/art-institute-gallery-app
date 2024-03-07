import { SearchArtwork } from "@/components/SearchArtwork";
import Link from "next/link";

export function Nav() {
  return (
    <nav className="bg-secondary flex justify-between px-4 py-2">
      <h1 className="text-center text-xl">Welcome to mock Gallery</h1>
      <div className="flex items-center gap-12">
        <SearchArtwork />
        <Link className={"text-xl"} href={"/favorites"}>
          Favorites
        </Link>
      </div>
    </nav>
  );
}
