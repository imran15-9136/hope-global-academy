"use client";

import React from "react";

interface ServiceArtworkProps {
  name: string; // Service title or icon key
  className?: string;
}

export function ServiceArtwork({ name, className = "h-24 w-24" }: ServiceArtworkProps) {
  const normalizedKey = (name || "").toLowerCase();

  if (normalizedKey.includes("profile") || normalizedKey.includes("assessment") || normalizedKey.includes("usercheck")) {
    return (
      <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="2" />
        <rect x="35" y="28" width="50" height="64" rx="8" fill="#0F172A" />
        <rect x="42" y="38" width="36" height="6" rx="3" fill="#2563EB" />
        <circle cx="50" cy="56" r="6" fill="#F59E0B" />
        <rect x="60" y="53" width="18" height="6" rx="3" fill="#94A3B8" />
        <circle cx="50" cy="74" r="6" fill="#2563EB" />
        <rect x="60" y="71" width="18" height="6" rx="3" fill="#94A3B8" />
        <path d="M78 72L84 78L96 66" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalizedKey.includes("career") || normalizedKey.includes("guidance") || normalizedKey.includes("compass")) {
    return (
      <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="2" />
        <circle cx="60" cy="60" r="38" fill="#0F172A" />
        <circle cx="60" cy="60" r="34" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="60,32 68,56 60,88 52,56" fill="#F59E0B" />
        <polygon points="60,32 68,56 60,60" fill="#2563EB" />
        <circle cx="60" cy="60" r="6" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalizedKey.includes("visa") || normalizedKey.includes("filecheck")) {
    return (
      <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
        <rect x="30" y="32" width="60" height="56" rx="6" fill="#0F172A" />
        <path d="M30 46H90" stroke="#2563EB" strokeWidth="4" />
        <rect x="38" y="56" width="24" height="20" rx="3" fill="#F59E0B" />
        <rect x="68" y="58" width="16" height="4" rx="2" fill="#64748B" />
        <rect x="68" y="66" width="12" height="4" rx="2" fill="#64748B" />
        <circle cx="86" cy="82" r="16" fill="#10B981" />
        <path d="M80 82L84 86L92 78" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalizedKey.includes("university") || normalizedKey.includes("application") || normalizedKey.includes("graduationcap")) {
    return (
      <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="2" />
        <polygon points="60,26 100,44 60,62 20,44" fill="#2563EB" />
        <polygon points="60,26 100,44 60,48" fill="#1D4ED8" />
        <rect x="36" y="54" width="48" height="24" rx="4" fill="#0F172A" />
        <path d="M92 48V76" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <circle cx="92" cy="80" r="4" fill="#F59E0B" />
      </svg>
    );
  }

  if (normalizedKey.includes("interview") || normalizedKey.includes("preparation") || normalizedKey.includes("video")) {
    return (
      <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="#F3E8FF" stroke="#E9D5FF" strokeWidth="2" />
        <rect x="28" y="34" width="48" height="52" rx="8" fill="#0F172A" />
        <polygon points="82,44 98,34 98,86 82,76" fill="#2563EB" />
        <circle cx="52" cy="60" r="12" fill="#F59E0B" />
        <polygon points="49,54 58,60 49,66" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalizedKey.includes("accommodation") || normalizedKey.includes("housing") || normalizedKey.includes("home")) {
    return (
      <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" />
        <polygon points="60,24 96,52 24,52" fill="#2563EB" />
        <rect x="32" y="52" width="56" height="42" rx="4" fill="#0F172A" />
        <rect x="42" y="60" width="14" height="14" rx="2" fill="#F59E0B" />
        <rect x="64" y="64" width="12" height="30" rx="2" fill="#64748B" />
      </svg>
    );
  }

  if (normalizedKey.includes("departure") || normalizedKey.includes("plane") || normalizedKey.includes("travel")) {
    return (
      <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
        <path
          d="M32 72L50 64L76 80L84 76L68 54L94 40C98 38 102 42 100 46L86 72L64 88L32 72Z"
          fill="#2563EB"
        />
        <path d="M26 86H94" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
        <circle cx="40" cy="42" r="10" fill="#0F172A" />
        <path d="M40 36V48M34 42H46" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    );
  }

  // Fallback default artwork
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="2" />
      <rect x="35" y="35" width="50" height="50" rx="10" fill="#0F172A" />
      <circle cx="60" cy="60" r="16" fill="#F59E0B" />
      <path d="M52 60L58 66L68 54" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
