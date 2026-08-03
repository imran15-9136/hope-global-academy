import Image from "next/image";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

interface HeroProps {
  settings?: {
    heroTitle?: string;
    heroSubtitle?: string;
    visaSuccessRate?: string;
    studentsServed?: string;
  };
}

export function Hero({ settings }: HeroProps) {
  const visaSuccessRate = settings?.visaSuccessRate || "98%";
  const studentsServed = settings?.studentsServed || "10k+";
  const heroTitle = settings?.heroTitle || "Your Global Future Starts At Hope Global";
  const heroSubtitle =
    settings?.heroSubtitle ||
    "We guide ambitious students to study in top universities across the UK, USA, Australia, and Canada. Get 100% free expert counseling, visa processing, and scholarship support.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/40 to-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3.5 py-1 text-xs font-semibold text-primary shadow-sm">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span>Bangladesh's Most Trusted Education Consultancy</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
              {heroTitle}
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#appointment"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-accent-hover hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Book Free Consultation
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#destinations"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900"
              >
                Explore Destinations
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/80">
              <div>
                <p className="text-3xl font-extrabold text-slate-900">{visaSuccessRate}</p>
                <p className="text-sm font-medium text-slate-500">Visa Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900">500+</p>
                <p className="text-sm font-medium text-slate-500">Global Partners</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900">{studentsServed}</p>
                <p className="text-sm font-medium text-slate-500">Students Placed</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-elevation">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                  alt="Happy students studying abroad"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Zero Agency Fees</p>
                  <p className="text-xs text-slate-500">Official University Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
