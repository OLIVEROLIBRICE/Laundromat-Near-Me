import type { Metadata } from "next";
import { ServiceDirectoryPage, type ServiceDirectoryConfig } from "@/components/service-directory-page";

const title = "Laundromats That Take Cards Near Me | Card-Payment Laundry";
const description = "Laundromats That Take Cards Near Me helps you find laundry locations that accept card payments and compare ratings, services and other payment options.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/laundromats-that-take-cards-near-me/" },
  robots: { index: true, follow: true, "max-image-preview": "large", googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { title, description, type: "website", url: "/laundromats-that-take-cards-near-me/", images: [{ url: "/og.png", width: 1730, height: 909, alt: "Laundromats That Take Cards Near Me" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const cardPaymentValues = new Set(["Credit Card", "Credit Cards", "Debit Card", "Debit Cards", "Card Payment"]);

const config: ServiceDirectoryConfig = {
  targetKeyword: "Laundromats That Take Cards Near Me",
  slug: "laundromats-that-take-cards-near-me",
  pageTitle: title,
  metaDescription: description,
  h1: "Laundromats That Take Cards Near Me",
  openingSentence: "Laundromats That Take Cards Near Me helps you find laundry locations that accept card payments.",
  introContent: "Browse qualifying locations by city and compare supplied ratings, addresses, services, payment methods, pricing, phone numbers, websites, and directions where available.",
  directoryNotice: "Every location on this page has explicit structured card-payment data through a card payment value or the directory's card-acceptance field. Payment terminals, supported card types, cashless policies, other payment options, and machine availability can change, so confirm current details directly with the laundromat.",
  listingLabel: "card-payment listings",
  cityHeadingPrefix: "Laundromats That Take Cards in",
  faqHeading: "Card-payment laundromat FAQ",
  emptyHeading: "No matching card-payment listings",
  emptyDescription: "Try another city, ZIP code, neighborhood, or laundromat name.",
  filter: (listing) => listing.acceptsCards === true || listing.paymentMethods.some((method) => cardPaymentValues.has(method)),
  article: {
    title: "What to bring to a laundromat",
    href: "/blog/what-to-bring-to-a-laundromat",
    description: "Use the checklist to plan payment backups, detergent, sorting, stain care, drying, folding, and everything else needed for laundry day.",
    eyebrow: "Planning a card-payment laundry trip?",
    cta: "Read the laundromat checklist",
  },
  faqs: [
    { question: "Do laundromats take credit cards?", answer: "Some laundromats accept credit cards at individual machines, a central payment kiosk, or a reloadable laundry-card station. Every listing on this page has an explicit structured card-payment value or card-acceptance field, but supported cards and terminal availability can change." },
    { question: "Do laundromats accept debit cards?", answer: "Some card-payment systems accept debit cards, but an explicit Credit Card value does not necessarily establish debit-card support. Confirm accepted card types and any authorization requirements directly with the laundromat." },
    { question: "What is a laundry card?", answer: "A laundry card is a reusable stored-value card used to start washers and dryers. Customers usually add funds at a kiosk using one or more supported payment methods. A laundry card is different from paying a machine directly with a bank card." },
    { question: "Are card laundromats cashless?", answer: "Not necessarily. Many card laundromats also accept cash, coins, mobile payments, or a location-specific laundry card. The listing cards display other supplied payment options where available, but current policies should be confirmed before visiting." },
    { question: "How do I find laundromats that take cards near me?", answer: "Search this directory by city, ZIP code, neighborhood, or laundromat name. Included locations have explicit structured card-payment data, and each listing shows other supplied payment methods where available." },
  ],
};

export default function CardPaymentPage({ searchParams }: { searchParams: { q?: string } }) {
  return <ServiceDirectoryPage config={config} searchQuery={searchParams.q || ""}/>;
}
