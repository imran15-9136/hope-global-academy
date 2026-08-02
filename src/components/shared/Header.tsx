import Link from "next/link";
import { GraduationCap, Phone, ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-md transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight text-slate-900">
              Hope Global
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Academy
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/#destinations" className="transition-colors hover:text-primary">
            Destinations
          </Link>
          <Link href="/#courses" className="transition-colors hover:text-primary">
            Courses
          </Link>
          <Link href="/#institutes" className="transition-colors hover:text-primary">
            Institutes
          </Link>
          <Link href="/blog" className="transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/#appointment" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+8801700000000"
            className="hidden xl:flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>+880 1700-000000</span>
          </a>
          <a
            href="https://innovcrm.hopeglobalacademy.co.uk/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-primary hover:text-primary transition-all hover:bg-slate-50"
          >
            <span>Application CRM</span>
            <ExternalLink className="h-3.5 w-3.5 text-primary" />
          </a>
          <Link
            href="/consultation"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-accent-hover hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}

