'use client';
import { Brush, Eye } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Picker from '@/app/picker/_components/picker';

export default function Hero() {
  const [selectedColor, setSelectedColor] = React.useState<string>('#FFFFFF');

  return (
    <div className="w-fit">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-xl tracking-tighter text-left font-inter">
                Create{' '}
                <span className="font-syne tracking-wide">beautiful</span>{' '}
                palettes with ease.
              </h1>
              <p className="font-inter text-xl text-left tracking-tight">
                Explore and generate color palettes with ease with Hues.
                <br /> Less choosing, more creating.
              </p>
            </div>
            <div className="flex flex-col font-inter">
              <div className="flex gap-4">
                <Link href="/palette/generate">
                  <Button size="lg" className="gap-4" variant="outline">
                    Generator <Brush />
                  </Button>
                </Link>
                <Link href="/visualizer">
                  <Button size="lg" className="gap-4">
                    Visualizer <Eye />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Picker
              color={selectedColor}
              onColorChange={(color) => setSelectedColor(color)}
            />
            <Link
              href={`/picker/?color=${selectedColor.replace('#', '')}`}
              className="font-inter"
            >
              <Button size="lg" className="gap-4" variant="ghost">
                View in Color Picker
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
