import { UrlController } from "@core/controllers/url.controller"
import express from "express"
import { errorMiddleware } from "@/middleware/errors/error.middleware"
import { validateBody, validateQuery } from "@/middleware/validation/validator"
import { resolveAliasSchema, shortUrlReqSchema } from "@/schemas/url.schema"
import { corsConfig } from "../app/config/cors/cors.config"

const app = express()
app.use(corsConfig)
app.use(express.json())

// Environment vars indexes
const PORT = "PORT"

app.post(
    "/api/lilify/v1",
    validateBody(shortUrlReqSchema),
    UrlController.shortenUrl,
)

app.get(
    "/api/lilify/v1/redirect-url",
    validateQuery(resolveAliasSchema),
    UrlController.getOriginalUrl,
)

app.listen(Number(process.env[PORT]), () =>
    console.log("Server up and running :)"),
)
app.use(errorMiddleware)
