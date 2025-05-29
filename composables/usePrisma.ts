import { PrismaClient } from '@prisma/client'

// Global prisma instance for server-side usage
declare global {
    var __prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.__prisma) {
        global.__prisma = new PrismaClient()
    }
    prisma = global.__prisma
}

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