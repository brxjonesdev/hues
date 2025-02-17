/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Logo from '@/lib/blusuede.png';

export default function Header() {
  return (
    <section className="p-3 lg:px-8 border-b border-white/10  justify-between items-center flex">
      <div>
        <Link
          href="/"
          className="text-3xl font-black font-syne hover:rainbow-hover hover:tracking-wider hover:transition-all hover:duration-800 hover:ease-in-out"
        >
          Hues
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-syne text-md">Made by</p>
        <a href="https://portfolio.braxtonjones.dev/">
          <img
          alt='Braxton Jones Logo'
            className="aspect-square h-8 w-8 hover:rainbow-bg p-0.5 rounded-full cursor-pointer"
            src={Logo.src}
          />
        </a>
      </div>
    </section>
  );
}
