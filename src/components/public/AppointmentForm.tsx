"use client";

import { useState } from "react";
import { Send, CheckCircle2, User, Mail, Phone, BookOpen, Globe } from "lucide-react";
import { createConsultation } from "@/actions/consultation";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestedCourse, setInterestedCourse] = useState("");
  const [preferredCountry, setPreferredCountry] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const res = await createConsultation({
      name,
      email,
      phone,
      interestedCourse,
      preferredCountry,
      message,
    });

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setInterestedCourse("");
      setPreferredCountry("");
      setMessage("");
    } else {
      setErrorMessage(res.message || "Failed to submit appointment. Please try again.");
    }
  };

  return (
    <section id="appointment" className="py-20 bg-gradient-to-b from-white to-primary-light/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Book Appointment
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              Start Your Study Abroad Journey Today
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Schedule a 1-on-1 session with our certified education counselors. We will evaluate your profile, recommend top universities, and assist with scholarships and visa processing.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">100% Free Consultation</p>
                  <p className="text-xs text-slate-500">No hidden service charges or commitments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Profile & Eligibility Assessment</p>
                  <p className="text-xs text-slate-500">Direct admission probability calculation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Fast-Track Application Processing</p>
                  <p className="text-xs text-slate-500">Direct application submittal to university portals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-elevation">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Appointment Booked!</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. Senior Counselor from Hope Global Academy will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                    Book Free Counseling Appointment
                  </h3>

                  {errorMessage && (
                    <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. john@example.com"
                          className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +880 1700-000000"
                          className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Interested Course *
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select
                          required
                          value={interestedCourse}
                          onChange={(e) => setInterestedCourse(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                        >
                          <option value="">Select Level</option>
                          <option value="Undergraduate Degree">Undergraduate Degree</option>
                          <option value="Postgraduate Degree">Postgraduate Degree (Master's/MBA)</option>
                          <option value="Diploma Program">Diploma / Pathway Program</option>
                          <option value="Foundation Course">Foundation Course</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Preferred Country *
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select
                          required
                          value={preferredCountry}
                          onChange={(e) => setPreferredCountry(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                        >
                          <option value="">Select Destination</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Australia">Australia</option>
                          <option value="Canada">Canada</option>
                          <option value="Europe / Malaysia">Europe / Malaysia</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-accent-hover hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-70 mt-4"
                  >
                    {loading ? (
                      <span>Scheduling...</span>
                    ) : (
                      <>
                        <span>Submit Appointment Request</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
