import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { getSettings } from "@/actions/setting";
import { getDestinations } from "@/actions/destination";
import { getOffices } from "@/actions/office";

export async function Footer() {
  let settings = null;
  let destinations = [];
  let offices = [];
  try {
    settings = await getSettings();
    destinations = await getDestinations();
    offices = await getOffices();
  } catch (error) {
    console.error("Error loading data in Footer:", error);
  }

  // Find the office marked as Head Office
  const headOffice = offices.find((o: any) => o.isHeadOffice);
  const headAddress = headOffice?.address || "Gulshan 2, Dhaka 1212, Bangladesh";
  const headPhone = headOffice?.phone || settings?.phone || "+880 1898-898850";
  const headEmail = headOffice?.email || settings?.email || "info@hopeglobalacademy.co.uk";

  // Fallback destinations in case db is empty or error occurs
  const displayDestinations = destinations.length > 0 ? destinations : [
    { name: "UK", slug: "uk" },
    { name: "USA", slug: "usa" },
    { name: "Australia", slug: "australia" },
    { name: "Canada", slug: "canada" },
  ];

  const logoSrc = settings?.logo || "/logo.png";
  const siteName = settings?.siteName || "Hope Global Academy";

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white p-1.5 rounded-lg group transition-transform hover:scale-[1.02]">
              <Image
                src={logoSrc}
                alt={`${siteName} Logo`}
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
              {displayDestinations.map((dest: any) => (
                <li key={dest.slug || dest.name}>
                  <Link href={`/study-in/${dest.slug}`} className="hover:text-accent transition-colors">
                    Study in {dest.name}
                  </Link>
                </li>
              ))}
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
                <span className="leading-relaxed">{headAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href={`tel:${headPhone.replace(/[^0-9+]/g, "")}`} className="hover:text-accent transition-colors">
                  {headPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href={`mailto:${headEmail}`} className="hover:text-accent transition-colors break-all">
                  {headEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-slate-400 transition-colors">Contact Support</Link>
            <Link href="/services" className="hover:text-slate-400 transition-colors">Services</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
