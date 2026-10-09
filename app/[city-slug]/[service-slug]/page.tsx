import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityServiceDirectoryPage } from "@/components/city-service-directory-page";
import { getEligibleCityService, getEligibleCityServices } from "@/lib/city-service-directories";

type Props = { params: { "city-slug": string; "service-slug": string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getEligibleCityServices()
    .filter((entry) => entry.city.canonicalPath === `/${entry.city.slug}`)
    .map((entry) => ({ "city-slug": entry.city.slug, "service-slug": entry.service.localSlug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getEligibleCityService(params["city-slug"], params["service-slug"]);
  if (!entry || entry.city.canonicalPath !== `/${entry.city.slug}`) return {};
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

export default function ShortCityServicePage({ params }: Props) {
  const entry = getEligibleCityService(params["city-slug"], params["service-slug"]);
  if (!entry || entry.city.canonicalPath !== `/${entry.city.slug}`) notFound();
  return <CityServiceDirectoryPage entry={entry}/>;
}
