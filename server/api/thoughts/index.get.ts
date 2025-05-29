import { z } from 'zod'
import prisma from '@/composables/usePrisma'

// Query parameters schema
const querySchema = z.object({
    limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    search: z.string().optional(),
    categoryId: z.string().optional(),
    isArchived: z.string().optional().transform(val => val === 'true'),
    isFavorite: z.string().optional().transform(val => val === 'true'),
    sort: z.string().optional().default('createdAt:desc')
})

export default defineEventHandler(async (event) => {
    try {
        // Parse query parameters
        const query = await getQuery(event)
        const { limit, page, search, categoryId, isArchived, isFavorite, sort } = querySchema.parse(query)

        // For now, return mock data since we don't have auth setup yet
        const mockThoughts = [
            {
                id: '1',
                title: 'This is Docket note.',
                content: 'A simple note to test the UI design and functionality.',
                color: '#f97316',
                isArchived: false,
                isFavorite: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user_1',
                categoryId: null,
                category: null,
                tags: [
                    {
                        thoughtId: '1',
                        tagId: 'tag1',
                        tag: { id: 'tag1', name: 'tags', createdAt: new Date() }
                    }
                ]
            },
            {
                id: '2',
                title: 'The beginning of business design',
                content: 'UI jobs to be taken over by Solution Architect. This is a longer note to test how the card handles more content.',
                color: '#f59e0b',
                isArchived: false,
                isFavorite: true,
                createdAt: new Date(Date.now() - 86400000), // Yesterday
                updatedAt: new Date(),
                userId: 'user_1',
                categoryId: null,
                category: null,
                tags: [
                    {
                        thoughtId: '2',
                        tagId: 'tag2',
                        tag: { id: 'tag2', name: 'tags', createdAt: new Date() }
                    }
                ]
            },
            {
                id: '3',
                title: '13 Things You Should Give Up If You Want To Be a Successful UX Designer',
                content: 'A comprehensive guide to becoming a better UX designer by letting go of certain habits and mindsets.',
                color: '#ef4444',
                isArchived: false,
                isFavorite: false,
                createdAt: new Date(Date.now() - 172800000), // 2 days ago
                updatedAt: new Date(),
                userId: 'user_1',
                categoryId: null,
                category: null,
                tags: []
            }
        ]

        return {
            data: mockThoughts,
            total: mockThoughts.length,
            page,
            limit,
            totalPages: Math.ceil(mockThoughts.length / limit)
        }
    } catch (error) {
        console.error('Error fetching thoughts:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch thoughts'
        })
    }
}) 