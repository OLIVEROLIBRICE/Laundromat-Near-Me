import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://laundrymatnearme.com"),
  title: "Find Laundromats Near Me | Laundromat Locator",
  description: metaDescription("Find a laundromat near you with searchable local records, city laundry guides, practical cost information, service comparisons, and 24-hour laundromat tips."),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large", googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { title: "Find Laundromats Near Me | Laundromat Locator", description: "Search local laundromat records, city guides, costs, services, and practical laundry tips.", type: "website", url: "/", images: [{ url: "/og.png", width: 1730, height: 909, alt: "Find a Laundromat Near You" }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1340216680351633"
          crossOrigin="anonymous"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CT2040FK0K" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CT2040FK0K');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
