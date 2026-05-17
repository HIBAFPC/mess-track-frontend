# Mess Track Frontend

A scalable, production-ready frontend foundation for the Mess Track SaaS platform.

## Tech Stack

- **Framework:** [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **API Client:** [Axios](https://axios-http.com/)
- **Notifications:** [Sonner](https://sonner.stevenly.me/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Architecture Overview

```text
src/
  app/            # App Router pages and route groups
    (auth)/       # Authentication routes
    (dashboard)/  # Protected dashboard routes
  components/     # Shared and UI components
    ui/           # shadcn/ui components
    shared/       # Generic reusable components
    layout/       # Layout-specific components
  features/       # Feature-based modules (Auth, Users, Meals, etc.)
  hooks/          # Custom React hooks
  lib/            # Utility libraries, API client, and constants
  providers/      # Context providers (Query, Theme, etc.)
  services/       # API service abstractions
  store/          # Zustand global state stores
  types/          # TypeScript type definitions
```

## Features Included in Foundation

- Centralized Axios client with environment-driven base URL
- TanStack Query global provider configuration
- Zustand state management structure
- shadcn/ui integration
- App Router route groups with layout placeholders
- Error boundaries and 404 page placeholders
- Shared hooks (use-mobile, use-debounce)
- Centralized constants and types
