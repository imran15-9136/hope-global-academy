import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import Image from "next/image";
import { getSettings } from "@/actions/setting";

export async function Footer() {
  let settings = null;
  try {
    settings = await getSettings();
  } catch (error) {
    console.error("Error loading settings in Footer:", error);
  }

  const logoSrc = settings?.logo || "/logo.png";

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white p-1.5 rounded-lg group transition-transform hover:scale-[1.02]">
              <Image
                src={logoSrc}
                alt="Hope Global Academy Logo"
                width={150}
                height={45}
                className="h-10 w-auto object-contain"
                unoptimized={logoSrc.startsWith("http")}
              />
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
              <li><Link href="/study-in/uk" className="hover:text-accent transition-colors">Study in UK</Link></li>
              <li><Link href="/study-in/usa" className="hover:text-accent transition-colors">Study in USA</Link></li>
              <li><Link href="/study-in/australia" className="hover:text-accent transition-colors">Study in Australia</Link></li>
              <li><Link href="/study-in/canada" className="hover:text-accent transition-colors">Study in Canada</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Portals & Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-accent transition-colors">Our 7 Core Services</Link></li>
              <li><Link href="/#courses" className="hover:text-accent transition-colors">Undergraduate & Masters</Link></li>
              <li><Link href="/consultation" className="hover:text-accent transition-colors">Free Counseling</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Global Branch Offices</Link></li>
              <li>
                <a
                  href="https://innovcrm.hopeglobalacademy.co.uk/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent font-medium hover:underline transition-colors"
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
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Gulshan 2, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span>info@hopeglobalacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Hope Global Academy. All rights reserved.</p>
            {/* <span className="hidden sm:inline text-slate-700">|</span>
            <p>
              Developed by:{" "}
              <a
                href="https://innovtec.it.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline transition-colors"
              >
                Innovtec
              </a>
            </p> */}
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
