import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Harmonies({ color }: { color: string }) {
  const harmonies= [
    { name: 'Complementary', value: 'complementary', component: null },
    { name: 'Analogous', value: 'analogous', component: null },
    { name: 'Triadic', value: 'triadic', component: null },
    { name: 'Split Complementary', value: 'split-complementary', component: null },
    { name: 'Tetradic', value: 'tetradic', component: null },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Harmony</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="complementary" className="w-full font-inter h-full">
          <TabsList className='w-full flex-wrap h-full gap-2 lg:flex-nowrap'>
            {harmonies.map((harmony) => (
              <TabsTrigger key={harmony.value} value={harmony.value} className='w-full'>
                {harmony.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {harmonies.map((harmony) => {
            return (
              <TabsContent key={harmony.value} value={harmony.value}>
                {harmony.component}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
