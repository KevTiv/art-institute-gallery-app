import { SearchArtwork } from "@/components/SearchArtwork";
import Link from "next/link";
import { Palette } from "lucide-react";

export function Nav() {
  return (
    <nav className="bg-secondary flex justify-between px-4 py-2">
      <Link className="flex items-center gap-2 text-center text-xl" href={"/"}>
        <Palette /> Gallery
      </Link>
      <div className="flex items-center gap-12">
        <SearchArtwork />
        <Link className={"text-xl"} href={"/favorites"}>
          Favorites
        </Link>
      </div>
    </nav>
  );
}
