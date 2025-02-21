"use client"
import { useState } from "react";
import { RgbColorPicker } from "react-colorful";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RGBToCMYK, RGBToHEX, RGBToHSB, RGBToHSL, RGBToLAB } from '@/lib/utils/conversions';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateName, getAnalagousColors, getComplementaryColors, getShades, getSplitComplementaryColors, getSquareColors, getTetradicColors, getTints, getTones, getTriadicColors } from '@/lib/utils/transformations';
import { useRouter } from "next/navigation";

export default function SingleColor({ color }: { color: string }) {
  console.log(color)
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(color);
  const { toast } = useToast();
  
  const colorInfo = [
    { name: 'Shades', tagline: 'Darker shades of this color', data: getShades(color) },
    { name: 'Tints', tagline: 'Lighter shades of this color', data: getTints(color) },
    {
      name: 'Tones',
      tagline: 'Less saturated versions of this color',
      data: getTones(color),
    },
    {
      name: 'Analogous',
      tagline: 'Colors that are next to this color on the color wheel',
      data: getAnalagousColors(color),
    },
    {
      name: 'Complementary',
      tagline: 'The color opposite this color on the color wheel',
      data: getComplementaryColors(color),
    },
    {
      name: 'Triadic',
      tagline: 'Colors that are evenly spaced around the color wheel',
      data: getTriadicColors(color),
    },
    {
      name: 'Split Complementary',
      tagline: 'Colors that are evenly spaced around the color wheel',
      data: getSplitComplementaryColors(color),
    },
    {
      name: 'Tetradic',
      tagline: 'Colors that are evenly spaced around the color wheel',
      data: getTetradicColors(color),
    },
    {
      name: "Square",
      tagline: "Colors that are evenly spaced around the color wheel",
      data: getSquareColors(color),
    }
  ];
  const conversions = [
     { name: 'RGB', data: color },
    { name: 'HEX', data: `#${RGBToHEX(color)}` },
    { name: 'HSL', data: RGBToHSL(color) },
    { name: 'LAB', data: RGBToLAB(color) },
    { name: 'CMYK', data: RGBToCMYK(color) },
    { name: 'HSB', data: RGBToHSB(color) },
  ]

  function copyConversion(conversion: string) {
    navigator.clipboard.writeText(conversion);
    toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }

  return (
    <section className="flex-1 flex justify-center flex-col items-center max-w-5xl mx-auto w-full  ">
      <div className="w-full p-4 flex flex-col gap-4 lg:flex-row">
      <Card className="xl:w-fit flex flex-col gap-4">
      <CardHeader
        style={{ backgroundColor: selectedColor }}
        className="w-full rounded-t-lg flex items-center justify-center font-syne text-black/70 text-md text-center font-semibold min-h-48 transition-all"
      >
        {generateName(selectedColor)}
      </CardHeader>
      <CardContent className="w-full xl:w-fit flex flex-col items-center gap-4 p-4">
        <div className="w-fit">
          <RgbColorPicker
            color={hexToRgb(selectedColor)}
            onChange={(rgb) => setSelectedColor(rgbToHex(rgb))}
            onMouseUp={() => router.push(`/palette/${RGBToHEX(selectedColor).replace("#", "")}`)}
            className="w-full h-[250px] rounded-lg shadow-md"
          />
        </div>
      </CardContent>
    </Card>


        <Card className="h-fit w-full  font-syne overflow-y-scroll">
          <CardHeader>
            <CardTitle className="text-xl">Conversions</CardTitle>
          </CardHeader>
          <CardContent className=" grid grid-cols-1 gap-4 overflow-y-scroll">
            {conversions.map((conversion, index) => (
              <div key={index} className="flex flex-row items-center justify-between bg-white/10 p-2 px-4 rounded-xl">
                <div className='flex gap-4'>
                <div className="text-md">{conversion.name}</div>
                /
                <div className="text-md">{conversion.data}</div>
                </div>
                <Button size={"icon"} variant={"ghost"}
                  onClick={() => copyConversion(conversion.data)}
                >
                  <Copy/>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="w-full flex flex-col items-center justify-center p-4 gap-4 overflow-y-scroll max-h- ">
        {colorInfo.map((info, index) => (
          <Card className="w-full font-inter" key={index}>
            <CardHeader>
              <CardTitle>{info.name}</CardTitle>
              <CardDescription>{info.tagline}</CardDescription>
            </CardHeader>
            <CardContent
              className="flex  gap-4 overflow-y-scroll">{
              info.data.map((shade, index) => (
                <div
                  key={index}
                  className="min-h-16 min-w-16 w-full rounded flex items-center justify-center text-black/50"
                  style={{
                    backgroundColor: shade,
                  }}
                > 
                </div>
              ))
              }</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


// Helper functions to convert between RGB and Hex
function hexToRgb(hex: string) {
  const match = hex.match(/\d+/g)?.map(Number);
  return match ? { r: match[0], g: match[1], b: match[2] } : { r: 255, g: 255, b: 255 };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `rgb(${r}, ${g}, ${b})`;
}