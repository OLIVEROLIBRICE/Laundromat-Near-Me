"use client";

import { useMemo, useState } from "react";
import { Clock3, ExternalLink, MapPin, Phone, Search, ShieldAlert, Star } from "lucide-react";

export type CityListing = {
  id: number;
  name: string;
  address: string;
  phone: string | null;
  website: string | null;
  rating: number;
  reviewCount: number;
  services: string[];
  paymentMethods: string[];
  pricing: string;
  is24Hours: boolean;
  verified: boolean;
  description: string;
};

export function CityListings({ listings, cityName, citySlug }: { listings: CityListing[]; cityName: string; citySlug: string }) {
  const [query, setQuery] = useState("");
  const [only24Hours, setOnly24Hours] = useState(false);
  const [sort, setSort] = useState("rating");

  const visibleListings = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return listings
      .filter((listing) => !only24Hours || listing.is24Hours)
      .filter((listing) => !needle || `${listing.name} ${listing.address} ${listing.services.join(" ")}`.toLowerCase().includes(needle))
      .sort((a, b) => {
        if (sort === "reviews") return b.reviewCount - a.reviewCount;
        if (sort === "name") return a.name.localeCompare(b.name);
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      });
  }, [listings, only24Hours, query, sort]);

  return <>
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
          <Search size={18} className="shrink-0 text-brand-600"/>
          <span className="sr-only">Search {cityName} listings</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-ring w-full rounded-lg py-3 outline-none" placeholder="Search by name, address, or service"/>
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold">
          <input type="checkbox" checked={only24Hours} onChange={(event) => setOnly24Hours(event.target.checked)} className="h-4 w-4 accent-brand-600"/>
          Open 24 hours
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="focus-ring bg-transparent py-3 outline-none">
            <option value="rating">Top rated</option>
            <option value="reviews">Most reviewed</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm text-slate-500">Showing {visibleListings.length} of {listings.length} {cityName} listings</p>
    </div>

    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {visibleListings.map((listing) => <article id={`${citySlug}-listing-${listing.id}`} key={listing.id} className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-200 hover:shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">{cityName} listing #{listing.id}</p><h3 className="mt-2 font-display text-xl font-extrabold leading-tight">{listing.name}</h3></div>
          <p className="flex shrink-0 items-center gap-1.5 font-extrabold"><Star size={18} className="fill-amber-400 text-amber-400"/>{listing.rating.toFixed(1)}</p>
        </div>
        <p className="mt-1 text-xs text-slate-500">{listing.reviewCount.toLocaleString()} reviews in the supplied dataset</p>
        <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-600"><MapPin size={17} className="mt-1 shrink-0 text-brand-600"/>{listing.address}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          {listing.phone && <a href={`tel:${listing.phone}`} className="flex items-center gap-2 text-brand-700 hover:underline"><Phone size={16}/>{listing.phone}</a>}
          {listing.website && <a href={listing.website} target="_blank" rel="nofollow noopener noreferrer" className="flex items-center gap-2 text-brand-700 hover:underline">Website <ExternalLink size={15}/></a>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {listing.is24Hours && <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700"><Clock3 size={14}/>Open 24 hours</span>}
          {listing.services.map((service) => <span key={service} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{service}</span>)}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">{listing.description}</p>
        <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500"><strong className="text-slate-600">Pricing supplied:</strong> {listing.pricing}</p>
        <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-amber-700"><ShieldAlert size={15}/>Not independently verified</p>
      </article>)}
    </div>

    {!visibleListings.length && <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center"><h3 className="font-display text-xl font-extrabold">No matching listings</h3><p className="mt-2 text-slate-600">Try a business name, street, ZIP code, or turn off the 24-hour filter.</p></div>}
  </>;
}
