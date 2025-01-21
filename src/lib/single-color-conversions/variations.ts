import chroma from 'chroma-js';

type ColorType = {
    hexcode: string;
    index: number;
    isLocked: boolean;
};

export function generateShades(color: string): ColorType[] {
  return Array.from({ length: 10 }, (_, index) => {
    const shade = chroma(color).darken(index * .5).hex();
    return {
      hexcode: shade,
      index,
      isLocked: false,
    };
  });
}

export function generateTints(color: string): ColorType[] {
  return Array.from({ length: 12 }, (_, index) => {
    const tint = chroma(color).brighten(index * 0.2).hex();
    return {
      hexcode: tint,
      index,
      isLocked: false,
    };
  });
}

export function generateTones(color: string): ColorType[] {
    return Array.from({ length: 12 }, (_, index) => {
      const tone = chroma(color).desaturate(index * 0.4).hex();
      return {
        hexcode: tone,
        index,
        isLocked: false,
      };
    });
  }
  
  export function generateHues(color: string): ColorType[] {
    return Array.from({ length: 12 }, (_, index) => {
      // Gradually shifting hue by a larger step (e.g., 30 degrees per index, which is 1/12th of a full hue cycle)
      const hueShift = chroma(color)
        .set('hsl.h', (chroma(color).get('hsl.h') + index * (1 / 12)) % 1) // 1/12 is roughly 30 degrees per step
        .hex();
      return {
        hexcode: hueShift,
        index,
        isLocked: false,
      };
    });
  }
  
  export function generateTemperature(color: string): ColorType[] {
    return Array.from({ length: 12 }, (_, index) => {
      const currentHue = chroma(color).get('hsl.h');
      
      // More noticeable warm/cool shifts
      const tempShift = index % 2 === 0
        ? chroma(color).set('hsl.h', (currentHue + 0.05) % 1)  // warm shift (towards red)
        : chroma(color).set('hsl.h', (currentHue - 0.05) % 1);  // cool shift (towards blue)
        
      return {
        hexcode: tempShift.hex(),
        index,
        isLocked: false,
      };
    });
  }