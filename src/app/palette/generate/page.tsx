/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { randomHexGeneration } from '@/lib/generation/generation-methods';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function GeneratePalettePage() {
  const router = useRouter();
  const generateNewPalette = () => {
    const colors = randomHexGeneration();
    const palleteSlug = `/palette/${colors}`;

    router.push(palleteSlug);
  };

  React.useEffect(() => {
    generateNewPalette();
  }, []);

  const randomGenerationMessages = [
    'Concocting a new palette for you!',
    'These colors are going to be amazing!',
    'Just a few more seconds...',
    'Creating a new palette...',
    'Almost there!',
  ];
  const message =
    randomGenerationMessages[
      Math.floor(Math.random() * randomGenerationMessages.length)
    ];

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
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-1 rainbow-bg rounded-b-xl"></CardFooter>
      </Card>
    </section>
  );
}
