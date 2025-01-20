'use client';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Picker from './_components/picker';
import Conversions from './_components/conversions';
import Variations from './_components/variations';
import Harmonies from './_components/harmonies';
import Accessibility from './_components/accessibility';
import { useSearchParams } from 'next/navigation';


// TODO:
// - Changing the color should update the URL
// All of the sub-components should be able to handle a color prop
// Add selectors for the different color variations
// left side should scroll independently of the right side

export default function ColorPicker() {
  const searchParams = useSearchParams();
  const color = searchParams.get('color');
 

  if(!color) return (
    <section className='flex items-center justify-center h-full font-inter text-3xl'>
      <span>Loading...</span>
    </section>
  );

  return (
    <section className="p-2 lg:px-8 flex font-nunito flex-col lg:flex-row flex-1">
      <div className="lg:w-2/6 p-4">
      <Picker
            color={color}
            onColorChange={(color: string) => setColor(color)}
          />
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <section className="lg:w-4/6 p-4 space-y-4 overflow-y-scroll font-inter">
        <Conversions color={color} />
        <Variations color={color} />
        <Harmonies color={color} />
        <Accessibility color={color} />
      </section>
    </section>
  );
}
