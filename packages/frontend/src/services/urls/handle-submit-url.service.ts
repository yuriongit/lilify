import { createShortenedUrlSchema } from "@app/shared/schemas"
import type {
  CreateShortenedUrlRequest,
  CreateShortenedUrlResponse,
} from "@app/shared/types"
import { endPts } from "@constants/endpoints"

export const createShortenedUrl = async (
  body: CreateShortenedUrlRequest,
): Promise<CreateShortenedUrlResponse> => {
  createShortenedUrlSchema.parse(body)

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${endPts.create.urls}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  )

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    const error = new Error(data?.message ?? response.statusText) as Error & {
      status: number
    }
    error.status = response.status
    throw error
  }

  return response.json()
}
