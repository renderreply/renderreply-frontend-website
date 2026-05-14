import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { CookieBanner } from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'RenderReply — Instagram Automation for Creators',
  description: 'Auto-reply to comments, story replies, and DMs on Instagram.',
  icons: {
    icon: [
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon-512.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icon-512.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'RenderReply',
    description: 'Automate your Instagram replies.',
    url: 'https://renderreply.com',
    siteName: 'RenderReply',
    images: [{ url: 'https://renderreply.com/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RenderReply',
    images: ['https://renderreply.com/og-image.png'],
  }
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
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
