import { SITE_URL } from "@/lib/constants";

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface BlogPostSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}

export interface ServiceSchemaProps {
  title: string;
  description: string;
  url?: string;
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    "name": "Hope Global Academy",
    "alternateName": "Hope Global Academy Study Abroad Consultancy",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "image": `${SITE_URL}/og-image.jpg`,
    "telephone": "+8801709634485",
    "priceRange": "$$",
    "currenciesAccepted": "BDT, GBP, USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "sameAs": [
      "https://facebook.com/hopeglobalacademy",
      "https://linkedin.com/company/hopeglobalacademy",
      "https://instagram.com/hopeglobalacademy"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House 45/2, Rawshan Plaza, Green Road",
      "addressLocality": "Dhanmondi, Dhaka",
      "addressRegion": "Dhaka",
      "postalCode": "1207",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.7465,
      "longitude": 90.3853
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "10:00",
        "closes": "18:30"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+8801709634485",
        "contactType": "admissions & customer service",
        "areaServed": ["BD", "GB"],
        "availableLanguage": ["English", "Bengali"]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Higher Education Consulting & Visa Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "University Admissions & Application Processing",
            "description": "Direct application submission to partner universities in the UK, USA, Australia, and Canada."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Student Visa Guidance & Interview Preparation",
            "description": "Comprehensive document review, SOP evaluation, and mock embassy interview sessions."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Scholarship Assessment & Profile Evaluation",
            "description": "Thorough assessment of student credentials to identify partial and full scholarship opportunities."
          }
        }
      ]
    }
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Hope Global Academy",
    "description": "Premier Global Higher Education Consultancy and Admissions Advisory",
    "publisher": {
      "@id": `${SITE_URL}/#organization`
    },
    "inLanguage": "en-GB"
  };
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `${SITE_URL}${item.item}`
    }))
  };
}

export function getBlogPostingJsonLd(post: BlogPostSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url.startsWith("http") ? post.url : `${SITE_URL}${post.url}`
    },
    "headline": post.title,
    "description": post.description,
    "image": post.image ? (post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`) : `${SITE_URL}/og-image.jpg`,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.authorName || "Hope Global Academy Team"
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Hope Global Academy",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    }
  };
}

export function getOfferCatalogJsonLd(services: ServiceSchemaProps[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Higher Education Consulting Services",
    "itemListElement": services.map((service) => ({
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@id": `${SITE_URL}/#organization`
      },
      "url": service.url ? (service.url.startsWith("http") ? service.url : `${SITE_URL}${service.url}`) : `${SITE_URL}/services`
    }))
  };
}

