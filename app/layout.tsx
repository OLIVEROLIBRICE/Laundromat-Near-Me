import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://laundrymatnearme.com"),
  title: "Find Laundromats Near Me | Laundromat Locator",
  description: metaDescription("Find clean, highly rated laundromats near you. Compare hours, prices, amenities, payment options, and reviews in cities across the United States."),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large", googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { title: "Find Laundromats Near Me | Laundromat Locator", description: "Compare nearby laundromats by hours, amenities, pricing, and reviews.", type: "website", url: "/", images: [{ url: "/og.png", width: 1730, height: 909, alt: "Find a Laundromat Near You" }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="font-sans antialiased">{children}</body></html>;
}
