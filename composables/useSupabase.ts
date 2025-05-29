export const useSupabase = () => {
    const { $supabase } = useNuxtApp()

    if (!$supabase) {
        console.warn('Supabase client not initialized. Make sure environment variables are set.')
        return null
    }

    return $supabase
} 