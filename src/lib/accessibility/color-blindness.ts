const matrices = {
    Normal: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    Protanopia: [
      [0.56667, 0.43333, 0.00000],
      [0.55833, 0.44167, 0.00000],
      [0.00000, 0.24167, 0.75833],
    ],
    Deuteranopia: [
      [0.62500, 0.37500, 0.00000],
      [0.70000, 0.30000, 0.00000],
      [0.00000, 0.30000, 0.70000],
    ],
    Tritanopia: [
      [0.95000, 0.05000, 0.00000],
      [0.00000, 0.43333, 0.56667],
      [0.00000, 0.47500, 0.52500],
    ],
    Achromatopsia: [
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114],
    ],
    Protanomaly: [
      [0.817, 0.183, 0.000],
      [0.333, 0.667, 0.000],
      [0.000, 0.125, 0.875],
    ],
    Deuteranomaly: [
      [0.800, 0.200, 0.000],
      [0.258, 0.742, 0.000],
      [0.000, 0.142, 0.858],
    ],
    Tritanomaly: [
      [0.967, 0.033, 0.000],
      [0.000, 0.733, 0.267],
      [0.000, 0.183, 0.817],
    ],
    Achromatomaly: [
      [0.618, 0.320, 0.062],
      [0.163, 0.775, 0.062],
      [0.163, 0.320, 0.516],
    ],
  };
  
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }
  
  function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }
  
  export function applyColorBlindness(
    palette: { color: string; hexcode: string }[],
    variation: keyof typeof matrices
  ): { color: string; hexcode: string }[] {
    // Validate variation
    if (!matrices[variation]) {
      throw new Error(`Invalid variation: ${variation}`);
    }
  
    const matrix = matrices[variation];
  
    return palette.map(({ color, hexcode }) => {
      // Convert HEX to RGB
      const { r, g, b } = hexToRgb(hexcode);
  
      // Apply the transformation matrix
      const transformedColor = {
        r: Math.round(
          Math.min(255, Math.max(0, matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b))
        ),
        g: Math.round(
          Math.min(255, Math.max(0, matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b))
        ),
        b: Math.round(
          Math.min(255, Math.max(0, matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b))
        ),
      };
  
      // Convert back to HEX
      const alteredHex = rgbToHex(transformedColor.r, transformedColor.g, transformedColor.b);
  
      return {
        hexcode: alteredHex,
      };
    });
  }
  