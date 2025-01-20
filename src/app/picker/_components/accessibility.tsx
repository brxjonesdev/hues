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

export default function Accessibility({ color }: { color: string }) {
  const accessibility = [
    { name: 'Contrast Ratio', value: 'contrast-ratio', component: null },
    { name: 'Color Blindness', value: 'color-blindness', component: null },
    { name: 'Readability', value: 'readability', component: null },
    { name: 'WCAG Compliance', value: 'wcag-compliance', component: null },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility</CardTitle>
      </CardHeader>
      <CardContent>
       <Tabs defaultValue="contrast-ratio" className="w-full font-inter h-full">
          <TabsList className='w-full flex-wrap h-full gap-2 lg:flex-nowrap'>
            {accessibility.map((accessibility) => (
              <TabsTrigger key={accessibility.value} value={accessibility.value} className='w-full'>
                {accessibility.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {accessibility.map((accessibility) => {
            return (
              <TabsContent key={accessibility.value} value={accessibility.value}>
                {accessibility.component}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
