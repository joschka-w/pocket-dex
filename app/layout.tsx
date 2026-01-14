import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/shared/components/layout/Header';
import NuqsProvider from '@/shared/providers/NuqsProvider';
import TanstackProvider from '@/shared/providers/TanstackProvider';
import { Provider as JotaiProvider } from 'jotai';
import CustomToaster from '@/shared/components/CustomToaster';
import AuthInitializer from '@/features/auth/components/AuthInitializer';

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
      <body
        className={`${inter.className} bg-bg-base text-text flex min-h-screen flex-col items-center antialiased`}
      >
        <TanstackProvider>
          <NuqsProvider>
            <JotaiProvider>
              <AuthInitializer />
              <Header />
              <CustomToaster />
              {children}
            </JotaiProvider>
          </NuqsProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
