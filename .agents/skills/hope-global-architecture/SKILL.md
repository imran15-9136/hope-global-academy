---
name: hope-global-architecture
description: Next.js 15 App Router modular architecture, Auth.js v5 credentials setup, middleware route protection, and Server Actions patterns for Hope Global Academy.
---

# Skill: Hope Global Architecture

This skill provides architectural guidelines and modular structure patterns for Hope Global Academy built with Next.js 15 (App Router).

## 1. Directory Layout Standards

Maintain strict modularity by keeping code organized in clear, single-responsibility subdirectories:

```
src/
├── app/
│   ├── (public)/              # Public route group (Landing, Study-In, Blog, Apply, Consultation)
│   │   ├── page.tsx           # Homepage single-page landing
│   │   ├── study-in/
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Dynamic country pages
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Blog post detail
│   │   ├── apply/
│   │   │   └── page.tsx       # Apply page
│   │   └── consultation/
│   │       └── page.tsx       # Book consultation page
│   ├── (admin)/               # Protected Admin route group with dashboard layout
│   │   └── admin/
│   │       ├── layout.tsx     # Admin layout with sidebar navigation
│   │       ├── page.tsx       # Admin overview dashboard
│   │       ├── destinations/
│   │       ├── blogs/
│   │       ├── services/
│   │       ├── offices/
│   │       ├── faqs/
│   │       ├── settings/
│   │       └── consultations/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/ # Auth.js handler
│   ├── globals.css
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                    # Base primitive components (shadcn/ui)
│   ├── public/                # Modular landing & public sections (Hero, Destinations, FAQ, etc.)
│   ├── admin/                 # Modular admin panel components (Sidebar, Tables, Forms, Stats)
│   └── shared/                # Headers, Footers, SEO wrappers, Turnstile placeholder
├── lib/
│   ├── db.ts                  # Mongoose MongoDB Atlas connection singleton
│   ├── auth.ts                # Auth.js configuration (Credentials provider + bcrypt)
│   ├── cloudinary.ts          # Cloudinary upload utility
│   ├── utils.ts               # cn helper and formatting utilities
│   └── seo.ts                 # Metadata & JSON-LD helpers
├── models/                    # Mongoose Models
├── actions/                   # Server Actions modularized by domain module
├── hooks/                     # Custom React hooks
└── types/                     # TypeScript types and interfaces
```

## 2. Styling Directives (No Inline CSS)

- **Strict Rule**: Avoid all inline CSS (`style={{ ... }}`).
- Use standard Tailwind CSS utility classes and Tailwind variables defined in `src/app/globals.css`.
- Standardized Palette Tokens:
  - Primary: `bg-blue-600` / `text-blue-600` (`#2563EB`)
  - Secondary: `bg-slate-900` / `text-slate-900` (`#0F172A`)
  - Accent: `bg-amber-500` / `text-amber-500` (`#F59E0B`)
- Utilize standard conditional class helper `cn(...)` from `src/lib/utils.ts`.

## 3. Auth.js v5 Setup Guidelines

- Implement Credentials Provider using bcrypt password validation against the `User` Mongoose model.
- Configure `middleware.ts` to protect `/admin/*` routes, redirecting unauthenticated users to `/admin/login`.
- Return JWT session with role information.

## 4. Server Actions Pattern

- Mark server action files with `'use server'`.
- Return standard typed response objects:
  ```ts
  export type ActionResponse<T = null> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
  };
  ```
