import { IconMoodSmileBeam } from "@tabler/icons-react"

export const RedirectUrl = () => (
  <main className="min-h-screen flex flex-col items-center justify-center gap-2 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
    <div className="flex items-center gap-3 font-medium text-stone-600 dark:text-stone-400">
      <p className="font-semibold text-3xl tracking-wide text-stone-900 dark:text-stone-100">
        Lilify
      </p>
      <IconMoodSmileBeam
        size={35}
        stroke={2.5}
        className="rounded-full border-2 border-blue-500/30 text-blue-500 animate-spin"
      />
    </div>
    <p className="text-stone-500 dark:text-stone-400 mt-2">
      Redirecting you to your target destination...
    </p>
  </main>
)
