import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider as JotaiProvider } from 'jotai';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/shared/components/layout/Header';
import NuqsProvider from '@/shared/providers/NuqsProvider';
import TanstackProvider from '@/shared/providers/TanstackProvider';
import CustomToaster from '@/shared/components/CustomToaster';
import AuthInitializer from '@/features/auth/components/AuthInitializer';
import Footer from '@/shared/components/footer/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: { default: 'PocketDex', template: '%s | PocketDex' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>PocketDex</title>
      </head>

      <body
        className={`${inter.className} bg-bg-base text-text flex min-h-screen flex-col items-center antialiased`}
      >
        <TanstackProvider>
          <NuqsProvider>
            <JotaiProvider>
              <AuthInitializer />
              <CustomToaster />
              <SpeedInsights />
              <Header />
              {children}
              <Footer />
            </JotaiProvider>
          </NuqsProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
