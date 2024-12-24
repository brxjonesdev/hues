import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../globals.css';
import Header from '@/components/shared/header';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Palettr',
  description:
    'Palettr is a tool to help you plan your themes and colors for your app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased h-dvh flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
