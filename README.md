# Thought Cache 💡

A modern, multilingual note-taking application built with the latest web technologies. Capture your brilliant ideas anytime, anywhere with support for Arabic and English languages, dark/light themes, and beautiful UI with comprehensive loading states.

## ✨ Features

- 🌍 **Multilingual Support**: Full Arabic and English localization with RTL support
- 🎨 **Modern UI**: Beautiful, responsive design with Nuxt UI components
- 🌙 **Dark/Light Mode**: System-aware theme switching
- 🔐 **Authentication**: Secure auth with Clerk and loading skeletons
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🏷️ **Categories & Tags**: Organize your thoughts efficiently
- 🔍 **Search**: Find your ideas quickly with autocomplete
- ⭐ **Favorites**: Mark important thoughts
- 📦 **Archive**: Keep your workspace clean
- 🎨 **Color Coding**: Visual organization with custom colors
- ⚡ **Loading States**: Comprehensive USkeleton components for better UX
- 🎯 **Accessibility**: Proper autocomplete attributes and ARIA labels
- 🔤 **Custom Fonts**: Language-specific typography (Arabic: Playpen Sans, English: DynaPuff)

## 🛠️ Tech Stack

- **Framework**: [Nuxt.js 3](https://nuxt.com/) with TypeScript
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/) with Tailwind CSS
- **Database**: [Prisma](https://prisma.io/) with PostgreSQL
- **Authentication**: [Clerk](https://clerk.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Code Quality**: ESLint + Husky + lint-staged
- **Icons**: [Nuxt Icon](https://github.com/nuxt-modules/icon) with Lucide icons
- **Fonts**: [Nuxt Fonts](https://github.com/nuxt/fonts) with Google Fonts
- **Deployment**: Ready for Supabase/Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Supabase)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd thought-cache
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp env.template .env
   ```

   Fill in your environment variables:

   ```env
   # Clerk Authentication
   NUXT_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
   NUXT_CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

   # Supabase (optional)
   NUXT_SUPABASE_URL=https://your-project.supabase.co
   NUXT_SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/thought_cache?schema=public"
   DIRECT_URL="postgresql://username:password@localhost:5432/thought_cache?schema=public"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Or run migrations (for production)
   npm run db:migrate
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
thought-cache/
├── 📁 .husky/                    # Git hooks configuration
├── 📁 .nuxt/                    # Auto-generated Nuxt files (gitignored)
├── 📁 .output/                  # Build output (gitignored)
├── 📁 assets/
│   └── css/
│       └── main.css             # Global styles with Nuxt UI theme
├── 📁 components/
│   ├── AppHeader.vue            # Global header with search and breadcrumbs
│   ├── AppSidebar.vue           # Navigation sidebar with user profile
│   ├── AppHeaderSkeleton.vue    # Loading state for header
│   ├── AppSidebarSkeleton.vue   # Loading state for sidebar
│   ├── AuthFormSkeleton.vue     # Loading state for Clerk auth forms
│   ├── CategoryForm.vue         # Form for creating/editing categories
│   ├── ClerkWrapper.vue         # Wrapper with loading states for Clerk
│   ├── FormSkeleton.vue         # Reusable form loading skeleton
│   ├── PageSkeleton.vue         # Full page loading skeleton
│   ├── QuickActionCardSkeleton.vue # Action card loading state
│   ├── StatCardSkeleton.vue     # Statistics card loading state
│   ├── TableSkeleton.vue        # Table/list loading skeleton
│   ├── ThoughtCard.vue          # Individual thought display card
│   ├── ThoughtCardSkeleton.vue  # Thought card loading state
│   ├── ThoughtForm.vue          # Form for creating/editing thoughts
│   └── UserProfileSkeleton.vue  # User profile loading state
├── 📁 composables/
│   ├── useLocaleFonts.ts        # Font switching based on locale
│   └── useClerkLoading.ts       # Clerk loading state management
├── 📁 generated/                # Auto-generated files
├── 📁 i18n/                     # Internationalization setup
├── 📁 layouts/
│   └── default.vue              # Main application layout
├── 📁 locales/
│   ├── ar.json                  # Arabic translations
│   └── en.json                  # English translations
├── 📁 middleware/
│   ├── auth.ts                  # Authentication middleware
│   └── guest.ts                 # Guest-only middleware
├── 📁 pages/
│   ├── categories/
│   │   ├── index.vue            # Categories list with skeletons
│   │   └── new.vue              # Create new category
│   ├── thoughts/
│   │   ├── index.vue            # Thoughts list with masonry and skeletons
│   │   └── new.vue              # Create new thought
│   ├── index.vue                # Dashboard with staggered loading
│   ├── settings.vue             # User settings with multiple forms
│   ├── sign-in.vue              # Clerk sign-in with skeleton
│   └── sign-up.vue              # Clerk sign-up with skeleton
├── 📁 plugins/
│   ├── clerk-init.client.ts     # Clerk initialization
│   └── fonts.client.ts          # Font loading and management
├── 📁 prisma/
│   └── schema.prisma            # Database schema
├── 📁 public/                   # Static assets
├── 📁 server/
│   ├── api/                     # API routes
│   └── middleware/
│       └── clerk.ts             # Server-side Clerk middleware
├── 📁 types/
│   └── index.ts                 # TypeScript type definitions
├── 📁 utils/
│   └── constants.ts             # Application constants
├── 📄 .gitignore                # Git ignore rules
├── 📄 app.vue                   # Root application component
├── 📄 env.template              # Environment variables template
├── 📄 eslint.config.mjs         # ESLint configuration
├── 📄 nuxt.config.ts            # Nuxt configuration
├── 📄 package.json              # Dependencies and scripts
├── 📄 README.md                 # This file
└── 📄 tsconfig.json             # TypeScript configuration
```

## 🎨 UI Components & Loading States

The app uses a comprehensive design system with:

### Core Components

- **ThoughtCard**: Beautiful note cards with color coding and masonry layout
- **StatCard**: Dashboard statistics display with icons
- **QuickActionCard**: Action shortcuts with hover effects
- **AppSidebar**: Navigation with theme/language toggles and user profile
- **AppHeader**: Search, breadcrumbs, and action buttons

### Skeleton Loading Components

- **AuthFormSkeleton**: Realistic loading state for Clerk authentication forms
- **UserProfileSkeleton**: Loading state for user profile in sidebar
- **ThoughtCardSkeleton**: Masonry-compatible loading cards
- **StatCardSkeleton**: Statistics card placeholders
- **FormSkeleton**: Configurable form loading states
- **TableSkeleton**: List and table loading with avatar/badge support
- **PageSkeleton**: Full page loading with multiple layout modes

### Form Components

- **ThoughtForm**: Complete thought creation with validation
- **CategoryForm**: Category creation with icon picker and color selection

## 🌐 Internationalization & Fonts

### Language Support

- **English (en)**: Default language, LTR with DynaPuff font
- **Arabic (ar)**: Full RTL support with Playpen Sans font
- **Font Switching**: Automatic font changing based on locale using Nuxt Fonts
- **Easy Extension**: Add new languages by creating locale files

### Typography

- **English**: DynaPuff (cursive, creative)
- **Arabic**: Playpen Sans (modern, highly readable)
- **Automatic Loading**: Fonts loaded via Nuxt Fonts with optimization

## ⚡ Loading Experience

### Skeleton Implementation

- **Staggered Loading**: Dashboard loads stats → actions → thoughts with delays
- **Component-Specific**: Each component has matching skeleton
- **Realistic Timing**: 800ms-1500ms loading states for perceived performance
- **Error Handling**: Graceful fallbacks when loading fails

### Clerk Integration

- **Authentication Skeletons**: Loading states for sign-in/sign-up forms
- **User Profile Loading**: Skeleton in sidebar while user data loads
- **Smart Detection**: Automatic Clerk readiness detection
- **Timeout Protection**: Prevents infinite loading states

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) for the amazing framework
- [Nuxt UI](https://ui.nuxt.com/) for beautiful components
- [Clerk](https://clerk.com/) for authentication
- [Prisma](https://prisma.io/) for database management
- [Lucide](https://lucide.dev/) for beautiful icons
- [Google Fonts](https://fonts.google.com/) for typography

---

Built with ❤️ using the latest web technologies
