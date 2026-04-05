import { AdminStudio } from "@/components/admin-studio";
import { readSiteData } from "@/lib/site-data";

export default async function AdminPage() {
  const data = await readSiteData();

  return <AdminStudio initialData={data} />;
}
