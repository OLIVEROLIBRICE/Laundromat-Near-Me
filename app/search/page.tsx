import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search, Star } from "lucide-react";
import { PageShell } from "@/components/site-shell";
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
import milwaukeeListings from "@/data/milwaukee-listings.json";
import statenIslandListings from "@/data/staten-island-listings.json";
import jerseyCityListings from "@/data/jersey-city-listings.json";
import { cities } from "@/lib/data";
import { getPopularCity } from "@/lib/popular-cities";
import { metaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search Laundromats by City or Name | Laundromat Near Me",
  description: metaDescription("Search city laundry guides and supplied laundromat records by city, state, business name, street, or ZIP code."),
  robots: { index: false, follow: true, "max-image-preview": "large" },
  alternates: { canonical: "/search" },
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || "").trim().toLowerCase();
  const cityMatches = q ? cities.filter((city) => `${city.name} ${city.state}`.toLowerCase().includes(q)).slice(0, 12) : [];
  const directoryListings = [
    ...brooklynListings.map((listing) => ({ ...listing, cityName: "Brooklyn", citySlug: "brooklyn" })),
    ...bronxListings.map((listing) => ({ ...listing, cityName: "Bronx", citySlug: "bronx" })),
    ...houstonListings.map((listing) => ({ ...listing, cityName: "Houston", citySlug: "houston" })),
    ...queensListings.map((listing) => ({ ...listing, cityName: "Queens", citySlug: "queens" })),
    ...philadelphiaListings.map((listing) => ({ ...listing, cityName: "Philadelphia", citySlug: "philadelphia" })),
    ...sanFranciscoListings.map((listing) => ({ ...listing, cityName: "San Francisco", citySlug: "san-francisco" })),
    ...tampaListings.map((listing) => ({ ...listing, cityName: "Tampa", citySlug: "tampa" })),
    ...newarkListings.map((listing) => ({ ...listing, cityName: "Newark", citySlug: "newark" })),
    ...jacksonvilleListings.map((listing) => ({ ...listing, cityName: "Jacksonville", citySlug: "jacksonville" })),
    ...phoenixListings.map((listing) => ({ ...listing, cityName: "Phoenix", citySlug: "phoenix" })),
    ...longBeachListings.map((listing) => ({ ...listing, cityName: "Long Beach", citySlug: "long-beach" })),
    ...milwaukeeListings.map((listing) => ({ ...listing, cityName: "Milwaukee", citySlug: "milwaukee" })),
    ...statenIslandListings.map((listing) => ({ ...listing, cityName: "Staten Island", citySlug: "staten-island" })),
    ...jerseyCityListings.map((listing) => ({ ...listing, cityName: "Jersey City", citySlug: "jersey-city" })),
  ];
  const listingMatches = q ? directoryListings.filter((listing) => `${listing.name} ${listing.address} ${listing.services.join(" ")}`.toLowerCase().includes(q)).slice(0, 20) : [];

  return <PageShell>
    <section className="border-b border-brand-100 bg-brand-50">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="font-display text-4xl font-extrabold">Search the directory</h1>
        <form className="mt-7 flex rounded-2xl bg-white p-2 shadow-soft">
          <input autoFocus name="q" defaultValue={searchParams.q} className="focus-ring min-w-0 flex-1 rounded-xl px-4 py-3" placeholder="City, business, street, or ZIP code"/>
          <button className="rounded-xl bg-coral px-5 font-bold text-white" type="submit" aria-label="Search"><Search/></button>
        </form>
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-5 py-14">
      {!q ? <p className="text-lg text-slate-600">Enter a city, business name, street, or ZIP code to begin.</p> : <>
        <p className="mb-7 text-slate-600">Showing results for <strong className="text-ink">“{searchParams.q}”</strong></p>
        {cityMatches.length > 0 && <div className="mb-10"><h2 className="font-display text-2xl font-extrabold">City guides</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{cityMatches.map((city) => { const popular = getPopularCity(city.slug); return <Link key={`${city.stateSlug}-${city.slug}`} href={popular ? `/${popular.slug}` : `/laundromats/${city.stateSlug}/${city.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 font-bold hover:border-brand-300">{city.name}, {city.state}</Link>; })}</div></div>}
        {listingMatches.length > 0 && <div><h2 className="font-display text-2xl font-extrabold">Laundromats</h2><p className="mt-2 text-sm text-slate-500">Supplied records · not independently verified</p><div className="mt-4 grid gap-3">{listingMatches.map((listing) => <Link key={`${listing.citySlug}-${listing.id}`} href={`/${listing.citySlug}#${listing.citySlug}-listing-${listing.id}`} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300"><span className="flex items-start justify-between gap-4"><span className="font-display text-lg font-extrabold">{listing.name}</span><span className="flex shrink-0 items-center gap-1 font-bold"><Star size={16} className="fill-amber-400 text-amber-400"/>{listing.rating.toFixed(1)}</span></span><span className="mt-2 flex items-start gap-2 text-sm text-slate-500"><MapPin size={16} className="mt-0.5 shrink-0"/>{listing.address}</span><span className="mt-2 block text-xs font-bold uppercase tracking-[.14em] text-brand-700">{listing.cityName} directory</span></Link>)}</div></div>}
        {!cityMatches.length && !listingMatches.length && <div className="rounded-2xl bg-white p-8"><h2 className="font-display text-xl font-extrabold">No matching results</h2><p className="mt-2 text-slate-600">Try a city, business name, street, or ZIP code.</p></div>}
      </>}
    </section>
  </PageShell>;
}
