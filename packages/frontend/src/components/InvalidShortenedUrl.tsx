import { Utils } from "@app/shared/utils"
import { STYLES } from "@constants/styles"
import { IconArrowBackUp, IconMoodPuzzled } from "@tabler/icons-react"

type Props = {
  redirectFailed: boolean
  resolveError: unknown
  notFound: boolean
}

export const InvalidShortenedUrlError = ({
  redirectFailed,
  resolveError,
  notFound,
}: Props) => (
  <div className="w-full max-w-sm flex flex-col items-center text-center gap-4">
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-5xl font-semibold flex items-center gap-2.5">
        <span className="text-blue-600 dark:text-blue-400">
          {redirectFailed && Utils.isHttpError(resolveError) // error line
            ? resolveError.status // error line
            : notFound // error line
              ? 404
              : "!"}
        </span>
        <IconMoodPuzzled
          size={45}
          stroke={2.5}
          className="text-blue-600 dark:text-blue-400"
        />
      </h1>
      <p className="text-stone-600 dark:text-stone-400">
        {redirectFailed
          ? `Redirect failed: ${resolveError instanceof Error ? resolveError.message : "Unknown error"}`
          : "Womp, womp. A URL doesn't exist under this alias..."}
      </p>
    </div>
    <button
      type="button"
      onClick={() => {
        window.location.href = "/"
      }}
      className={STYLES.buttonPrimary}
    >
      <span>Return home</span>
      <IconArrowBackUp size={15} stroke={2.5} />
    </button>
  </div>
)
