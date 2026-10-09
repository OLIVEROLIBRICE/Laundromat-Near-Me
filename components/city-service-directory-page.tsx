import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Breadcrumbs, PageShell } from "@/components/site-shell";
import { LaundromatCard } from "@/components/laundromat-card";
import { getRelatedCityServices, type EligibleCityService } from "@/lib/city-service-directories";
import { absoluteUrl } from "@/lib/seo";

export function CityServiceDirectoryPage({ entry }: { entry: EligibleCityService }) {
  const { city, service, listings, path, localPhrase } = entry;
  const relatedServices = getRelatedCityServices(entry);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(path)}#page`,
        name: localPhrase,
        url: absoluteUrl(path),
        description: `${localPhrase} includes ${listings.length} directory listings ${service.structuredBasis}.`,
        mainEntity: { "@id": `${absoluteUrl(path)}#list` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(path)}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: `Laundromats in ${city.name}, ${city.stateAbbr}`, item: absoluteUrl(city.canonicalPath) },
          { "@type": "ListItem", position: 3, name: localPhrase, item: absoluteUrl(path) },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl(path)}#list`,
        name: localPhrase,
        numberOfItems: listings.length,
        itemListElement: listings.map((listing, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: listing.name,
          url: absoluteUrl(`${city.canonicalPath}#${city.slug}-listing-${listing.id}`),
        })),
      },
    ],
  };

  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
    <section className="border-b border-brand-100 bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <Breadcrumbs items={[{ label: city.name, href: city.canonicalPath }, { label: localPhrase }]}/>
        <div className="max-w-4xl">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[.18em] text-brand-600"><MapPin size={18}/>{city.name} service directory</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{localPhrase}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700"><strong>{localPhrase}</strong> includes {listings.length} {service.listingLabel} {service.structuredBasis}.</p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">The records below use supplied structured data. Confirm current hours, services, payment options, pricing, and availability directly with the business before visiting.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={service.nationalPath} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-extrabold text-white">Browse the national service directory <ArrowRight size={18}/></Link>
            <Link href={city.canonicalPath} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-5 py-3 font-extrabold text-brand-700">View all laundromats in {city.name}</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-brand-600">{listings.length} qualifying {listings.length === 1 ? "location" : "locations"}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">Local listings</h2>
          </div>
          <Link href={city.canonicalPath} className="focus-ring inline-flex items-center gap-2 font-extrabold text-brand-700">Main {city.name} directory <ArrowRight size={18}/></Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {listings.map((listing) => <LaundromatCard key={listing.id} listing={listing} cityName={city.name} citySlug={city.slug} listingHref={`${city.canonicalPath}#${city.slug}-listing-${listing.id}`}/>)}
        </div>
      </div>
    </section>

    {relatedServices.length > 0 && <section className="border-t border-brand-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <h2 className="font-display text-3xl font-extrabold">Related laundry services in {city.name}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((related) => <Link key={related.path} href={related.path} className="focus-ring rounded-2xl border border-slate-200 bg-cream p-5 font-extrabold text-brand-700 transition hover:border-brand-300">{related.localPhrase}<span className="mt-2 block text-sm font-semibold text-slate-500">{related.listings.length} qualifying locations</span></Link>)}
        </div>
      </div>
    </section>}
  </PageShell>;
}
