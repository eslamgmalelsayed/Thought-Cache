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
                console.warn('Auth check timeout, allowing navigation')
                cleanup()
                resolve()
            }, 2000) // Only 2 seconds
        })

        // Final check after waiting
        if (isLoaded.value && !isSignedIn.value) {
            return navigateTo('/sign-in')
        }

    } catch (error) {
        // If auth check fails, log and allow navigation (fail open)
        console.warn('Auth middleware error:', error)
    }
}) 