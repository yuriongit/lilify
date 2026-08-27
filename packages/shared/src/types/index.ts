import type {
  createShortenedUrlSchema,
  resolveShortenedUrl,
  urlInfoSchema,
} from "@app/shared/schemas"
import type z4 from "zod/v4"

// Database URL Info Schema Mirror Type
export type UrlInfo = z4.infer<typeof urlInfoSchema>

// POST Request
export type CreateShortenedUrlRequest = z4.infer<
  typeof createShortenedUrlSchema
>
export type CreateShortenedUrlResponse = {
  shortened_url: string
}

// GET Request
export type ResolveShortenedUrlRequest = z4.infer<typeof resolveShortenedUrl>
export type ResolveShortenedUrlResponse = Pick<UrlInfo, "original_url">

export type HttpError = Error & { status: number }
