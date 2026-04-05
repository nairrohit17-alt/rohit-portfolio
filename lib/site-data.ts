import { promises as fs } from "fs";
import path from "path";

export type Stat = {
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  resumeUrl: string;
  heroImage: string;
  stats: Stat[];
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  summary: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  impact: string[];
  link: string;
  caseStudyId?: string;
  articleUrl?: string;
};

export type AwardItem = {
  id: string;
  caseStudyId: string;
  title: string;
  issuer: string;
  year: string;
  recognitionCount: number;
  breakdown: string[];
  summary: string;
};

export type CaseStudyItem = {
  id: string;
  title: string;
  client: string;
  year: string;
  releaseDate?: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  youtubeUrl: string;
  articleUrl?: string;
  thumbnailUrl: string;
  tags: string[];
};

export type SiteMeta = {
  themeNote: string;
  contactHeading: string;
  contactBody: string;
  services: {
    title: string;
    summary: string;
  }[];
};

export type SiteData = {
  profile: Profile;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  awards: AwardItem[];
  caseStudies: CaseStudyItem[];
  site: SiteMeta;
};

const dataPath = path.join(process.cwd(), "content", "site-data.json");

export async function readSiteData(): Promise<SiteData> {
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw) as SiteData;
}

export async function writeSiteData(data: SiteData) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
}
