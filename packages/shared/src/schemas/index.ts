import z4 from "zod/v4"

// Database URL Info Schema Mirror Schema
export const urlInfoSchema = z4.object({
  original_url: z4.url("Please provide a valid URL"),
  alias: z4.string().length(6),
  created_at: z4.date(),
})

// POST Request
export const createShortenedUrlSchema = urlInfoSchema.pick({
  original_url: true,
})

// GET Request
export const resolveShortenedUrlSchema = z4.object({
  shortened_url: z4.url().trim(),
})
export const resolveShortenedUrl = z4.object({
  alias: z4.string().length(6),
})
