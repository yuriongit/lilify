import { UrlService } from "@core/services/url.service"
import type { NextFunction, Request, Response } from "express"
import { HttpError } from "@/middleware/errors/errors"
import type {
    ResolveAliasRequest,
    ResolveAliasResponse,
    ShortenUrlRequest,
} from "@/schemas/url.schema"

export const UrlController = {
    async shortenUrl(req: Request, res: Response, next: NextFunction) {
        const { original_url }: ShortUrlReq = req.body

        const [shortUrl, err] = await UrlService.assignUrl(original_url)
        if (err) {
            next(new HttpError(500, err.message))
        }

        return res.status(200).json({ short_url: shortUrl })
    },

    /**
     * Retrieves and returns the original URL mapped to its alias.
     */
    async getOriginalUrl(
        req: Request<
            unknown,
            ResolveAliasResponse,
            unknown,
            ResolveAliasRequest
        >,
        res: Response,
        next: NextFunction,
    ) {
        const { alias } = req.query

        const [original_url, err] = await UrlService.resolveUrl(alias)
        if (err) {
            return next(new HttpError(500, err.message))
        }

        return res.status(200).json({ original_url: original_url })
    },
}
