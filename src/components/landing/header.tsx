import {
  Menu,
  PaletteIcon,
  SwatchBook,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '../ui/separator';

export default function Header() {
  const navLinks = [
    { href: '/visualizer', icon: <SwatchBook />, label: 'Visualizer' },
    { href: '/colors/picker', icon: <PaletteIcon />, label: 'Color Picker' },
  ];
  return (
    <>
      <section className="p-2 lg:px-8 border-b border-white/10  justify-between items-center  hidden lg:flex">
        <div>
          <Link
            href="/"
            className="text-3xl font-black font-syne hover:rainbow-hover"
          >
            Hues
          </Link>
        </div>
        <div>
          <nav className="flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className=" font-medium hover:underline font-nunito w-full"
              >
                <Button
                  variant={'outline'}
                  className="text-sm font-inter font-semibold"
                >
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <section className="p-2 px-8 lg:px-8 border-b border-white/30  justify-between items-center font-nunito lg:hidden flex">
        <div className="">
          <Link href="/" className="text-3xl font-bold tracking-wider">
            Hues
          </Link>
        </div>
        <Sheet>
          <Button asChild variant={'outline'}>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
          </Button>
          <SheetContent>
            <div>
              <h2 className="font-nunito text-3xl font-bold tracking-wider">
                Hues
              </h2>
              <Separator />
            </div>

            <nav className="flex gap-2 flex-col my-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className=" font-medium hover:underline font-nunito w-full"
                >
                  <Button
                    variant={'outline'}
                    className="text-lg w-full"
                    size={'lg'}
                  >
                    {link.icon}
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </section>
    </>
  );
}
