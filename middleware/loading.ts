export default defineNuxtRouteMiddleware((to, from) => {
    // Skip on server-side
    if (import.meta.server) return

    // Show loading state for route transitions
    if (from && to.path !== from.path) {
        // You can emit loading events here or set loading state
        console.log(`Navigating from ${from.path} to ${to.path}`)
    }

    // You can add loading logic here
    // For example, showing a loading bar or spinner
    return
}) 
