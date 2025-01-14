'use client';
import React from 'react';
import { colornames } from 'color-name-list';

export default function Colors() {
  return (
    <section className="font-nunito p-4 flex flex-col h-full">
      <ColorGrid colors={colornames} />
    </section>
  );
}

function ColorGrid({ colors }) {
  return (
    <div className="grid grid-cols-12 gap-4 flex-1 overflow-y-auto">
      {colors.splice(1, 60).map(({ name, hex }, index) => (
        <div
          key={index}
          className="p-2 border shadow-sm flex flex-col items-center justify-center h-32 text-center rounded-3xl transition-all duration-300 ease-in-out hover:scale-105"
          style={{ backgroundColor: hex, color: getTextColor(hex) }}
        >
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs">{hex}</div>
        </div>
      ))}
    </div>
  );
}

function getTextColor(hex) {
  const rgb = hexToRgb(hex);
  const brightness = (299 * rgb.r + 587 * rgb.g + 114 * rgb.b) / 1000;
  return brightness > 128 ? '#000' : '#fff';
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}
