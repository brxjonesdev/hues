import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import PaletteDisplay from '@/app/palette/[selectedColors]/_components/util/palette-display';
import {convertHexstring } from '@/lib/generation/generation-utils';
import { applyColorBlindness } from '@/lib/accessibility/color-blindness';
import { useParams } from 'next/navigation';




export default function Visualize() {
  const { selectedColors }= useParams();
  const colors = convertHexstring(Array.isArray(selectedColors) ? selectedColors.join('-') : selectedColors || '');
  
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
            <div className="flex flex-col gap-2" key={variation} >
              <Label className="font-syne">{variation}</Label>
              <div className="flex items-center justify-center">
                <PaletteDisplay data={applyColorBlindness(colors, variation)}/>              
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
