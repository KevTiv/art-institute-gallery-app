"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import useDebounce from "@/hooks/useDebounce";

export function SearchArtwork() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState(() => {
    // Initialize search term from the URL query parameters
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("search") ?? "";
    }
    return "";
  });

  const [showSearchResults, setShowSearchResults] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Update URL with debounced search term
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (debouncedSearch?.trim() !== "") {
        params.set("search", String(debouncedSearch).trim());
      } else {
        params.delete("search");
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [debouncedSearch]);

  // Fetch search results
  const { data: searchResult, isLoading: isLoadingSearch } =
    api.artInstituteOfChicago.getAllArtworks.useQuery(
      {
        search: debouncedSearch,
        pagination: {
          page: 1,
          limit: 25,
        },
      },
      {
        queryKey: [
          "artInstituteOfChicago.getAllArtworks",
          { search: debouncedSearch },
        ],
        enabled: !!debouncedSearch,
      },
    );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" relative flex  flex-col justify-between gap-4 px-2">
      <Input
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSearchResults(true)}
        placeholder="Search title, content, ..."
        className={"min-w-[180px]"}
      />

      {showSearchResults && !isLoadingSearch && (
        <div
          ref={searchResultRef}
          className={
            "bg-secondary/90 absolute right-0 top-[115%] z-10 grid w-[50vw] grid-cols-2 flex-col overflow-y-scroll rounded-lg px-8"
          }
        >
          {searchResult?.data.map(
            (artwork) =>
              artwork.id && (
                <div
                  key={artwork.id}
                  className={"flex flex-col items-start justify-center"}
                >
                  <Link href={`/artwork/${artwork.id}`} key={artwork.title}>
                    {artwork.title}
                  </Link>
                  <Separator className="my-2 " />
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}
