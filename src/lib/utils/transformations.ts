
import namer from 'color-namer';


export function generateName(color: string) {
    return namer(color).pantone[0].name;
}
function clamp(value: number) {
    return Math.max(0, Math.min(255, value));
  }
  
  export function getShades(color: string) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    const shades = [];
    for (let i = 1; i < 12; i++) {
      const shade = `rgb(${clamp(r - i * 10)}, ${clamp(g - i * 10)}, ${clamp(b - i * 10)})`;
      shades.push(shade);
    }
    return shades;
  }
  
  export function getTints(color: string) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    const tints = [];
    for (let i = 1; i < 12; i++) {
      const tint = `rgb(${clamp(r + i * 10)}, ${clamp(g + i * 10)}, ${clamp(b + i * 10)})`;
      tints.push(tint);
    }
    return tints;
  }
  
  export function getTones(color: string) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    const tones = [];
    for (let i = 1; i < 12; i++) {
      const tone = `rgb(${clamp(r - i * 5 + 5)}, ${clamp(g - i * 5 + 5)}, ${clamp(b - i * 5 + 5)})`;
      tones.push(tone);
    }
    return tones;
  }
  
  export function getAnalagousColors(color: string) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    const colors = [
      `rgb(${clamp(r + 30)}, ${clamp(g + 15)}, ${clamp(b)})`,
      color,
      `rgb(${clamp(r - 30)}, ${clamp(g - 15)}, ${clamp(b)})`,
    ];
    return colors;
  }
  
  export function getComplementaryColors(color: string): string[] {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return [color, `rgb(${255 - r}, ${255 - g}, ${255 - b})`];
  }
  
  export function getTriadicColors(color: string): string[] {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return [
      color,
      `rgb(${clamp(g)}, ${clamp(b)}, ${clamp(r)})`, 
      `rgb(${clamp(b)}, ${clamp(r)}, ${clamp(g)})`
    ];
  }
  
  export function getSplitComplementaryColors(color: string): string[] {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return [
      color,
      `rgb(${clamp(255 - r)}, ${clamp(g)}, ${clamp(255 - b)})`,
      `rgb(${clamp(255 - r)}, ${clamp(255 - g)}, ${clamp(b)})`
    ];
  }
  
  export function getTetradicColors(color: string): string[] {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return [
      color,
      `rgb(${clamp(255 - r)}, ${clamp(255 - g)}, ${clamp(b)})`,
      `rgb(${clamp(r)}, ${clamp(255 - g)}, ${clamp(255 - b)})`,
      `rgb(${clamp(255 - r)}, ${clamp(g)}, ${clamp(255 - b)})`
    ];
  }
  
  export function getSquareColors(color: string): string[] {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return [
      color,
      `rgb(${clamp(b)}, ${clamp(r)}, ${clamp(g)})`,
      `rgb(${clamp(255 - r)}, ${clamp(255 - g)}, ${clamp(255 - b)})`,
      `rgb(${clamp(g)}, ${clamp(b)}, ${clamp(r)})`
    ];
  }
  