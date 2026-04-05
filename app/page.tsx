import { PortfolioPage } from "@/components/portfolio-page";
import { readSiteData } from "@/lib/site-data";

export default async function HomePage() {
  const data = await readSiteData();

  return <PortfolioPage data={data} />;
}
