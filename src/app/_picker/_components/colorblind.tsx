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
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Blindness</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
