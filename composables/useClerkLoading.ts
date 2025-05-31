export const useClerkLoading = () => {
    const isLoading = ref(true)
    const hasError = ref(false)
    const loadingTimeout = ref()

    const startLoading = () => {
        isLoading.value = true
        hasError.value = false

        // Set a timeout to stop showing skeleton after reasonable time
        if (loadingTimeout.value) {
            clearTimeout(loadingTimeout.value)
        }

        loadingTimeout.value = setTimeout(() => {
            isLoading.value = false
        }, 5000) // 5 seconds max loading time
    }

    const stopLoading = () => {
        isLoading.value = false
        if (loadingTimeout.value) {
            clearTimeout(loadingTimeout.value)
        }
    }

    const setError = () => {
        hasError.value = true
        stopLoading()
    }

    // Auto-start loading when composable is created
    onMounted(() => {
        startLoading()

        // Watch for Clerk to be ready
        if (import.meta.client) {
            const checkClerkReady = () => {
                try {
                    // Check if Clerk is available and ready
                    const clerk = window?.Clerk
                    if (clerk?.loaded) {
                        stopLoading()
                    } else {
                        setTimeout(checkClerkReady, 100)
                    }
                } catch {
                    // Continue checking
                    setTimeout(checkClerkReady, 100)
                }
            }

            checkClerkReady()
        }
    })

    onUnmounted(() => {
        if (loadingTimeout.value) {
            clearTimeout(loadingTimeout.value)
        }
    })

    return {
        isLoading: readonly(isLoading),
        hasError: readonly(hasError),
        startLoading,
        stopLoading,
        setError
    }
} 