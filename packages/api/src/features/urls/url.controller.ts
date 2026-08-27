import type {
  CreateShortenedUrlRequest,
  CreateShortenedUrlResponse,
  ResolveShortenedUrlRequest,
  ResolveShortenedUrlResponse,
} from "@app/shared/types"
import { UrlService } from "@features/urls/url.service"
import type { NextFunction, Request, Response } from "express"

export const UrlController = {
  async shortenUrl(
    req: Request<
      unknown,
      CreateShortenedUrlResponse,
      CreateShortenedUrlRequest
    >,
    res: Response,
    next: NextFunction,
  ) {
    const { original_url } = req.body

    const [shortenedUrl, err] = await UrlService.create(original_url)
    if (err) {
      next(err)
    }

    return res.status(200).json({ shortened_url: shortenedUrl })
  },

  /**
   * Retrieves and returns the original URL mapped to its alias.
   */
  async getOriginalUrl(
    req: Request<
      unknown,
      ResolveShortenedUrlResponse,
      unknown,
      ResolveShortenedUrlRequest
    >,
    res: Response,
    next: NextFunction,
  ) {
    const { alias } = req.query

    const [original_url, err] = await UrlService.resolveUrl(alias)
    if (err) {
      return next(err)
    }

    return res.status(200).json({ original_url: original_url })
  },
}
