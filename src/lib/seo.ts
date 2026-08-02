export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Hope Global Academy",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://hopeglobalacademy.com",
    "logo": "https://hopeglobalacademy.com/logo.png",
    "sameAs": [],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gulshan 2",
      "addressLocality": "Dhaka",
      "addressCountry": "Bangladesh",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-1700-000000",
      "contactType": "customer service",
    },
  };
}
