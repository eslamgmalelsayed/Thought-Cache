export default defineNuxtRouteMiddleware(async () => {
    // Skip middleware in server-side rendering
    if (import.meta.server) return

    try {
        // Import Clerk composables with error handling
        const { isSignedIn, isLoaded } = useAuth()

        // Quick check - if already loaded
        if (isLoaded.value) {
            if (isSignedIn.value) {
                return navigateTo('/')
            }
            return // Not signed in, allow access to guest pages
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

            // Short timeout - don't block guest pages
            timeoutId = setTimeout(() => {
                console.warn('Guest check timeout, allowing navigation')
                cleanup()
                resolve()
            }, 1000) // Even shorter for guest pages
        })

        // Final check after waiting
        if (isLoaded.value && isSignedIn.value) {
            return navigateTo('/')
        }

    } catch (error) {
        // If guest check fails, log and allow navigation
        console.warn('Guest middleware error:', error)
    }
}) 