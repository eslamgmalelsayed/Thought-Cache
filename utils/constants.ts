import type { ColorOption, NavItem } from '@/types'

// Color options for thoughts and categories
export const THOUGHT_COLORS: ColorOption[] = [
    { name: 'Orange', value: '#f97316', class: 'bg-orange-500' },
    { name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
    { name: 'Green', value: '#10b981', class: 'bg-emerald-500' },
    { name: 'Purple', value: '#8b5cf6', class: 'bg-violet-500' },
    { name: 'Pink', value: '#ec4899', class: 'bg-pink-500' },
    { name: 'Yellow', value: '#f59e0b', class: 'bg-amber-500' },
    { name: 'Red', value: '#ef4444', class: 'bg-red-500' },
    { name: 'Indigo', value: '#6366f1', class: 'bg-indigo-500' },
    { name: 'Teal', value: '#14b8a6', class: 'bg-teal-500' },
    { name: 'Cyan', value: '#06b6d4', class: 'bg-cyan-500' }
]

// Category icons using Lucide icons
export const CATEGORY_ICONS = [
    'lucide:lightbulb',
    'lucide:heart',
    'lucide:briefcase',
    'lucide:home',
    'lucide:graduation-cap',
    'lucide:flask-conical',
    'lucide:book-open',
    'lucide:camera',
    'lucide:music',
    'lucide:palette',
    'lucide:puzzle',
    'lucide:rocket',
    'lucide:star',
    'lucide:sun',
    'lucide:moon',
    'lucide:flame',
    'lucide:leaf',
    'lucide:globe',
    'lucide:clock',
    'lucide:helping-hand'
]

// Navigation items with Lucide icons
export const NAV_ITEMS: NavItem[] = [
    {
        name: 'nav.dashboard',
        href: '/',
        icon: 'lucide:home'
    },
    {
        name: 'nav.thoughts',
        href: '/thoughts',
        icon: 'lucide:lightbulb'
    },
    {
        name: 'nav.categories',
        href: '/categories',
        icon: 'lucide:tag'
    },
    {
        name: 'nav.settings',
        href: '/settings',
        icon: 'lucide:settings'
    }
]

// Theme options with Lucide icons
export const THEME_OPTIONS = [
    { value: 'light', label: 'ui.theme.light', icon: 'lucide:sun' },
    { value: 'dark', label: 'ui.theme.dark', icon: 'lucide:moon' },
    { value: 'system', label: 'ui.theme.system', icon: 'lucide:monitor' }
]

// Language options
export const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
    { value: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' }
]

// Pagination defaults
export const PAGINATION_DEFAULTS = {
    PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100
}

// Animation durations
export const ANIMATION_DURATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
}

// API endpoints
export const API_ENDPOINTS = {
    THOUGHTS: '/api/thoughts',
    CATEGORIES: '/api/categories',
    TAGS: '/api/tags',
    USER: '/api/user'
}

// Local storage keys
export const STORAGE_KEYS = {
    THEME: 'thought-cache-theme',
    LANGUAGE: 'thought-cache-language',
    FILTERS: 'thought-cache-filters'
}

// Error messages
export const ERROR_MESSAGES = {
    GENERIC: 'An unexpected error occurred',
    NETWORK: 'Network error. Please check your connection',
    VALIDATION: 'Please check your input and try again',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    NOT_FOUND: 'The requested resource was not found'
}

// Success messages
export const SUCCESS_MESSAGES = {
    THOUGHT_CREATED: 'Thought created successfully',
    THOUGHT_UPDATED: 'Thought updated successfully',
    THOUGHT_DELETED: 'Thought deleted successfully',
    CATEGORY_CREATED: 'Category created successfully',
    CATEGORY_UPDATED: 'Category updated successfully',
    CATEGORY_DELETED: 'Category deleted successfully'
} 