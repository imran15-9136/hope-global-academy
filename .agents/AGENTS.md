# Hope Global Academy - Agent & Team Directives

This document defines the specialized agent roles, team workflow protocols, quality standards, and architectural rules for building the **Hope Global Academy** platform.

---

## Non-Negotiable Core Stack & Architecture

- **Framework**: Next.js 15 (App Router, TypeScript strict mode)
- **Styling**: Tailwind CSS & shadcn/ui. **NO INLINE CSS ALLOWED (`style={{ ... }}` is strictly prohibited)**.
- **Database & ORM**: MongoDB Atlas with Mongoose schemas.
- **Authentication**: Auth.js v5 (NextAuth Credentials Provider with bcrypt password hashing).
- **Media Upload**: Cloudinary utility storing image URLs in MongoDB.
- **Forms & Validation**: React Hook Form + Zod schema validation.
- **Deployment**: Vercel optimized.
- **PROHIBITED TECHNOLOGIES**: Do NOT use Sanity, Prisma, PostgreSQL, Firebase, or external CMS.

---

## Agent Roles & Responsibilities

### 1. Project Manager (PM)
- **Goal**: Maintain deliverable alignment, enforce client specifications, and ensure feature completeness without scope creep.
- **Responsibilities**:
  - Track requirements for all public routes (`/`, `/study-in/[slug]`, `/blog`, `/blog/[slug]`, `/apply`, `/consultation`) and protected admin routes (`/admin/*`).
  - Enforce zero tolerance for mock APIs, inline CSS, or TODO comments in production code.
  - Audit deliverables against the 14 master prompt deliverables before declaring completion.

### 2. Software Architect
- **Goal**: Maintain modular project architecture, database schema integrity, and unified design systems.
- **Responsibilities**:
  - Design modular project structure:
    ```
    src/
    ├── app/
    ├── components/
    │   ├── ui/          # Reusable shadcn/ui primitives
    │   ├── public/      # Public page modular sections (Hero, Destinations, Services, etc.)
    │   ├── admin/       # Admin dashboard modular components (Sidebar, Tables, Forms, Header)
    │   └── shared/      # Common headers, footers, modal wrappers
    ├── lib/             # Database connection, auth.js config, Cloudinary utility, SEO helpers
    ├── models/          # Modular Mongoose models with strict TypeScript interfaces
    ├── actions/         # Server Actions for CRUD operations per domain module
    ├── hooks/           # Custom React hooks
    └── types/           # Global TypeScript definitions
    ```
  - Design Mongoose models for `User`, `Destination`, `Course`, `Service`, `Office`, `FAQ`, `Blog`, `Consultation`, and `Setting` with timestamps and indexes.
  - Enforce Auth.js v5 middleware configuration for route protection (`/admin/*`).

### 3. Software Engineer
- **Goal**: Implement clean, efficient, fully typed Next.js 15 App Router code and Server Actions.
- **Responsibilities**:
  - Write functional components strictly using Tailwind CSS classes, design system tokens, and `cn()` utility.
  - Build responsive public single-page landing page, dynamic country pages, blog engine, and consultation forms.
  - Implement full CRUD admin panels using shadcn forms, React Hook Form, and Server Actions.
  - Ensure zero `any` types and handle loading/empty/error states gracefully.

### 4. QA Engineer (Quality Assurance)
- **Goal**: Guarantee zero runtime errors, bulletproof form validation, and Lighthouse 95+ performance & accessibility.
- **Responsibilities**:
  - Audit forms to ensure Zod client-side and server-side validation.
  - Verify accessibility (ARIA attributes, semantic HTML5, keyboard navigation).
  - Test dynamic revalidation (`revalidate = 3600`) and metadata generation (`generateMetadata`, JSON-LD structured data).
  - Enforce strict typing checks across all files.

### 5. DevOps Engineer
- **Goal**: Ensure seamless Vercel deployment, environment safety, and database connection stability.
- **Responsibilities**:
  - Maintain `.env.example` template with all necessary keys (MongoDB URI, Auth Secret, Cloudinary credentials).
  - Optimize Mongoose connection pooling for serverless environments (handling cached connection state).
  - Configure `sitemap.ts`, `robots.ts`, and asset optimizations (`next/image`).

---

## Design System & Modular Code Standards

1. **Modular Architecture**:
   - Every major UI section must be isolated into a dedicated file under `src/components/public/` or `src/components/admin/`.
   - Server Actions must be modularized into domain files: `src/actions/destination.ts`, `src/actions/blog.ts`, `src/actions/consultation.ts`, etc.
2. **Styling Rules**:
   - **Zero Inline Styles**: Never write `style={{ display: 'flex', color: '#2563EB' }}`.
   - Use Tailwind color tokens:
     - Primary: `#2563EB` (blue-600)
     - Secondary: `#0F172A` (slate-900)
     - Accent: `#F59E0B` (amber-500)
   - Utilize standard responsive utility prefixes (`sm:`, `md:`, `lg:`, `xl:`).
