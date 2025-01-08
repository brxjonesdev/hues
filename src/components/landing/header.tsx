import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  return (
    <section className="p-2 lg:px-8 border-b border-gray-200 flex justify-between items-center font-nunito">
      <div>
        <p className="text-2xl font-bold tracking-wider">Hues</p>
      </div>
      <div>
        <nav className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="font-nunito text-sm">
              Tools
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Hues Tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Color Library</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Palette Collage</DropdownMenuItem>
              <DropdownMenuItem>Color Picker</DropdownMenuItem>
              <DropdownMenuItem>Quick Gradient</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/explore" className="text-sm font-medium hover:underline">
            Explore
          </Link>
        </nav>
      </div>
    </section>
  );
}
