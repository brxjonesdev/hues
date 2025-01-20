'use client';
import * as React from 'react';
import {
  NavigationMenuLink,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shade } from './variation-views';

export default function Variations() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()} hover:tracking-wide transition-all duration-300 ease-in-out`}
        >
          Variations
        </NavigationMenuLink>
      </DialogTrigger>
      <DialogContent className="font-syne w-fit ">
        <DialogHeader>
          <DialogTitle>View Palette Variations</DialogTitle>
          <DialogDescription className="font-inter">
            View different variations of the current palette based on shade,
            satutation, hue, luminance, and more.
            {/* Full List:
                  - Shade
                  - Saturation
                  - Hue
                  - Luminance
                    - Temperature
                    - Color Blindness
                    - Theme
                  */}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="shade" className="w-full">
          <TabsList className="w-full flex font-inter ">
            <TabsTrigger value="shade" className="w-full">
              Shade
            </TabsTrigger>
            <TabsTrigger value="saturation" className="w-full">
              Saturation
            </TabsTrigger>
            <TabsTrigger value="hue" className="w-full">
              Hue
            </TabsTrigger>
            <TabsTrigger value="luminance" className="w-full">
              Luminance
            </TabsTrigger>
            <TabsTrigger value="temperature" className="w-full">
              Temperature
            </TabsTrigger>
            <TabsTrigger value="colorBlindness" className="w-full">
              Blindness
            </TabsTrigger>
          </TabsList>
          <TabsContent value="shade">
            <Shade />
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
