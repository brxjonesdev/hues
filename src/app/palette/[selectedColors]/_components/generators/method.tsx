'use client';
import React, { useEffect } from 'react';
import InvalidColors from '../util/invalid-colors';
import { usePalette } from '@/lib/generation/hooks/usePalette';

export default function MethodGenerator({
  method
}: {
    method: string | undefined;
}) {
  const { palette, setColors } = usePalette();
  console.log(method);


  // Setting the colors when the component mounts. Refactor this to a custom hook later.
  useEffect(() => {
    if (Array.isArray(initialColors)) {
      setColors(initialColors); // Set the colors when `initialColors` is passed
    }
  }, [colors, setColors]);

  if (!colors) {
    return <InvalidColors />;
  }

//  Add the useEffect hook for generating random colors when the space bar is pressed and by the generation method

 

  const colorsToDisplay = palette.length > 0 ? palette : (Array.isArray(colors) ? colors : []);

  return (
    <section className="flex-1 flex w-full justify-between">
      <div className="flex flex-1 justify-between flex-col lg:flex-row">
       
      </div>
    </section>
  );
}
