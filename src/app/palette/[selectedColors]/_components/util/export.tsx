import React from 'react';
import { usePalette } from '@/lib/generation/hooks/usePalette';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeDisplay from './code-display';
export default function ExportPalette() {
  const { palette } = usePalette();
  const exportMethods = ['CSS', 'SASS', 'Tailwind', 'JSON', 'URL'];
  return (
    <section className="flex-1 flex flex-col w-full justify-between gap-2 font-syne">
      <Tabs defaultValue="CSS" className="w-full">
        <TabsList className="w-full">
          {exportMethods.map((method) => {
            return (
              <TabsTrigger key={method} value={method} className="w-full">
                {method}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {exportMethods.map((method) => {
          return (
            <TabsContent key={method} value={method}>
              <CodeDisplay data={generateCode(palette, method)} />
              
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
