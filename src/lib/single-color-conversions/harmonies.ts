import chroma from 'chroma-js';
import { ColorType } from '../generation/hooks/usePalette';

export function generateComplementary(color: string): ColorType[] {
  const baseColor = chroma(color);
  const complementary = baseColor.set('hsl.h', (baseColor.get('hsl.h') + 0.5) % 1).hex(); // 180° opposite
  return [
    {
      hexcode: complementary,
      index: 0,
      isLocked: false,
    },
  ];
}

export function generateAnalogous(color: string): ColorType[] {
  const baseColor = chroma(color);
  const analogous1 = baseColor.set('hsl.h', (baseColor.get('hsl.h') + 0.05) % 1).hex(); // 30° to the right
  const analogous2 = baseColor.set('hsl.h', (baseColor.get('hsl.h') - 0.05) % 1).hex(); // 30° to the left
  return [
    {
      hexcode: analogous1,
      index: 0,
      isLocked: false,
    },
    {
      hexcode: analogous2,
      index: 1,
      isLocked: false,
    },
  ];
}

export function generateTriadic(color: string): ColorType[] {
  const baseColor = chroma(color);
  const triadic1 = baseColor.set('hsl.h', (baseColor.get('hsl.h') + 1 / 3) % 1).hex(); // 120° clockwise
  const triadic2 = baseColor.set('hsl.h', (baseColor.get('hsl.h') - 1 / 3) % 1).hex(); // 120° counter-clockwise
  return [
    {
      hexcode: triadic1,
      index: 0,
      isLocked: false,
    },
    {
      hexcode: triadic2,
      index: 1,
      isLocked: false,
    },
  ];
}

export function generateSplitComplementary(color: string): ColorType[] {
  const baseColor = chroma(color);
  const complementary = baseColor.set('hsl.h', (baseColor.get('hsl.h') + 0.5) % 1); // 180° opposite
  const split1 = complementary.set('hsl.h', (complementary.get('hsl.h') + 0.0833) % 1).hex(); // 150° from base
  const split2 = complementary.set('hsl.h', (complementary.get('hsl.h') - 0.0833) % 1).hex(); // 210° from base
  return [
    {
      hexcode: split1,
      index: 0,
      isLocked: false,
    },
    {
      hexcode: split2,
      index: 1,
      isLocked: false,
    },
  ];
}

export function generateTetradic(color: string): ColorType[] {
  const baseColor = chroma(color);
  const tetradic1 = baseColor.set('hsl.h', (baseColor.get('hsl.h') + 0.25) % 1).hex(); // 90° clockwise
  const tetradic2 = baseColor.set('hsl.h', (baseColor.get('hsl.h') - 0.25) % 1).hex(); // 90° counter-clockwise
  const tetradic3 = baseColor.set('hsl.h', (baseColor.get('hsl.h') + 0.5) % 1).hex(); // 180° opposite
  return [
    {
      hexcode: tetradic1,
      index: 0,
      isLocked: false,
    },
    {
      hexcode: tetradic2,
      index: 1,
      isLocked: false,
    },
    {
      hexcode: tetradic3,
      index: 2,
      isLocked: false,
    },
  ];
}
