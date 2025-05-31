import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient = (() => {
    if (process.env.NODE_ENV === 'production') {
        return new PrismaClient()
    } else {
        const globalForPrisma = global as typeof global & {
            __prisma?: PrismaClient
        }

        if (!globalForPrisma.__prisma) {
            globalForPrisma.__prisma = new PrismaClient()
        }
        return globalForPrisma.__prisma
    }
})()

export default prisma

// Composable for Prisma operations
export const usePrisma = () => {
    return {
        prisma,

        // Helper to disconnect prisma client
        async disconnect() {
            await prisma.$disconnect()
        },

        // Helper to check database connection
        async checkConnection() {
            try {
                await prisma.$connect()
                return true
            } catch (error) {
                console.error('Database connection failed:', error)
                return false
            }
        }
    }
} 