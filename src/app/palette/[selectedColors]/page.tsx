import { validateColors } from '@/lib/generator';
import React from 'react';
import PaletteGenerator from './_components/generator';

export default async function page({
  params,
}: {
  params: Promise<{ selectedColors: string }>;
}) {

  const selectedColors = (await params).selectedColors;
  const validatedColors = validateColors(selectedColors);

// Okay so this what we need to do next
// - Set up a way to lock and unlock colors
// - Add a way to shuffle colors, keeping the locked ones in place
// Edit the UI for copying, changing, and deleting colors



  return (
    <section className="flex-1 flex w-full">
      <PaletteGenerator initialColors={validatedColors} />
    </section>
  );
}
