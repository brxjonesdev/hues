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
) {
  const hexColors = hexString.split('-');

  return hexColors.map((hexcode, index) => ({
    hexcode,
    isLocked: lockedColors[index] || false, // Use the provided isLocked values if available
    index,
  }));
}

export function randomHexGeneration(currentColors?) {
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

//-----------------------------
// Palette Generation Functions
//-----------------------------

export function randomizePalette(currentPalette: string): string {
  const colors = currentPalette.split('-');

  const randomizedColors = colors.map((color) => {
    if (color.includes('_L')) {
      return color;
    }

    return generateHexString(1);
  });

  return randomizedColors.join('-');
}
