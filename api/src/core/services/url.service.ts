import { UrlsModel } from "@libs/clients/storage/mongodb.client"
import { env } from "bun"
import { generateId } from "@/utils/id"
import { HttpError } from "@/middleware/errors/errors"

// Environment vars indexes
const FRONTEND_URL = "FRONTEND_URL"

export type Result<T> = [data: T, err: null] | [data: null, err: Error]

export const UrlService = {
    /**
     * Checks if a given ID already exists in the database.
     */
    async idExists(id: string): Promise<Result<boolean>> {
        try {
            const existing = await UrlsModel.exists({ short_id: id })
            return [Boolean(existing), null]
        } catch (err) {
            return [null, new Error(`idExists failed: ${err}`)]
        }
    },

    /**
     * Attempts to generate an unused ID. Retries up to MAX_RETRIES times
     * to resolve DB collisions cleanly.
     */
    async generateUniqueId(maxRetries = 5): Promise<Result<string>> {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const id = generateId()

            const [exists, err] = await UrlService.idExists(id)
            if (err) return [null, err]

            // Unique ID found!
            if (!exists) {
                return [id, null]
            }
        }

        return [
            null,
            new Error(
                `Failed to generate a unique ID after ${maxRetries} attempts`,
            ),
        ]
    },

    /**
     * Persists the original URL and its short ID, returning the full shortened URL.
     */
    async assignUrl(ogUrl: string): Promise<Result<string>> {
        // 1. Generate unique ID
        const [id, idErr] = await UrlService.generateUniqueId()
        if (idErr) {
            return [null, new Error(`assignUrl: ${idErr.message}`)]
        }

        // 2. Persist to MongoDB
        try {
            await UrlsModel.create({
                short_id: id, // Store only the 6-character key in the DB
                original_url: ogUrl,
                created_at: Date.now(),
            })

            const baseUrl = env[FRONTEND_URL] ?? "http://localhost:5173"
            const fullShortUrl = `${baseUrl}/${id}`

            return [fullShortUrl, null]
        } catch (err) {
            return [
                null,
                new Error(`assignUrl: database insert failed - ${err}`),
            ]
        }
    },

    /**
     * Resolves a shortened URL alias to its original URL.
     */   
    async resolveUrl(alias: string): Promise<Result<string>> {
        try {
            const urlInfo = await UrlsModel.findOne(
                { short_id: alias },
                { original_url: 1 },
            )

            if (urlInfo !== null) {
                return [urlInfo.original_url, null]
            } else {
                return [
                    null,
                    new HttpError(404, "No URL exists under that alias"),
                ]
            }
        } catch (error) {
            console.error(error)
            return [null, new HttpError(400, `${error}`)]
        }
    },
}
