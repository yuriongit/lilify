const buttonBase =
  "inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed"

export const STYLES = {
  buttonBase: buttonBase,
  buttonPrimary: `${buttonBase} transition-all ease-in-out bg-blue-100 text-blue-950 border border-blue-200 hover:bg-blue-200 dark:bg-blue-400 dark:text-stone-950 dark:border-transparent dark:hover:bg-blue-300 font-semibold`,
  buttonSecondary: `${buttonBase} border border-stone-300 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800`,
}
