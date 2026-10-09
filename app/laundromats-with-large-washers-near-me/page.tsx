import type { Metadata } from "next";
import { ServiceDirectoryPage, type ServiceDirectoryConfig } from "@/components/service-directory-page";
import { getNationalServiceEligibility } from "@/lib/city-service-directories";

const title = "Laundromats With Large Washers Near Me | Comforters & Bulky Loads";
const description = "Laundromats With Large Washers Near Me helps you find locations with large-capacity machines for comforters, bedding, blankets and bulky loads.";

export function generateMetadata(): Metadata {
  const { indexable } = getNationalServiceEligibility("large-washers");
  return {
    title,
    description,
    alternates: { canonical: "/laundromats-with-large-washers-near-me/" },
    robots: { index: indexable, follow: true, "max-image-preview": "large", googleBot: { index: indexable, follow: true, "max-image-preview": "large" } },
    openGraph: { title, description, type: "website", url: "/laundromats-with-large-washers-near-me/", images: [{ url: "/og.png", width: 1730, height: 909, alt: "Laundromats With Large Washers Near Me" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

const config: ServiceDirectoryConfig = {
  targetKeyword: "Laundromats With Large Washers Near Me",
  slug: "laundromats-with-large-washers-near-me",
  pageTitle: title,
  metaDescription: description,
  h1: "Laundromats With Large Washers Near Me",
  openingSentence: "Laundromats With Large Washers Near Me helps you find laundry locations with large-capacity machines for bulky loads.",
  introContent: "Browse explicitly tagged locations by city and compare supplied ratings, addresses, services, payment options, pricing, phone numbers, websites, and directions where available.",
  directoryNotice: "Every location on this page is explicitly tagged Large Capacity in the directory's structured service data. The current records do not provide washer-capacity measurements, so confirm machine dimensions, load limits, availability, pricing, and suitability for a specific item directly with the laundromat.",
  listingLabel: "large-capacity listings",
  cityHeadingPrefix: "Laundromats With Large Washers in",
  faqHeading: "Large-capacity washer FAQ",
  emptyHeading: "No matching large-capacity listings",
  emptyDescription: "Try another city, ZIP code, neighborhood, or laundromat name.",
  filter: (listing) => listing.services.includes("Large Capacity"),
  article: {
    title: "What to bring to a laundromat",
    href: "/blog/what-to-bring-to-a-laundromat",
    description: "Review the complete checklist for bulky items, sorting, detergent, payment, drying, folding, and transporting clean laundry.",
    eyebrow: "Planning to wash a bulky load?",
    cta: "Read the laundromat checklist",
  },
  faqs: [
    { question: "What size washer do I need for a comforter?", answer: "The appropriate washer depends on the comforter's dimensions, fill, weight, and care label. It needs enough drum space to move freely when wet. This directory does not currently contain measured machine capacities, so confirm the available washer sizes directly with the laundromat." },
    { question: "Can I wash a king-size comforter at a laundromat?", answer: "Many laundromats offer larger commercial machines that may accommodate king-size comforters, but suitability depends on the specific comforter and machine. Read the care label and ask the laundromat about machine dimensions, load limits, and any restrictions before washing." },
    { question: "What are large-capacity washers used for?", answer: "Large-capacity washers are commonly used for bulky bedding, blankets, sleeping bags, large household loads, and other washable items that need more drum space. Always follow the item's care label and the machine's posted restrictions." },
    { question: "Are larger washers more expensive?", answer: "Larger commercial washers often cost more per cycle than smaller machines, although one large cycle may replace multiple smaller loads. Review supplied pricing where available and confirm the current machine price at the laundromat." },
    { question: "How do I find laundromats with large washers near me?", answer: "Search this directory by city, ZIP code, neighborhood, or laundromat name. Every included location is explicitly tagged Large Capacity in the structured service data, but machine measurements and availability should be confirmed directly." },
  ],
};

export default function LargeWashersPage({ searchParams }: { searchParams: { q?: string } }) {
  return <ServiceDirectoryPage config={config} searchQuery={searchParams.q || ""}/>;
}
