import { UrlController } from "@core/controllers/url.controller"
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express"
import z4, { type ZodBase64URL } from "zod/v4"
import { errorMiddleware } from "@/middleware/errors/error.middleware"
import { validateBody } from "@/middleware/validation/validator"
import { shortUrlReqSchema } from "@/schemas/url.schema"
import { corsConfig } from "../app/config/cors/cors.config"
import { UrlsModel } from "./libs/clients/storage/mongodb.client"
import { HttpError } from "./middleware/errors/errors"

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

export const redirectUrlSchema = z4.object({ alias: z4.string().length(6) })
export type RedirectUrlRequest = z4.infer<typeof redirectUrlSchema>
export type RedirectUrlResponse = {
    redirect_url: ZodBase64URL
}

app.post(
    "/api/lilify/v1/redirect-url",
    validateBody(redirectUrlSchema),
    async (
        req: Request<unknown, RedirectUrlResponse, RedirectUrlRequest>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { alias } = req.body

            console.log("Alias: ", alias) // Debug statement

            const urlInfo = await UrlsModel.findOne(
                { short_id: alias },
                { original_url: 1 },
            )

            console.log("Query result: ", urlInfo) // Debug statement

            if (urlInfo !== null) {
                return res
                    .status(200)
                    .json({ redirect_url: urlInfo.original_url })
            } else {
                next(new HttpError(404, "No URL exists under that alias"))
            }
        } catch (error) {
            console.error(error)
            next(new HttpError(400, `${error}`))
        }
    },
)

app.listen(Number(process.env[PORT]), () =>
    console.log("Server up and running :)"),
)
app.use(errorMiddleware)
