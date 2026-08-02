import { AppointmentForm } from "@/components/public/AppointmentForm";

export const metadata = {
  title: "Apply Online | Hope Global Academy",
  description: "Submit your university application details directly to our admissions team.",
};

export default function DedicatedApplyPage() {
  return (
    <div className="py-12">
      <AppointmentForm />
    </div>
  );
}
