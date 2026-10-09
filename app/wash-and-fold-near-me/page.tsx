import type { Metadata } from "next";
import { ServiceDirectoryPage, type ServiceDirectoryConfig } from "@/components/service-directory-page";

const title = "Wash and Fold Near Me | Find Local Drop-Off Laundry";
const description = "Wash and Fold Near Me helps you find local drop-off laundry services by city and compare ratings, locations, services and supplied pricing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/wash-and-fold-near-me/" },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/wash-and-fold-near-me/",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Wash and Fold Near Me" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const config: ServiceDirectoryConfig = {
  targetKeyword: "Wash and Fold Near Me",
  slug: "wash-and-fold-near-me",
  pageTitle: title,
  metaDescription: description,
  h1: "Wash and Fold Near Me",
  openingSentence: "Wash and Fold Near Me helps you find laundromats offering drop-off wash, dry and fold service.",
  introContent: "Browse qualifying locations by city and compare supplied ratings, addresses, services, payment options, pricing, phone numbers, websites, and directions where those details are available.",
  directoryNotice: "Every location on this page is explicitly identified with Wash & Fold in the directory's structured service data. Service availability, turnaround time, accepted items, detergent options, and pricing can change, so confirm current details directly with the business before dropping off laundry.",
  listingLabel: "wash-and-fold listings",
  cityHeadingPrefix: "Wash and Fold in",
  faqHeading: "Wash-and-fold laundry FAQ",
  emptyHeading: "No matching wash-and-fold listings",
  emptyDescription: "Try another city, ZIP code, neighborhood, or laundromat name.",
  filter: (listing) => listing.services.includes("Wash & Fold"),
  article: {
    title: "Laundromat vs. laundry service: which costs less?",
    href: "/blog/laundromat-vs-laundry-service-cost",
    description: "Compare self-service costs with wash-and-fold and pickup options, including how per-pound pricing, order minimums, turnaround times, and convenience affect the total.",
    eyebrow: "Comparing drop-off laundry options?",
    cta: "Read the laundry service cost guide",
  },
  faqs: [
    {
      question: "What is wash and fold laundry?",
      answer: "Wash-and-fold laundry is a drop-off service where staff wash, dry, and fold everyday clothing and household laundry for you. Businesses may price the service by weight, by bag, or with a minimum order, and special-care items may require a different service.",
    },
    {
      question: "How much does wash and fold cost?",
      answer: "Wash-and-fold pricing varies by city, order weight, turnaround time, and requested care. Many businesses charge by the pound and may apply a minimum order or separate fees for bulky items. Review supplied pricing on each listing when available and confirm the current total directly with the business.",
    },
    {
      question: "Do I need to provide detergent?",
      answer: "Usually not. Many wash-and-fold services include standard detergent, but fragrance-free, hypoallergenic, or customer-supplied products may be available by request. Ask the business how it handles detergent preferences before leaving your order.",
    },
    {
      question: "How long does wash and fold take?",
      answer: "Turnaround can range from same-day service to several days depending on order size, staffing, and local demand. Same-day service may require an early drop-off or an additional fee, so confirm the promised pickup time with the business.",
    },
    {
      question: "How do I find wash and fold near me?",
      answer: "Search this directory by city, ZIP code, neighborhood, or laundromat name. Every included location has Wash & Fold in its structured service data, and the listing cards show available contact, rating, payment, pricing, website, and directions information.",
    },
  ],
};

export default function WashAndFoldPage({ searchParams }: { searchParams: { q?: string } }) {
  return <ServiceDirectoryPage config={config} searchQuery={searchParams.q || ""}/>;
}
