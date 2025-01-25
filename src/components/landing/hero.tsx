'use client';
import { Brush, Eye } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Picker from '@/app/picker/_components/picker';
import { ColorType } from '@/lib/generation/hooks/usePalette';
import MiniPalette from './mini-palette';
import { Separator } from '../ui/separator';

export default function Hero() {


  const palettes: ColorType[][] = [
    // Palette 1: Sunset Vibes
    [
      { hexcode: "#FF5733", index: 0, isLocked: false }, // Vibrant Orange
      { hexcode: "#FFC300", index: 1, isLocked: false }, // Bright Yellow
      { hexcode: "#DAF7A6", index: 2, isLocked: false }, // Soft Green
      { hexcode: "#33FFBD", index: 3, isLocked: false }, // Aqua
      { hexcode: "#3380FF", index: 4, isLocked: false }, // Vivid Blue
      { hexcode: "#9B59B6", index: 5, isLocked: false }, // Deep Purple
    ],
    // Palette 2: Ocean Breeze
    [
      { hexcode: "#0D3B66", index: 0, isLocked: false }, // Deep Navy
      { hexcode: "#FAF0CA", index: 1, isLocked: false }, // Soft Cream
      { hexcode: "#F4D35E", index: 2, isLocked: false }, // Golden Yellow
      { hexcode: "#EE964B", index: 3, isLocked: false }, // Warm Orange
      { hexcode: "#F95738", index: 4, isLocked: false }, // Coral Red
      { hexcode: "#3D348B", index: 5, isLocked: false }, // Rich Indigo
    ],
    // Palette 3: Forest Whisper
    [
      { hexcode: "#2E8B57", index: 0, isLocked: false }, // Sea Green
      { hexcode: "#A7C957", index: 1, isLocked: false }, // Lime Green
      { hexcode: "#F3E9D2", index: 2, isLocked: false }, // Pale Sand
      { hexcode: "#6A0572", index: 3, isLocked: false }, // Deep Purple
      { hexcode: "#FF7F50", index: 4, isLocked: false }, // Coral
      { hexcode: "#2F4F4F", index: 5, isLocked: false }, // Dark Slate Gray
    ],
    // Palette 4: Candy Pop
    [
      { hexcode: "#FF6F61", index: 0, isLocked: false }, // Candy Pink
      { hexcode: "#6B4226", index: 1, isLocked: false }, // Chocolate Brown
      { hexcode: "#FFD700", index: 2, isLocked: false }, // Bright Gold
      { hexcode: "#FF69B4", index: 3, isLocked: false }, // Hot Pink
      { hexcode: "#8A2BE2", index: 4, isLocked: false }, // Electric Purple
      { hexcode: "#00CED1", index: 5, isLocked: false }, // Dark Turquoise
    ],
    // Palette 5: Tropical Paradise
    [
      { hexcode: "#FF4500", index: 0, isLocked: false }, // Orange Red
      { hexcode: "#FFDAB9", index: 1, isLocked: false }, // Peach Puff
      { hexcode: "#90EE90", index: 2, isLocked: false }, // Light Green
      { hexcode: "#20B2AA", index: 3, isLocked: false }, // Light Sea Green
      { hexcode: "#4682B4", index: 4, isLocked: false }, // Steel Blue
      { hexcode: "#6A5ACD", index: 5, isLocked: false }, // Slate Blue
    ],

    // Palette 7: Desert Sands
    [
      { hexcode: "#EDC9AF", index: 0, isLocked: false }, // Desert Sand
      { hexcode: "#C19A6B", index: 1, isLocked: false }, // Camel
      { hexcode: "#8B4513", index: 2, isLocked: false }, // Saddle Brown
      { hexcode: "#F4A460", index: 3, isLocked: false }, // Sandy Brown
      { hexcode: "#D2B48C", index: 4, isLocked: false }, // Tan
      { hexcode: "#DEB887", index: 5, isLocked: false }, // Burlywood
    ],
    // Palette 8: Spring Blossom
   
    // Palette 9: Cosmic Dreams
    [
      { hexcode: "#4B0082", index: 0, isLocked: false }, // Indigo
      { hexcode: "#8A2BE2", index: 1, isLocked: false }, // Blue Violet
      { hexcode: "#9370DB", index: 2, isLocked: false }, // Medium Purple
      { hexcode: "#7B68EE", index: 3, isLocked: false }, // Medium Slate Blue
      { hexcode: "#6A5ACD",  index: 4, isLocked: false }, // Slate Blue
      { hexcode: "#483D8B", index: 5, isLocked: false }, // Dark Slate Blue
    ],

    // Palette 10: Rose Garden
    [
      { hexcode: "#FFC0CB", index: 0, isLocked: false }, // Pink
      { hexcode: "#FF69B4", index: 1, isLocked: false }, // Hot Pink
      { hexcode: "#FF1493", index: 2, isLocked: false }, // Deep Pink
      { hexcode: "#DB7093", index: 3, isLocked: false }, // Pale Violet Red
      { hexcode: "#C71585", index: 4, isLocked: false }, // Medium Violet Red
      { hexcode: "#FF6347", index: 5, isLocked: false }, // Tomato
    ],
  ];
  

  return (
    <div className="w-full font-inter">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-4 flex-col">
          
          <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-xl tracking-tighter text-left font-inter">
                Create{' '}
                <span className="font-syne tracking-wide  rounded-xl text-md mix-blend-normal">
                  beautiful
                </span>{' '}
                palettes with ease.
              </h1>
            <p className="text-md leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              Generate beautiful color palettes with our easy-to-use palette generator. Choose from a variety of color generation methods and export your palette in various formats.
            </p>
          </div>
          <div className="flex flex-row gap-4">
          <Link href="/palette/generate" className="w-fit">
                  <Button
                    size="lg"
                    className="gap-4 hover:rainbow-bg hover:text-black transition-all ease-in-out duration-300 w-full"
                    variant="outline"
                  >
                    Use our Palette Generator <Brush />
                  </Button>
                </Link>
          </div>
        </div>
        <div className="rounded-md aspect-square flex flex-col gap-4 h-full overflow-y-scroll w-full px-4">
          {palettes.map((palette, index) => {
            return <MiniPalette colors={palette} key={index} />;
          })}
          <Separator/>

        </div>
      </div>
    </div>
  </div>
  );
}
