/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Visualize from './visualize';
import { Separator } from '@/components/ui/separator';
import ExportPalette from './export';

const generationMethods: {
  title: string;
  method: string;
  description: string;
}[] = [
  {
    title: 'Monocrhomatic',
    method: 'monochromatic',
    description: 'Generate colors based on a single hue.',
  },
  {
    title: 'Analogous',
    method: 'analogous',
    description: 'Generate colors based on adjacent hues.',
  },
  {
    title: 'Complementary',
    method: 'complementary',
    description: 'Generate colors based on opposite hues.',
  },
  {
    title: 'Split Complementary',
    method: 'split-complementary',
    description: 'Generate colors based on two adjacent hues.',
  },
  {
    title: 'Triadic',
    method: 'triadic',
    description: 'Generate colors based on three hues.',
  },
  {
    title: 'Tetradic',
    method: 'tetradic',
    description: 'Generate colors based on four hues.',
  },
  {
    title: 'Square',
    method: 'square',
    description: 'Generate colors based on four equidistant hues.',
  },
  {
    title: 'Shades',
    method: 'shades',
    description: 'Generate colors based on a single hue with varying shades.',
  },
  {
    title: 'Tints',
    method: 'tints',
    description: 'Generate colors based on a single hue with varying tints.',
  },
  {
    title: 'Tones',
    method: 'tones',
    description: 'Generate colors based on a single hue with varying tones.',
  },
];

// 7. Visualize menu
// - View Color Palette with color data
// - View different color blindness simulations

// 8. Export Menu
// - Export to CSS, SCSS, Tailwind, URL

// -> Generation Methods

export function ColorNavMenu({ colors }: { colors: string }) {
  return (
    <NavigationMenu className="py-2 border-none font-inter">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:tracking-wide transition-all duration-300 ease-in-out">
            Generation Methods
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex h-full w-full select-none flex-col justify-end rounded-md  p-6 no-underline outline-none focus:shadow-md bg-black/80 text-white">
                    <div className="mb-2 mt-4 text-md font-medium">
                      Generation Settings
                    </div>
                    <p className="text-xs leading-tight text-muted-foreground text-white">
                      Generate colors using various methods and theories.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem title="Random" href={`?`}>
                Generate colors randomly.
              </ListItem>
              {generationMethods.map((item) => {
                return (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={`?generation=${item.method}`}
                  >
                    {item.description}
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} hover:tracking-wide transition-all duration-300 ease-in-out`}
              >
                Visualize
              </NavigationMenuLink>
            </DialogTrigger>
            <DialogContent className="font-inter w-full max-w-xl px-4 mx-4">
              <DialogHeader>
                <DialogTitle>View your Palette</DialogTitle>
              </DialogHeader>
              <Separator />
              <Visualize />
            </DialogContent>
          </Dialog>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} hover:tracking-wide transition-all duration-300 ease-in-out`}
              >
                Export
              </NavigationMenuLink>
            </DialogTrigger>
            <DialogContent className="font-inter">
              <DialogHeader>
                <DialogTitle>Export Your Palette</DialogTitle>
                <DialogDescription>
                  Export your palette to CSS, SCSS, Tailwind, or a URL.
                </DialogDescription>
              </DialogHeader>
              <ExportPalette />
            </DialogContent>
          </Dialog>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string;
    children: React.ReactNode;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-0.5 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-tight">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
