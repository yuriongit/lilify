import type { HttpError } from "@app/shared/types"

export const isHttpError = (error: unknown): error is HttpError => {
  return error instanceof Error && "status" in error
}
