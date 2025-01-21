import { ColorType } from "../generation/hooks/usePalette";

export function HexToRGB(hex: string): string {
  const hexCode = hex.replace('#', '');
  const r = parseInt(hexCode.substring(0, 2), 16);
  const g = parseInt(hexCode.substring(2, 4), 16);
  const b = parseInt(hexCode.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export function HexToHSL(hex: string): string {
  const hexCode = hex.replace('#', '');
  const r = parseInt(hexCode.substring(0, 2), 16) / 255;
  const g = parseInt(hexCode.substring(2, 4), 16) / 255;
  const b = parseInt(hexCode.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
  }
  h = Math.round(h * 60);
  s = Math.round(s * 100);
  const lValue = Math.round(l * 100);
  return `hsl(${h}, ${s}%, ${lValue}%)`;
}

export function HexToHSV(hex: string): string {
  const hexCode = hex.replace('#', '');
  const r = parseInt(hexCode.substring(0, 2), 16) / 255;
  const g = parseInt(hexCode.substring(2, 4), 16) / 255;
  const b = parseInt(hexCode.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
  }
  h = Math.round(h * 60);
  const sValue = Math.round(s * 100);
  const vValue = Math.round(v * 100);
  return `hsv(${h}, ${sValue}%, ${vValue}%)`;
}

export function HexToCMYK(hex: string): string {
  const hexCode = hex.replace('#', '');
  const r = parseInt(hexCode.substring(0, 2), 16) / 255;
  const g = parseInt(hexCode.substring(2, 4), 16) / 255;
  const b = parseInt(hexCode.substring(4, 6), 16) / 255;
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
}

export function HexToLAB(hex: string): string {
  const rgb = HexToRGB(hex).match(/\d+/g)?.map(Number);
  if (!rgb) return 'Invalid hex color';
  let [r, g, b] = rgb.map((v) => v / 255);
  [r, g, b] = [r, g, b].map(
    (v) => (v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92) * 100
  );
  const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 95.047;
  const y = (0.2126729 * r + 0.7151522 * g + 0.072175 * b) / 100.0;
  const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 108.883;
  const lab = (v: number) =>
    v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116;
  const l = 116 * lab(y) - 16;
  const a = 500 * (lab(x) - lab(y));
  const bVal = 200 * (lab(y) - lab(z));
  return `lab(${Math.round(l)}, ${Math.round(a)}, ${Math.round(bVal)})`;
}


// Add color blindness conversion functions here
export function applyColorBlindness(palette: ColorType[], variation: string): ColorType[]{
  return palette;
}

export function generateCode(palette: ColorType[], format: string): {} {
  return '';
}