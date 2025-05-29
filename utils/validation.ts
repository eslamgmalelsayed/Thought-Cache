import { z } from 'zod'

// Thought validation schema
export const thoughtSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(100, 'Title must be less than 100 characters'),
    content: z.string()
        .min(1, 'Content is required')
        .max(5000, 'Content must be less than 5000 characters'),
    color: z.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
    categoryId: z.string().optional(),
    tags: z.array(z.string()).default([])
})

// Category validation schema
export const categorySchema = z.object({
    name: z.string()
        .min(1, 'Category name is required')
        .max(50, 'Category name must be less than 50 characters'),
    color: z.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
    icon: z.string().optional()
})

// Tag validation schema
export const tagSchema = z.object({
    name: z.string()
        .min(1, 'Tag name is required')
        .max(30, 'Tag name must be less than 30 characters')
        .regex(/^[a-zA-Z0-9\s\u0600-\u06FF]+$/, 'Tag name contains invalid characters')
})

// Search and filter validation
export const thoughtFiltersSchema = z.object({
    search: z.string().optional(),
    categoryId: z.string().optional(),
    tags: z.array(z.string()).default([]),
    isArchived: z.boolean().default(false),
    isFavorite: z.boolean().optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'title']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20)
})

// Update schemas for partial updates
export const thoughtUpdateSchema = thoughtSchema.partial()
export const categoryUpdateSchema = categorySchema.partial()

// Export types from schemas
export type ThoughtInput = z.infer<typeof thoughtSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type TagInput = z.infer<typeof tagSchema>
export type ThoughtFilters = z.infer<typeof thoughtFiltersSchema>
export type ThoughtUpdate = z.infer<typeof thoughtUpdateSchema>
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean
    data?: T
    errors?: string[]
} {
    try {
        const result = schema.parse(data)
        return { success: true, data: result }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
            }
        }
        return { success: false, errors: ['Validation failed'] }
    }
} 