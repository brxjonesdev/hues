import React from 'react';
import SwatchMenu from './swatch-menu';
import { Copy, Delete, Grab, Grip, Heart, Lock, MoveHorizontal, SwatchBook, Unlock, X } from 'lucide-react';
import { usePalette } from '@/lib/generation/hooks/usePalette';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ColorSwatch({
  color,
  index,
  isLocked,
}: {
  color: string;
  index: number;
  isLocked: boolean;
}) {
  const {  } = usePalette();
  // Set up functions to edit the palette object by thier index.
  return (
    <div
      key={index}
      className="flex flex-1 flex-col items-center h-full justify-center "
      style={{ backgroundColor: typeof color === 'string' ? `#${color}` : undefined }}
    >
  
      <div className='font-nunito  flex items-center justify-between flex-col gap-3  p-2  lg:mt-auto lg:mb-12'>
      <Button variant={"outline"} className='bg-transparent border-black/10 hover:bg-black/20 w-full shadow-none mb-6 hidden lg:block text-center' >
         <Grip/>
      </Button>
        <Button variant={"link"} className='text-3xl lg:text-5xl font-bold uppercase text-black/70 border-black/10'>{color}</Button>
        <div className='flex gap-2'>
          <Button size={"icon"} variant={"outline"} className='bg-transparent border-transparent shadow-none hover:bg-black/20' >
        { isLocked ? <Lock size={36} /> : <Unlock size={36} />}
          </Button>
          <Button size={"icon"} variant={"outline"} className='bg-transparent border-transparent shadow-none hover:bg-black/20' >
          <Heart/>
          </Button>
          <Button size={"icon"} variant={"outline"} className='bg-transparent border-transparent shadow-none hover:bg-black/20' >
          <SwatchBook/>
          </Button>
          <Button size={"icon"} variant={"outline"} className='bg-transparent border-transparent shadow-none hover:bg-black/20' >
          <Copy/>
          </Button>
          <Button size={"icon"} variant={"outline"} className='bg-transparent border-transparent shadow-none hover:bg-black/20' >
          <X/>
          </Button>
         
          
        </div>
        <Separator className='bg-black/20'/>
      </div>
    </div>
  );
}
