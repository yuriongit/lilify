import { HttpError } from "@/middleware/errors/errors";
import type { ShortUrlReq } from "@/schemas/url.schema";
import { UrlService } from "@core/services/url.service";
import { type NextFunction, type Request, type Response } from "express";

export const UrlController = {
    async shortenUrl(req: Request, res: Response, next: NextFunction) {
        const { original_url }: ShortUrlReq  = req.body;

        const [shortUrl, err] = await UrlService.assignUrl(original_url);
        if (err) {
            next(new HttpError(500, err.message));
        }

        return res.status(200).json({ short_url: shortUrl });
    },
};
