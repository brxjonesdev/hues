import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ColorCopy from '../util/copy-color';
import { Separator } from '@/components/ui/separator';
import Shades from '../util/shades';
import ContrastCheck from '../util/contrast';

export default function SwatchMenu({ color }: { color: string }) {
  return (
    <>
      <Card className="w-full border-none *:shadow-none mt-auto font-nunito rounded-none border-black pb-2">
        <CardHeader className="p-1 text-center">
          <ColorCopy color={color} />
        </CardHeader>
        <Separator />
        <CardContent className="p-1 flex justify-center">
          <div className="flex gap-2 w-full">
            <Shades color={color} />
            <ContrastCheck color={color} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
