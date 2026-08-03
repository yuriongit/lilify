import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod/v4";
import { HttpError } from "@/middleware/errors/errors";

export const validateBody = (schema: ZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync(req.body);

        next();
    } catch (err) {
        if (err instanceof ZodError) {
            next(
                new HttpError(
                    400,
                    `request body did not pass validation${err.cause != 'undefined' && `: ${err.cause}`}`,
                ),
            );
        } else {
            next(new HttpError(400, "request body did not pass validation"));
        }
    }
};
