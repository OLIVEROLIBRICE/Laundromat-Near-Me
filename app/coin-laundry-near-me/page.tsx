import type { Metadata } from "next";
import { ServiceDirectoryPage, type ServiceDirectoryConfig } from "@/components/service-directory-page";

const title = "Coin Laundry Near Me | Find Coin-Operated Laundromats";
const description = "Coin Laundry Near Me helps you find coin-operated laundromats by city and compare ratings, locations, hours, services and available payment details.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/coin-laundry-near-me/" },
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
    url: "/coin-laundry-near-me/",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Coin Laundry Near Me" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const config: ServiceDirectoryConfig = {
  targetKeyword: "Coin Laundry Near Me",
  slug: "coin-laundry-near-me",
  pageTitle: title,
  metaDescription: description,
  h1: "Coin Laundry Near Me",
  openingSentence: "Coin Laundry Near Me helps you find coin-operated laundromats organized by city.",
  introContent: "Browse qualifying locations below and compare supplied ratings, addresses, operating details, services, payment methods, pricing, phone numbers, websites, and directions where those details are available.",
  directoryNotice: "Every location on this page is explicitly tagged Coin-Operated in the directory's structured service data. Coin availability, change machines, accepted denominations, other payment methods, business hours, and pricing can change, so confirm current details directly with the business before visiting.",
  listingLabel: "coin-operated listings",
  cityHeadingPrefix: "Coin Laundry in",
  faqHeading: "Coin laundry FAQ",
  emptyHeading: "No matching coin-operated listings",
  emptyDescription: "Try another city, ZIP code, neighborhood, or laundromat name.",
  filter: (listing) => listing.services.includes("Coin-Operated"),
  article: {
    title: "What to bring to a laundromat",
    href: "/blog/what-to-bring-to-a-laundromat",
    description: "Use the complete checklist to plan for coins, backup payment methods, detergent, stain treatment, sorting, drying, folding, and bulky laundry.",
    eyebrow: "Planning a coin laundry visit?",
    cta: "Read the laundromat checklist",
  },
  faqs: [
    {
      question: "How does coin laundry work?",
      answer: "At a coin laundry, customers load a commercial washer or dryer, choose a cycle, insert the required coins, and start the machine. The exact controls, prices, accepted coins, and availability of a change machine vary by location, so review posted instructions before paying.",
    },
    {
      question: "How many quarters should I bring?",
      answer: "The number of quarters depends on local prices, machine size, dryer time, and the number of loads. Bring enough for the expected wash and dry cycles plus a small reserve, and check supplied pricing on the listing when available. Confirm current machine prices at the laundromat.",
    },
    {
      question: "Do coin laundromats also take cards?",
      answer: "Some do. A laundromat can operate coin machines while also accepting credit cards, debit cards, laundry cards, or mobile payments on some equipment. Listing cards show other supplied payment methods where available, but payment systems can change.",
    },
    {
      question: "Are coin laundromats cheaper?",
      answer: "Coin operation does not automatically make a laundromat cheaper. Prices depend on machine capacity, utilities, neighborhood costs, equipment, and cycle options. Compare the supplied pricing and machine sizes, then confirm current rates before starting a load.",
    },
    {
      question: "How do I find coin laundry near me?",
      answer: "Search this directory by city, ZIP code, neighborhood, or laundromat name. Every included location is explicitly tagged Coin-Operated in the structured service data, and each card shows the available location, rating, services, payment, pricing, website, phone, and directions information.",
    },
  ],
};

export default function CoinLaundryPage({ searchParams }: { searchParams: { q?: string } }) {
  return <ServiceDirectoryPage config={config} searchQuery={searchParams.q || ""}/>;
}
