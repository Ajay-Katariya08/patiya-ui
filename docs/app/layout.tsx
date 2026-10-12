import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "patiya/styles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://patiya-ui.vercel.app'),
  applicationName: 'Patiya UI',
  title: {
    default: 'Patiya UI - Free Open-Source React & Tailwind CSS Component Library',
    template: '%s | Patiya UI',
  },
  description: 'Beautiful, accessible React components built with Tailwind CSS. 50+ free copy-paste components including buttons, modals, sliders, carousels, shimmer effects & more. Dark mode, fully customizable.',
  keywords: ['patiya', 'pittaya', 'patia', 'patia ui', 'patiya ui', 'tailwind component library', 'react component library', 'tailwind css components', 'react ui library', 'tailwind ui', 'open source components', 'react tailwind', 'free ui components'],
  authors: [{ name: 'Ajay Katariya', url: 'https://ajaykatariyadev.vercel.app' }],
  creator: 'Ajay Katariya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://patiya-ui.vercel.app',
    siteName: 'Patiya UI',
    title: 'Patiya UI - Free Open-Source React & Tailwind CSS Component Library',
    description: 'Beautiful, accessible React components built with Tailwind CSS. 50+ free copy-paste components including buttons, modals, sliders, carousels & more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patiya UI - Free React & Tailwind CSS Components',
    description: '50+ beautiful, accessible React components. Copy-paste ready. Dark mode. Fully customizable.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Patiya UI',
      alternateName: ['Patiya', 'Patia UI', 'Pittaya', 'Patia'],
      url: 'https://patiya-ui.vercel.app',
      image: 'https://patiya-ui.vercel.app/icon.svg',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Patiya UI',
      url: 'https://patiya-ui.vercel.app',
      description: 'Free open-source React & Tailwind CSS component library with 50+ accessible components',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        '@type': 'Person',
        name: 'Ajay Katariya',
        url: 'https://ajaykatariyadev.vercel.app',
      },
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
