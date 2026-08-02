import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight tracking-tight text-white">
                  Hope Global
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Academy
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering students with overseas higher education solutions. Authorized global representative for premier universities across the UK, USA, Australia, and Canada.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Destinations
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link href="/study-in/uk" className="hover:text-amber-400 transition-colors">Study in UK</Link></li>
              <li><Link href="/study-in/usa" className="hover:text-amber-400 transition-colors">Study in USA</Link></li>
              <li><Link href="/study-in/australia" className="hover:text-amber-400 transition-colors">Study in Australia</Link></li>
              <li><Link href="/study-in/canada" className="hover:text-amber-400 transition-colors">Study in Canada</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Portals & Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link href="/#courses" className="hover:text-amber-400 transition-colors">Undergraduate & Masters</Link></li>
              <li><Link href="/consultation" className="hover:text-amber-400 transition-colors">Free Counseling</Link></li>
              <li>
                <a
                  href="https://innovcrm.hopeglobalacademy.co.uk/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 font-medium hover:underline transition-colors"
                >
                  <span>Application CRM Login</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Headquarters
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Gulshan 2, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>info@hopeglobalacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Hope Global Academy. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <p>
              Developed by:{" "}
              <a
                href="https://innovtec.it.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-400 hover:underline transition-colors"
              >
                Innovtec
              </a>
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
