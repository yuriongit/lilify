import express from "express"
import { errorMiddleware } from "@/middleware/errors/error.middleware"
import { UrlController } from "@core/controllers/url.controller"
import { validateBody } from "@/middleware/validation/validator"
import { shortUrlReqSchema } from "@/schemas/url.schema"

const app = express()
app.use(express.json())

// Environment vars indexes
const PORT = "PORT"

app.post(
    "/api/lilify/v1",
    validateBody(shortUrlReqSchema),
    UrlController.shortenUrl,
)

app.listen(Number(process.env[PORT]), () =>
    console.log("Server up and running :)"),
)
app.use(errorMiddleware)
