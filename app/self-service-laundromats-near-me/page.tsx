import type { Metadata } from "next";
import { ServiceDirectoryPage, type ServiceDirectoryConfig } from "@/components/service-directory-page";

const title = "Self-Service Laundromats Near Me | Find Local Laundry Locations";
const description = "Self-Service Laundromats Near Me helps you find local locations where you can wash and dry your own clothes using commercial laundry machines.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/self-service-laundromats-near-me/" },
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
    url: "/self-service-laundromats-near-me/",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Self-Service Laundromats Near Me" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const config: ServiceDirectoryConfig = {
  targetKeyword: "Self-Service Laundromats Near Me",
  slug: "self-service-laundromats-near-me",
  pageTitle: title,
  metaDescription: description,
  h1: "Self-Service Laundromats Near Me",
  openingSentence: "Self-Service Laundromats Near Me helps you find locations where you can wash and dry your own clothes.",
  introContent: "Browse qualifying locations by city and compare supplied ratings, addresses, services, payment options, pricing, phone numbers, websites, and directions where those details are available.",
  directoryNotice: "Every location on this page is explicitly tagged Self-Service in the directory's structured service data. Machine availability, business hours, payment methods, services, and pricing can change, so confirm current details directly with the laundromat before visiting.",
  listingLabel: "self-service listings",
  cityHeadingPrefix: "Self-Service Laundromats in",
  faqHeading: "Self-service laundromat FAQ",
  emptyHeading: "No matching self-service listings",
  emptyDescription: "Try another city, ZIP code, neighborhood, or laundromat name.",
  filter: (listing) => listing.services.includes("Self-Service"),
  article: {
    title: "What to bring to a laundromat",
    href: "/blog/what-to-bring-to-a-laundromat",
    description: "Use the complete checklist to plan for detergent, payments, stain care, sorting, machine sizes, drying, folding, and bulky laundry before visiting a self-service location.",
    eyebrow: "Preparing for a self-service laundry trip?",
    cta: "Read the laundromat checklist",
  },
  faqs: [
    {
      question: "What is a self-service laundromat?",
      answer: "A self-service laundromat is a laundry facility where customers use commercial washing machines and dryers themselves. Customers choose the machines and cycles, provide or purchase laundry products, pay for each cycle, move clothing between machines, and collect the finished laundry.",
    },
    {
      question: "How does self-service laundry work?",
      answer: "Sort your laundry, choose an appropriately sized washer, add detergent according to the machine instructions, select a cycle, and pay using an accepted method. When washing finishes, move the load to a suitable dryer, select the heat level, pay for drying time, and remove all items promptly.",
    },
    {
      question: "What should I bring?",
      answer: "Bring sorted laundry, detergent, any stain treatment or fabric products you use, a bag or basket for clean clothes, and an accepted payment method. Coins or a backup payment option can help when a card reader, payment app, or change machine is unavailable.",
    },
    {
      question: "How much does self-service laundry cost?",
      answer: "The total depends on the city, washer capacity, cycle settings, dryer time, number of loads, and laundry products. Larger commercial machines generally cost more per cycle but may replace several smaller loads. Review supplied pricing where available and confirm current machine prices at the location.",
    },
    {
      question: "How do I find self-service laundromats near me?",
      answer: "Search this directory by city, ZIP code, neighborhood, or laundromat name. Every included location is explicitly tagged Self-Service in the structured service data, and each card displays the supplied location, rating, services, payment, pricing, website, phone, and directions information.",
    },
  ],
};

export default function SelfServiceLaundromatsPage({ searchParams }: { searchParams: { q?: string } }) {
  return <ServiceDirectoryPage config={config} searchQuery={searchParams.q || ""}/>;
}
