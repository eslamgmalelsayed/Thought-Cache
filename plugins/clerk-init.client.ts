export default defineNuxtPlugin({
    name: 'clerk-init',
    async setup() {
        // Only run on client side
        if (import.meta.server) return

        try {
            // Import Clerk composables
            const { isLoaded } = useAuth()

            // Don't block the app - just check when Clerk is ready
            watch(isLoaded, (loaded) => {
                if (loaded) {
                    // Clerk is ready
                }
            }, { immediate: true })

            // Set a reasonable timeout and continue regardless
            setTimeout(() => {
                if (!isLoaded.value) {
                    // Clerk took longer than expected to load, but continuing
                }
            }, 3000)

        } catch {
            // Clerk initialization failed
        }
    }
}) 