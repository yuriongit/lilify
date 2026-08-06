/**
 * Represents a known operational HTTP error.
 * Renamed from ErrorHandler to HttpError for clear semantic naming.
 */
export class HttpError extends Error {
    constructor(
        public statusCode: number,
        message: string,
    ) {
        super(message)
        this.name = "HttpError"
    }
}
