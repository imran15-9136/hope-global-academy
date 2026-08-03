import Link from "next/link";
import { Phone } from "lucide-react";
import { CrmDropdown } from "./CrmDropdown";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Hope Global Academy Logo"
            width={160}
            height={48}
            className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
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
          <div className="hidden sm:inline-block">
            <CrmDropdown />
          </div>
          <Link
            href="/consultation"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}

