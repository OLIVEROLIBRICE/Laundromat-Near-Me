import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { MapPin, Search, Star } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { directoryListings } from "@/lib/directory-listings";
import { cities } from "@/lib/data";
import { getPopularCity } from "@/lib/popular-cities";
import { metaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search Laundromats by City or Name | Laundromat Near Me",
  description: metaDescription("Search city laundry guides and supplied laundromat records by city, state, business name, street, or ZIP code."),
  robots: { index: false, follow: true, "max-image-preview": "large" },
  alternates: { canonical: "/search" },
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string | string[]; service?: string | string[] } }) {
  const queryValues = Array.isArray(searchParams.q) ? searchParams.q : searchParams.q ? [searchParams.q] : [];
  const rawQuery = queryValues[0] || "";
  const q = rawQuery.trim().toLowerCase();
  const isUnambiguousQuery = queryValues.length === 1;
  const is24HourSearch = /^(24[- ]?hour|open 24 hours?)$/.test(q);
  const isWashAndFoldSearch = /^(wash(?:\s+|-)and(?:\s+|-)fold|wash\s*&\s*fold)$/.test(q);
  const isCoinLaundrySearch = /^(coin|coin laundry|coin laundromats?|coin[- ]operated(?: laundry| laundromats?)?)$/.test(q);
  const isSelfServiceSearch = /^(self[- ]service(?: laundry| laundromats?)?)$/.test(q);
  const isLargeCapacitySearch = /^(large[- ]capacity|large washers?|large[- ]capacity washers?)$/.test(q);
  const isCardPaymentSearch = /^(card[- ]payment|takes cards|credit cards?)$/.test(q);
  const isMobilePaymentSearch = /^(mobile[- ]payment|mobile app|app[- ]based payment)$/.test(q);
  if (isUnambiguousQuery && is24HourSearch) permanentRedirect("/24-hour-laundromats-near-me/");
  if (isUnambiguousQuery && isWashAndFoldSearch) permanentRedirect("/wash-and-fold-near-me/");
  if (isUnambiguousQuery && isCoinLaundrySearch) permanentRedirect("/coin-laundry-near-me/");
  if (isUnambiguousQuery && isSelfServiceSearch) permanentRedirect("/self-service-laundromats-near-me/");
  if (isUnambiguousQuery && isLargeCapacitySearch) permanentRedirect("/laundromats-with-large-washers-near-me/");
  if (isUnambiguousQuery && isCardPaymentSearch) permanentRedirect("/laundromats-that-take-cards-near-me/");
  if (isUnambiguousQuery && isMobilePaymentSearch) permanentRedirect("/laundromats-with-mobile-payment-near-me/");
  const cityMatches = q && !is24HourSearch ? cities.filter((city) => `${city.name} ${city.state}`.toLowerCase().includes(q)).slice(0, 12) : [];
  const listingMatches = !q ? [] : is24HourSearch
    ? directoryListings.filter((listing) => listing.is24Hours).sort((a, b) => a.cityName.localeCompare(b.cityName) || b.rating - a.rating || b.reviewCount - a.reviewCount)
    : directoryListings.filter((listing) => `${listing.name} ${listing.address} ${listing.services.join(" ")}`.toLowerCase().includes(q)).slice(0, 20);
  const listingCityCount = new Set(listingMatches.map((listing) => listing.citySlug)).size;

  return <PageShell>
    <section className="border-b border-brand-100 bg-brand-50">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="font-display text-4xl font-extrabold">{is24HourSearch ? "24-hour laundromats" : "Search the directory"}</h1>
        {is24HourSearch && <p className="mt-3 max-w-2xl leading-7 text-slate-600">Browse every current directory listing marked as open 24 hours. Confirm overnight access and holiday schedules directly before visiting.</p>}
        <form className="mt-7 flex rounded-2xl bg-white p-2 shadow-soft">
          <input autoFocus name="q" defaultValue={rawQuery} className="focus-ring min-w-0 flex-1 rounded-xl px-4 py-3" placeholder="City, business, street, or ZIP code"/>
          <button className="rounded-xl bg-coral px-5 font-bold text-white" type="submit" aria-label="Search"><Search/></button>
        </form>
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-5 py-14">
      {!q ? <p className="text-lg text-slate-600">Enter a city, business name, street, or ZIP code to begin.</p> : <>
        {is24HourSearch ? <p className="mb-7 text-slate-600">Showing <strong className="text-ink">{listingMatches.length} 24-hour laundromats</strong> across {listingCityCount} city directories.</p> : <p className="mb-7 text-slate-600">Showing results for <strong className="text-ink">“{rawQuery}”</strong></p>}
        {cityMatches.length > 0 && <div className="mb-10"><h2 className="font-display text-2xl font-extrabold">City guides</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{cityMatches.map((city) => { const popular = getPopularCity(city.slug); return <Link key={`${city.stateSlug}-${city.slug}`} href={popular ? `/${popular.slug}` : `/laundromats/${city.stateSlug}/${city.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 font-bold hover:border-brand-300">{city.name}, {city.state}</Link>; })}</div></div>}
        {listingMatches.length > 0 && <div><h2 className="font-display text-2xl font-extrabold">{is24HourSearch ? "All 24-hour listings" : "Laundromats"}</h2><p className="mt-2 text-sm text-slate-500">Supplied records · confirm current details directly</p><div className="mt-4 grid gap-3">{listingMatches.map((listing) => <Link key={`${listing.citySlug}-${listing.id}`} href={`${listing.cityPath}#${listing.citySlug}-listing-${listing.id}`} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300"><span className="flex items-start justify-between gap-4"><span className="font-display text-lg font-extrabold">{listing.name}</span><span className="flex shrink-0 items-center gap-1 font-bold"><Star size={16} className="fill-amber-400 text-amber-400"/>{listing.rating.toFixed(1)}</span></span><span className="mt-2 flex items-start gap-2 text-sm text-slate-500"><MapPin size={16} className="mt-0.5 shrink-0"/>{listing.address}</span><span className="mt-3 flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-bold uppercase tracking-[.14em] text-brand-700">{listing.cityName} directory</span>{is24HourSearch && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">Open 24 hours</span>}</span></Link>)}</div></div>}
        {!cityMatches.length && !listingMatches.length && <div className="rounded-2xl bg-white p-8"><h2 className="font-display text-xl font-extrabold">No matching results</h2><p className="mt-2 text-slate-600">Try a city, business name, street, or ZIP code.</p></div>}
      </>}
    </section>
  </PageShell>;
}
