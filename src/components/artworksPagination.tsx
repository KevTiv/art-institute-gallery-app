"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ArtworksPagination() {
  const params = useSearchParams();
  const currentPage = params.get("page") ? Number(params.get("page")) : 1;

  useEffect(() => {
    if (!currentPage) {
      const params = new URLSearchParams();
      params.set("page", String(1));
    }
  }, []);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/?page=${currentPage - 1 > 0 ? currentPage - 1 : 1}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href={`/?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
