import { z } from "zod";

const paginationSchema = z.object({
  total: z.number().nullable().optional(),
  limit: z.number().nullable().optional(),
  offset: z.number().nullable().optional(),
  total_pages: z.number().nullable().optional(),
  current_page: z.number().nullable().optional(),
  next_url: z.string().nullable().optional(),
});

const autocompleteSchema = z.object({
  input: z.array(z.string()).nullable(),
  weight: z.number().nullable(),
  contexts: z.object({
    groupings: z.array(z.string()).nullable(),
  }),
});

export const artWorkDataSchema = z.object({
  id: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  alt_titles: z.array(z.string()).nullable().optional(),
  date_start: z.number().nullable().optional(),
  date_end: z.number().nullable().optional(),
  date_display: z.string().nullable().optional(),
  artist_display: z.string().nullable().optional(),
  place_of_origin: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  short_description: z.string().nullable().optional(),
  provenance_text: z.string().nullable().optional(),
  is_public_domain: z.boolean().nullable().optional(),
  is_on_view: z.boolean().nullable().optional(),
  artist_id: z.number().nullable().optional(),
  artist_title: z.string().nullable().optional(),
  alt_artist_ids: z.array(z.number()).nullable().optional(),
  image_id: z.string().nullable().optional(),
  alt_image_ids: z.array(z.string()).nullable().optional(),
});

const infoSchema = z.object({
  license_text: z.string().nullable(),
  license_links: z.array(z.string()).nullable(),
  version: z.string().nullable(),
});

const configSchema = z.object({
  iiif_url: z.string().nullable(),
  website_url: z.string().nullable(),
});

const artistDetails = z.object({
  id: z.number().nullable(),
  api_model: z.string().nullable(),
  api_link: z.string().nullable(),
  title: z.string().nullable(),
  sort_title: z.string().nullable(),
  alt_titles: z.array(z.string()).nullable(),
  is_artist: z.boolean().nullable(),
  birth_date: z.number().nullable(),
  death_date: z.number().nullable(),
  description: z.string().nullable(),
  ulan_id: z.string().nullable(),
  suggest_autocompleteSchema_boosted: autocompleteSchema.optional(),
  suggest_autocompleteSchema_all: autocompleteSchema.optional(),
  source_updated_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  timestamp: z.string().nullable(),
});

export const getAllArtworks = z.object({
  pagination: paginationSchema,
  data: z.array(artWorkDataSchema),
  info: infoSchema,
  config: configSchema,
});

export const getArtworkDetails = z.object({
  data: artWorkDataSchema,
  info: infoSchema,
  config: configSchema,
});

export const getAllArtists = z.object({
  pagination: paginationSchema,
  data: z.array(artistDetails),
  info: infoSchema,
  config: configSchema,
});

export const getArtistDetail = z.object({
  data: artistDetails,
  info: infoSchema,
  config: configSchema,
});
