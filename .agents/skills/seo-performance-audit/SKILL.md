---
name: seo-performance-audit
description: Comprehensive SEO metadata generation, JSON-LD structured data (Organization & FAQ), sitemap.ts, robots.ts, dynamic revalidation, and Lighthouse 95+ performance optimization.
---

# Skill: SEO & Performance Audit

This skill outlines guidelines to achieve Lighthouse scores of 95+ and maximum search visibility for **Hope Global Academy**.

## 1. Dynamic Metadata (`generateMetadata`)

All dynamic pages (`/study-in/[slug]`, `/blog/[slug]`) must export an async `generateMetadata` function:

```ts
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: 'Destination Not Found | Hope Global Academy',
    };
  }

  return {
    title: `Study in ${destination.name} | Hope Global Academy`,
    description: destination.shortDescription,
    openGraph: {
      title: `Study in ${destination.name} | Hope Global Academy`,
      description: destination.shortDescription,
      images: [{ url: destination.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Study in ${destination.name} | Hope Global Academy`,
      description: destination.shortDescription,
      images: [destination.image],
    },
  };
}
```

## 2. JSON-LD Structured Data

Inject schema.org JSON-LD scripts in public page layouts/pages for:
- `Organization` (Name, Logo, Phone, ContactPoints, Social Links)
- `FAQPage` (Questions & Answers list)

```tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Hope Global Academy',
    url: 'https://hopeglobalacademy.com',
    logo: 'https://hopeglobalacademy.com/logo.png',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## 3. Performance Optimization Rules

- **Image Optimization**: Always use `next/image` with explicit `width`, `height`, `alt`, and `sizes` properties. Use `priority` for Hero section images.
- **Revalidation Strategy**: Export `export const revalidate = 3600;` on dynamic public pages to enable Incremental Static Regeneration (ISR).
- **Minimal JavaScript**: Keep public components as Server Components by default. Only add `'use client'` on interactive elements (forms, dialogs, sliders, tabs).
- **No Inline Styles**: Avoid style attributes to allow effective CSS minification and browser caching.
