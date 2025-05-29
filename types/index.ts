// Database Models
export interface User {
    id: string
    clerkId: string
    email: string
    firstName?: string
    lastName?: string
    imageUrl?: string
    createdAt: Date
    updatedAt: Date
}

export interface Category {
    id: string
    name: string
    color: string
    icon?: string
    createdAt: Date
    updatedAt: Date
    _count?: {
        thoughts: number
    }
}

export interface Tag {
    id: string
    name: string
    createdAt: Date
}

export interface Thought {
    id: string
    title: string
    content: string
    color: string
    isArchived: boolean
    isFavorite: boolean
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    userId: string
    categoryId?: string
    category?: Category
    tags: ThoughtTag[]
}

export interface ThoughtTag {
    thoughtId: string
    tagId: string
    tag: Tag
}

// Form Types
export interface ThoughtFormData {
    title: string
    content: string
    color: string
    categoryId?: string
    tags: string[]
}

export interface CategoryFormData {
    name: string
    color: string
    icon?: string
}

export interface TagFormData {
    name: string
}

// API Response Types
export interface ApiResponse<T> {
    data?: T
    error?: string
    message?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

// UI State Types
export interface ThemeState {
    mode: 'light' | 'dark' | 'system'
}

export interface LocaleState {
    locale: 'en' | 'ar'
    dir: 'ltr' | 'rtl'
}

// Filter and Search Types
export interface ThoughtFilters {
    search?: string
    categoryId?: string
    tags?: string[]
    isArchived?: boolean
    isFavorite?: boolean
    sortBy?: 'createdAt' | 'updatedAt' | 'title'
    sortOrder?: 'asc' | 'desc'
}

// Color Options
export interface ColorOption {
    name: string
    value: string
    class: string
}

// Navigation Types
export interface NavItem {
    name: string
    href: string
    icon: string
    badge?: number
}

// Modal Types
export interface ModalState {
    isOpen: boolean
    type?: 'create' | 'edit' | 'delete' | 'view'
    data?: any
}

// Validation Types
export interface ValidationError {
    field: string
    message: string
}

export interface FormState {
    isSubmitting: boolean
    errors: ValidationError[]
} 