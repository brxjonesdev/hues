import React from 'react';
import { ColorType, usePalette } from '@/lib/generation/hooks/usePalette';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { applyColorBlindness } from '@/lib/generation/generation-utils';

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

  const paletteVariations: {
    variation: string;
    palette: ColorType[];
  }[] = [];
  variations.map((variation) => {
    const adjustedPalette = applyColorBlindness(palette, variation);
    paletteVariations.push({
      variation: variation,
      palette: adjustedPalette,
    });
  });
  return (
    <ScrollArea className="h-96 w-full rounded-md border p-4">
      <div className="flex flex-col gap-4">
        {variations.map((variation) => {
          return (
            <div className="flex flex-col" key={variation}>
              <Label className="font-syne">{variation}</Label>
              <div className="flex items-center justify-center">
                {/* Show every variation in PaletteGenerations */}
                {paletteVariations
                  .find(
                    (paletteVariation) =>
                      paletteVariation.variation === variation
                  )
                  ?.palette.map((color, index) => (
                    <div
                      key={index}
                      className="w-full h-20 my-2"
                      style={{
                        borderRadius: `${index === 0 ? '8px 0 0 8px' : index === palette.length - 1 ? '0 8px 8px 0' : '0'}`,
                        backgroundColor: `#${color.hexcode}`,
                      }}
                    ></div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
