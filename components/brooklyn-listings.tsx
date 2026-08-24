"use client";

import { useMemo, useState } from "react";
import { Car, CreditCard, ExternalLink, MapPin, Navigation, Phone, Search, Star, WashingMachine, Wifi } from "lucide-react";

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
  hasWifi?: boolean;
  hasParking?: boolean;
  acceptsCards?: boolean;
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

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {visibleListings.map((listing) => {
        const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listing.name}, ${listing.address}`)}`;
        const pricingItems = listing.pricing.split(";").map((item) => item.trim()).filter(Boolean);
        return <article id={`${citySlug}-listing-${listing.id}`} key={listing.id} className="group scroll-mt-6 overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-[0_14px_38px_rgba(30,64,175,.10)] transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_20px_48px_rgba(30,64,175,.18)]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#17243a] via-[#101c30] to-[#0a1322] p-5 text-white">
            <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full bg-brand-500/15 blur-2xl"/>
            <div className="relative flex items-start justify-between gap-3">
              <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-extrabold shadow-sm ${listing.is24Hours ? "bg-emerald-500 text-white" : "bg-white/10 text-slate-200 ring-1 ring-white/15"}`}>
                <span className={`h-2 w-2 rounded-full ${listing.is24Hours ? "bg-emerald-100" : "bg-brand-300"}`}/>
                {listing.is24Hours ? "Open 24 hours" : "Check current hours"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#081225]/75 px-3.5 py-2 text-sm font-extrabold ring-1 ring-white/5">
                <Star size={17} className="fill-amber-400 text-amber-400"/>{listing.rating.toFixed(1)}
                <span className="font-semibold text-slate-400">({listing.reviewCount.toLocaleString()})</span>
              </span>
            </div>
            <div className="relative flex min-h-32 flex-col items-center justify-center text-center text-slate-500">
              <span className="rounded-2xl bg-white/[.04] p-4 ring-1 ring-white/[.06]"><WashingMachine size={38}/></span>
              <span className="mt-3 text-xs font-bold uppercase tracking-[.18em]">Local laundry listing</span>
            </div>
            <div className="relative flex justify-end">
              <a href={directionsUrl} target="_blank" rel="nofollow noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-brand-700 shadow-lg transition hover:bg-brand-50">
                <Navigation size={17}/>Get directions
              </a>
            </div>
          </div>

          <div className="p-6">
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand-600">{cityName} listing #{listing.id}</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-ink">{listing.name}</h3>
            <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-600"><MapPin size={18} className="mt-0.5 shrink-0 text-brand-600"/>{listing.address}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {listing.services.map((service) => <span key={service} className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-extrabold text-brand-700">{service}</span>)}
              {listing.hasParking && <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700"><Car size={14}/>Parking</span>}
              {listing.hasWifi && <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700"><Wifi size={14}/>Wi-Fi</span>}
              {(listing.acceptsCards || listing.paymentMethods.some((method) => /card/i.test(method))) && <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-extrabold text-slate-600"><CreditCard size={14}/>Card payment</span>}
              {listing.paymentMethods.filter((method) => !/card/i.test(method)).map((method) => <span key={method} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">{method}</span>)}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">{listing.description}</p>

            {pricingItems.length > 0 && <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-slate-400">Supplied pricing</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pricingItems.map((item) => <span key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 shadow-sm">{item}</span>)}
              </div>
            </div>}

            <div className="mt-5 flex flex-wrap gap-3">
              {listing.phone && <a href={`tel:${listing.phone}`} className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-700"><Phone size={18}/>Call {listing.phone}</a>}
              {listing.website && <a href={listing.website} target="_blank" rel="nofollow noopener noreferrer" className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-extrabold text-brand-700 transition hover:border-brand-300 hover:bg-brand-100">Website<ExternalLink size={17}/></a>}
              {!listing.phone && !listing.website && <a href={directionsUrl} target="_blank" rel="nofollow noopener noreferrer" className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-700"><Navigation size={18}/>Get directions</a>}
            </div>
          </div>
        </article>;
      })}
    </div>

    {!visibleListings.length && <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center"><h3 className="font-display text-xl font-extrabold">No matching listings</h3><p className="mt-2 text-slate-600">Try a business name, street, ZIP code, or turn off the 24-hour filter.</p></div>}
  </>;
}
