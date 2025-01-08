export function extractColors(url: string): string[] {
  const path = url.split('/pallete/')[1];
  if (!path) return [];
  return path.split('/').filter((color) => color.match(/^[0-9A-Fa-f]{6}$/));
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

export function generateRandomHexColors() {
  const colorCount = Math.floor(Math.random() * 8) + 3; // Random number between 3 and 10
  const colors = [];

  for (let i = 0; i < colorCount; i++) {
    colors.push(getRandomHexColor());
  }

  return colors;
}

// Utility function to darken the color (by adjusting its brightness)
export function darkenColor(color: string, factor: number = 0.2): string {
  // Extract RGB values from the hex color string
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  // Darken the color by multiplying each RGB value by the factor (value should be between 0 and 1)
  r = Math.floor(r * (1 - factor));
  g = Math.floor(g * (1 - factor));
  b = Math.floor(b * (1 - factor));

  // Ensure that the new values are within valid color bounds (0-255)
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // Return the new darker color in hex format
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Utility function to calculate the contrast ratio (between black and white text)
export function getContrast(color: string): string {
  // Convert hex to RGB
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  // Using the formula for relative luminance from W3C
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];

  // Return 'black' if contrast with black is better, 'white' otherwise
  return luminance > 0.179 ? 'black' : 'white';
}
