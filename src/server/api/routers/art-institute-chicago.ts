import { z } from "zod";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getAllArtists, getAllArtworks } from "@/server/api/types";

const ART_INTITUTE_API_URL = "https://api.artic.edu/api/v1/";
const constructArtImageUrl = (imageId: string) => `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

export const artRouter = createTRPCRouter({
  getAllArtworks: publicProcedure.query(async () => {
    try {
      const apiResponse = await axios.get(`${ART_INTITUTE_API_URL}artworks/`);

      return getAllArtworks.parse(apiResponse.data);
    } catch (error) {
      throw new Error(`getAllArtworks - ${error}`);
    }
  }),
  getAllArtists: publicProcedure.query(async () => {
    try {
      const apiResponse = await axios.get(`${ART_INTITUTE_API_URL}artists/`);

      return getAllArtists.parse(apiResponse.data);
    } catch (error) {
      throw new Error(`getAllArtists - ${error}`);
    }
  }),
  getArtist: publicProcedure
    .input(z.object({ artisitId: z.string() }))
    .query(async ({ input }) => {
      try {
        const apiResponse = await axios.get(
          `${ART_INTITUTE_API_URL}artists/${input.artisitId}`,
        );

        return apiResponse.data;
      } catch (error) {
        throw new Error(`getArtist - ${error}`);
      }
    }),
  getArtwork: publicProcedure
    .input(z.object({ artworkId: z.string() }))
    .query(async ({ input }) => {
      try {
        const apiResponse = await axios.get(
          `${ART_INTITUTE_API_URL}artworks/${input.artworkId}`,
        );

        return apiResponse.data;
      } catch (error) {
        throw new Error(`getArtwork - ${error}`);
      }
    }),
  getArtworkImage: publicProcedure
    .input(z.object({ artWorkImgId: z.string() }))
    .query(async ({ input }) => {
      try {
        const imgUrl = constructArtImageUrl(input.artWorkImgId)
        const apiResponse = await axios.get(imgUrl);

        return z.string().url().parse(apiResponse.data)
      } catch (error) {
        throw new Error(`getArtworkImage - ${error}`);
      }
    })
});
