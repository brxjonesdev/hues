import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <section className="p-2 lg:px-8 border-b border-gray-200 flex justify-between items-center font-nunito">
      <div>
        <Link href="/" className="text-2xl font-bold tracking-wider">
          Hues
        </Link>
      </div>
      <div>
        <nav className="flex gap-6 ">
          <Link
            href="/colors/library"
            className="text-sm font-medium hover:underline"
          >
            Library
          </Link>
          <Link
            href="/colors/picker"
            className="text-sm font-medium hover:underline"
          >
            Picker
          </Link>
          <Link
            href="/colors/gradients"
            className="text-sm font-medium hover:underline"
          >
            Gradients
          </Link>
          <Link
            href="/image-extract"
            className="text-sm font-medium hover:underline"
          >
            Image {'->'} Palette
          </Link>
          <Link
            href="/colors/contrast"
            className="text-sm font-medium hover:underline"
          >
            Accessibility
          </Link>
          <Link
            href="/shadcn/default"
            className="text-sm font-medium hover:underline"
          >
            ShadCN Themes
          </Link>
        </nav>
      </div>
    </section>
  );
}
