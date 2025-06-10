import { z } from 'zod'

// Thought validation schema
export const thoughtSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters')
        .trim(),
    content: z.string()
        .min(1, 'Content is required')
        .max(5000, 'Content must be less than 5000 characters')
        .trim(),
    color: z.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
    tags: z.array(z.string())
        .max(10, 'Maximum 10 tags allowed')
        .default([])
        .refine(
            (tags) => tags.every(tag => tag.length <= 30),
            'Each tag must be less than 30 characters'
        )
        .refine(
            (tags) => tags.every(tag => /^[a-zA-Z0-9\s\u0600-\u06FF-]+$/.test(tag)),
            'Tags can only contain letters, numbers, spaces, and hyphens'
        )
})

// Tag validation schema for individual tags
export const tagSchema = z.object({
    name: z.string()
        .min(1, 'Tag name is required')
        .max(30, 'Tag name must be less than 30 characters')
        .regex(/^[a-zA-Z0-9\s\u0600-\u06FF-]+$/, 'Tag name contains invalid characters')
        .trim()
})

// Search and filter validation
export const thoughtFiltersSchema = z.object({
    search: z.string().optional(),
    tags: z.array(z.string()).default([]),
    isFavorite: z.boolean().optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'title']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20)
})

// Update schemas for partial updates
export const thoughtUpdateSchema = thoughtSchema.partial()

// Export types from schemas
export type ThoughtInput = z.infer<typeof thoughtSchema>
export type TagInput = z.infer<typeof tagSchema>
export type ThoughtFilters = z.infer<typeof thoughtFiltersSchema>
export type ThoughtUpdate = z.infer<typeof thoughtUpdateSchema>

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean
    data?: T
    errors?: Record<string, string[]>
} {
    try {
        const result = schema.parse(data)
        return { success: true, data: result }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors: Record<string, string[]> = {}
            error.errors.forEach(err => {
                const field = err.path.join('.')
                if (!fieldErrors[field]) {
                    fieldErrors[field] = []
                }
                fieldErrors[field].push(err.message)
            })
            return {
                success: false,
                errors: fieldErrors
            }
        }
        return { success: false, errors: { general: ['Validation failed'] } }
    }
}

// Helper function to validate individual tags
export function validateTag(tag: string): { valid: boolean; error?: string } {
    try {
        tagSchema.parse({ name: tag })
        return { valid: true }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { valid: false, error: error.errors[0]?.message || 'Invalid tag' }
        }
        return { valid: false, error: 'Invalid tag' }
    }
} 