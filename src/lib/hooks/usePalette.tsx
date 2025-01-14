'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a type for a color object in the palette
export type ColorType = {
  hexcode: string;  // Hexadecimal color code (e.g., "#FF5733")
  index: number;    // Index of the color in the palette
  isLocked: boolean; // Indicates if the color is locked
};

// Create the context with default empty values for functions
const PaletteContext = createContext<{
  palette: ColorType[];
  addColor: (color: ColorType) => void;
  removeColor: (color: ColorType) => void;
  setColors: (colors: ColorType[]) => void;
  lockColor: (color: ColorType) => void;
  unlockColor: (color: ColorType) => void;
}>({
  palette: [],
  addColor: () => {},
  removeColor: () => {},
  setColors: () => {},
  lockColor: () => {},
  unlockColor: () => {},
});


export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useState<ColorType[]>([]); // Initial palette state

  // Function to add a new color to the palette
  const addColor = (color: ColorType) => {
    setPalette((prevPalette) => [...prevPalette, color]);
  };

  // Function to remove a color from the palette
  const removeColor = (color: ColorType) => {
    setPalette((prevPalette) => prevPalette.filter((item) => item.index !== color.index));
  };

  const setColors = (colors: ColorType[]) => {
    setPalette(colors);
  };

  const lockColor = (color: ColorType) => {
    setPalette((prevPalette) =>
      prevPalette.map((item) =>
        item.index === color.index ? { ...item, isLocked: true } : item
      )
    );
  };

  const unlockColor = (color: ColorType) => {
    setPalette((prevPalette) =>
      prevPalette.map((item) =>
        item.index === color.index ? { ...item, isLocked: false } : item
      )
    );
  };

  return (
    <PaletteContext.Provider
      value={{ palette, addColor, removeColor, setColors, lockColor, unlockColor }}
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
