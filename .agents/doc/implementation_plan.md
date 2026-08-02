# Phase-by-Phase Implementation Plan: Hope Global Academy

This implementation plan outlines the step-by-step roadmap for building the production-ready **Hope Global Academy** study abroad consultation platform.

---

## User Review Required

> [!IMPORTANT]
> - **Strict Tech Stack**: Next.js 15 App Router, Tailwind CSS, shadcn/ui, MongoDB Atlas, Mongoose, Auth.js v5 (NextAuth), Cloudinary, Zod, React Hook Form, Vercel optimized.
> - **Prohibited**: Sanity, Prisma, PostgreSQL, Firebase, or any external CMS.
> - **Design Directives**: **Zero inline styles allowed (`style={{ ... }}` is strictly forbidden)**. Everything must use Tailwind CSS utilities and modular component architecture (`src/components/ui`, `src/components/public`, `src/components/admin`, `src/components/shared`).

---

## Phase Breakdown

### Phase 1: Project Foundation & Environment Setup
- **Goal**: Initialize Next.js 15 App Router TypeScript project with Tailwind CSS & shadcn/ui.
- **Tasks**:
  - Initialize Next.js 15 in the workspace directory.
  - Install dependencies (`mongoose`, `next-auth@beta`, `bcryptjs`, `cloudinary`, `zod`, `react-hook-form`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`).
  - Install shadcn/ui components (`button`, `card`, `dialog`, `sheet`, `dropdown-menu`, `form`, `input`, `textarea`, `select`, `switch`, `table`, `tabs`, `badge`, `separator`, `skeleton`, `toast`).
  - Configure `src/` directory structure (`app`, `components`, `lib`, `models`, `actions`, `hooks`, `types`).
  - Create `.env.example` with MongoDB URI, Auth.js secret, Cloudinary credentials, and site config.
  - Configure global styles in `src/app/globals.css` with CSS variables for primary, secondary, and accent colors.

### Phase 2: Core Database Models, Auth.js v5 & Cloudinary Integration
- **Goal**: Establish serverless database connection pooling, 9 Mongoose domain models, Auth.js authentication, and Cloudinary media upload utility.
- **Tasks**:
  - `src/lib/db.ts`: Implement Mongoose connection singleton with global connection caching for serverless environments.
  - `src/models/`: Build 9 Mongoose schemas with strict TypeScript interfaces:
    1. `User.ts` (name, email, password, role)
    2. `Destination.ts` (name, slug, shortDescription, content, image, tuitionRange, intake, featured, published)
    3. `Course.ts` (title, description, icon)
    4. `Service.ts` (title, description, icon)
    5. `Office.ts` (country, address, mapUrl)
    6. `FAQ.ts` (question, answer)
    7. `Blog.ts` (title, slug, excerpt, content, coverImage, seoTitle, seoDescription, tags, published)
    8. `Consultation.ts` (name, phone, email, preferredCountry, intake, message, status)
    9. `Setting.ts` (siteName, logo, phone, email, whatsapp, heroTitle, heroSubtitle, visaSuccessRate, studentsServed)
  - `src/lib/auth.ts` & `src/app/api/auth/[...nextauth]/route.ts`: Configure Auth.js v5 Credentials provider with bcrypt hashing.
  - `src/middleware.ts`: Protect `/admin/*` routes with session checks.
  - `src/lib/cloudinary.ts`: Build reusable Cloudinary server-side upload utility returning secure image URLs.

### Phase 3: Server Actions & Complete Admin Dashboard (Full CRUD)
- **Goal**: Create modular Server Actions for all collections and build the protected admin panel with full CRUD capabilities.
- **Tasks**:
  - `src/actions/`: Domain-isolated Server Actions (`auth.ts`, `destination.ts`, `blog.ts`, `service.ts`, `office.ts`, `faq.ts`, `consultation.ts`, `setting.ts`).
  - `src/app/(admin)/admin/layout.tsx`: Admin dashboard layout with sidebar navigation, mobile sheet drawer, header, and user session menu.
  - `src/components/admin/`: Modular admin components (Sidebar, StatsCards, DataTable, FormWrappers).
  - Admin Modules:
    - `/admin` (Overview stats & quick actions)
    - `/admin/destinations` (CRUD table + Dialog form with image upload)
    - `/admin/blogs` (CRUD table + Dialog form with cover image upload)
    - `/admin/services` (CRUD table + Dialog form)
    - `/admin/offices` (CRUD table + Dialog form)
    - `/admin/faqs` (CRUD table + Dialog form)
    - `/admin/settings` (Site branding & hero settings form)
    - `/admin/consultations` (Lead management table with status filter & toggle)

### Phase 4: Public Landing Page & Dynamic Pages
- **Goal**: Build modern, high-converting public single-page landing page, dynamic country pages, blog pages, application form, and consultation pages.
- **Tasks**:
  - `src/components/shared/`: Header (sticky navigation, logo, CTA button) and Footer (links, contact info, copyright).
  - `src/app/(public)/page.tsx` Homepage modular sections (`src/components/public/`):
    1. Sticky Header
    2. Hero Section (Headline, stats counters, search bar, primary CTA)
    3. Popular Study Destinations (UK, USA, Australia, NZ, Canada, Europe, Malaysia cards with tuition & intakes)
    4. Course Categories (Undergraduate, Postgraduate, Diploma, Ph.D., Foundation, Language Preparation)
    5. Partner Institutes Showcase (Top global partner universities, QS ranking badges, partnership stats)
    6. Services Offered (Visa guidance, admission counseling, scholarship support, test prep)
    7. Study Pathway Timeline (5-step visual process)
    8. Why Choose Us (98% Visa Success Rate, zero hidden fees, expert counselors)
    9. Student Testimonials & Success Stories (Verified student reviews, university attended, star ratings, video story highlights)
    10. Global Offices
    11. Latest Guides & Blogs
    12. FAQ Accordion
    13. Book Consultation Lead Form (React Hook Form + Zod + Turnstile placeholder + Toast + Server Action)
    14. Footer
  - `src/app/(public)/study-in/[slug]/page.tsx`: Dynamic country pages with Hero, Overview, Popular courses, Tuition range, Intake info, Visa info, Why choose, and CTA.
  - `src/app/(public)/blog/page.tsx` & `[slug]/page.tsx`: Blog engine listing and article detail page.
  - `src/app/(public)/apply/page.tsx` & `/consultation/page.tsx`: Dedicated application and consultation booking pages.

### Phase 5: SEO Optimization, Seeding, Audit & Deployment
- **Goal**: Comprehensive SEO metadata, structured data, database seeder, Lighthouse 95+ audit, and Vercel readiness.
- **Tasks**:
  - `src/lib/seo.ts` & `generateMetadata`: Dynamic OpenGraph tags, Twitter cards, canonical URLs.
  - JSON-LD Structured Data: Organization & FAQ schema scripts.
  - `src/app/sitemap.ts` & `src/app/robots.ts`: Automated sitemap and search engine crawler instructions.
  - `src/lib/seed.ts`: Seed database with initial admin user (`admin@hopeglobal.com`) and realistic content for destinations, courses, services, offices, FAQs, and sample blogs.
  - Audit: Run TypeScript strict check, zero `any` types audit, zero TODOs check, zero inline CSS check, and Vercel build verification (`npm run build`).

---

## Verification Plan

### Automated Verification
- `npx tsc --noEmit`: Strict TypeScript compilation check.
- `npm run build`: Production build check for Next.js App Router.

### Manual Verification
- Test Auth.js login flow and middleware protection on `/admin/*`.
- Verify form submissions (Consultation form, Admin CRUD forms) with Zod validation.
- Test Cloudinary image upload and MongoDB image URL persistence.
- Inspect rendered HTML for SEO tags, JSON-LD scripts, and clean Tailwind layout (no inline styles).
