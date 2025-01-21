'use client';
import { Brush, Eye } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Picker from '@/app/picker/_components/picker';

export default function Hero() {
  const [selectedColor, setSelectedColor] = React.useState<string>('#FFFFFF');

  return (
    <div className="w-full">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="items-center justify-center ">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-xl tracking-tighter text-center font-inter">
                Create{' '}
                <span className="font-syne tracking-wide  rounded-xl text-md mix-blend-normal">
                  beautiful
                </span>{' '}
                palettes with ease.
              </h1>
              <p className="font-inter text-xl text-center tracking-tight">
                Explore and generate color palettes with ease with Hues.
                <br /> Less choosing, more creating.
              </p>
            </div>
            <div className="flex flex-col font-inter">
              <div className="flex flex-wrap justify-end">
                <Link href="/palette/generate" className="w-full">
                  <Button
                    size="lg"
                    className="gap-4 hover:rainbow-bg hover:text-black transition-all ease-in-out duration-300 w-full"
                    variant="outline"
                  >
                    Use our Palette Generator <Brush />
                  </Button>
                </Link>
                {/* <Link href="/picker/?color=FFFFFF">
                  <Button
                    size="lg"
                    className="w-full p-0 hover:bg-transparent hover:underline"
                    variant="ghost"
                  >
                    ... or use the Color Picker
                  </Button>
                </Link> */}
                {/* <Link href="/visualizer">
                  <Button size="lg" className="gap-4">
                    Visualizer <Eye />
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
