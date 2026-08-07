import cors from "cors"

const FRONTEND_BASE_URL = "FRONTEND_BASE_URL"

export const corsConfig = cors({
    origin: `${String(process.env[FRONTEND_BASE_URL])}`,
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
})
