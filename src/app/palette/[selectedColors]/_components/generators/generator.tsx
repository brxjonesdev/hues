'use client';
import { ColorType } from '@/lib/generation/hooks/usePalette';
import React, { useEffect } from 'react';
import MethodGenerator from './method';
import MethodlessGenerator from './methodless';
import { usePalette } from '@/lib/generation/hooks/usePalette';

export default function Generator({
  colors,
  method,
}: {
  colors: ColorType[] | boolean;
  method: string | undefined;
}) {
  const { palette, setColors } = usePalette();
  useEffect(() => {
    if (!palette.length) {
      setColors(colors as ColorType[]);
    }
  }, [colors, palette.length, setColors]);

  if (method) {
    return <MethodGenerator method={method} />;
  } else {
    return <MethodlessGenerator />;
  }
}
