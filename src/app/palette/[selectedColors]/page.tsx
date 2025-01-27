"use client";
import React from 'react';
import { useParams, useSearchParams } from 'next/navigation'
import DraggableGrid from './_components/display';
import MobileDisplay from './_components/mobile-display';
function convertColors(colors: string, method: string): {
  rgb: string;
  isLocked: boolean;
  isBaseColor: boolean;
}[] {
  const colorArray = colors.split("-");
  const palette: {
    rgb: string;
    isLocked: boolean;
    isBaseColor: boolean;
  }[] = [];
  let baseColorCount = 0;
  let totalColors = 0;

  for (const color of colorArray) {
    // Extract RGB and flags
    const match = color.match(/^([0-9A-Fa-f]{6})(?:_(L|B))?$/);
    if (!match) {
      throw new Error(`Invalid color format: ${color}`);
    }

    const [_, hex, flag] = match;
    const isLocked = flag === "L";
    const isBaseColor = flag === "B";

    // Enforce constraints
    if (isBaseColor) {
      baseColorCount++;
      if (baseColorCount > 1) {
        throw new Error("There can only be one base color.");
      }
    }

    if (method && isLocked) {
      throw new Error("Locked colors are not allowed when a generation method is specified.");
    }




    if (isLocked && baseColorCount > 0) {
      throw new Error("Locked colors are not allowed when a base color exists.");
    }
    

    // Convert hex to RGB
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const rgb = `rgb(${r}, ${g}, ${b})`;

    if (totalColors > 9) {
      throw new Error("There can only be 10 colors.");
    }
    palette.push({ rgb, isLocked, isBaseColor,});
    totalColors++;
    
  }

  return palette;
}

export default function Generator() {
  const colors = useParams<{selectedColors: string;}>().selectedColors;
  const method = useSearchParams().get('generation');
  const palette = convertColors(colors, method as string);
  return <>
  <DraggableGrid palette={palette}/>
  <MobileDisplay palette={palette}/>
  </>
}
