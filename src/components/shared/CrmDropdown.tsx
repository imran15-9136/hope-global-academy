"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, UserCheck, Users, GraduationCap, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CrmDropdownProps {
  variant?: "default" | "admin";
}

export function CrmDropdown({ variant = "default" }: CrmDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  const options = [
    {
      name: "Staff Portal",
      role: "Staff",
      href: "https://innovcrm.hopeglobalacademy.co.uk/auth/login",
      icon: UserCheck,
      disabled: false,
    },
    {
      name: "Agent Portal",
      role: "Agent",
      href: "https://innovcrm.hopeglobalacademy.co.uk/auth/login",
      icon: Users,
      disabled: false,
    },
    {
      name: "Student Portal",
      role: "Student",
      href: "#",
      icon: GraduationCap,
      disabled: true,
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all focus:outline-none",
          variant === "admin"
            ? "border-primary/20 bg-primary-light text-primary hover:bg-primary-light/80"
            : "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary hover:bg-slate-50"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Application CRM</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-elevation animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => {
              const Icon = option.icon;
              if (option.disabled) {
                return (
                  <div
                    key={option.role}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-400 cursor-not-allowed bg-slate-50/50"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-slate-400" />
                      <span>{option.name}</span>
                    </div>
                    <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      Disabled
                    </span>
                  </div>
                );
              }

              return (
                <a
                  key={option.role}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOptionClick}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-primary-light hover:text-primary transition-all duration-150"
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-slate-500 group-hover:text-primary" />
                    <span>{option.name}</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
