import { useMutation, useQuery } from "@tanstack/react-query"
import { createShortenedUrl } from "./handle-submit-url.service"
import { resolveAlias } from "./resolve-alias.service"

export function useCreateShortUrl() {
  return useMutation({
    mutationFn: createShortenedUrl,
  })
}

export const useResolveAlias = (alias: string) =>
  useQuery({
    queryKey: ["urls", alias],
    queryFn: () => resolveAlias(alias),
    enabled: Boolean(alias),
    retry: false,
  })
