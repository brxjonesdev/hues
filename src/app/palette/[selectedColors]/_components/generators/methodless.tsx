'use client';
import React, { useEffect } from 'react';
import ColorSwatch from '../color/swatch';
import { ColorType, usePalette } from '@/lib/generation/hooks/usePalette';
import { useRouter } from 'next/navigation';
import { randomHexGeneration } from '@/lib/generation/generation-methods';
import { convertColorType } from '@/lib/generation/generation-utils';



export default function  MethodlessGenerator() {
  const {palette} = usePalette();
  const router = useRouter();


  useEffect(() => {   
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      const newColors = convertColorType(randomHexGeneration(palette) as ColorType[]);
      console.log(newColors, "newColors");
      router.push(`/palette/${newColors}`);
      
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
  }, [palette, router]);



 

  return (
    <section className="flex-1 flex w-full justify-between">
      <div className="flex flex-1 justify-between flex-col lg:flex-row">  
        <div className="flex flex-1 flex-wrap justify-center flex-col lg:flex-row">
          {palette.map((color: ColorType, index: number) => (
            <ColorSwatch key={index} color={color.hexcode} index={index} isLocked={color.isLocked} />
          ))}
          </div>
      </div>
    </section>
  );
}
