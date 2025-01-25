import React from 'react';

export default function PaletteDisplay({ data }: { data: { hexcode: string }[] }) {
  return (
    <section className='flex w-full'>
      {data.map((color, index) => (
        <div
          key={index}
          className='font-inter hover:scale-110  transition-transform duration-300'
          style={{
            width: '100%',
            height: '80px', // Adjust height as needed
            backgroundColor: `${color.hexcode}`,
            borderRadius: `
              ${index === 0 ? '0.5rem 0 0 0.5rem' : index === data.length - 1 ? '0 0.5rem 0.5rem 0' : '0'}`
          }}
        >
          <p className=' h-full w-full flex flex-col justify-center items-center text-transparent hover:text-black text-sm font-inter'>{color.hexcode}</p>
        </div>
      ))}
    </section>
  );
}
