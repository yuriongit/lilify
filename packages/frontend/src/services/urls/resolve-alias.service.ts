import type { HttpError } from "@app/shared/types"
import { endPts } from "@constants/endpoints"

export const resolveAlias = async (alias: string) => {
  if (alias.length !== 6) return null

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${endPts.get.urls.name}?${endPts.get.urls.queryParams.alias}=${alias}`,
  )

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    const error = new Error(data?.message ?? response.statusText) as HttpError
    error.status = response.status
    throw error
  }

  const data = await response.json()
  window.location.href = data.original_url
  return data
}
