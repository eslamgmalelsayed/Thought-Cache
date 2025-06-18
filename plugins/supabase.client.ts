import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const supabaseUrl = config.public.supabaseUrl
    const supabaseAnonKey = config.public.supabaseAnonKey

    // Skip Supabase initialization if credentials are not available
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
        // Supabase credentials not found or not configured - skipping initialization
        return {
            provide: {
                supabase: null
            }
        }
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey)

        return {
            provide: {
                supabase
            }
        }
    } catch {
        // Failed to initialize Supabase client
        return {
            provide: {
                supabase: null
            }
        }
    }
}) 