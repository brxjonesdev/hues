import React from 'react';
import MethodlessGenerator from './_components/generators/methodless_generator';
import MethodGenerator from './_components/generators/method_generator';
import InvalidColors from './_components/util/invalid-colors';
import { validateHexString } from '@/lib/generation/generation-utils';

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ selectedColors: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const colors = (await params).selectedColors;
  const method = (await searchParams).generation;
  // Validate HEX colors put into the URL manually.
  const validatedColors = validateHexString(colors);
  if (validatedColors === false) {
    // Later come back and customize this 404 page.
    return <InvalidColors/>
  }

  console.log(validatedColors, "validatedColors");


  return (
    <section className="flex-1 flex w-full">
      {!method ? 
      <MethodlessGenerator colors={validatedColors} /> : 
      <MethodGenerator colors={validatedColors} method={method} />}
      
    </section>
  );
}
