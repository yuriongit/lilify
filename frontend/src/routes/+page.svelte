<script lang="ts">
    import z4 from "zod/v4";

    let url = $state("");
    let isLoading = $state(false);
    let shortenedUrl = $state("");
    let errorMsg = $state("");
    let copied = $state(false);

    // Replace with your backend endpoint
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const SHORTEN_URL_ROUTE = import.meta.env.VITE_SHORTEN_URL_ROUTE;

    // Zod Schema: trims, auto-prepends protocol, and validates URL structure
    const urlSchema = z4.url("Please enter a URL").trim();

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        // Validate input with Zod
        const result = urlSchema.safeParse(url);

        if (!result.success) {
            // Extract the first Zod validation error message
            errorMsg = result.error.issues[0]?.message || "Invalid URL";
            return;
        }

        // Parsed and properly formatted URL
        const formattedUrl = result.data;

        errorMsg = "";
        isLoading = true;

        try {
            const response = await fetch(`${API_BASE_URL}/${SHORTEN_URL_ROUTE}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ original_url: formattedUrl }),
            });

            if (!response.ok) {
                throw new Error("Failed to shorten URL");
            }

            const data = await response.json();
            shortenedUrl = data.short_url;
        } catch (err) {
            errorMsg = err instanceof Error ? err.message : "An error occurred";
        } finally {
            isLoading = false;
        }
    }

    async function copyToClipboard() {
        if (!shortenedUrl) return;
        try {
            await navigator.clipboard.writeText(shortenedUrl);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        } catch {
            errorMsg = "Failed to copy to clipboard";
        }
    }

    function handleReset() {
        url = "";
        shortenedUrl = "";
        errorMsg = "";
        copied = false;
    }
</script>

<main
    class="min-h-screen tracking-[-0.015em] bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 selection:bg-zinc-800 selection:text-zinc-100"
>
    <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
            <div
                class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800/80 mb-4 shadow-sm"
            >
                <svg class="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.75"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                </svg>
            </div>
            <h1 class="text-3xl font-medium tracking-tight text-zinc-100">Shorten URL</h1>
            <p class="text-sm text-zinc-400 mt-1 font-normal">Create clean, concise links in seconds.</p>
        </div>

        <!-- Main Card -->
        <div
            class="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl shadow-black/40"
        >
            {#if !shortenedUrl}
                <!-- Form View -->
                <form onsubmit={handleSubmit} class="space-y-4">
                    <div>
                        <label for="url-input" class="block text-sm font-medium text-zinc-400 mb-2">Original URL</label>
                        <input
                            id="url-input"
                            type="text"
                            bind:value={url}
                            placeholder="https://example.com/very-long-link"
                            disabled={isLoading}
                            class="w-full px-3 py-2 bg-zinc-950/80 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-400/50 focus:border-zinc-400/5 transition-all shadow-inner disabled:opacity-50"
                        />
                        {#if errorMsg}
                            <p class="text-xs text-rose-400 mt-2.5 flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                {errorMsg}
                            </p>
                        {/if}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !url.trim()}
                        class="w-fit px-3 py-1.75 bg-zinc-100 hover:bg-white font-medium text-zinc-950 rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm active:scale-[0.99]"
                    >
                        {#if isLoading}
                            <svg class="animate-spin w-4 h-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span>Shortening...</span>
                        {:else}
                            <span>Shorten URL</span>
                        {/if}
                    </button>
                </form>
            {:else}
                <!-- Result View -->
                <div class="space-y-4">
                    <div>
                        <span class="block text-xs font-medium text-zinc-400 mb-2">Your Shortened Link</span>
                        <div
                            class="flex items-center justify-between p-3 bg-zinc-950/80 border border-zinc-800/90 rounded-lg text-sm font-mono text-zinc-200 truncate"
                        >
                            <span class="truncate select-all">{shortenedUrl}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2.5 pt-1">
                        <button
                            onclick={copyToClipboard}
                            class="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.99]"
                        >
                            {#if copied}
                                <svg
                                    class="w-4 h-4 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Copied!</span>
                            {:else}
                                <svg
                                    class="w-4 h-4 text-zinc-800"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>Copy</span>
                            {/if}
                        </button>

                        <button
                            onclick={handleReset}
                            class="px-4 py-2.5 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-200 font-medium rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.99]"
                        >
                            <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span>Shorten another</span>
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</main>
