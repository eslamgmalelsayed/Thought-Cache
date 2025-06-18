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
            let checkAttempts = 0
            const maxAttempts = 50 // 5 seconds max
            
            const checkClerkReady = () => {
                try {
                    checkAttempts++
                    
                    // Check if Clerk is available and ready
                    const clerk = window?.Clerk
                    if (clerk?.loaded) {
                        stopLoading()
                        return
                    }
                    
                    // Stop checking after max attempts
                    if (checkAttempts >= maxAttempts) {
                        stopLoading()
                        return
                    }
                    
                    setTimeout(checkClerkReady, 100)
                } catch {
                    // Stop checking after max attempts
                    if (checkAttempts >= maxAttempts) {
                        stopLoading()
                        return
                    }
                    
                    setTimeout(checkClerkReady, 100)
                }
            }

            checkClerkReady()
        } else {
            // If not on client, stop loading after timeout
            setTimeout(() => {
                if (isLoading.value) {
                    stopLoading()
                }
            }, 3000)
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