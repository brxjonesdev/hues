"use client";
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Picker from '../_components/picker';
import Conversions from '../_components/conversions';
import Variations from '../_components/variations';
import Harmonies from '../_components/harmonies';
import SimiliarColors from '../_components/similair-colors';
import Accessibility from '../_components/accessibility';
import Contrast from '../_components/contrast';

type ColorPickerProps = {
  params: Promise<{ color: string }>;
};

export default function ColorPicker({ params }: ColorPickerProps) {
   const [color, setColor] = React.useState<string>('');
React.useEffect(() => {
    const fetchColor = async () => {
      const { color } = await params;
      setColor(color);
    };
    fetchColor();
}, [params]);



  
  return (
    <section className="p-2 lg:px-8 flex font-nunito flex-col lg:flex-row flex-1">
      <div className='w-2/6 p-4'>
        <Picker color={color}/>
      </div>
      <Separator orientation='vertical' className='hidden lg:block' />
      <section className='w-4/6 p-4 space-y-4 overflow-y-scroll'>
        <Conversions color={color}/>
        <Variations color={color}/>
        <Harmonies color={color}/>
        <SimiliarColors color={color}/>
        <Accessibility color={color}/>
        <Contrast color={color}/>
      </section>
    </section>
  );
}
