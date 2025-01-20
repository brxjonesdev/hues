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
      <div className="font-inter  flex items-center justify-between flex-col gap-3  p-2  lg:mt-auto lg:mb-12">
        <Button
          variant={'outline'}
          className="bg-transparent border-black/10 hover:bg-black/20 w-full shadow-none mb-6 hidden lg:block text-center"
        >
          <Grip />
        </Button>
        <MiniColorPicker
          value={color}
          onChange={(color) => console.log(color)}
        />
        {/* <Button
          variant={'link'}
          className="text-3xl lg:text-5xl font-bold uppercase text-black/70 border-black/10"
        >
          {color}
        </Button> */}
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="bg-transparent border-transparent shadow-none hover:bg-black/20"
            onClick={() => (isLocked ? unlockColor(index) : lockColor(index))}
          >
            {isLocked ? <Lock size={36} /> : <Unlock size={36} />}
          </Button>

          <Button
            size={'icon'}
            variant={'outline'}
            className="bg-transparent border-transparent shadow-none hover:bg-black/20"
          >
            <Heart />
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
            <Copy />
          </Button>
          <Button
            size={'icon'}
            variant={'outline'}
            className="bg-transparent border-transparent shadow-none hover:bg-black/20"
          >
            <X />
          </Button>
        </div>
        <Separator className="bg-black/20" />
      </div>
    </div>
  );
}
