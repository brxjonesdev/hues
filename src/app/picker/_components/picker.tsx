/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
// Picker should be able to update the URL's search param for color

export default function Picker({
  color,
  onColorChange,
}: {
  color: string;
  onColorChange: (color: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const [r, g, b] = color.match(/\w\w/g)!.map((x) => parseInt(x, 16));
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    if (max === min) h = 0;
    else if (max === r) h = ((60 * (g - b)) / (max - min) + 360) % 360;
    else if (max === g) h = (60 * (b - r)) / (max - min) + 120;
    else h = (60 * (r - g)) / (max - min) + 240;
    setHue(h);
    // set position
    const v = max / 255;
    const s = max === 0 ? 0 : 1 - min / max;
    setPosition({ x: s, y: 1 - v });
  }, []);

  useEffect(() => {
    // set url to color
  }, [color]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setPosition({ x, y });
      setIsDragging(true);
      updateColor(x, y, hue);
    },
    [hue]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setPosition({ x, y });
      updateColor(x, y, hue);
    },
    [isDragging, hue]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHue = parseInt(e.target.value);
      setHue(newHue);
      updateColor(position.x, position.y, newHue);
    },
    [position]
  );

  const updateColor = (x: number, y: number, hue: number) => {
    const h = hue;
    const s = x * 100;
    const v = (1 - y) * 100;
    const color = HSVtoHex(h, s, v);
    onColorChange(color);
  };

  const HSVtoHex = (h: number, s: number, v: number) => {
    s /= 100;
    v /= 100;
    const hi = Math.floor(h / 60) % 6;
    const f = h / 60 - Math.floor(h / 60);
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0,
      g = 0,
      b = 0;
    if (hi === 0) {
      [r, g, b] = [v, t, p];
    } else if (hi === 1) {
      [r, g, b] = [q, v, p];
    } else if (hi === 2) {
      [r, g, b] = [p, v, t];
    } else if (hi === 3) {
      [r, g, b] = [p, q, v];
    } else if (hi === 4) {
      [r, g, b] = [t, p, v];
    } else {
      [r, g, b] = [v, p, q];
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  return (
    <div className="p-4 w-full mx-auto">
      <Card className="relative overflow-hidden">
        <CardContent
          className="h-48 flex items-center justify-center p-0"
          style={{ backgroundColor: color }}
        >
          <p className="text-[3vw] font-inter font-bold text-black/50">
          {/* Color should be white or black based on contrast */}
            {color}
          </p>
        </CardContent>
      </Card>

      <div className="mt-4 space-y-4 rounded-xl">
        <div
          className="relative h-48 cursor-crosshair rounded"
          style={{
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            backgroundImage:
              'linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute w-4 h-4 border-2 border-white rounded-xl -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x * 100}%`,
              top: `${position.y * 100}%`,
              backgroundColor: color,
            }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={handleHueChange}
          className="w-full h-3 rounded-xl appearance-none cursor-pointer"
          style={{
            background:
              'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
          }}
        />

        <div className="flex gap-2"></div>
      </div>
      {/* 
      Add HSB, HSL, RGB, CMYK, LAB, RAL, HKS, Copic, Pantone & Prismacolor selectors
      
      */}
    </div>
  );
}
