import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const supabase = createClient<Database>(
            config.public.supabaseUrl,
            config.public.supabaseAnonKey
        )

        // Get the thought ID from the route
        const thoughtId = getRouterParam(event, 'id')
        
        if (!thoughtId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Thought ID is required'
            })
        }

        // Delete the thought
        const { error } = await supabase
            .from('thoughts')
            .delete()
            .eq('id', thoughtId)

        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: `Failed to delete thought: ${error.message}`,
                data: error
            })
        }

        return {
            success: true,
            message: 'Thought deleted successfully'
        }
    } catch (error: unknown) {
        // If it's already a createError, re-throw it
        if (error && typeof error === 'object' && 'statusCode' in error) {
            throw error
        }
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error',
            data: error
        })
    }
}) 