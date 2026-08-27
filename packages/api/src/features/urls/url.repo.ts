import { UrlsModel } from "@libs/clients/storage/mongodb.client"
import type { Result } from "./url.service"

export const UrlRepo = {
  async queryAlias(originalUrl: string): Promise<Result<string | null>> {
    try {
      return [
        (await UrlsModel.findOne({ original_url: originalUrl }, { alias: 1 }))
          ?? null,
        null,
      ]
    } catch (err) {
      return [null, new Error(`${err}`)]
    }
  },

  async queryOriginalUrl(alias: string): Promise<Result<string | null>> {
    try {
      return [
        (await UrlsModel.findOne({ alias }, { original_url: 1 })) ?? null,
        null,
      ]
    } catch (err) {
      return [null, new Error(`${err}`)]
    }
  },
}
