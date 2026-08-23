import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search, Star } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import brooklynListings from "@/data/brooklyn-listings.json";
import { cities } from "@/lib/data";
import { getPopularCity } from "@/lib/popular-cities";
import { metaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search Laundromats by City or Name | Laundromat Near Me",
  description: metaDescription("Search city laundry guides and supplied Brooklyn laundromat records by city, state, business name, street, or ZIP code."),
  robots: { index: false, follow: true, "max-image-preview": "large" },
  alternates: { canonical: "/search" },
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || "").trim().toLowerCase();
  const cityMatches = q ? cities.filter((city) => `${city.name} ${city.state}`.toLowerCase().includes(q)).slice(0, 12) : [];
  const listingMatches = q ? brooklynListings.filter((listing) => `${listing.name} ${listing.address} ${listing.services.join(" ")}`.toLowerCase().includes(q)).slice(0, 20) : [];

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
        {listingMatches.length > 0 && <div><h2 className="font-display text-2xl font-extrabold">Brooklyn laundromats</h2><p className="mt-2 text-sm text-slate-500">Supplied records · not independently verified</p><div className="mt-4 grid gap-3">{listingMatches.map((listing) => <Link key={listing.id} href={`/brooklyn#brooklyn-listing-${listing.id}`} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300"><span className="flex items-start justify-between gap-4"><span className="font-display text-lg font-extrabold">{listing.name}</span><span className="flex shrink-0 items-center gap-1 font-bold"><Star size={16} className="fill-amber-400 text-amber-400"/>{listing.rating.toFixed(1)}</span></span><span className="mt-2 flex items-start gap-2 text-sm text-slate-500"><MapPin size={16} className="mt-0.5 shrink-0"/>{listing.address}</span></Link>)}</div></div>}
        {!cityMatches.length && !listingMatches.length && <div className="rounded-2xl bg-white p-8"><h2 className="font-display text-xl font-extrabold">No matching results</h2><p className="mt-2 text-slate-600">Try a city, business name, Brooklyn street, or ZIP code.</p></div>}
      </>}
    </section>
  </PageShell>;
}
