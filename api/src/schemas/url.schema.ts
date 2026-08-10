import z4 from "zod/v4"

export const shortUrlReqSchema = z4.object({
    original_url: z4.url("Please provide a valid URL"),
})
export const resolveAliasSchema = z4.object({ alias: z4.string().length(6) })

export type ShortUrlReq = z4.infer<typeof shortUrlReqSchema>
export type ResolveAliasRequest = z4.infer<typeof resolveAliasSchema>
export type ResolveAliasResponse = {
    original_url: string
}
