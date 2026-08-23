import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Breadcrumbs, PageShell } from "@/components/site-shell";
import { cities, cityIntro, getCity } from "@/lib/data";
import { getPopularCity } from "@/lib/popular-cities";
import { metaDescription } from "@/lib/seo";

type Props = { params: { "state-slug": string; "city-slug": string } };

export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((city) => ({ "state-slug": city.stateSlug, "city-slug": city.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = getCity(params["state-slug"], params["city-slug"]);
  if (!city) return {};
  const title = `Laundry Guide for ${city.name}, ${city.state} | Laundromat Near Me`;
  const description = metaDescription(cityIntro(city));
  const path = `/laundromats/${city.stateSlug}/${city.slug}`;
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path }, twitter: { title, description } };
}

export default function CityPage({ params }: Props) {
  const shortCity = getPopularCity(params["city-slug"]);
  if (shortCity && shortCity.state.toLowerCase().replace(/\s+/g, "-") === params["state-slug"]) permanentRedirect(`/${shortCity.slug}`);
  const city = getCity(params["state-slug"], params["city-slug"]);
  if (!city) notFound();

  return <PageShell>
    <section className="border-b border-brand-100 bg-brand-50">
      <div className="mx-auto max-w-5xl px-5 py-16">
        <Breadcrumbs items={[{ label: city.name }]}/>
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Local laundry guide</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Laundry guide for {city.name}, {city.state}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">{cityIntro(city)}</p>
      </div>
    </section>
    <section className="mx-auto max-w-4xl px-5 py-16 text-center">
      <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-soft sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Directory update</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold">Verified listings are coming soon</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">Unverified placeholder businesses have been removed. We will publish local laundromats only after their information has been reviewed.</p>
        <Link href="/contact" className="focus-ring mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">Suggest a laundromat</Link>
      </div>
    </section>
  </PageShell>;
}
