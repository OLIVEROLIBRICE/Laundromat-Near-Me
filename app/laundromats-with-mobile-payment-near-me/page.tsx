import type { Metadata } from "next";
import { ServiceDirectoryPage, type ServiceDirectoryConfig } from "@/components/service-directory-page";

const title = "Laundromats With Mobile Payment Near Me | Find Cashless Laundry";
const description = "Laundromats With Mobile Payment Near Me helps you find laundry locations that support mobile or app-based payment options.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/laundromats-with-mobile-payment-near-me/" },
  robots: { index: true, follow: true, "max-image-preview": "large", googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { title, description, type: "website", url: "/laundromats-with-mobile-payment-near-me/", images: [{ url: "/og.png", width: 1730, height: 909, alt: "Laundromats With Mobile Payment Near Me" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const mobilePaymentValues = new Set(["Mobile Payment", "Mobile App"]);

const config: ServiceDirectoryConfig = {
  targetKeyword: "Laundromats With Mobile Payment Near Me",
  slug: "laundromats-with-mobile-payment-near-me",
  pageTitle: title,
  metaDescription: description,
  h1: "Laundromats With Mobile Payment Near Me",
  openingSentence: "Laundromats With Mobile Payment Near Me helps you find laundry locations that support mobile or app-based payments.",
  introContent: "Browse explicitly tagged locations by city and compare supplied ratings, addresses, services, payment methods, pricing, phone numbers, websites, and directions where available.",
  directoryNotice: "Every location on this page has Mobile Payment or Mobile App in its structured payment data. The current records do not identify a specific payment platform, so confirm the required app, account setup, device compatibility, current availability, and alternative payment options directly with the laundromat.",
  listingLabel: "mobile-payment listings",
  cityHeadingPrefix: "Laundromats With Mobile Payment in",
  faqHeading: "Mobile-payment laundromat FAQ",
  emptyHeading: "No matching mobile-payment listings",
  emptyDescription: "Try another city, ZIP code, neighborhood, or laundromat name.",
  filter: (listing) => listing.paymentMethods.some((method) => mobilePaymentValues.has(method)),
  article: {
    title: "What to bring to a laundromat",
    href: "/blog/what-to-bring-to-a-laundromat",
    description: "Prepare your payment method before arrival and use the checklist for detergent, sorting, stain care, drying, folding, and backup supplies.",
    eyebrow: "Planning a mobile-payment laundry trip?",
    cta: "Read the laundromat checklist",
  },
  faqs: [
    { question: "How do mobile payments work at a laundromat?", answer: "A mobile-payment laundromat may use an app or mobile-enabled system to fund and start compatible machines. Setup, account requirements, machine pairing, and supported devices vary. The current data does not identify a specific platform, so confirm the process with the business." },
    { question: "Do I need to download an app before visiting?", answer: "Possibly. Some systems require an app and account, while others may use a different mobile-payment process. The structured records only identify Mobile App or Mobile Payment, so contact the laundromat for current setup instructions." },
    { question: "Can I still use cash or a card?", answer: "Many mobile-payment locations also list cash or credit-card options. Review the payment tags on each listing card and confirm that the preferred option works on the machines you plan to use." },
    { question: "Are mobile-payment laundromats cashless?", answer: "Not necessarily. Mobile payment can be one option among several and does not establish a cashless policy. Other explicitly supplied payment methods are displayed on each listing card where available." },
    { question: "How do I find laundromats with mobile payment near me?", answer: "Search this directory by city, ZIP code, neighborhood, or laundromat name. Every included listing has Mobile Payment or Mobile App in its structured payment data, without assumptions about a particular payment brand." },
  ],
};

export default function MobilePaymentPage({ searchParams }: { searchParams: { q?: string } }) {
  return <ServiceDirectoryPage config={config} searchQuery={searchParams.q || ""}/>;
}
