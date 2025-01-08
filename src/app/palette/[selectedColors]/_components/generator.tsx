'use client';
import React, { useEffect } from 'react';
import ColorSwatch from './color/swatch';
import InvalidColors from './util/invalid-colors';
import { usePalette } from '@/lib/providers';

export default function PaletteGenerator({ initialColors }: { initialColors: string[] | boolean }) {
  const { palette, setColors } = usePalette();

  useEffect(() => {
    if (Array.isArray(initialColors)) {
      setColors(initialColors); // Set the colors when `initialColors` is passed
    }
  }, [initialColors, setColors]);

  useEffect(() => {
    const handleKeyDown = (event: { code: string }) => {
      if (event.code === 'Space') {
        // Randomize the colors, keeping the locked colors
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!initialColors) {
    return <InvalidColors />;
  }

  const colorsToDisplay = palette.length > 0 ? palette : initialColors;

  return (
    <section className="flex-1 flex w-full justify-between">
      <div className="flex flex-1 justify-between flex-col lg:flex-row">
        {colorsToDisplay.map((color, index) => (
          <ColorSwatch key={index} color={color} />
        ))}
      </div>
    </section>
  );
}
