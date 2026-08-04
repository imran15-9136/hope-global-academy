import { Hero } from "@/components/public/Hero";
import { Destinations } from "@/components/public/Destinations";
import { Courses } from "@/components/public/Courses";
import { Institutes } from "@/components/public/Institutes";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { getDestinations } from "@/actions/destination";
import { getSettings } from "@/actions/setting";
import { getCourses } from "@/actions/course";
import { getInstitutes } from "@/actions/institute";

export const dynamic = "force-dynamic";

export default async function Home() {
  let destinations: any[] = [];
  let courses: any[] = [];
  let institutes: any[] = [];
  let settings: any = null;

  try {
    destinations = await getDestinations();
    courses = await getCourses();
    institutes = await getInstitutes();
    settings = await getSettings();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <>
      <Hero settings={settings} />
      <Destinations initialDestinations={destinations} />
      <Courses initialCourses={courses} />
      <Institutes initialInstitutes={institutes} />
      <AppointmentForm />
    </>
  );
}
