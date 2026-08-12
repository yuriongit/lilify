import { env } from "bun"
import { createClient } from "redis"

export const redisClient = createClient({
    url: env["REDIS_URL"],
})

redisClient.on("error", (err) => console.error("Redis Client Error", err))

await redisClient.connect()

export const checkRedisHealth = async (): Promise<boolean> => {
    try {
        const reply = await redisClient.ping()
        return reply === "PONG"
    } catch (error) {
        console.error("Redis Health Check Failed:", error)
        return false
    }
}