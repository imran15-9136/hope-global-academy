import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto">
          <GraduationCap className="h-8 w-8 text-blue-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
          <p className="text-sm text-slate-400">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-blue-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </main>
  );
}
