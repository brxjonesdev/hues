export function exportToStyles(palette: string, format: string) {
  if (!palette) return null;

  // Split the palette into individual colors
  const colors = palette.split('-').map((color) => `#${color}`);
  const styles = colors.reduce(
    (acc: { [key: string]: string | null }, color, index) => {
      acc[`color${index + 1}`] = color || null; // Assign color to color1, color2, etc.
      return acc;
    },
    {}
  );

  switch (format) {
    case 'CSS':
      return Object.entries(styles)
        .map(([key, value]) => `--${key}: ${value};`)
        .join('\n');

    case 'SASS':
      return Object.entries(styles)
        .map(([key, value]) => `$${key}: ${value};`)
        .join('\n');

    case 'Tailwind':
      return JSON.stringify(
        Object.fromEntries(
          Object.entries(styles).map(([key, value]) => [`--tw-${key}`, value])
        ),
        null,
        2
      );

    case 'JSON':
      return JSON.stringify(styles, null, 2);

    default:
      return null;
  }
}
