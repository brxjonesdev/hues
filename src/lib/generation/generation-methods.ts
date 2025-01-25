
import { generateHexString } from './generation-utils';
export function randomHexGeneration(currentColors?: ColorType[]) {
  if (currentColors) {
    const newColors = currentColors.map((color) => {
      if (color.isLocked) {
        return color;
      }
      const hexcode = generateHexString(1);
      return {
        ...color,
        hexcode,
      };
    });
    return newColors;
  }
  if (!currentColors) {
    const length = Math.floor(Math.random() * 4) + 3;
    const colors = generateHexString(length);
    return colors;
  }
  const colors = currentColors;
  return colors;
}
