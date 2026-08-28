import { UrlsModel } from "@libs/clients/storage/mongodb.client"
import { redisClient } from "@libs/clients/storage/redis.client"
import { HttpError } from "@middleware/errors/http.error"
import { env } from "bun"
import { constructShortenedUrl, generateAlias } from "@/utils"
import { UrlCache } from "./url.cache"
import { UrlRepo } from "./url.repo"

export type Result<T> = [data: T, err: null] | [data: null, err: Error]

export const UrlService = {
  /**
   * Checks if a given alias already exists in the database.
   */
  async aliasExists(alias: string): Promise<Result<boolean>> {
    try {
      const existing = await UrlsModel.exists({ alias: alias })
      return [Boolean(existing), null]
    } catch (err) {
      return [
        null,
        new HttpError(500, `Failed to check if alias exists: ${err}`),
      ]
    }
  },

  /**
   * Attempts to generate an unused ID. Retries up to MAX_RETRIES times
   * to resolve DB collisions cleanly.
   */
  async generateUniqueId(maxRetries = 5): Promise<Result<string>> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const alias = generateAlias()

      const [exists, err] = await UrlService.aliasExists(alias)
      if (err) return [null, err]

      // Unique alias found
      if (!exists) {
        return [alias, null]
      }
    }

    return [
      null,
      new HttpError(
        500,
        `Failed to generate a unique ID after ${maxRetries} attempts`,
      ),
    ]
  },

  /**
   * Persists the original URL and its alias, returning the full shortened URL.
   */
  async create(originalUrl: string): Promise<Result<string>> {
    try {
      // 1. Handle duplication prevention by caching a possible existing alias
      const cacheUrlAlias = await UrlCache.get(originalUrl)
      if (cacheUrlAlias !== null) {
        const shortenedUrl = constructShortenedUrl(
          String(env.FRONTEND_URL),
          cacheUrlAlias,
        )

        return [shortenedUrl, null]
      }

      // 1B. Handle duplication prevention by querying the database if the possible existing alias is not in cache
      const [queryAlias, queryAliasErr] = await UrlRepo.queryAlias(originalUrl)
      if (queryAliasErr !== null) {
        return [
          null,
          new HttpError(500, `Failed to query alias: ${queryAliasErr.message}`),
        ]
      }
      if (queryAlias !== null) {
        UrlCache.set(originalUrl, queryAlias, 900)

        const shortenedUrl = constructShortenedUrl(
          String(env.FRONTEND_URL),
          queryAlias,
        )
        return [shortenedUrl, null]
      }

      // 2. Generate unique alias
      const [alias, aliasErr] = await UrlService.generateUniqueId()
      if (aliasErr) {
        return [
          null,
          new HttpError(500, `Failed to generate alias: ${aliasErr.message}`),
        ]
      }

      // // 3. Store alias with original url in cache
      // await redisClient.set(originalUrl, alias, {
      //   expiration: {
      //     type: "EX",
      //     value: 900,
      //   },
      // })

      // 2. Persist to MongoDB
      await UrlsModel.create({
        alias: alias,
        original_url: originalUrl,
        created_at: Date.now(),
      })

      const shortenedUrl = constructShortenedUrl(
        String(env.FRONTEND_URL),
        alias,
      )

      return [shortenedUrl, null]
    } catch (err) {
      return [
        null,
        new HttpError(500, `Failed to create shortened URL: ${err}`),
      ]
    }
  },

  /**
   * Resolves a shortened URL alias to its original URL.
   */
  async resolveUrl(alias: string): Promise<Result<string>> {
    try {
      const cacheQuery = await redisClient.get(alias)
      if (cacheQuery !== null) {
        return [cacheQuery, null]
      }

      const dbQuery = await UrlsModel.findOne(
        { alias: alias },
        { original_url: 1 },
      )

      if (dbQuery !== null) {
        await UrlCache.set(alias, dbQuery.original_url, 900)

        return [dbQuery.original_url, null]
      } else {
        return [null, new HttpError(404, "No URL exists under that alias")]
      }
    } catch (err) {
      return [
        null,
        new HttpError(500, `Failed to create shortened URL: ${err}`),
      ]
    }
  },
}
