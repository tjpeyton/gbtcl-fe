import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import TopNav from '@/components/TopNav';
import WalletContextProvider from '@/context/WalleContext';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Global Bitcoin Lottery',
  description: 'none needed',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          <TopNav/>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
