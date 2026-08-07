import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enterprise.accredian.com"),
  title: "Accredian Enterprise | Next-Gen Capability Building & Corporate Upskilling",
  description:
    "Co-created executive learning programs in Generative AI, Data Science, and Leadership for Global Fortune 500 enterprises. Transform your organization with Accredian.",
  keywords: [
    "Accredian Enterprise",
    "Corporate Upskilling",
    "Executive Education",
    "Generative AI Training",
    "Data Science Enterprise",
    "Leadership Transformation",
    "CAT Framework",
    "Skill Gap Analysis",
  ],
  authors: [{ name: "Accredian Enterprise Team" }],
  creator: "Accredian",
  publisher: "Accredian",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enterprise.accredian.com",
    siteName: "Accredian Enterprise",
    title: "Next-Gen Expertise For Your Enterprise | Accredian",
    description:
      "Cultivate high-performance teams through co-created executive learning in Generative AI, Data Science, and Leadership.",
    images: [
      {
        url: "https://enterprise.accredian.com/og-enterprise.png",
        width: 1200,
        height: 630,
        alt: "Accredian Enterprise Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accredian Enterprise | Corporate Capability Building",
    description:
      "Cultivate high-performance teams through co-created executive learning in Generative AI, Data Science, and Leadership.",
    creator: "@accredian",
    images: ["https://enterprise.accredian.com/og-enterprise.png"],
  },
  alternates: {
    canonical: "https://enterprise.accredian.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Accredian Enterprise",
  url: "https://enterprise.accredian.com",
  logo: "https://enterprise.accredian.com/logo.png",
  description:
    "Provider of co-created executive capability building programs in Generative AI, Tech & Data, and Strategic Leadership.",
  sameAs: [
    "https://twitter.com/accredian",
    "https://linkedin.com/company/accredian",
  ],
  offers: {
    "@type": "Offer",
    category: "Corporate Executive Education",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
