import { redisClient } from "@libs/clients/storage/redis.client"

export const UrlCache = {
  async get(key: string): Promise<string | null> {
    const data = await redisClient.get(key)
    return data ?? null
  },
  async set(
    key: string,
    value: string,
    ttlInSeconds: number,
  ): Promise<void> {
    await redisClient.set(key, value, {
      expiration: {
        type: "EX",
        value: ttlInSeconds,
      },
    })
  },
}
