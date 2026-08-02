import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import fs from "fs";
import path from "path";

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
  title: "Hope Global Academy | Premium Study Abroad Consultation",
  description:
    "Expert guidance for higher education in UK, USA, Australia, and Canada. Book a free appointment with Hope Global Academy counselors today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased text-slate-900 selection:bg-primary-light selection:text-primary">
        {children}
      </body>
    </html>
  );
}
