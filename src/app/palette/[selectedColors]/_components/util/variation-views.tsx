import { usePalette } from '@/lib/generation/hooks/usePalette';
import React from 'react';

export function Shade() {
  const { palette } = usePalette();
  const colors = palette.map((color) => color.hexcode);
  const generateShades = (colors: string[]) => {};
  const shades = generateShades(colors);
  return (
    <section className="flex-1 flex w-full justify-between">
      {/* makes a square of every color */}
      <div className="flex flex-1 justify-between flex-col lg:flex-row">
        <div className="flex flex-1 flex-wrap justify-center items-center flex-col lg:flex-row gap-1 px-4 pt-4 pb-10">
          {colors.map((color, index) => {
            return (
              <div
                key={index}
                className={`${color ? `bg-[#${color}]` : null} w-20 h-20`}
              >
                {color}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Saturation() {
  return <div>variation-views</div>;
}
