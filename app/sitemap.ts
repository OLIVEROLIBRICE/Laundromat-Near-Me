import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { cities } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";
import { popularCities } from "@/lib/popular-cities";
import { cityServiceDefinitions, getEligibleCityServices, getNationalServiceEligibility } from "@/lib/city-service-directories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const shortSlugs = new Set(popularCities.map((city) => city.slug));
  const nationalServicePriorities: Record<string, number> = {
    "mobile-payment": .85,
    "large-washers": .9,
  };
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...cityServiceDefinitions
      .filter((service) => getNationalServiceEligibility(service.key).indexable)
      .map((service) => ({ url: `${SITE_URL}${service.nationalPath}`, lastModified: now, changeFrequency: "weekly" as const, priority: nationalServicePriorities[service.key] ?? .95 })),
    ...getEligibleCityServices().map((entry) => ({ url: `${SITE_URL}${entry.path}`, lastModified: now, changeFrequency: "weekly" as const, priority: .75 })),
    ...popularCities.map((city) => ({ url: `${SITE_URL}/${city.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: .9 })),
    ...cities.filter((city) => !shortSlugs.has(city.slug)).map((city) => ({ url: `${SITE_URL}/laundromats/${city.stateSlug}/${city.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: .8 })),
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "monthly", priority: .6 },
    ...articles.map((article) => ({ url: `${SITE_URL}/blog/${article.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .6 })),
    ...["about", "contact"].map((page) => ({ url: `${SITE_URL}/${page}`, lastModified: now, changeFrequency: "yearly" as const, priority: .4 })),
  ];
}
