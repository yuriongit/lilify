import { describe, expect, test } from "bun:test"
import { generateId } from "@/utils/id"

describe("UrlService", () => {
    describe("generateId", () => {
        test("should generate a 6-character URL-safe string", () => {
            const id = generateId()
            expect(id).toBeString()
            expect(id).toHaveLength(6)
            expect(id).toMatch(/^[A-Za-z0-9-_]+$/)
        })

        test("should generate unique IDs across many calls", () => {
            const ids = new Set()
            for (let i = 0; i < 1000; i++) {
                ids.add(generateId())
            }
            // 6-char base64url has 64^6 ≈ 6.9×10^10 possibilities;
            // birthday-bound collision odds at 1000 samples are ~7×10^-6
            expect(ids.size).toBe(1000)
        })

        test("should vary independently across all 6 positions", () => {
            // Catches generators that only randomize some positions
            // (e.g. timestamp-based schemes with fixed leading chars)
            const sampleSize = 500
            const positionSets = Array.from({ length: 6 }, () => new Set())
            for (let i = 0; i < sampleSize; i++) {
                const id = generateId()
                for (let pos = 0; pos < 6; pos++)
                    positionSets[pos]?.add(id[pos])
            }
            for (const set of positionSets) {
                expect(set.size).toBeGreaterThan(10)
            }
        })

        test("should distribute characters roughly uniformly (no bias)", () => {
            // Chi-square goodness-of-fit against a uniform distribution
            // over the 64-character base64url alphabet
            const charset =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
            const counts = Object.fromEntries([...charset].map((c) => [c, 0]))
            const sampleSize = 5000
            let totalChars = 0

            for (let i = 0; i < sampleSize; i++) {
                const id = generateId()
                for (const c of id) {
                    counts[c] = (counts[c] ?? 0) + 1
                    totalChars++
                }
            }

            const expected = totalChars / 64
            const chiSquare = Object.values(counts).reduce(
                (sum, observed) => sum + (observed - expected) ** 2 / expected,
                0,
            )
            // df=63, critical value at p=0.001 ≈ 103.4 — generous margin to avoid flaky CI
            expect(chiSquare).toBeLessThan(120)
        })
    })
})
