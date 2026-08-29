import rateLimit from "express-rate-limit"

const defineLimiter = (
  windowMinutes: number,
  limit: number,
  ipv6Subnet: number,
) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit: limit,
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: ipv6Subnet,
  })
}

export const redirectLimiter = defineLimiter(60, 75, 54)
export const createLimiter = defineLimiter(60, 10, 60)
