'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const generateItems: { title: string; href: string; description: string }[] = [
  {
    title: 'Image',
    href: '/generate/image',
    description: 'Generate colors from an image.',
  },
  {
    title: 'Color Theory',
    href: '/generate/color-theory',
    description: 'Generate colors based on color theory principles.',
  },
];

const variationItems: { title: string; href: string; description: string }[] = [
  {
    title: 'Shade',
    href: '/variations/shade',
    description: 'Show variations in shade.',
  },
  {
    title: 'Saturation',
    href: '/variations/saturation',
    description: 'Show variations in saturation.',
  },
  {
    title: 'Hue',
    href: '/variations/hue',
    description: 'Show variations in hue.',
  },
  {
    title: 'Temperature',
    href: '/variations/temperature',
    description: 'Show variations in color temperature.',
  },
  {
    title: 'Blindness',
    href: '/variations/blindness',
    description: 'Show variations for different types of color blindness.',
  },
  {
    title: 'Luminance',
    href: '/variations/luminance',
    description: 'Show variations in luminance.',
  },
  {
    title: 'Theme',
    href: '/variations/theme',
    description: 'Show variations in theme.',
  },
];

const accessibilityItems: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: 'Color Blindness',
    href: '/accessibility/color-blindness',
    description: 'Check accessibility for color blindness.',
  },
  {
    title: 'Contrast',
    href: '/accessibility/contrast',
    description: 'Check color contrast for accessibility.',
  },
];

const saveItems: { title: string; href: string; description: string }[] = [
  {
    title: 'Save to URL',
    href: '/save/url',
    description: 'Save your color palette to Link URL.',
  },
  {
    title: 'Save to Local Storage',
    href: '/save/local-storage',
    description: 'Save your color palette to local storage.',
  },
];

export function ColorNavMenu() {
  return (
    <NavigationMenu className="py-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Save</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {saveItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Generate by</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Color Generation
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Generate colors using various methods and theories.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {generateItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Show Variations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-1 lg:w-[400px]">
              {variationItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Accessibility</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {accessibilityItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/visualizer" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Visualizer
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/import" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Import
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/export" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Export
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/share" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Share
            </NavigationMenuLink>
          </Link>
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
