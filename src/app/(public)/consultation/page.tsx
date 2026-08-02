import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { AppointmentForm } from "@/components/public/AppointmentForm";

export const metadata = {
  title: "Book Free Consultation | Hope Global Academy",
  description: "Schedule a 1-on-1 counseling session with our expert study abroad counselors.",
};

export default function DedicatedConsultationPage() {
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
