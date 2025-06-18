import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

export default defineEventHandler(async (_event) => {
    try {
        const config = useRuntimeConfig()
        const supabase = createClient<Database>(
            config.public.supabaseUrl,
            config.public.supabaseAnonKey
        )

        // Get user from Clerk (you'll need to implement this)
        // For now, let's get all thoughts (you should filter by user)
        const { data: thoughts, error } = await supabase.from('thoughts').select('*')

        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to fetch thoughts',
                data: error
            })
        }

        return {
            success: true,
            data: thoughts || [],
            meta: {
                total: thoughts?.length || 0
            }
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 