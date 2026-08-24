import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Landmark, Mail, Search } from "lucide-react";
import { Breadcrumbs, PageShell } from "@/components/site-shell";
import { CityListings, type CityListing } from "@/components/brooklyn-listings";
import brooklynListings from "@/data/brooklyn-listings.json";
import bronxListings from "@/data/bronx-listings.json";
import houstonListings from "@/data/houston-listings.json";
import queensListings from "@/data/queens-listings.json";
import philadelphiaListings from "@/data/philadelphia-listings.json";
import sanFranciscoListings from "@/data/san-francisco-listings.json";
import tampaListings from "@/data/tampa-listings.json";
import newarkListings from "@/data/newark-listings.json";
import jacksonvilleListings from "@/data/jacksonville-listings.json";
import phoenixListings from "@/data/phoenix-listings.json";
import longBeachListings from "@/data/long-beach-listings.json";
import { getPopularCity, popularCities } from "@/lib/popular-cities";
import { cityResources } from "@/lib/city-resources";
import { absoluteUrl, metaDescription } from "@/lib/seo";

type Props = { params: { "city-slug": string } };

function getCityListings(slug: string): CityListing[] {
  if (slug === "brooklyn") return brooklynListings;
  if (slug === "bronx") return bronxListings;
  if (slug === "houston") return houstonListings;
  if (slug === "queens") return queensListings;
  if (slug === "philadelphia") return philadelphiaListings;
  if (slug === "san-francisco") return sanFranciscoListings;
  if (slug === "tampa") return tampaListings;
  if (slug === "newark") return newarkListings;
  if (slug === "jacksonville") return jacksonvilleListings;
  if (slug === "phoenix") return phoenixListings;
  if (slug === "long-beach") return longBeachListings;
  return [];
}

export function generateStaticParams() {
  return popularCities.map((city) => ({ "city-slug": city.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = getPopularCity(params["city-slug"]);
  if (!city) return {};
  const count = getCityListings(city.slug).length;
  const title = `${count ? `${count} ` : ""}Laundromats in ${city.name}, ${city.abbr} | Laundromat Near Me`;
  const description = count ? `Browse ${count} ${city.name} laundromats with supplied addresses, phones, ratings, reviews, services, pricing, and websites. Confirm details directly before visiting.` : metaDescription(city.intro);
  const image = absoluteUrl(`/cities/${city.image}`);
  return {
    title,
    description,
    alternates: { canonical: `/${city.slug}` },
    openGraph: { title, description, type: "website", url: `/${city.slug}`, images: [{ url: image, alt: city.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function PopularCityPage({ params }: Props) {
  const editorial = getPopularCity(params["city-slug"]);
  if (!editorial) notFound();
  const listings = getCityListings(editorial.slug);
  const hasListings = listings.length > 0;
  const resources = cityResources[editorial.slug] ?? [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Laundromats in ${editorial.name}, ${editorial.abbr}`,
    description: editorial.intro,
    url: absoluteUrl(`/${editorial.slug}`),
    primaryImageOfPage: absoluteUrl(`/cities/${editorial.image}`),
    ...(hasListings ? { mainEntity: {
      "@type": "ItemList",
      numberOfItems: listings.length,
      itemListElement: listings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.name,
        url: absoluteUrl(`/${editorial.slug}#${editorial.slug}-listing-${listing.id}`),
      })),
    }} : {}),
  };

  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
    <section className="border-b border-brand-100 bg-brand-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-16">
        <div>
          <Breadcrumbs items={[{ label: editorial.name }]}/>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Local laundry guide</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Laundromats in {editorial.name}, {editorial.abbr}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{editorial.intro}</p>
          {hasListings ? <Link href="#listings" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700"><Search size={18}/> Browse {listings.length} {editorial.name} listings</Link> : <Link href="/contact" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700"><Mail size={18}/> Suggest a local laundromat</Link>}
        </div>
        <div className="relative h-72 overflow-hidden rounded-3xl border border-brand-100 bg-slate-200 shadow-soft sm:h-96">
          <Image src={`/cities/${editorial.image}`} alt={editorial.alt} title={`${editorial.name}, ${editorial.state} laundromat guide`} fill priority sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover"/>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-5 pt-16 text-white"><p className="font-display text-xl font-extrabold">{editorial.name}, {editorial.state}</p><p className="mt-1 text-sm text-white/80">Local laundromat directory</p></div>
        </div>
      </div>
    </section>

    {hasListings ? <section id="listings" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">{editorial.name} directory</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{listings.length} laundromats in {editorial.name}</h2>
        <p className="mt-4 leading-7 text-slate-600">These records were supplied for this directory and have not been independently verified. Confirm current hours, pricing, services, and availability directly with the business before visiting.</p>
      </div>
      <CityListings listings={listings} cityName={editorial.name} citySlug={editorial.slug}/>
    </section> : <section className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8">
      <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-soft sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Directory update</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold">Verified listings are coming soon</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">We removed the unverified placeholder businesses and are reviewing real laundromats before publishing them. Know a dependable location in {editorial.name}? Send us the business details.</p>
        <Link href="/contact" className="focus-ring mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">Suggest a laundromat</Link>
      </div>
    </section>}

    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[.18em] text-brand-600"><Landmark size={18}/>Local resources</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold">Useful services in {editorial.name}</h2>
          <p className="mt-3 leading-7 text-slate-600">Official transportation, education, healthcare, housing, and city-service resources that may help residents plan errands around laundry day.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="focus-ring group rounded-2xl border border-slate-200 bg-cream p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft" aria-label={`${resource.name} — opens official website in a new tab`}>
            <span className="flex items-start justify-between gap-4"><strong className="font-display text-lg font-extrabold group-hover:text-brand-700">{resource.name}</strong><ExternalLink size={18} className="shrink-0 text-brand-600"/></span>
            <span className="mt-3 block text-sm leading-6 text-slate-600">{resource.description}</span>
            <span className="mt-4 block text-xs font-bold uppercase tracking-[.14em] text-brand-700">Visit official website</span>
          </a>)}
        </div>
      </div>
    </section>
  </PageShell>;
}
