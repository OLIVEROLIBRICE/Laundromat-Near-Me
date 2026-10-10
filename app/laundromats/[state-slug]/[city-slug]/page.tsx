import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Breadcrumbs, PageShell } from "@/components/site-shell";
import { CityListings, type CityListing } from "@/components/brooklyn-listings";
import { CityServiceLinks } from "@/components/city-service-links";
import { cities, cityIntro, getCity, getState } from "@/lib/data";
import { getDirectoryCity } from "@/lib/directory-listings";
import { getPopularCity } from "@/lib/popular-cities";
import { absoluteUrl, metaDescription } from "@/lib/seo";

type Props = { params: { "state-slug": string; "city-slug": string } };

function getCityListings(stateSlug: string, citySlug: string): CityListing[] {
  const directoryCity = getDirectoryCity(citySlug);
  return directoryCity?.canonicalPath === `/laundromats/${stateSlug}/${citySlug}` ? directoryCity.listings : [];
}

export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((city) => ({ "state-slug": city.stateSlug, "city-slug": city.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = getCity(params["state-slug"], params["city-slug"]);
  if (!city) return {};
  const stateLabel = getState(city.stateSlug)?.abbr ?? city.state;
  const count = getCityListings(city.stateSlug, city.slug).length;
  const title = `${count ? `${count} ` : ""}Laundromats in ${city.name}, ${stateLabel} | Laundromat Near Me`;
  const description = count ? `Browse ${count} ${city.name} laundromats with supplied addresses, phones, ratings, reviews, services, pricing, and websites. Confirm details directly before visiting.` : metaDescription(cityIntro(city));
  const path = `/laundromats/${city.stateSlug}/${city.slug}`;
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path }, twitter: { title, description } };
}

export default function CityPage({ params }: Props) {
  const shortCity = getPopularCity(params["city-slug"]);
  if (shortCity && shortCity.state.toLowerCase().replace(/\s+/g, "-") === params["state-slug"]) permanentRedirect(`/${shortCity.slug}`);
  const city = getCity(params["state-slug"], params["city-slug"]);
  if (!city) notFound();
  const stateLabel = getState(city.stateSlug)?.abbr ?? city.state;
  const listings = getCityListings(city.stateSlug, city.slug);
  const hasListings = listings.length > 0;
  const path = `/laundromats/${city.stateSlug}/${city.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(path)}#page`,
        name: `Laundromats in ${city.name}, ${stateLabel}`,
        description: cityIntro(city),
        url: absoluteUrl(path),
        breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumbs` },
        ...(hasListings ? { mainEntity: { "@id": `${absoluteUrl(path)}#list` } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(path)}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: `Laundromats in ${city.name}, ${stateLabel}`, item: absoluteUrl(path) },
        ],
      },
      ...(hasListings ? [{
        "@type": "ItemList",
        "@id": `${absoluteUrl(path)}#list`,
        numberOfItems: listings.length,
        itemListElement: listings.map((listing, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: listing.name,
          url: absoluteUrl(`${path}#${city.slug}-listing-${listing.id}`),
        })),
      }] : []),
    ],
  };

  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
    <section className="border-b border-brand-100 bg-brand-50">
      <div className="mx-auto max-w-5xl px-5 py-16">
        <Breadcrumbs items={[{ label: city.name }]}/>
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Local laundry guide</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Laundromats in {city.name}, {stateLabel}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">{cityIntro(city)}</p>
      </div>
    </section>
    <CityServiceLinks citySlug={city.slug} cityName={city.name}/>
    {hasListings ? <section id="listings" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">{city.name} directory</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{listings.length} laundromats in {city.name}</h2>
        <p className="mt-4 leading-7 text-slate-600">These records were supplied for this directory and have not been independently verified. Confirm current hours, pricing, services, and availability directly with the business before visiting.</p>
      </div>
      <CityListings listings={listings} cityName={city.name} citySlug={city.slug}/>
    </section> : <section className="mx-auto max-w-4xl px-5 py-16 text-center">
      <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-soft sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Directory update</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold">Verified listings are coming soon</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">Unverified placeholder businesses have been removed. We will publish local laundromats only after their information has been reviewed.</p>
        <Link href="/contact" className="focus-ring mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">Suggest a laundromat</Link>
      </div>
    </section>}
  </PageShell>;
}
