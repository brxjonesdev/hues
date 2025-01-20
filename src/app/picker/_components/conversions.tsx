import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { HexToCMYK, HexToHSL, HexToLAB, HexToRGB } from '@/lib/conversions/conversions';

export default function Conversions({ color }: { color: string }) {
  const conversions = [
    { name: 'HEX', value: 'hex', conversion: color },
    { name: 'RGB', value: 'rgb', conversion: HexToRGB(color) },
    { name: 'HSL', value: 'hsl', conversion: HexToHSL(color) },
    { name: 'HSV', value: 'hsv', conversion: HexToHSL(color) },
    { name: 'CMYK', value: 'cmyk', conversion: HexToCMYK(color) },
    { name: 'LAB', value: 'lab', conversion: HexToLAB(color) },
  ]
  return (
    <Card>  
      <CardHeader>
        <CardTitle>Conversions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {conversions.map((conversion) => (
            <Button key={conversion.value} className='flex items-center gap-2' variant='outline' size='lg'
            onClick={() => navigator.clipboard.writeText(conversion.conversion)}>
              <span>{conversion.name}</span>
              /
              <span>{conversion.conversion}</span>
              <Copy/>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
