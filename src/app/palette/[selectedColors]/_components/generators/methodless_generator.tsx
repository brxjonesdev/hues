'use client';
import React, { useEffect } from 'react';
import ColorSwatch from '../color/swatch';
import { ColorType, usePalette } from '@/lib/hooks/usePalette';
import { useRouter } from 'next/navigation';
import { randomHexGeneration } from '@/lib/generation/generation-methods';


export default function MethodlessGenerator({
  colors,
}: {
  colors: string | boolean;
}) {
  const { palette, setColors } = usePalette();
  const router = useRouter();

  useEffect(() => {
    // turn the colors string into an array of colorType objects
    if (typeof colors === 'string') {
      const colorsArray = colors.split(',').map((hexcode, index) => ({
        hexcode,
        index,
        isLocked: false,
      }));
      setColors(colorsArray);
    }

  }, [colors, setColors]);


useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      const newColors = randomHexGeneration(palette);
      router.push(`/palette/${newColors}`);
      
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [palette, router, setColors]);

console.log(palette, "palette in methodless generator");


 

  return (
    <section className="flex-1 flex w-full justify-between">
      <div className="flex flex-1 justify-between flex-col lg:flex-row">
        <p>Genner</p>
        <div className="flex flex-1 flex-wrap justify-center gap-4">
          {palette.map((color: ColorType, index: number) => (
            <ColorSwatch key={index} color={color.hexcode} index={index} />
          ))}
          </div>
      </div>
    </section>
  );
}
