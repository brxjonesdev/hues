import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Colors from './_components/explore-colors';
import Gradients from './_components/explore-gradients';
import ShadcnThemes from './_components/explore-shadcn';

export default function ColorLibrary() {
  return (
    <section className="flex-1 font-nunito px-8 py-4 space-y-4 flex flex-col">
      <div>
        <h2 className="text-6xl font-bold">Library</h2>
        <p>View a collection of colors, gradients, and shadcn themes</p>
      </div>
      <Card className="flex-1 h-full flex flex-col mb-12">
        <CardHeader>
          <CardDescription>Click to copy or export to generator!</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="colors" className="w-full flex flex-col flex-1">
            <TabsList className="w-full">
              <TabsTrigger value="colors" className="w-full">Colors</TabsTrigger>
              <TabsTrigger value="gradients" className="w-full">Gradients</TabsTrigger>
              <TabsTrigger value="shadcn" className="w-full">Shadcn Themes</TabsTrigger>
            </TabsList>
            <TabsContent
              value="colors"
              className="flex-1 bg-black/5 rounded-xl p-4 overflow-y-auto"
            >
              <Colors />
            </TabsContent>
            <TabsContent value="gradients" className="flex-1 bg-black/5 rounded-xl p-4">
              <Gradients/>
            </TabsContent>
            <TabsContent value="shadcn" className="flex-1 bg-black/5 rounded-xl p-4">
              <ShadcnThemes/>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
