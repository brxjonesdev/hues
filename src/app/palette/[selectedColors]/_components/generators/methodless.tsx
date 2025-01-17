'use client';
import React, { useEffect } from 'react';
import ColorSwatch from '../color/swatch';
import { ColorType, usePalette } from '@/lib/generation/hooks/usePalette';
import { useRouter } from 'next/navigation';
import { randomHexGeneration } from '@/lib/generation/generation-methods';
import { convertColorType } from '@/lib/generation/generation-utils';
import { Button } from '@/components/ui/button';

export default function MethodlessGenerator() {
  const { palette, addColorAtIndex } = usePalette();
  const router = useRouter();
  console.log(palette, 'palette, in gn');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        const newColors = convertColorType(
          randomHexGeneration(palette) as ColorType[]
        );
        console.log(newColors, 'newColors');
        router.push(`/palette/${newColors}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [palette, router]);

  return (
    <section className="flex-1 flex w-full justify-between">
      <div className="flex flex-1 justify-between flex-col lg:flex-row">
        <div className="flex flex-1 flex-wrap justify-center items-center flex-col lg:flex-row gap-1 px-4 pt-4 pb-10">
          {palette.map((color: ColorType, index: number) => (
            <>
              <ColorSwatch
                key={index}
                color={color.hexcode}
                index={index}
                isLocked={color.isLocked}
              />
              {/* add a button only if not last of index */}
              {index !== palette.length - 1 && (
                <Button
                  variant={'outline'}
                  onClick={() => addColorAtIndex(index)}
                  className="  rounded-3xl h-fit w-fit p-0 py-2 px-1 transition-all duration-300 ease-in-out hover:py-7 hover:px-3.5"
                />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
