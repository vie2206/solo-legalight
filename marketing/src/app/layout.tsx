import { DM_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';

import type { Metadata } from 'next';

import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const dmSans = localFont({
  src: [
    {
      path: '../../fonts/dm-sans/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/dm-sans/DMSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../fonts/dm-sans/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/dm-sans/DMSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../fonts/dm-sans/DMSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../fonts/dm-sans/DMSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'SOLO by Legalight - AI-Powered CLAT Preparation Platform',
    template: '%s | SOLO by Legalight',
  },
  description:
    "Transform your CLAT preparation with SOLO - India's first AI-powered performance analytics platform. Get personalized insights, predictive rank analysis, and join India's smartest study community.",
  keywords: [
    'CLAT',
    'Law Entrance',
    'AI Study Planner',
    'Rank Predictor',
    'CLAT Preparation',
    'Mock Tests',
    'Legal Education',
    'Law School',
    'Performance Analytics',
    'Legalight',
  ],
  authors: [{ name: 'Legalight Team' }],
  creator: 'Legalight',
  publisher: 'Legalight',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: 'SOLO by Legalight - AI-Powered CLAT Preparation Platform',
    description:
      "Transform your CLAT preparation with SOLO - India's first AI-powered performance analytics platform. Get personalized insights, predictive rank analysis, and join India's smartest study community.",
    siteName: 'SOLO by Legalight',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SOLO by Legalight - AI-Powered CLAT Preparation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLO by Legalight - AI-Powered CLAT Preparation Platform',
    description:
      "Transform your CLAT preparation with SOLO - India's first AI-powered performance analytics platform. Get personalized insights, predictive rank analysis, and join India's smartest study community.",
    images: ['/og-image.jpg'],
    creator: '@legalight',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`h-screen ${dmSans.variable} ${dmMono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
