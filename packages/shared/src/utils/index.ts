import type { HttpError } from "../types"

export const Utils = {
  constructShortenedUrl(alias: string): string {
    return `${process.env.FRONTEND_URL}/${alias}`
  },
  isHttpError(error: unknown): error is HttpError {
    return error instanceof Error && "status" in error
  },
}
