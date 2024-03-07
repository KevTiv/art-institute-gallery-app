import { z } from "zod";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  getAllArtworks,
  getArtistDetail,
  getArtworkDetails,
} from "@/server/api/types";

const ART_INTITUTE_API_URL = "https://api.artic.edu/api/v1/";

export const artRouter = createTRPCRouter({
  getAllArtworks: publicProcedure
    .input(
      z
        .object({
          pagination: z
            .object({
              page: z.number(),
              limit: z.number(),
            })
            .optional(),
          filter: z
            .object({
              is_public_domain: z.boolean().optional(),
              is_on_view: z.boolean().optional(),
            })
            .optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      try {
        const apiResponse = await axios.get(
          `${ART_INTITUTE_API_URL}artworks/${!!input?.search ? `search?q=${input.search}` : ""}`,
          {
            params: {
              page: input?.pagination?.page ?? 1,
              limit: input?.pagination?.limit ?? 16,
            },
            data: input?.filter
              ? {
                  query: {
                    term: {
                      is_public_domain: input.filter.is_public_domain,
                      is_on_view: input.filter.is_on_view,
                    },
                  },
                }
              : undefined,
          },
        );

        return getAllArtworks.parse(apiResponse.data);
      } catch (error) {
        throw new Error(`getAllArtworks - ${error as string}`);
      }
    }),
  getArtist: publicProcedure
    .input(z.object({ artisitId: z.string() }))
    .query(async ({ input }) => {
      try {
        const apiResponse = await axios.get(
          `${ART_INTITUTE_API_URL}artists/${input.artisitId}`,
        );

        return getArtistDetail.parse(apiResponse.data);
      } catch (error) {
        throw new Error(`getArtist - ${error as string}`);
      }
    }),
  getArtwork: publicProcedure
    .input(z.object({ artworkId: z.string() }))
    .query(async ({ input }) => {
      try {
        const apiResponse = await axios.get(
          `${ART_INTITUTE_API_URL}artworks/${input.artworkId}`,
        );

        return getArtworkDetails.parse(apiResponse.data);
      } catch (error) {
        throw new Error(`getArtwork - ${error as string}`);
      }
    }),
});
