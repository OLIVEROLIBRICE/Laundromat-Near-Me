import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityServiceDirectoryPage } from "@/components/city-service-directory-page";
import { getEligibleCityService, getEligibleCityServices } from "@/lib/city-service-directories";

type Props = { params: { "state-slug": string; "city-slug": string; "service-slug": string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getEligibleCityServices().flatMap((entry) => {
    const match = entry.city.canonicalPath.match(/^\/laundromats\/([^/]+)\/([^/]+)$/);
    if (!match) return [];
    return [{ "state-slug": match[1], "city-slug": match[2], "service-slug": entry.service.localSlug }];
  });
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getEligibleCityService(params["city-slug"], params["service-slug"]);
  const expectedParent = `/laundromats/${params["state-slug"]}/${params["city-slug"]}`;
  if (!entry || entry.city.canonicalPath !== expectedParent) return {};
  const title = `${entry.localPhrase} | Local Laundry Directory`;
  const description = `${entry.localPhrase} includes ${entry.listings.length} qualifying locations with supplied ratings, addresses, services, payment options and business details.`;
  return {
    title,
    description,
    alternates: { canonical: entry.path },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: { title, description, type: "website", url: entry.path },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function NestedCityServicePage({ params }: Props) {
  const entry = getEligibleCityService(params["city-slug"], params["service-slug"]);
  const expectedParent = `/laundromats/${params["state-slug"]}/${params["city-slug"]}`;
  if (!entry || entry.city.canonicalPath !== expectedParent) notFound();
  return <CityServiceDirectoryPage entry={entry}/>;
}
