export const useLocaleFonts = () => {
    // Guard against calling outside of Nuxt context
    if (!import.meta.client && !import.meta.server) {
        return {
            updateDocumentFonts: () => { }
        }
    }

    let locale: Ref<string>

    try {
        const { locale: i18nLocale } = useI18n()
        locale = i18nLocale
    } catch (error) {
        // Fallback if i18n is not available
        locale = ref('en')
    }

    const updateDocumentFonts = () => {
        if (import.meta.client && document) {
            const html = document.documentElement

            // Update lang attribute
            html.setAttribute('lang', locale.value)

            // Update direction for Arabic
            if (locale.value === 'ar') {
                html.setAttribute('dir', 'rtl')
            } else {
                html.setAttribute('dir', 'ltr')
            }

            // The CSS will handle the font switching automatically
            // based on the lang attribute via CSS custom properties
        }
    }

    // Only watch if we're in the proper context
    if (locale && typeof watch !== 'undefined') {
        try {
            watch(locale, updateDocumentFonts, { immediate: false })
        } catch (error) {
            // Silently fail if watch is not available
        }
    }

    return {
        updateDocumentFonts
    }
} 