import { HttpError } from "@middleware/errors/http.error"
import type { NextFunction, Request, Response } from "express"
import type { ZodObject } from "zod"
import z4 from "zod/v4"

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
        next(new HttpError(400, `ZodError: ${JSON.stringify(error.issues)}`))
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
