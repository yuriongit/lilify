import type { NextFunction, Request, Response } from "express"
import z4, { ZodError, type ZodObject } from "zod/v4"
import { HttpError } from "@/middleware/errors/errors"

export const validateBody =
    (schema: ZodObject) =>
    async (req: Request, _res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body)

            next()
        } catch (err) {
            if (err instanceof ZodError) {
                next(
                    new HttpError(
                        400,
                        `request body did not pass validation${err.cause !== "undefined" && `: ${err.cause}`}`,
                    ),
                )
            } else {
                next(new HttpError(400, "request body did not pass validation"))
            }
        }
    }

export const validateQuery =
    (schema: ZodObject) =>
    async (
        req: Request<unknown, unknown, unknown, z4.infer<typeof schema>>,
        _res: Response,
        next: NextFunction,
    ) => {
        try {
            await schema.parseAsync(req.query)
            next()
        } catch (error) {
            if (error instanceof z4.ZodError) {
                next(
                    new HttpError(
                        400,
                        `ZodError: ${JSON.stringify(error.issues)}`,
                    ),
                )
            } else {
                next(
                    new HttpError(
                        400,
                        "Generic Error: request parameters did not pass validation",
                    ),
                )
            }
        }
    }
