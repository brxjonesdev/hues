import { ColorType } from './hooks/usePalette';

// Validate if a hex string represents valid hex colors and return it if valid
export function validateHexString(hexString: string): {
  error: string | null;
  value: string | null;
} {
  const hexColors = hexString.split('-');
  const hexColorRegex = /^[0-9a-fA-F]{6}$/;
  console.log(hexColors, 'hexColors');
  if (hexColors.length > 6) {
    return {
      error: 'Only 6 colors are allowed. Please check the url.',
      value: null,
    };
  }

  // Return hex string if all colors are valid, otherwise return false
  const isValid = hexColors.every((color) => hexColorRegex.test(color));
  return isValid
    ? { error: null, value: hexString }
    : { error: 'Invalid hex color found.', value: null };
}

// Function to generate a hex string of a given length with valid hex colors
export function generateHexString(length: number): string {
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

export function convertHexstring(
  hexString: string,
  lockedColors: boolean[] = []
): ColorType[] {
  const hexColors = hexString.split('-');

  return hexColors.map((hexcode, index) => ({
    hexcode,
    isLocked: lockedColors[index] || false, // Use the provided isLocked values if available
    index,
  }));
}

// reverse of convertHexstring
export function convertColorType(colors: ColorType[]): string {
  return colors.map((color) => color.hexcode).join('-');
}

export function generateExport(method: string, palette: ColorType[]) {
  return palette;
}
