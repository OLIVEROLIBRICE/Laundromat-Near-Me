import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, MapPin, Search } from "lucide-react";
import { LaundromatCard } from "@/components/laundromat-card";
import { Breadcrumbs, PageShell } from "@/components/site-shell";
import { getDirectoryCityGroups, type DirectoryListing } from "@/lib/directory-listings";
import { getEligibleCityServices } from "@/lib/city-service-directories";
import { absoluteUrl } from "@/lib/seo";

export type ServiceDirectoryFaq = {
  question: string;
  answer: string;
};

export type ServiceDirectoryConfig = {
  targetKeyword: string;
  slug: string;
  pageTitle: string;
  metaDescription: string;
  h1: string;
  openingSentence: string;
  introContent: string;
  directoryNotice: string;
  listingLabel: string;
  cityHeadingPrefix: string;
  faqHeading: string;
  emptyHeading: string;
  emptyDescription: string;
  filter: (listing: DirectoryListing) => boolean;
  faqs: ServiceDirectoryFaq[];
  article: {
    title: string;
    href: string;
    description: string;
    eyebrow: string;
    cta: string;
  };
};

function matchesSearch(listing: DirectoryListing, query: string) {
  if (!query) return true;
  const searchable = [
    listing.name,
    listing.address,
    listing.cityName,
    listing.state,
    listing.stateAbbr,
    ...listing.services,
    ...listing.paymentMethods,
  ].join(" ").toLowerCase();
  return searchable.includes(query);
}

export function ServiceDirectoryPage({ config, searchQuery = "" }: { config: ServiceDirectoryConfig; searchQuery?: string }) {
  const canonicalPath = `/${config.slug}/`;
  const allGroups = getDirectoryCityGroups(config.filter);
  const listingCount = allGroups.reduce((total, group) => total + group.listings.length, 0);
  const query = searchQuery.trim().toLowerCase();
  const visibleGroups = query
    ? allGroups
      .map((group) => ({ ...group, listings: group.listings.filter((listing) => matchesSearch(listing, query)) }))
      .filter((group) => group.listings.length > 0)
    : allGroups;
  const visibleCount = visibleGroups.reduce((total, group) => total + group.listings.length, 0);
  const localServicePages = new Map(getEligibleCityServices()
    .filter((entry) => entry.service.nationalPath === canonicalPath)
    .map((entry) => [entry.city.slug, entry]));
  const localServiceForCity = (citySlug: string) => localServicePages.get(citySlug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(canonicalPath)}#page`,
        name: config.h1,
        description: config.metaDescription,
        url: absoluteUrl(canonicalPath),
        mainEntity: { "@id": `${absoluteUrl(canonicalPath)}#list` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(canonicalPath)}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: config.h1, item: absoluteUrl(canonicalPath) },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl(canonicalPath)}#list`,
        name: config.h1,
        numberOfItems: listingCount,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: allGroups.flatMap((group) => group.listings).map((listing, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: listing.name,
          url: absoluteUrl(`${listing.cityPath}#${listing.citySlug}-listing-${listing.id}`),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(canonicalPath)}#faq`,
        mainEntity: config.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>

    <section className="border-b border-brand-100 bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <Breadcrumbs items={[{ label: config.h1 }]}/>
        <div className="max-w-4xl">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[.18em] text-brand-600"><Clock3 size={18}/>National service directory</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">{config.h1}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700"><strong>{config.openingSentence}</strong> {config.introContent}</p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">{config.directoryNotice}</p>
        </div>

        <form action={canonicalPath} className="mt-9 grid max-w-4xl gap-3 rounded-2xl border border-brand-100 bg-white p-3 shadow-soft sm:grid-cols-[1fr_auto]" role="search">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4" htmlFor="service-directory-search">
            <MapPin size={19} className="shrink-0 text-brand-600"/>
            <span className="sr-only">Search by city, ZIP code, neighborhood, or laundromat name</span>
            <input id="service-directory-search" name="q" defaultValue={searchQuery} className="focus-ring min-w-0 flex-1 rounded-lg py-3 outline-none" placeholder="City, ZIP code, neighborhood, or laundromat name"/>
          </label>
          <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 py-3 font-extrabold text-white transition hover:bg-brand-700"><Search size={18}/>Search locations</button>
        </form>

        <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
          <span className="rounded-full border border-brand-200 bg-white px-4 py-2 text-brand-800">{listingCount} supplied {config.listingLabel}</span>
          <span className="rounded-full border border-brand-200 bg-white px-4 py-2 text-brand-800">{allGroups.length} qualifying cities</span>
        </div>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <h2 className="font-display text-3xl font-extrabold">Browse {config.targetKeyword} by City</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">Cities are ordered by the number of matching directory listings. Select a city to jump directly to its qualifying locations.</p>
        <nav aria-label={`Browse ${config.targetKeyword} by city`} className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {allGroups.map((group) => <a key={group.slug} href={`#${group.slug}`} className="focus-ring flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-cream px-4 py-3 font-bold transition hover:border-brand-300 hover:bg-brand-50">
            <span>{group.name}, {group.stateAbbr}</span>
            <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs text-brand-800">{group.listings.length} {group.listings.length === 1 ? "location" : "locations"}</span>
          </a>)}
        </nav>
      </div>
    </section>

    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {query && <div className="mb-10 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <p className="text-lg text-slate-700">Showing <strong>{visibleCount}</strong> matching {visibleCount === 1 ? "location" : "locations"} in <strong>{visibleGroups.length}</strong> {visibleGroups.length === 1 ? "city" : "cities"} for <strong>“{searchQuery}”</strong>.</p>
          <Link href={canonicalPath} className="mt-3 inline-flex font-bold text-brand-700">Clear search</Link>
        </div>}

        <div className="space-y-20">
          {visibleGroups.map((group) => <section id={group.slug} key={group.slug} className="scroll-mt-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[.16em] text-brand-600">{group.listings.length} {group.listings.length === 1 ? "location" : "locations"}</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{config.cityHeadingPrefix} {group.name}, {group.stateAbbr}</h2>
              </div>
              <Link href={group.canonicalPath} className="focus-ring inline-flex shrink-0 items-center gap-2 font-extrabold text-brand-700">View all laundromats in {group.name} <ArrowRight size={18}/></Link>
            </div>
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              {group.listings.map((listing) => <LaundromatCard key={`${group.slug}-${listing.id}`} listing={listing} cityName={group.name} citySlug={group.slug} listingHref={`${group.canonicalPath}#${group.slug}-listing-${listing.id}`}/>)}
            </div>
            <div className="mt-7 border-t border-brand-100 pt-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {localServiceForCity(group.slug) && <Link href={localServiceForCity(group.slug)!.path} className="focus-ring inline-flex items-center gap-2 font-extrabold text-brand-700">{localServiceForCity(group.slug)!.localPhrase} <ArrowRight size={18}/></Link>}
                <Link href={group.canonicalPath} className="focus-ring inline-flex items-center gap-2 font-extrabold text-brand-700">View all laundromats in {group.name} <ArrowRight size={18}/></Link>
              </div>
            </div>
          </section>)}
        </div>

        {!visibleGroups.length && <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="font-display text-2xl font-extrabold">{config.emptyHeading}</h2>
          <p className="mt-3 text-slate-600">{config.emptyDescription}</p>
          <Link href={canonicalPath} className="mt-5 inline-flex rounded-xl bg-brand-600 px-5 py-3 font-bold text-white">View every qualifying location</Link>
        </div>}
      </div>
    </section>

    <section className="border-y border-brand-100 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="rounded-3xl bg-ink p-8 text-white sm:p-10">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[.18em] text-brand-300"><BookOpen size={18}/>{config.article.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold">{config.article.title}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">{config.article.description}</p>
          <Link href={config.article.href} className="focus-ring mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-extrabold text-brand-700">{config.article.cta} <ArrowRight size={18}/></Link>
        </div>
      </div>
    </section>

    <section className="bg-cream">
      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-extrabold uppercase tracking-[.18em] text-brand-600">Common questions</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">{config.faqHeading}</h2>
        <div className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {config.faqs.map((item, index) => <details key={item.question} className="group p-6" open={index === 0}>
            <summary className="focus-ring cursor-pointer list-none pr-8 font-display text-lg font-extrabold marker:hidden">{item.question}</summary>
            <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
          </details>)}
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-500">These records were supplied for this directory and have not been independently verified. Confirm current hours, pricing, services, and availability directly with the business before visiting.</p>
      </div>
    </section>
  </PageShell>;
}
