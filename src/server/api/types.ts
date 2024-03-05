import { z } from "zod";

const paginationSchema = z.object({
  total: z.number().nullable(),
  limit: z.number().nullable(),
  offset: z.number().nullable(),
  total_pages: z.number().nullable(),
  current_page: z.number().nullable(),
  next_url: z.string().nullable(),
});

const thumbnailSchema = z.object({
  lqip: z.string().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  alt_text: z.string().nullable(),
});

const dimensionDetailSchema = z.object({
  depth: z.number().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  diameter: z.number().nullable(),
  clarification: z.string().nullable(),
});

const colorSchema = z.object({
  h: z.number().nullable(),
  l: z.number().nullable(),
  s: z.number().nullable(),
  percentage: z.number().nullable(),
  population: z.number().nullable(),
});

const autocompleteSchema = z.object({
  input: z.array(z.string()).nullable(),
  weight: z.number().nullable(),
  contexts: z.object({
    groupings: z.array(z.string()).nullable(),
  }),
});

const artWorkDataSchema = z.object({
  id: z.number().nullable(),
  api_model: z.string().nullable(),
  api_link: z.string().nullable(),
  is_boosted: z.boolean().nullable(),
  title: z.string().nullable(),
  alt_titles: z.string().nullable(),
  thumbnailSchema: thumbnailSchema.optional(),
  main_reference_number: z.string().nullable(),
  has_not_been_viewed_much: z.boolean().nullable(),
  boost_rank: z.number().nullable(),
  date_start: z.number().nullable(),
  date_end: z.number().nullable(),
  date_display: z.string().nullable(),
  date_qualifier_title: z.string().nullable(),
  date_qualifier_id: z.number().nullable(),
  artist_display: z.string().nullable(),
  place_of_origin: z.string().nullable(),
  description: z.string().nullable(),
  short_description: z.string().nullable(),
  dimensions: z.string().nullable(),
  dimensions_detail: z.array(dimensionDetailSchema).nullable(),
  medium_display: z.string().nullable(),
  inscriptions: z.string().nullable(),
  credit_line: z.string().nullable(),
  catalogue_display: z.string().nullable(),
  publication_history: z.string().nullable(),
  exhibition_history: z.string().nullable(),
  provenance_text: z.string().nullable(),
  edition: z.string().nullable(),
  publishing_verification_level: z.string().nullable(),
  internal_department_id: z.number().nullable(),
  fiscal_year: z.number().nullable(),
  fiscal_year_deaccession: z.number().nullable(),
  is_public_domain: z.boolean().nullable(),
  is_zoomable: z.boolean().nullable(),
  max_zoom_window_size: z.number().nullable(),
  copyright_notice: z.string().nullable(),
  has_multimedia_resources: z.boolean().nullable(),
  has_educational_resources: z.boolean().nullable(),
  has_advanced_imaging: z.boolean().nullable(),
  colorSchemafulness: z.number().optional(),
  colorSchema: colorSchema.optional(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  latlon: z.string().nullable(),
  is_on_view: z.boolean().nullable(),
  on_loan_display: z.string().nullable(),
  gallery_title: z.string().nullable(),
  gallery_id: z.string().nullable(),
  nomisma_id: z.string().nullable(),
  artwork_type_title: z.string().nullable(),
  artwork_type_id: z.number().nullable(),
  department_title: z.string().nullable(),
  department_id: z.string().nullable(),
  artist_id: z.number().nullable(),
  artist_title: z.string().nullable(),
  alt_artist_ids: z.array(z.number()).nullable(),
  artist_ids: z.array(z.number()).nullable(),
  artist_titles: z.array(z.string()).nullable(),
  category_ids: z.array(z.string()).nullable(),
  category_titles: z.array(z.string()).nullable(),
  term_titles: z.array(z.string()).nullable(),
  style_id: z.string().nullable(),
  style_title: z.string().nullable(),
  alt_style_ids: z.array(z.string()).nullable(),
  style_ids: z.array(z.string()).nullable(),
  style_titles: z.array(z.string()).nullable(),
  classification_id: z.string().nullable(),
  classification_title: z.string().nullable(),
  alt_classification_ids: z.array(z.string()).nullable(),
  classification_ids: z.array(z.string()).nullable(),
  classification_titles: z.array(z.string()).nullable(),
  subject_id: z.string().nullable(),
  alt_subject_ids: z.array(z.string()).nullable(),
  subject_ids: z.array(z.string()).nullable(),
  subject_titles: z.array(z.string()).nullable(),
  material_id: z.string().nullable(),
  alt_material_ids: z.array(z.string()).nullable(),
  material_ids: z.array(z.string()).nullable(),
  material_titles: z.array(z.string()).nullable(),
  technique_id: z.string().nullable(),
  alt_technique_ids: z.array(z.string()).nullable(),
  technique_ids: z.array(z.string()).nullable(),
  technique_titles: z.array(z.string()).nullable(),
  theme_titles: z.array(z.string()).nullable(),
  image_id: z.string().nullable(),
  alt_image_ids: z.array(z.string()).nullable(),
  document_ids: z.array(z.string()).nullable(),
  sound_ids: z.array(z.string()).nullable(),
  video_ids: z.array(z.string()).nullable(),
  text_ids: z.array(z.string()).nullable(),
  section_ids: z.array(z.number()).nullable(),
  section_titles: z.array(z.string()).nullable(),
  site_ids: z.array(z.string()).nullable(),
  suggest_autocompleteSchema_all: z.array(autocompleteSchema).optional(),
  source_updated_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  timestamp: z.string().nullable(),
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
