import { generateHarmoniousPalette } from "../util/theory";

export default function usePaletteGeneration() {
  const generateRandomPalette = (count: number): {
    palettes: {
      hexcode: string;
      index: number;
      isLocked: boolean;
    }[][];
  } => {
    const schemes = ['analogous', 'monochromatic', 'triadic'] as const;
    const palettes = Array.from({ length: count }, () => {
      const colorCount = Math.floor(Math.random() * 5) + 2; // 2 to 6 colors
      const baseHue = Math.floor(Math.random() * 360);
      const scheme = schemes[Math.floor(Math.random() * schemes.length)];
      return generateHarmoniousPalette(baseHue, colorCount, scheme);
    });

    return { palettes };
  };

const generateHexString = (length: number)=> {
  const hexSegments = [];

  for (let i = 0; i < length; i++) {
    // Generate a random 6-character hex color
    const hexColor = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0'); // Ensure it is exactly 6 characters
    hexSegments.push(hexColor);
  }

  // Join hex colors with hyphens
  return hexSegments.join('-');
}


 const generateRandomHEXstring = () => {
    const length = Math.floor(Math.random() * 4) + 3;
      const colors = generateHexString(length);
      return colors;
  }



  return { generateRandomPalette, generateRandomHEXstring };}
