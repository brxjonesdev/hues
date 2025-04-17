
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcn/card';
import usePaletteGeneration from '@/features/palette-generation/hooks/usePaletteGeneration';

export default function GeneratePalettePage() {
  const router = useRouter();
  const { generateRandomHEXstring  } = usePaletteGeneration();


  const generatePalette = React.useCallback(() => {
    const hexString = generateRandomHEXstring();
    const url = `/palette/${hexString}`;
    router.push(url);
  }
, [generateRandomHEXstring, router]);

React.useEffect(() => {
    generatePalette();
}, [generatePalette]);



  return (
    <section
      className="flex-1 flex w-full justify-center items-center"
      suppressHydrationWarning
    >
      <Card className="w-full h-full max-w-2xl max-h-36 font-inter flex flex-col">
        <CardHeader>
          <CardTitle className="lg:text-2xl">
            Generating a Palette For You!
          </CardTitle>
          <CardDescription>
            We&apos;re now generating a random color palette for you. You can use it to create beautiful designs or just for fun!
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-1 rainbow-bg rounded-b-xl"></CardFooter>
      </Card>
    </section>
  );
}
