import { HttpError } from "@middleware/errors/http.error"
import type { NextFunction, Request, Response } from "express"

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    error: "An internal server error occurred.",
  })
}
