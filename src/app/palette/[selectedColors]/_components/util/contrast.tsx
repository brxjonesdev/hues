'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Contrast } from 'lucide-react';
import Link from 'next/link';

function calculateContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const [rSRGB, gSRGB, bSRGB] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rSRGB + 0.7152 * gSRGB + 0.0722 * bSRGB;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return parseFloat(ratio.toFixed(2));
}

function getContrastLevel(ratio: number): string {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA (Large Text)';
  return 'Fail';
}

export default function ContrastCheck({ color }: { color: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const baseColor = color;
  const whiteContrast = calculateContrastRatio(baseColor, '#FFFFFF');
  const blackContrast = calculateContrastRatio(baseColor, '#000000');

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full"
        >
          <Contrast className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit p-2 space-y-2 font-nunito"
        side="top"
        align="center"
      >
        <div className="grid grid-cols-2 gap-2 rounded ">
          <div
            className="rounded-lg text-center"
            style={{
              backgroundColor: baseColor,
              color: 'white',
              padding: '0.5rem',
              fontSize: '0.75rem',
            }}
          >
            <span>White / </span>
            <span className="font-mono text-sm">{whiteContrast}</span>
            <span className="ml-2 text-xs">
              ({getContrastLevel(whiteContrast)})
            </span>
          </div>
          <div
            className="rounded-lg text-center"
            style={{
              backgroundColor: baseColor,
              color: 'black',
              padding: '0.5rem',
              fontSize: '0.75rem',
            }}
          >
            <span>Black / </span>
            <span className="font-mono text-sm">{blackContrast}</span>
            <span className="ml-2 text-xs">
              ({getContrastLevel(blackContrast)})
            </span>
          </div>
        </div>
        <div>
          <Link
            href={`/contrast/${color.replace('#', '')}-ffffff`}
            className="text-sm"
          >
            <Button variant="outline" className="w-full">
              Advanced Contrast
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
