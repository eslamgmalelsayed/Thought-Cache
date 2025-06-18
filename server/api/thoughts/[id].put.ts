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

        // Get the request body
        const body = await readBody(event)
        
        // Prepare update data (only include fields that are provided)
        const updateData: Record<string, unknown> = {}
        if (body.title !== undefined) updateData.title = body.title
        if (body.content !== undefined) updateData.content = body.content
        if (body.tags !== undefined) updateData.tags = body.tags
        if (body.color !== undefined) updateData.color = body.color
        if (body.is_favorite !== undefined) updateData.is_favorite = body.is_favorite

        // Update the thought
        const { data: thought, error } = await supabase
            .from('thoughts')
            .update(updateData)
            .eq('id', thoughtId)
            .select()
            .single()

        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to update thought',
                data: error
            })
        }

        return {
            success: true,
            data: thought
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