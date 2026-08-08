"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Globe, ExternalLink, Star, Building, CheckCircle2 } from "lucide-react";

export interface BranchOffice {
  _id: string;
  title?: string;
  country: string;
  address: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  isHeadOffice?: boolean;
  order?: number;
}

export function BranchList({ offices }: { offices: BranchOffice[] }) {
  // Extract unique countries
  const countries = Array.from(new Set(offices.map((o) => o.country))).filter(Boolean);
  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  const filteredOffices =
    selectedCountry === "All"
      ? offices
      : offices.filter((o) => o.country === selectedCountry);

  if (!offices || offices.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
        <Building className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">Our Global Offices</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
          Branch office details are currently being updated. Please contact our main consultation team.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Country Filter Tabs */}
      {countries.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCountry("All")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              selectedCountry === "All"
                ? "bg-primary text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Locations ({offices.length})
          </button>
          {countries.map((c) => {
            const count = offices.filter((o) => o.country === c).length;
            return (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  selectedCountry === c
                    ? "bg-primary text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Offices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffices.map((office) => {
          const isHQ = office.isHeadOffice;

          return (
            <div
              key={office._id}
              className={`group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isHQ
                  ? "border-amber-300 ring-2 ring-amber-400/20 bg-gradient-to-b from-amber-50/40 via-white to-white"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <div className="space-y-4">
                {/* Header Badge & Title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">
                        <Globe className="h-3.5 w-3.5" />
                        {office.country}
                      </span>
                      {isHQ && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          Global HQ
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors pt-1">
                      {office.title || `${office.country} Branch`}
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Building className="h-5 w-5" />
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-3 pt-2 text-sm text-slate-600">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 mt-0.5">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="leading-relaxed text-slate-700 font-medium">
                      {office.address}
                    </span>
                  </div>

                  {/* Phone */}
                  {office.phone && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <a
                        href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`}
                        className="font-semibold text-slate-800 hover:text-primary transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  )}

                  {/* Email */}
                  {office.email && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <a
                        href={`mailto:${office.email}`}
                        className="font-medium text-slate-700 hover:text-primary transition-colors break-all"
                      >
                        {office.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {office.phone ? (
                  <a
                    href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call Office</span>
                  </a>
                ) : (
                  <span />
                )}

                {office.mapUrl && (
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-primary transition-colors"
                  >
                    <span>View Map</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
