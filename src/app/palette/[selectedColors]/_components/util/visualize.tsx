import React from 'react';
import { usePalette } from '@/lib/generation/hooks/usePalette';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import PaletteDisplay from '@/app/palette/[selectedColors]/_components/util/palette-display';
import { applyColorBlindness } from '@/lib/utils/conversions';



export default function Visualize() {
  const { palette } = usePalette();

  const variations = [
    'Normal',
    'Protanopia',
    'Deuteranopia',
    'Tritanopia',
    'Achromatopsia',
    'Protanomaly',
    'Deuteranomaly',
    'Tritanomaly',
    'Achromatomaly',
  ];


  return (
    <ScrollArea className="h-96 w-full rounded-md border p-4">
      <div className="flex flex-col gap-4">
        {variations.map((variation) => {
          return (
            <div className="flex flex-col" key={variation}>
              <Label className="font-syne">{variation}</Label>
              <div className="flex items-center justify-center">
                <PaletteDisplay data={applyColorBlindness(palette, variation)}/>              
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
