import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import { getTodayIssues } from "@/lib/searchLogs";

export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const issues = await getTodayIssues();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/issues`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${SITE_URL}/labeling-criteria`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const issueRoutes: MetadataRoute.Sitemap = issues.map((issue) => ({
    url: `${SITE_URL}/issues/${encodeURIComponent(issue)}`,
    changeFrequency: "hourly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...issueRoutes];
}
