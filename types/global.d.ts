// Global type definitions for the Thought Cache application

// Clerk types
interface ClerkInstance {
    loaded?: boolean;
    [key: string]: unknown;
}

// Extend Window interface to include Clerk
declare global {
    interface Window {
        Clerk?: ClerkInstance;
    }
}

export { }; 