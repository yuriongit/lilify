import type { CreateShortenedUrlResponse } from "@app/shared/types"
import { STYLES } from "@constants/styles"
import type { UseMutationResult } from "@tanstack/react-query"
import type { Dispatch, SetStateAction, SubmitEventHandler } from "react"

type Props = {
  shortenUrl: SubmitEventHandler<HTMLFormElement>
  createUrl: UseMutationResult<
    CreateShortenedUrlResponse,
    Error,
    {
      original_url: string
    },
    unknown
  >
  originalUrl: string
  setOriginalUrl: Dispatch<SetStateAction<string>>
  validationError: string | null
  setValidationError: Dispatch<SetStateAction<string | null>>
  activeError: string | null
  copyToClipboard: () => void
  copied: boolean
  handleReset: () => void
}

export const Home = ({
  shortenUrl,
  createUrl,
  originalUrl,
  setOriginalUrl,
  validationError,
  setValidationError,
  activeError,
  copyToClipboard,
  copied,
  handleReset,
}: Props) => {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 flex items-center flex-col">
        <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
          A URL Shortener
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Shorten any link... about as simple as that.
        </p>
      </div>

      <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm rounded-lg p-4 sm:p-5">
        {!createUrl.data?.shortened_url ? (
          <form onSubmit={shortenUrl} noValidate>
            <label
              htmlFor="url-input"
              className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5"
            >
              Original URL
            </label>
            <input
              id="url-input"
              type="url"
              inputMode="url"
              autoComplete="off"
              value={originalUrl}
              onChange={(e) => {
                setOriginalUrl(e.target.value)
                if (validationError) {
                  setValidationError(null)
                }
              }}
              placeholder="https://example.com/very-long-link"
              disabled={createUrl.isPending}
              aria-invalid={Boolean(activeError)}
              aria-describedby={activeError ? "url-input-error" : undefined}
              className="w-full px-3 py-2 placeholder:underline placeholder:decoration-dashed placeholder:underline-offset-2 bg-stone-50 dark:bg-stone-950 border font-normal border-stone-300 dark:border-stone-800 rounded-md text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring focus:ring-blue-500/15 focus:border-blue-500/50 transition-all disabled:opacity-50"
            />
            {activeError && (
              <p
                id="url-input-error"
                role="alert"
                className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium"
              >
                {activeError}
              </p>
            )}

            <button
              type="submit"
              disabled={createUrl.isPending || !originalUrl.trim()}
              className={`${STYLES.buttonPrimary} mt-4 w-full sm:w-auto`}
            >
              {createUrl.isPending ? "Shortening…" : "Shorten URL"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center w-full">
            <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Your shortened link
            </span>
            <p className="px-3 py-2 bg-stone-50 w-full text-center dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-sm truncate select-all text-blue-600 dark:text-blue-400 underline decoration-dashed underline-offset-2">
              {createUrl.data.shortened_url}
            </p>

            <div className="mt-4 flex gap-2 w-full items-center justify-between">
              <button
                type="button"
                onClick={copyToClipboard}
                className={`${STYLES.buttonPrimary} w-full`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className={`${STYLES.buttonSecondary} w-full`}
              >
                Shorten another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
