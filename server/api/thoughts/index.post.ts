import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const supabase = createClient<Database>(
            config.public.supabaseUrl,
            config.public.supabaseAnonKey
        )

        // Get the request body
        const body = await readBody(event)
        
        // Validate required fields
        if (!body.title || !body.content || !body.user_id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields: title, content, user_id'
            })
        }

        // Insert the new thought
        const { data: thought, error } = await supabase
            .from('thoughts')
            .insert([{
                title: body.title,
                content: body.content,
                tags: body.tags || [],
                color: body.color || '#3B82F6',
                is_favorite: body.is_favorite || false,
                user_id: body.user_id
            }])
            .select()
            .single()

        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to create thought',
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