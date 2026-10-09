"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { LaundromatCard, type CityListing } from "@/components/laundromat-card";

export type { CityListing } from "@/components/laundromat-card";

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

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {visibleListings.map((listing) => <LaundromatCard key={listing.id} listing={listing} cityName={cityName} citySlug={citySlug}/>)}
    </div>

    {!visibleListings.length && <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center"><h3 className="font-display text-xl font-extrabold">No matching listings</h3><p className="mt-2 text-slate-600">Try a business name, street, ZIP code, or turn off the 24-hour filter.</p></div>}
  </>;
}
