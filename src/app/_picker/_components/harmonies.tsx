import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateAnalogous, generateComplementary, generateSplitComplementary, generateTetradic, generateTriadic } from '@/lib/single-color-conversions/harmonies';
import PaletteDisplay from '../../palette/[selectedColors]/_components/util/palette-display';

export default function Harmonies({ color }: { color: string }) {
  const harmonies = [
    { name: 'Complementary', value: 'complementary', function:generateComplementary(color) },
    { name: 'Analogous', value: 'analogous', function: generateAnalogous(color) },
    { name: 'Triadic', value: 'triadic', function: generateTriadic(color) },
    {
      name: 'Split Complementary',
      value: 'split-complementary',
     function: generateSplitComplementary(color),
    },
    { name: 'Tetradic', value: 'tetradic', function: generateTetradic(color) },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Harmony</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="complementary" className="w-full font-inter h-full">
          <TabsList className="w-full flex-wrap h-full gap-2 lg:flex-nowrap">
            {harmonies.map((harmony) => (
              <TabsTrigger
                key={harmony.value}
                value={harmony.value}
                className="w-full"
              >
                {harmony.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {harmonies.map((harmony) => {
            return (
              <TabsContent key={harmony.value} value={harmony.value}>
                <PaletteDisplay data={harmony.function} />
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
