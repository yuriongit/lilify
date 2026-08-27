import { env } from "bun"
import cors from "cors"

export const corsConfig = cors({
  origin: env.FRONTEND_URL,
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
})
