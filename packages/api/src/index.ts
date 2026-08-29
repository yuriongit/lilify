import {
  createShortenedUrlSchema,
  resolveShortenedUrl,
} from "@app/shared/schemas"
import { corsConfig } from "@config/cors.config"
import { createLimiter, redirectLimiter } from "@config/rate-limit.config"
import { UrlController } from "@features/urls/url.controller"
import { errorMiddleware } from "@middleware/errors/global.error"
import { validateBody } from "@middleware/validators/req-body.validator"
import { validateQuery } from "@middleware/validators/req-query.validator"
import { env } from "bun"
import express from "express"

const app = express()

app.use(corsConfig)
app.use(express.json())

app.post(
  "/api/lilify/v1/urls",
  validateBody(createShortenedUrlSchema),
  UrlController.shortenUrl,
  createLimiter,
)

app.get(
  "/api/lilify/v1/urls",
  validateQuery(resolveShortenedUrl),
  UrlController.getOriginalUrl,
  redirectLimiter,
)

app.listen(Number(env.PORT), () => {
  if (env.NODE_ENV === "DEVELOPMENT") {
    return console.log(
      `Development: Server up and running :)\nhttp://localhost:${env.PORT}`,
    )
  }

  return console.log("Production: Server up and running :)")
})
app.use(errorMiddleware)
