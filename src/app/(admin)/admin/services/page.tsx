import { getServices, getServicesVideo } from "@/actions/service";
import { ServiceManager } from "@/components/admin/ServiceManager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await getServices();
  const videoData = await getServicesVideo();

  return (
    <div className="space-y-6">
      <ServiceManager initialServices={services} initialVideoData={videoData} />
    </div>
  );
}
