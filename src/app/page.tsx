import { Header } from "@/components/shared/Header";
import { Hero } from "@/components/public/Hero";
import { Destinations } from "@/components/public/Destinations";
import { Courses } from "@/components/public/Courses";
import { Institutes } from "@/components/public/Institutes";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { Footer } from "@/components/shared/Footer";
import { getDestinations } from "@/actions/destination";
import { getSettings } from "@/actions/setting";

export const dynamic = "force-dynamic";

export default async function Home() {
  let destinations: any[] = [];
  let settings: any = null;

  try {
    destinations = await getDestinations();
    settings = await getSettings();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-1">
        <Hero settings={settings} />
        <Destinations initialDestinations={destinations} />
        <Courses />
        <Institutes />
        <AppointmentForm />
      </main>
      <Footer />
    </div>
  );
}
