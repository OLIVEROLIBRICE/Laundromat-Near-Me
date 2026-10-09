import type { Metadata } from "next";
import { ServiceDirectoryPage, type ServiceDirectoryConfig } from "@/components/service-directory-page";

const title = "24 Hour Laundromats Near Me | Find 24/7 Laundry Locations";
const description = "24 Hour Laundromats Near Me helps you browse 24/7 laundry locations by city and compare ratings, addresses, services, payment options and available business details.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/24-hour-laundromats-near-me/" },
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
    url: "/24-hour-laundromats-near-me/",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "24 Hour Laundromats Near Me" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const config: ServiceDirectoryConfig = {
  targetKeyword: "24 Hour Laundromats Near Me",
  slug: "24-hour-laundromats-near-me",
  pageTitle: title,
  metaDescription: description,
  h1: "24 Hour Laundromats Near Me",
  openingSentence: "24 Hour Laundromats Near Me helps you find 24/7 laundry locations organized by city.",
  introContent: "Browse the city groups below to compare supplied ratings, addresses, services, payment options, pricing, phone numbers, websites, and directions where those details are available.",
  directoryNotice: "Listings on this page are identified in the directory as operating 24 hours. Business hours can change, including for holidays, maintenance, or overnight access, so confirm current operating hours directly with the business before visiting.",
  listingLabel: "24-hour listings",
  cityHeadingPrefix: "24 Hour Laundromats in",
  faqHeading: "24-hour laundromat FAQ",
  emptyHeading: "No matching 24-hour listings",
  emptyDescription: "Try another city, ZIP code, neighborhood, or laundromat name.",
  filter: (listing) => listing.is24Hours,
  article: {
    title: "How to find a 24-hour laundromat quickly",
    href: "/blog/laundromats-near-me-open-24-hours",
    description: "Use the guide to check overnight access, payment options, safety considerations, machine availability, and the details worth confirming before you leave.",
    eyebrow: "Planning an overnight laundry trip?",
    cta: "Read the 24-hour laundromat guide",
  },
  faqs: [
    {
      question: "Are 24-hour laundromats open all night?",
      answer: "A laundromat identified as open 24 hours is generally intended to remain accessible throughout the night. Holiday schedules, cleaning, maintenance, last-wash rules, and temporary access restrictions can still affect availability, so confirm current hours before traveling.",
    },
    {
      question: "How do I find a 24-hour laundromat near me?",
      answer: "Use the search field on this page to enter a city, ZIP code, neighborhood, or laundromat name. You can also browse the city links and compare the supplied address, rating, services, payment methods, contact details, and directions for each matching location.",
    },
    {
      question: "Are 24-hour laundromats attended overnight?",
      answer: "Not always. Some 24-hour laundromats have an attendant during every shift, while others are unattended or attended only during part of the day. Contact the business if overnight staffing is important to your visit.",
    },
    {
      question: "Do 24-hour laundromats take cards?",
      answer: "Payment methods vary by business. Some accept credit or debit cards, laundry cards, or mobile payments, while others remain coin or cash only. Review the supplied payment tags on each card and confirm with the business when needed.",
    },
    {
      question: "How should I confirm that a laundromat is currently open 24 hours?",
      answer: "Check the business website when one is supplied, call the posted phone number, and review recent business updates before leaving. Confirm holiday hours, overnight door access, and any last-wash cutoff that could limit service even when the location is listed as open 24 hours.",
    },
  ],
};

export default function TwentyFourHourLaundromatsPage({ searchParams }: { searchParams: { q?: string } }) {
  return <ServiceDirectoryPage config={config} searchQuery={searchParams.q || ""}/>;
}
