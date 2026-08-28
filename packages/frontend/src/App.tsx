import { Footer } from "@components/Footer"
import { Header } from "@components/Header"
import { Home } from "@components/Home"
import { InvalidShortenedUrlError } from "@components/InvalidShortenedUrl"
import { RedirectUrl } from "@components/RedirectUrl"
import { useCreateShortUrl, useResolveAlias } from "@services/urls/hooks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { SubmitEvent } from "react"
import { useState } from "react"
import z4 from "zod/v4"
import { isHttpError } from "@/utils"

if (!import.meta.env.VITE_API_URL) {
  throw new Error("Missing required environment variable: VITE_API_URL")
}

// Zod v4 Schema for URL validation & normalization
const urlSchema = z4
  .url("Please enter a valid URL starting with http:// or https://")
  .trim()
  .min(1, "URL cannot be empty")
  .transform((url) => url.replace(/\/+$/, "")) // Truncates trailing slashes to prevent duplicate entries

// Move QueryClient instantiation outside of render scope to prevent cache resets
const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Urls />
    </QueryClientProvider>
  )
}

export const Urls = () => {
  const alias = window.location.pathname.slice(1)

  const { error: resolveError } = useResolveAlias(alias)
  const createUrl = useCreateShortUrl()

  const [originalUrl, setOriginalUrl] = useState("")
  const [validationError, setValidationError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const isAliasCandidate = alias.length === 6
  const notFound =
    alias.length > 6
    || (isHttpError(resolveError) && resolveError.status === 404)
  const redirectFailed = Boolean(resolveError) && !notFound
  const showErrorState = notFound || redirectFailed

  // Keep redirect state active while resolving OR while waiting for redirect effect to execute
  const isRedirecting = isAliasCandidate && !showErrorState

  async function copyToClipboard() {
    const shortenedUrl = createUrl.data?.shortened_url
    if (!shortenedUrl) return

    try {
      await navigator.clipboard.writeText(shortenedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard write failed silently
    }
  }

  function handleReset() {
    setOriginalUrl("")
    setValidationError(null)
    setCopied(false)
    createUrl.reset()
  }

  async function shortenUrl(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setValidationError(null)

    // Validate and sanitize original URL via Zod
    const result = urlSchema.safeParse(originalUrl)

    if (!result.success) {
      // Set local client-side validation error
      setValidationError(result.error.issues[0]?.message ?? "Invalid URL")
      return
    }

    // Mutate with truncated URL (e.g., https://example.com/) -> https://example.com
    createUrl.mutate({ original_url: result.data })
  }

  const activeError =
    validationError
    || (createUrl.error
      ? isHttpError(createUrl.error)
        ? `${createUrl.error.status}: ${createUrl.error.message}`
        : createUrl.error.message
      : null)

  if (isRedirecting) {
    return <RedirectUrl />
  }

  return (
    <main className="min-h-screen items-center justify-between flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <Header />
      <div className="flex-1 flex items-center px-5 sm:px-8 w-full justify-center">
        {showErrorState ? (
          <InvalidShortenedUrlError
            redirectFailed={redirectFailed}
            resolveError={resolveError}
            notFound={notFound}
          />
        ) : (
          <Home
            shortenUrl={shortenUrl}
            createUrl={createUrl}
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
            validationError={validationError}
            setValidationError={setValidationError}
            activeError={activeError}
            copyToClipboard={copyToClipboard}
            copied={copied}
            handleReset={handleReset}
          />
        )}
      </div>
      <Footer />
    </main>
  )
}
