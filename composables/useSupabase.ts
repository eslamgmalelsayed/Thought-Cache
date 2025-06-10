import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

const useSupabase = () => {
    const config = useRuntimeConfig()

    const supabase = createClient<Database>(
        config.public.supabaseUrl,
        config.public.supabaseAnonKey
    )

    return {
        supabase,

        // Database helpers
        db: {
            // Thoughts operations
            thoughts: {
                getAll: () => supabase.from('thoughts').select('*'),

                getById: (id: string) =>
                    supabase.from('thoughts').select('*').eq('id', id).single(),

                create: (thought: Database['public']['Tables']['thoughts']['Insert']) =>
                    supabase.from('thoughts').insert(thought).select().single(),

                update: (id: string, updates: Database['public']['Tables']['thoughts']['Update']) =>
                    supabase.from('thoughts').update(updates).eq('id', id).select().single(),

                delete: (id: string) =>
                    supabase.from('thoughts').delete().eq('id', id),

                getByUserId: (userId: string) =>
                    supabase.from('thoughts').select('*').eq('user_id', userId),

                search: (query: string) =>
                    supabase.from('thoughts')
                        .select('*')
                        .or(`title.ilike.%${query}%, content.ilike.%${query}%`),

                searchByTag: (tag: string) =>
                    supabase.from('thoughts')
                        .select('*')
                        .contains('tags', [tag]),

                searchByTags: (tags: string[]) =>
                    supabase.from('thoughts')
                        .select('*')
                        .overlaps('tags', tags),

                getFavorites: (userId: string) =>
                    supabase.from('thoughts')
                        .select('*')
                        .eq('user_id', userId)
                        .eq('is_favorite', true)
            }
        }
    }
}

export default useSupabase 