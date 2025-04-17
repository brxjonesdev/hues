import { hslToHex } from "./converts";

export function generateHarmoniousPalette(baseHue: number, count: number, scheme: 'analogous' | 'monochromatic' | 'triadic') {
    const palette: { hexcode: string; index: number; isLocked: boolean }[] = [];
  
    for (let i = 0; i < count; i++) {
      let hue = baseHue;
      switch (scheme) {
        case 'analogous':
          hue = (baseHue + (i - Math.floor(count / 2)) * 30 + 360) % 360;
          break;
        case 'monochromatic':
          // Keep hue the same, vary lightness
          break;
        case 'triadic':
          hue = (baseHue + i * 120) % 360;
          break;
      }
  
      const saturation = 70;
      const lightness = 50 + (scheme === 'monochromatic' ? (i - count / 2) * 7 : 0); // subtle lightness shift
  
      palette.push({
        hexcode: hslToHex(hue, saturation, lightness),
        index: i,
        isLocked: false,
      });
    }
  
    return palette;
  }