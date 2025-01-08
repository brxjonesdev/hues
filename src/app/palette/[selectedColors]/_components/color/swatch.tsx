import React from 'react';
import SwatchMenu from './swatch-menu';
import { Lock } from 'lucide-react';

export default function ColorSwatch({
  color,
  index,
}: {
  color: string;
  index: number;
}) {
  return (
    <div
      key={index}
      className="flex flex-1 flex-col items-center justify-center h-full "
      style={{ backgroundColor: typeof color === 'string' ? color : undefined }}
    >
      <div className="mt-auto opacity-10 hover:opacity-100 transition-opacity duration-300 h-full w-full flex items-center justify-center">
        <Lock size={24} />
      </div>

      <SwatchMenu color={typeof color === 'string' ? color : ''} />
    </div>
  );
}
