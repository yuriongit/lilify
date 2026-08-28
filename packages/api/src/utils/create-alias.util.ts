import crypto from "node:crypto"

/**
 * Generates a random 6-character URL-safe string.

 * Space: 64^6 = ~68.7 billion combinations.
 */
export const generateAlias = (): string => {
  return crypto.randomBytes(5).toString("base64url").slice(0, 6)
}
