# Mess Track Frontend

A scalable, production-ready frontend foundation for the Mess Track SaaS platform.

## Tech Stack

- **Framework:** [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **API Client:** [Axios](https://axios-http.com/)
- **Notifications:** [Sonner](https://sonner.stevenly.me/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   `ash
   npm install
   `
3. Copy environment variables:
   `ash
   cp .env.example .env
   `

### Development

Run the development server:
`ash
npm run dev
`

The application will be available at http://localhost:3000.

## Architecture Overview

```	ext
src/
  app/            # App Router pages and route groups
  components/     # Shared and UI components
    ui/           # shadcn/ui components
    shared/       # Generic reusable components
    layout/       # Layout-specific components
  features/       # Feature-based modules (Auth, Users, Meals, etc.)
  hooks/          # Custom React hooks
  lib/            # Utility libraries and API client
  providers/      # Context providers (Query, Theme, etc.)
  services/       # API service abstractions
  store/          # Zustand global state stores
  types/          # TypeScript type definitions
```

## Features Included in Foundation

- Centralized Axios client with interceptor scaffolding
- TanStack Query global provider configuration
- Zustand state management structure
- shadcn/ui integration with basic Button
- Responsive home page placeholder
- Sonner notification system
- Environment variable configuration
