import React from 'react';
import { Copy, Grip, Heart, Lock, SwatchBook, Unlock, X } from 'lucide-react';
import { usePalette } from '@/lib/generation/hooks/usePalette';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MiniColorPicker from '../util/change-color';

export default function ColorSwatch({
  color,
  index,
  isLocked,
  length,
}: {
  color: string;
  index: number;
  isLocked: boolean;
  length: number;
}) {
  console.log(color, 'color', index, 'index', isLocked, 'isLocked');
  const { lockColor, unlockColor } = usePalette();
  // return shades if showShades is true
  return (
    <div
      key={index}
      className="flex flex-1 flex-col items-center h-full justify-center rounded-2xl "
      style={{
        backgroundColor: typeof color === 'string' ? `#${color}` : undefined,
      }}
    >
      <div className="font-inter w-full px-8 flex items-center justify-between lg:flex-col gap-3  p-2  lg:mt-auto lg:mb-12">
        <Button
          variant={'outline'}
          className=" border-black/10 bg-black/20 hover:bg-black/30 w-full shadow-none mb-6 hidden xl:block text-center"
        >
          <Grip />
        </Button>
        <MiniColorPicker
          value={color}
          onChange={(color) => console.log(color)}
        />
        <div className="flex gap-2 text-black/70">
          <Button
            size="icon"
            variant="outline"
            className="bg-transparent border-transparent shadow-none hover:bg-black/20 "
            onClick={() => (isLocked ? unlockColor(index) : lockColor(index))}
          >
            {isLocked ? <Lock size={36} /> : <Unlock size={36} />}
          </Button>
          <Button
            size={'icon'}
            variant={'outline'}
            className="bg-transparent border-transparent shadow-none hover:bg-black/20"
          >
            <SwatchBook />
          </Button>

          <Button
            size={'icon'}
            variant={'outline'}
            className="bg-transparent border-transparent shadow-none hover:bg-black/20"
          >
            <X />
          </Button>
        </div>
        <Separator className="bg-black/20 hidden lg:block" />
      </div>
    </div>
  );
}
