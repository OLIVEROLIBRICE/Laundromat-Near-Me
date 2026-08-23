import Link from "next/link";
import Image from "next/image";
import { popularCities } from "@/lib/popular-cities";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Sparkles,
  Twitter,
  WashingMachine,
} from "lucide-react";

export default function Home() {
  const schema = { "@context": "https://schema.org", "@type": "WebSite", name: "Laundromat Near Me", url: "https://laundrymatnearme.com", potentialAction: { "@type": "SearchAction", target: "https://laundrymatnearme.com/search?q={search_term_string}", "query-input": "required name=search_term_string" } };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

    <header className="absolute inset-x-0 top-0 z-20 text-white">
      <div className="bg-[#3b82f6]">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 text-xs font-semibold lg:px-8">
          <div className="hidden items-center gap-4 sm:flex">
            <a href="#" aria-label="Facebook" className="opacity-90 transition hover:opacity-100"><Facebook size={15}/></a>
            <span className="h-4 w-px bg-white/35"/>
            <a href="#" aria-label="Instagram" className="opacity-90 transition hover:opacity-100"><Instagram size={15}/></a>
            <span className="h-4 w-px bg-white/35"/>
            <a href="#" aria-label="Twitter" className="opacity-90 transition hover:opacity-100"><Twitter size={15}/></a>
          </div>
          <div className="ml-auto flex items-center gap-4 sm:ml-0 lg:gap-6">
            <a href="tel:+18005550199" className="hidden items-center gap-2 lg:flex"><Phone size={14}/> (800) 555-0199</a>
            <a href="mailto:hello@laundromatnearme.com" className="hidden items-center gap-2 md:flex"><Mail size={14}/> hello@laundromatnearme.com</a>
            <Link href="/contact" className="rounded-full bg-white px-5 py-2 font-bold text-[#2563eb] shadow-sm transition hover:bg-slate-50">+ Add a laundromat</Link>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#081018]/88 backdrop-blur-md">
        <div className="mx-auto flex h-[86px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg" aria-label="Laundromat Near Me home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#3b82f6]/70 bg-white/5 text-[#93c5fd]"><WashingMachine size={24}/></span>
            <span className="font-display text-lg font-extrabold tracking-tight">LAUNDROMAT <span className="text-[#93c5fd]">NEAR ME</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-bold lg:flex" aria-label="Main navigation">
            <Link href="/" className="text-[#93c5fd]">Home</Link>
            <Link href="#popular-cities" className="transition hover:text-[#93c5fd]">Browse locations</Link>
            <Link href="/search?q=24-hour" className="transition hover:text-[#93c5fd]">24-hour laundry</Link>
            <Link href="/blog" className="transition hover:text-[#93c5fd]">Laundry guides</Link>
            <Link href="/about" className="transition hover:text-[#93c5fd]">About us</Link>
            <Link href="/contact" className="transition hover:text-[#93c5fd]">Contact</Link>
          </nav>
          <button type="button" className="rounded-lg border border-white/20 p-2.5 lg:hidden" aria-label="Open navigation"><Menu size={22}/></button>
        </div>
      </div>
    </header>

    <main>
      <section
        className="relative overflow-hidden bg-slate-900 bg-cover bg-center pb-12 pt-[190px] text-white"
        style={{ backgroundImage: "linear-gradient(rgba(3,10,16,.58), rgba(3,10,16,.73)), url('/city-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30"/>
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] backdrop-blur-sm"><Sparkles size={14} className="text-[#93c5fd]"/> Laundry day, made easier</p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-.035em] drop-shadow-md sm:text-6xl lg:text-7xl">Find the Best Laundromat in Your City</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">Compare trusted local laundromats, opening hours, payment options, and the amenities that make laundry day simpler.</p>
          </div>

          <form action="/search" className="mx-auto mt-9 grid max-w-4xl gap-3 sm:grid-cols-[1.1fr_1fr_auto]" aria-label="Search laundromats">
            <label className="flex h-14 items-center gap-3 rounded-full bg-white px-5 text-slate-700 shadow-xl" htmlFor="search-location">
              <MapPin size={19} className="shrink-0 text-[#3b82f6]"/>
              <span className="sr-only">City or ZIP code</span>
              <input id="search-location" name="q" required className="focus-ring w-full rounded-lg bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="City, neighborhood, or ZIP"/>
            </label>
            <label className="flex h-14 items-center gap-3 rounded-full bg-white px-5 text-slate-700 shadow-xl" htmlFor="search-service">
              <WashingMachine size={19} className="shrink-0 text-[#3b82f6]"/>
              <span className="sr-only">Laundry service</span>
              <select id="search-service" name="service" defaultValue="" className="focus-ring w-full cursor-pointer rounded-lg bg-transparent text-sm outline-none">
                <option value="">All laundry services</option>
                <option value="self-service">Self-service</option>
                <option value="wash-fold">Wash &amp; fold</option>
                <option value="24-hour">Open 24 hours</option>
              </select>
            </label>
            <button className="focus-ring inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#3b82f6] px-9 text-sm font-extrabold text-white shadow-xl transition hover:bg-[#2563eb]" type="submit"><Search size={18}/> Search</button>
          </form>

          <div id="popular-cities" className="mt-12 scroll-mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#93c5fd]">Popular searches</p><h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">Browse laundromats by city</h2></div>
              <p className="hidden text-sm text-white/70 md:block">Select a city to start your search</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {popularCities.map((city) => <Link
                key={city.name}
                href={`/${city.slug}`}
                aria-label={`Search laundromats in ${city.name}, ${city.state}`}
                className="group overflow-hidden rounded-xl border border-[#93c5fd]/75 bg-[#111820]/85 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                itemScope
                itemType="https://schema.org/City"
              >
                <meta itemProp="name" content={`${city.name}, ${city.state}`}/>
                <span className="relative block h-28 overflow-hidden bg-slate-800 sm:h-32">
                  <Image
                    src={`/cities/${city.image}`}
                    alt={city.alt}
                    title={`${city.name}, ${city.state} laundromat search`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                    itemProp="image"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
                </span>
                <span className="block bg-[#3b82f6] px-2 py-3">
                  <strong className="block text-sm font-extrabold sm:text-base">{city.name}</strong>
                  <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[.14em] text-white/80">{city.state}</span>
                </span>
              </Link>)}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="bg-[#081018] text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-10 sm:flex-row sm:items-center lg:px-8"><div><p className="font-display text-lg font-extrabold">Laundromat <span className="text-[#93c5fd]">Near Me</span></p><p className="mt-1 text-sm text-slate-300">Laundry day starts with a better local search.</p></div><div className="flex gap-6 text-sm text-slate-300"><Link href="/about">About</Link><Link href="/blog">Guides</Link><Link href="/contact">Contact</Link></div></div></footer>
  </>;
}
