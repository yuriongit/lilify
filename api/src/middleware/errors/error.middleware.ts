import type { NextFunction, Request, Response } from "express";
import { HttpError } from "@/middleware/errors/errors";

export const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
    // 1. Known operational HTTP errors (e.g., 400 Bad Request, 404 Not Found)
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    }

    // 2. Unhandled internal server errors (500)
    // Log the raw error internally for debugging, but don't leak raw details to clients.
    console.error("[Unhandled Error]:", err); // GET RID OFFDFSDFSDFSD SOOOONNN

    return res.status(500).json({
        success: false,
        error: "An internal server error occurred.",
    });
};
