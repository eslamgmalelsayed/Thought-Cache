export default defineNuxtPlugin(() => {
    // Initialize font handling in the proper Nuxt context
    const { updateDocumentFonts } = useLocaleFonts()

    // Set initial fonts
    if (import.meta.client) {
        nextTick(() => {
            updateDocumentFonts()
        })
    }
}) 