'use client';
import React from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { randomizePalette } from '@/lib/generation';
import { useParams } from 'next/navigation';

export default function MobileMenu() {
  const router = useRouter();
  const params = useParams();
  const currentPalette = params.selectedColors as string;
  console.log(currentPalette, "current palette, lmoa")

  function addColor(currentPalette: string) {
    const colors = currentPalette.split('-');
    if (colors.length >= 10) {
      return;
    }
    const newColor = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0'); // Ensure it is exactly 6 characters
    const newPalette = [...colors, newColor].join('-');
    router.push(`/palette/${newPalette}`);
  }
  

  function handleRandomize(palette: string) {
     const newPalette = randomizePalette(palette)
        router.push(`/palette/${newPalette}`)
  }



  return (
    <section className='space-y-2 p-3 font-inter xl:hidden'>
    <div className="relative bottom-0  pt-0 w-full flex items-center   font-semibold text-2xl gap-2  ">
      <Button
        onClick={() => handleRandomize(currentPalette)}
        className="w-full  h-14 text-xl font-syne font-semibold rainbow-bg"
      >
        Generate
      </Button>
      <Button 
      variant={'outline'}
         onClick={() => addColor(currentPalette)}
      className="h-14 w-[25%]">
      <PlusIcon/>
      </Button>
    </div>
    </section>
  );
}
