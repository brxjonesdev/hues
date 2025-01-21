'use client';
import React, { useEffect } from 'react';
import ColorSwatch from '../color/swatch';
import { ColorType, usePalette } from '@/lib/generation/hooks/usePalette';
import { useRouter } from 'next/navigation';
import { randomHexGeneration } from '@/lib/generation/generation-methods';
import { convertColorType } from '@/lib/generation/generation-utils';
import { Button } from '@/components/ui/button';

// 4. Swatch Menus work (lock, unlock, delete, copy and shades) remove like
// 5. Colors can be updated
// 6. Add DND to the swatches
// -> Navbar
export default function MethodlessGenerator() {
  const { palette, addColorAtIndex } = usePalette();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        const newColors = convertColorType(
          randomHexGeneration(palette) as ColorType[]
        );
        console.log(newColors, 'newColors');
        // router.push(`/palette/${newColors}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [palette, router]);

  return (
    <section className="flex-1 flex w-full justify-between">
      <div className="flex flex-1 justify-between flex-col lg:flex-row">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:mb-6 xl:flex gap-4 lg:gap-2 px-8 mt-4 items-center">
          {palette.map((color: ColorType, index: number) => (
            <>
              <ColorSwatch
                key={index}
                color={color.hexcode}
                index={index}
                isLocked={color.isLocked}
                length={palette.length}
              />
              {/* add a button only if not last of index */}
              {index !== palette.length - 1 && (
                <Button
                  variant={'outline'}
                  onClick={() => addColorAtIndex(index, palette)}
                  className="  rounded-3xl h-fit w-fit p-0 py-2 px-1 transition-all duration-300 ease-in-out hover:py-7 hover:px-3.5 hidden xl:block"
                />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
