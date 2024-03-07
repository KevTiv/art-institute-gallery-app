"use client";

import { SearchArtwork } from "@/components/SearchArtwork";
import Link from "next/link";
import { Heart, Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function Nav() {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Update the URL when selectedFilter changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      if (selectedFilter) {
        params.set("filter", selectedFilter);
      } else {
        params.delete("filter");
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [selectedFilter]);

  return (
    <nav className="flex justify-between px-4 py-2 font-semibold">
      <Link
        href="/"
        passHref
        className="flex items-center gap-2 text-center text-xl"
      >
        <Palette /> Gallery
      </Link>
      <div className="flex items-center gap-12">
        <Select
          onValueChange={(val) => setSelectedFilter(val)}
          defaultValue={selectedFilter ?? ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="is_public_domain">
              Public Domain Artwork
            </SelectItem>
            <SelectItem value="is_on_view">On display</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
        <SearchArtwork />
        <Link href="/favorites" passHref className={"flex items-center gap-2"}>
          Favorites
          <Heart size={12} fill={"bg-primary"} />
        </Link>
      </div>
    </nav>
  );
}
