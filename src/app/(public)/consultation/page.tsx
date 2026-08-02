import { AppointmentForm } from "@/components/public/AppointmentForm";

export const metadata = {
  title: "Book Free Consultation | Hope Global Academy",
  description: "Schedule a 1-on-1 counseling session with our expert study abroad counselors.",
};

export default function DedicatedConsultationPage() {
  return (
    <div className="py-12">
      <AppointmentForm />
    </div>
  );
}
