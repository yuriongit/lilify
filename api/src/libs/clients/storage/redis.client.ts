import { env } from "bun"
import { createClient } from "redis"

export const redisClient = createClient({
    url: env.REDIS_URL,
})

redisClient.on("error", (err) => console.error("Redis Client Error", err))

await redisClient.connect()
