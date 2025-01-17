/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { randomHexGeneration } from '@/lib/generation/generation-methods';

export default function GeneratePalettePage() {
  const router = useRouter();
  const generateNewPalette = () => {
    const colors = randomHexGeneration();
    const palleteSlug = `/palette/${colors}`;
    console.log(palleteSlug);
    router.push(palleteSlug);
  };

  React.useEffect(() => {
    generateNewPalette();
  }, []);

  return (
    <section className="flex-1 flex w-full justify-center items-center flex-col gap-8 font-nunito">
      <div className="loader"></div>
      <p className="text-2xl font-semibold text-center">
        Generating your palette...
      </p>
    </section>
  );
}
