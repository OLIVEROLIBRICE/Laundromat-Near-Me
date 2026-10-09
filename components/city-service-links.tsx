import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEligibleServicesForCity } from "@/lib/city-service-directories";

export function CityServiceLinks({ citySlug, cityName }: { citySlug: string; cityName: string }) {
  const services = getEligibleServicesForCity(citySlug);
  if (!services.length) return null;

  return <section className="border-b border-brand-100 bg-white">
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <h2 className="font-display text-3xl font-extrabold">Find laundromats by service in {cityName}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((entry) => <Link key={entry.path} href={entry.path} className="focus-ring group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-cream p-5 font-extrabold text-brand-700 transition hover:border-brand-300">
          <span>{entry.localPhrase}<span className="mt-1 block text-sm font-semibold text-slate-500">{entry.listings.length} qualifying locations</span></span>
          <ArrowRight size={18} className="shrink-0 transition group-hover:translate-x-1"/>
        </Link>)}
      </div>
    </div>
  </section>;
}
