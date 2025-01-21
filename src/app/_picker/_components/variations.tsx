import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VariationsPalette from '../../palette/[selectedColors]/_components/util/palette-display';
import {
  generateHues,
  generateShades,
  generateTemperature,
  generateTints,
  generateTones,
} from '@/lib/single-color-conversions/variations';
import { Palette } from 'lucide-react';
import PaletteDisplay from '../../palette/[selectedColors]/_components/util/palette-display';

export default function Variations({ color }: { color: string }) {
  const variations = [
    { name: 'Shades', value: 'shades', function: generateShades(color) },
    { name: 'Tints', value: 'tints', function: generateTints(color) },
    { name: 'Tones', value: 'tones', function: generateTones(color) },
    { name: 'Hues', value: 'hues', function: generateHues(color) },
    {
      name: 'Temperature',
      value: 'temperature',
      function: generateTemperature(color),
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="shades" className="w-full font-inter h-full">
          <TabsList className="w-full flex-wrap h-full gap-2 lg:flex-nowrap">
            {variations.map((variation) => (
              <TabsTrigger
                key={variation.value}
                value={variation.value}
                className="w-full"
              >
                {variation.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {variations.map((variation) => {
            return (
              <TabsContent key={variation.value} value={variation.value}>
                <PaletteDisplay data={variation.function} />
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
