// context/PaletteContext.js
"use client"
import React, { createContext, useContext, useState } from 'react';

// Create the context
const PaletteContext = createContext({
    palette: [],
    addColor: (color) => {},
    removeColor: (color) => {},
    setColors: (colors) => {},
    lockColor: (color) => {},
    unlockColor: (color) => {},
});

// Create the PaletteProvider component
export const PaletteProvider = ({ children }) => {
  const [palette, setPalette] = useState([]); // Initial palette state

  // Function to add a new color to the palette
  const addColor = (color) => {
    setPalette((prevPalette) => [...prevPalette, color]);
  };

  // Function to remove a color from the palette
  const removeColor = (color) => {
    setPalette((prevPalette) => prevPalette.filter((item) => item !== color));
  };

  const setColors = (colors) => {
    setPalette(colors);
  };


  return (
    <PaletteContext.Provider value={{ palette, addColor, removeColor, setColors }}>
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
