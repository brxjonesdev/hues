import { CardTitle } from '@/components/ui/card';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export default function ColorCopy({ color }: { color: string }) {
  return (
    <>
      <Popover>
        <PopoverTrigger className="hidden lg:block">
          <CardTitle className={`text-2xl font-bold m89 hover:text-[${color}]`}>
            {color}
          </CardTitle>
        </PopoverTrigger>
        <PopoverContent side="top"  className="w-full">
          <section>
            <div>
              <Label>Copy Color as:</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hex">Hex</SelectItem>
                    <SelectItem value="rgb">RGB</SelectItem>
                    <SelectItem value="hsl">HSL</SelectItem>
                    <SelectItem value="cmyk">CMYK</SelectItem>
                    <SelectItem value="pantone">Pantone</SelectItem>
                    <SelectItem value="ral">RAL</SelectItem>
                    <SelectItem value="xyz">XYZ</SelectItem>
                    <SelectItem value="lab">CIELAB</SelectItem>
                    <SelectItem value="lch">CIE-LCH</SelectItem>
                    <SelectItem value="hwb">HWB</SelectItem>
                    <SelectItem value="yuv">YUV</SelectItem>
                    <SelectItem value="ycbcr">YCbCr</SelectItem>
                    <SelectItem value="cmy">CMY</SelectItem>
                    <SelectItem value="hsb">HSB</SelectItem>
                    <SelectItem value="hsluv">HSLuv</SelectItem>
                    <SelectItem value="cieluv">CIELUV</SelectItem>
                    <SelectItem value="munsell">Munsell</SelectItem>
                    <SelectItem value="adobe-rgb">Adobe RGB</SelectItem>
                    <SelectItem value="rec709">Rec. 709</SelectItem>
                    <SelectItem value="rec2020">Rec. 2020</SelectItem>
                    <SelectItem value="x11">X11</SelectItem>
                    <SelectItem value="web-safe">Web-safe</SelectItem>
                    <SelectItem value="true-color">TrueColor</SelectItem>
                    <SelectItem value="duotone">Duotone</SelectItem>
                  </SelectContent>
                </Select>
                <Button size={'icon'}>
                  <Copy />
                </Button>
              </div>
            </div>
          </section>
        </PopoverContent>
      </Popover>

      <CardTitle className="text-md lg:hidden">{color}</CardTitle>
    </>
  );
}
