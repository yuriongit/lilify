import { redisClient } from "@libs/clients/storage/redis.client"

export const UrlCache = {
  async get(key: string): Promise<string | null> {
    const data = await redisClient.get(key)
    return data ?? null
  },
  async set(
    originalUrl: string,
    alias: string,
    ttlInSeconds: number,
  ): Promise<void> {
    await redisClient.set(originalUrl, alias, {
      expiration: {
        type: "EX",
        value: ttlInSeconds,
      },
    })
  },
}
