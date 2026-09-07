
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/constants";
import { getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";

// Auto-cleanup duplicate admin directory outside route group
try {
  const duplicateDir = path.join(process.cwd(), "src", "app", "admin");
  if (fs.existsSync(duplicateDir)) {
    fs.rmSync(duplicateDir, { recursive: true, force: true });
    console.log("Successfully removed duplicate src/app/admin directory");
  }
} catch (err) {
  // Ignore if already removed
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hope Global Academy | Premium Study Abroad Consultation",
    template: "%s | Hope Global Academy",
  },
  description:
    "Expert guidance for higher education in UK, USA, Australia, and Canada. Book a free appointment with Hope Global Academy counselors today.",
  keywords: [
    "Study Abroad Consultancy",
    "Higher Education UK",
    "Study in Australia",
    "Study in Canada",
    "Study in USA",
    "Student Visa Advisory",
    "Hope Global Academy",
    "University Admissions",
  ],
  authors: [{ name: "Hope Global Academy", url: SITE_URL }],
  creator: "Hope Global Academy",
  publisher: "Hope Global Academy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hope Global Academy | Premium Study Abroad Consultation",
    description:
      "Expert guidance for higher education in UK, USA, Australia, and Canada. Book a free appointment with Hope Global Academy counselors today.",
    url: SITE_URL,
    siteName: "Hope Global Academy",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hope Global Academy - Premier Global Higher Education Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hope Global Academy | Premium Study Abroad Consultation",
    description:
      "Expert guidance for higher education in UK, USA, Australia, and Canada. Book a free appointment with Hope Global Academy counselors today.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootSchemas = [getOrganizationJsonLd(), getWebSiteJsonLd()];

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={rootSchemas} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased text-slate-900 selection:bg-primary-light selection:text-primary">
        {children}
      </body>
    </html>
  );
}

