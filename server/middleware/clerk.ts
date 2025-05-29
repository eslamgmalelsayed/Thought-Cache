export default defineEventHandler(async (event) => {
    // Only apply to API routes
    if (!event.node.req.url?.startsWith('/api/')) {
        return
    }

    // Skip public API routes that don't need authentication
    const publicRoutes = [
        '/api/health',
        '/api/public'
    ]

    if (publicRoutes.some(route => event.node.req.url?.startsWith(route))) {
        return
    }

    // Get Clerk auth from headers
    const authorization = getCookie(event, '__session') || getHeader(event, 'authorization')

    if (!authorization) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized - No authentication token provided'
        })
    }

    // You can add more Clerk server-side validation here
    // For now, we'll let the Clerk client-side handle most auth logic
}) 