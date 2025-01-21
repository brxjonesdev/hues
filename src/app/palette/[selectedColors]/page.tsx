import React from 'react';
import InvalidColors from './_components/util/invalid-colors';
import {
  convertHexstring,
  validateHexString,
} from '@/lib/generation/generation-utils';
import Generator from './_components/generators/generator';

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ selectedColors: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const colors = (await params).selectedColors;
  const method = (await searchParams).generation;
  const validatedColors = validateHexString(colors);
  if (validatedColors.error) {
    return <InvalidColors error={validatedColors.error} />;
  }

  const palette = convertHexstring(validatedColors.value as string);
  console.log(palette, 'palette in page');

  return (
    <section className="flex-1 flex w-full">
      <Generator colors={palette} method={method} />
    </section>
  );
}
