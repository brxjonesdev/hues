import { Menu, PaletteIcon, SwatchBook } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '../ui/separator';

export default function Header() {
  return (
    <section className="p-3 lg:px-8 border-b border-white/10  justify-between items-center hidden lg:flex">
      <div>
        <Link
          href="/"
          className="text-3xl font-black font-syne hover:rainbow-hover hover:tracking-wider hover:transition-all hover:duration-800 hover:ease-in-out"
        >
          Hues
        </Link>
      </div>
      <div></div>
    </section>
  );
}
