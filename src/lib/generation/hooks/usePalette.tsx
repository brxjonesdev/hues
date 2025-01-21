'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  convertColorType,
  convertHexstring,
  generateHexString,
} from '../generation-utils';
import { useRouter } from 'next/navigation';

export type ColorType = {
  hexcode: string; // Hexadecimal color code (e.g., "#FF5733")
  index: number; // Index of the color in the palette
  isLocked: boolean; // Indicates if the color is locked
};

const PaletteContext = createContext<{
  palette: ColorType[];
  setColors: (colors: ColorType[]) => void;
  addColorAtIndex: (index: number, palette: ColorType[]) => void;
  lockColor: (index: number) => void;
  unlockColor: (index: number) => void;
}>({
  palette: [],
  setColors: () => {},
  addColorAtIndex: () => {},
  lockColor: () => {},
  unlockColor: () => {},
});

export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [palette, setPalette] = useState<ColorType[]>([]); // Initial palette state

  const setColors = (colors: ColorType[]) => {
    setPalette(colors);
  };

  const addColorAtIndex = (index: number, palette: ColorType[]) => {
    if (palette.length >= 6) {
      return { error: 'Palette is full' };
    }
    const indexToInsert = index + 1;
    const newColor: string = convertHexstring(generateHexString(1))[0].hexcode;
    console.log(`${newColor} added at index ${indexToInsert}`);
    // add at the index
    const newPalette = [
      ...palette.slice(0, indexToInsert),
      { hexcode: newColor, index: indexToInsert, isLocked: false },
      ...palette.slice(indexToInsert),
    ];
    const newLink = convertColorType(newPalette);
    console.log(newLink, 'newLink');
    router.push(`/palette/${newLink}`);
  };

  const lockColor = (index: number) => {
    console.log(`Color at index ${index} locked`);
    const newPalette = palette.map((color) => {
      if (color.index === index) {
        return { ...color, isLocked: true };
      }
      return color;
    });
    setPalette(newPalette);
  };

  const unlockColor = (index: number) => {
    console.log(`Color at index ${index} unlocked`);
    const newPalette = palette.map((color) => {
      if (color.index === index) {
        return { ...color, isLocked: false };
      }
      return color;
    });
    setPalette(newPalette);
  };

  return (
    <PaletteContext.Provider
      value={{ setColors, palette, addColorAtIndex, lockColor, unlockColor }}
    >
      {children}
    </PaletteContext.Provider>
  );
};

// Custom hook to use the PaletteContext in components
export const usePalette = () => {
  const context = useContext(PaletteContext);

  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }

  return context;
};
