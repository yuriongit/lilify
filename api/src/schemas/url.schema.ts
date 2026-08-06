import z4 from "zod/v4"

export const shortUrlReqSchema = z4.object({
    original_url: z4.url("Please provide a valid URL"),
})

export type ShortUrlReq = z4.infer<typeof shortUrlReqSchema>
