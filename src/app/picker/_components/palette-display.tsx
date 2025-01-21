import { ColorType } from '@/lib/generation/hooks/usePalette';
import React from 'react';

export default function PaletteDisplay({ data }: { data: ColorType[] }) {
//  text color has to be right color based on contrast ratio
  return (
    <section className='flex w-full'>
      {data.map((color, index) => (
        <div
          key={index}
          className='font-inter hover:scale-110  transition-transform duration-300'
          style={{
            width: '100%',
            height: '100px', // Adjust height as needed
            backgroundColor: color.hexcode,
            borderRadius: `
              ${index === 0 ? '0.5rem 0 0 0.5rem' : index === data.length - 1 ? '0 0.5rem 0.5rem 0' : '0'}`
          }}
        >
          <p className=' h-full w-full flex flex-col justify-center items-center text-transparent hover:text-black'>{color.hexcode}</p>
        </div>
      ))}
    </section>
  );
}
