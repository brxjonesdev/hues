import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/landing/header';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hues',
  description:
    'Hues is a tool to help you plan your themes and colors for your app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${inter.variable} antialiased h-dvh max-h-dvh flex flex-col`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
