export default defineNuxtRouteMiddleware(async () => {
    // Skip middleware in server-side rendering to avoid hydration issues
    if (import.meta.server) return

    try {
        // Import Clerk composables with error handling
        const { isSignedIn, isLoaded } = useAuth()

        // Quick check - if already loaded and signed in, continue
        if (isLoaded.value && isSignedIn.value) {
            return
        }

        // If already loaded but not signed in, redirect immediately
        if (isLoaded.value && !isSignedIn.value) {
            return navigateTo('/sign-in')
        }

        // Wait for Clerk to load, but with a short timeout
        await new Promise<void>((resolve) => {
            let unwatch: (() => void) | null = null
            let timeoutId: NodeJS.Timeout | null = null

            const cleanup = () => {
                if (unwatch) unwatch()
                if (timeoutId) clearTimeout(timeoutId)
            }

            unwatch = watch(isLoaded, (loaded) => {
                if (loaded) {
                    cleanup()
                    resolve()
                }
            }, { immediate: true })

            // Very short timeout - don't block the app
            timeoutId = setTimeout(() => {
                cleanup()
                resolve()
            }, 1000) // Only 1 second
        })

        // Final check after waiting
        if (isLoaded.value && !isSignedIn.value) {
            return navigateTo('/sign-in')
        }

    } catch {
        // If auth check fails, allow navigation (fail open)
    }
}) 