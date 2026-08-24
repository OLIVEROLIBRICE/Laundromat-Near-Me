import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/articles";
import { popularCities } from "@/lib/popular-cities";
import cityEditorialIntros from "@/data/city-editorial-intros-batch-2.json";
import { SiteLogo } from "@/components/site-logo";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Clock3,
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

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const cityGuides = [
  ...popularCities.map((city) => ({ name: city.name, slug: city.slug, state: city.state, href: `/${city.slug}` })),
  ...Object.entries(cityEditorialIntros).map(([slug, city]) => ({
    name: city.name,
    slug,
    state: city.state,
    href: `/laundromats/${slugify(city.state)}/${slug}`,
  })),
];
const featuredStates = Array.from(new Set(cityGuides.map((city) => city.state))).sort().map((state) => ({
  state,
  cities: cityGuides.filter((city) => city.state === state).sort((a, b) => a.name.localeCompare(b.name)),
}));

const faqItems = [
  {
    question: "What is a laundromat?",
    answer: "A laundromat (also commonly spelled laundrymat or laundermat) is a shared laundry facility where customers pay to use commercial washing machines and dryers by the cycle. Locations may accept coins, cards, laundry cards, or mobile payment apps.",
  },
  {
    question: "How do I find a laundromat near me?",
    answer: "Enter a city, neighborhood, business name, street, or ZIP code in the search bar above. The directory will show matching city guides and available listing records so you can review location details before visiting.",
  },
  {
    question: "How much does a laundromat cost?",
    answer: "A standard wash often costs about $2 to $5, depending on the city and machine size. Dryers may charge by a block of minutes or by the cycle. Treat online prices as estimates and confirm the current amount at the machine.",
  },
  {
    question: "Are there 24-hour laundromats near me?",
    answer: "Many larger cities have laundromats that operate around the clock. Search your city and review the posted hours, then confirm directly with the business because holiday schedules, last-wash times, and overnight access can change.",
  },
  {
    question: "What is the difference between a laundromat and a laundry service?",
    answer: "A laundromat is usually self-service: you wash and dry your own clothes. A laundry service or wash-and-fold business has staff handle the work for a per-pound or per-order fee. Many locations offer both options.",
  },
];

export default function Home() {
  const schema = { "@context": "https://schema.org", "@type": "WebSite", name: "Laundromat Near Me", url: "https://laundrymatnearme.com", potentialAction: { "@type": "SearchAction", target: "https://laundrymatnearme.com/search?q={search_term_string}", "query-input": "required name=search_term_string" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
            <SiteLogo inverted/>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-bold lg:flex" aria-label="Main navigation">
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
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-.035em] drop-shadow-md sm:text-6xl lg:text-7xl">Find a Laundromat Near Me: Search Local Guides Across the US</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">Search city guides and available local records by city, neighborhood, business name, street, or ZIP code.</p>
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

      <section aria-label="Directory highlights" className="border-b border-brand-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-brand-100 px-5 sm:grid-cols-4 sm:divide-y-0 lg:px-8">
          {[
            ["587", "Supplied listing records"],
            ["15", "Featured city guides"],
            ["9", "States represented"],
            ["5", "In-depth laundry guides"],
          ].map(([value, label]) => <div key={label} className="px-3 py-7 text-center sm:px-5">
            <strong className="font-display text-3xl font-extrabold text-brand-700 sm:text-4xl">{value}</strong>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[.13em] text-slate-500">{label}</span>
          </div>)}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-brand-600">A more useful local search</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">How Laundromat Near Me works</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-600">
            <p>Finding a clean, convenient laundromat should not be a guessing game. Laundromat Near Me is a growing directory that combines supplied local business records with practical editorial guides for 30 featured US cities. Search by city, neighborhood, business name, street, or ZIP code to narrow the options before you leave home.</p>
            <p>The details that matter most can vary from one laundry trip to the next. You may need early opening hours after a night shift, a large-capacity washer for a king comforter, free parking, card payment, or wash-and-fold service near work. Our Brooklyn, Bronx, Houston, Queens, Philadelphia, San Francisco, Tampa, Newark, Jacksonville, Phoenix, Long Beach, Milwaukee, Staten Island, and Jersey City directories include 587 supplied records with addresses, ratings, services, pricing information, and contact details. Because business information can change, those records are clearly labeled as not independently verified and should be confirmed directly before a visit.</p>
            <p>Our other featured pages currently provide city-specific guidance on neighborhoods, typical schedules, service options, and local resources while verified business listings are reviewed. Browse the city cards above, explore coverage by state below, or use the search bar to find a relevant city guide in seconds. New locations will be added as dependable information becomes available.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[.18em] text-brand-600"><Building2 size={18}/>Featured coverage</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Browse laundromat guides by state</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Explore the states currently represented by our 30 city guides, including all 15 cities from the second editorial batch. We are expanding coverage carefully as reliable local information becomes available.</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStates.map(({ state, cities }) => <section key={state} className="rounded-2xl border border-slate-200 bg-cream p-6">
              <h3 className="font-display text-xl font-extrabold">{state}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cities.map((city) => <Link key={`${city.state}-${city.slug}`} href={city.href} className="focus-ring rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-bold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50">{city.name}</Link>)}
              </div>
            </section>)}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[.18em] text-brand-600"><BookOpen size={18}/>Laundry guides</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Plan a smoother laundry day</h2>
            </div>
            <Link href="/blog" className="focus-ring inline-flex items-center gap-2 font-bold text-brand-700">View all guides <ArrowRight size={18}/></Link>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => <article key={article.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-bold text-brand-600"><Clock3 size={17}/>{article.readTime} read</p>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight">{article.title}</h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600">{article.description}</p>
              <Link href={`/blog/${article.slug}`} className="focus-ring mt-6 inline-flex items-center gap-2 font-bold text-brand-700">Read guide <ArrowRight size={18}/></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-16 lg:py-20">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-brand-600">Common questions</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Laundromat near me FAQ</h2>
          </div>
          <div className="mt-9 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-cream">
            {faqItems.map((item, index) => <details key={item.question} className="group p-6" open={index === 0}>
              <summary className="focus-ring cursor-pointer list-none pr-8 font-display text-lg font-extrabold marker:hidden">{item.question}</summary>
              <p className="mt-4 leading-7 text-slate-600">{item.answer}{item.question.startsWith("Are there 24-hour") && <> Read our <Link href="/blog/laundromats-near-me-open-24-hours" className="font-bold text-brand-700 underline decoration-brand-200 underline-offset-4">24-hour laundromat guide</Link> for more tips.</>}</p>
            </details>)}
          </div>
        </div>
      </section>
    </main>

    <footer className="bg-[#081018] text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-10 sm:flex-row sm:items-center lg:px-8"><div><p className="font-display text-lg font-extrabold">Laundromat <span className="text-[#93c5fd]">Near Me</span></p><p className="mt-1 text-sm text-slate-300">Laundry day starts with a better local search.</p></div><div className="flex gap-6 text-sm text-slate-300"><Link href="/about">About</Link><Link href="/blog">Guides</Link><Link href="/contact">Contact</Link></div></div></footer>
  </>;
}
