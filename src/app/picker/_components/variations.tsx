import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VariationsPalette from './variations-palette';

export default function Variations({ color }: { color: string }) {
  const variations = [
    { name: 'Shades', value: 'shades', component: null },
    { name: 'Tints', value: 'tints', component: null },
    { name: 'Tones', value: 'tones', component: null },
    { name: 'Hues', value: 'hues', component: null },
    {name: 'Temperature', value: 'temperature', component: null},
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="shades" className="w-full font-inter h-full">
          <TabsList className='w-full flex-wrap h-full gap-2 lg:flex-nowrap'>
            {variations.map((variation) => (
              <TabsTrigger key={variation.value} value={variation.value} className='w-full'>
                {variation.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {variations.map((variation) => {
            return (
              <TabsContent key={variation.value} value={variation.value}>
                <VariationsPalette color={color} variation={variation.value} />
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
