import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/landing/header';

const nunito = Nunito({
  variable: '--font-nunito',
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
        className={`${nunito.variable} antialiased h-dvh max-h-dvh flex flex-col`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
