import React from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Link from 'next/link';

export default function MiniPalette({
  colors,
}: {
  colors: {
    hexcode: string;
    index: number;
    isLocked: boolean;
}[];
}) {
  return (
    <>
      <div className="flex justify-end flex-col gap-2 items-end">
        <section className="flex w-full">
          {colors.map((color, index) => (
            <div
              key={index}
              className="font-inter hover:scale-110  transition-transform duration-300"
              style={{
                width: '100%',
                height: '100px', // Adjust height as needed
                backgroundColor: color.hexcode,
                borderRadius: `
              ${index === 0 ? '0.5rem 0 0 0.5rem' : index === colors.length - 1 ? '0 0.5rem 0.5rem 0' : '0'}`,
              }}
            >
              <p className=" h-full w-full flex flex-col justify-center items-center text-transparent hover:text-black">
                {color.hexcode}
              </p>
            </div>
          ))}
        </section>
        <Link
          href={`/palette/${colors.map((color) => color.hexcode.replace('#', '')).join('-')}`}
          className="w-fit"
        >
          <Button variant={'ghost'} className="text-right w-fit mr-2">
            Export to Generator
          </Button>
        </Link>
      </div>
      <Separator />
    </>
  );
}
