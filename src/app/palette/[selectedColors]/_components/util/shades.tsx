'use client';

import { Button } from '@/components/ui/button';
import { SwatchBook } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function generateShades(baseColor: string, count: number = 24): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [];

  const shades: string[] = [];
  for (let i = 0; i <= count; i++) {
    const shade = rgb.map((c) => Math.round(c * (1 - i / count))) as [
      number,
      number,
      number,
    ];
    shades.push(rgbToHex(...shade));
  }
  return shades;
}

function generateTints(baseColor: string, count: number = 24): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [];

  const tints: string[] = [];
  for (let i = 0; i <= count; i++) {
    const tint = rgb.map((c) => Math.round(c + (255 - c) * (i / count))) as [
      number,
      number,
      number,
    ];
    tints.push(rgbToHex(...tint));
  }
  return tints;
}

export default function Shades({ color }: { color: string }) {
  const shades = useMemo(() => generateShades(color), [color]);
  const tints = useMemo(() => generateTints(color), [color]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <SwatchBook className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-nunito">
        <DialogHeader>
          <DialogTitle>Color Shades and Tints</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="shades" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="shades" className="w-full">
              Shades
            </TabsTrigger>
            <TabsTrigger value="tints" className="w-full">
              Tint
            </TabsTrigger>
          </TabsList>
          <TabsContent value="shades">
            <ul className="grid grid-cols-5 gap-2">
              {shades.map((shade) => (
                <li
                  key={shade}
                  className="h-16 w-16 rounded-md"
                  style={{ backgroundColor: shade }}
                />
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="tints">
            <ul className="grid grid-cols-5 gap-2">
              {tints.map((tint) => (
                <li
                  key={tint}
                  className="h-16 w-16 rounded-md"
                  style={{ backgroundColor: tint }}
                />
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
