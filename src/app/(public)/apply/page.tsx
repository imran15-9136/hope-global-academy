import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { AppointmentForm } from "@/components/public/AppointmentForm";

export const metadata = {
  title: "Apply Online | Hope Global Academy",
  description: "Submit your university application details directly to our admissions team.",
};

export default function DedicatedApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-1 py-12">
        <AppointmentForm />
      </main>
      <Footer />
    </div>
  );
}
