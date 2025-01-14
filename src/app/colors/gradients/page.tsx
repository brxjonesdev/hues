import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StepColor from './_components/step-color';
import ColorToColor from './_components/color-to-color';

export default function Gradient() {
  return (
    <section className="flex-1 flex flex-col gap-4 p-4 items-center justify-center">
      <Tabs defaultValue="step" className="w-full max-w-7xl ">
        <TabsList className="w-full">
          <TabsTrigger value="step" className="w-full">
            Step Gradient
          </TabsTrigger>
          <TabsTrigger value="color" className="w-full">
            Color to Color
          </TabsTrigger>
        </TabsList>
        <TabsContent value="step">
          <StepColor />
        </TabsContent>
        <TabsContent value="color">
          <ColorToColor />
        </TabsContent>
      </Tabs>
    </section>
  );
}
