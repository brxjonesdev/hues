import {  GlassesIcon, ImageUpIcon, LibraryIcon, Menu, PaletteIcon, SwatchBook } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '../ui/separator';


export default function Header() {
  const navLinks = [
    { href: "/colors/library", icon: <LibraryIcon />, label: "Library" },
    { href: "/visualizer", icon: <SwatchBook />, label: "Visualizer" },
    { href: "/colors/picker", icon: <PaletteIcon />, label: "Color Picker" },
    { href: "/image-extract", icon: <ImageUpIcon />, label: "Image to Palette" },
    { href: "/colors/contrast", icon: <GlassesIcon />, label: "Accessibility" },
  ];
  return (
    <>
    <section className="p-2 lg:px-8 border-b border-gray-200  justify-between items-center font-nunito hidden lg:flex">
      <div>
        <Link href="/" className="text-2xl font-bold tracking-wider">
          Hues
        </Link>
      </div>
      <div>
        <nav className="flex gap-2 ">
          <Link
            href="/colors/library"
            className="text-sm font-medium hover:underline"
          >
            <Button  variant={"outline"}>
            <LibraryIcon/>
            Library
            </Button>
          </Link>
          <Link
          href="/visualizer"
          >
            <Button variant={"outline"}> 
              <SwatchBook/>
              Visualizer
            </Button>
          </Link>
          <Link
            href="/colors/picker"
            className="text-sm font-medium hover:underline"
          >
          <Button variant={"outline"}>
            <PaletteIcon/>
            Color Picker
          </Button>
          </Link>
          <Link
            href="/image-extract"
            className="text-sm font-medium hover:underline"
          >
            <Button variant={"outline"}>
            <ImageUpIcon/>
            Image to Palette
            </Button>
          </Link>
          <Link
            href="/colors/contrast"
            className="text-sm font-medium hover:underline"
          >
            <Button  variant={"outline"}>
              <GlassesIcon/>
              Accessibility
            </Button>
          </Link>
        </nav>
      </div>
    </section>
    <section className="p-2 px-8 lg:px-8 border-b border-gray-200  justify-between items-center font-nunito lg:hidden flex">
    <div className=''>
        <Link href="/" className="text-3xl font-bold tracking-wider">
          Hues
        </Link>
      </div>
    <Sheet>
      <Button asChild  variant={"outline"}>
  <SheetTrigger>
    <Menu/></SheetTrigger></Button>
  <SheetContent>
   <div>
    <h2 className='font-nunito text-3xl font-bold tracking-wider'>
      Hues
    </h2>
    <Separator/>
   </div>
  
    <nav className="flex gap-2 flex-col my-4">
      {navLinks.map((link) => (
      <Link key={link.href} href={link.href} className=" font-medium hover:underline font-nunito w-full">
        <Button variant={"outline"} className='text-lg w-full' size={"lg"}>
        {link.icon}
        {link.label}
        </Button>
      </Link>
      ))}
    </nav>
  </SheetContent>
</Sheet>

    </section>
  </>);
}
