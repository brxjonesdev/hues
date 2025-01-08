export function validateColors(colors: string) {
  const formattedColors = colors.split('-').map((color) => {
    // Add `#` at the beginning if it doesn't already exist
    if (!color.startsWith('#')) {
      return `#${color}`; // Return the modified color
    }
    return color; // Return the color as is if it already starts with `#`
  });

  // Checks if the colors are valid
  const isValid = formattedColors.every((color) => validateHexColor(color));
  if (!isValid) {
    // Show error message for invalid color
    return false;
  }

  // Checks the amount of colors, no more than 8
  if (formattedColors.length > 10) {
    // Show error message for too many colors
    return false;
  }

  return formattedColors;
}

export function validateHexColor(color: string) {
  // Ensure the color starts with a `#` symbol and follows the valid hex pattern
  const hexPattern = /^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/;

  return hexPattern.test(color);
}
