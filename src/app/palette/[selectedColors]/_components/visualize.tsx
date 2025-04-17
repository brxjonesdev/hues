import React from 'react';
import { ScrollArea } from '@/shared/components/shadcn/scroll-area';
import { Label } from '@/shared/components/shadcn/label';
import { convertHexstring } from '@/lib/generation';
import { applyColorBlindness } from '@/lib/accessibility';
import { useParams } from 'next/navigation';

export default function Visualize() {
  const { selectedColors } = useParams();
  const colors = convertHexstring(
    Array.isArray(selectedColors)
      ? selectedColors.join('-')
      : selectedColors || ''
  );

  console.log(colors, "taste")

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
            <div className="flex flex-col gap-2" key={variation}>
              <Label className="font-syne">{variation}</Label>
              <div className="flex items-center justify-center">
                <PaletteDisplay data={applyColorBlindness(colors, variation as "Normal" | "Protanopia" | "Deuteranopia" | "Tritanopia" | "Achromatopsia" | "Protanomaly" | "Deuteranomaly" | "Tritanomaly" | "Achromatomaly")} />
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}

function PaletteDisplay({ data }: { data: { hexcode: string }[] }) {
  console.log(data, "data taste")
  return (
    <section className="flex w-full">
      {data.map((color, index) => (
        <div
          key={index}
          className="font-inter hover:scale-110  transition-transform duration-300"
          style={{
            width: '100%',
            height: '80px', // Adjust height as needed
            backgroundColor: `${color.hexcode}`,
            borderRadius: `
              ${index === 0 ? '0.5rem 0 0 0.5rem' : index === data.length - 1 ? '0 0.5rem 0.5rem 0' : '0'}`,
          }}
        >
          <p className=" h-full w-full flex flex-col justify-center items-center text-transparent hover:text-black text-sm font-inter">
            {color.hexcode}
          </p>
        </div>
      ))}
    </section>
  );
}
