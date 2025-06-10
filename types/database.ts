export interface Database {
    public: {
        Tables: {
            thoughts: {
                Row: {
                    id: string
                    title: string
                    content: string
                    tags: string[]
                    color: string
                    is_favorite: boolean
                    user_id: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    content: string
                    tags?: string[]
                    color?: string
                    is_favorite?: boolean
                    user_id: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    content?: string
                    tags?: string[]
                    color?: string
                    is_favorite?: boolean
                    user_id?: string
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
} 