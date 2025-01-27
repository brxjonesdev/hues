'use client';
import React from 'react';
import {
  Select,
  SelectContent,SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { exportToStyles } from '@/lib/exporting';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ExportPalette() {
  const [format, setFormat] = React.useState<string | null>(null);
  const exportMethods = ['CSS', 'SASS', 'Tailwind', 'JSON'];
  const palette = useParams().selectedColors;
  console.log(exportToStyles(palette as string, format as string));

  const handleCopy = () => {
    const textToCopy = exportToStyles(palette as string, format as string);
    navigator.clipboard.writeText(textToCopy as string).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy. Please try again.');
    });
  };
  // const {code,  error} = exportToStyles(palette, format);
  return (
    <section className="flex-1 flex flex-col w-full justify-between gap-2 font-syne">
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="format">Select Format</Label>
        <Select name="format" onValueChange={(value) => setFormat(value)}>
          <SelectTrigger className=" w-full font-syne">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent className='font-inter'>
            {exportMethods.map((method) => (
              <SelectItem
              key={method} 
              value={method}>{method}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator/>
      {format && (
      <section className="flex-1 flex flex-col gap-2 rounded-md">
          <div className="relative">
        <pre className="font-inter rounded-md whitespace-pre-wrap bg-white/5 p-2">
          {exportToStyles(palette as string, format)}
        </pre>
        <Button
          onClick={handleCopy}
          variant={'ghost'}
          className="absolute top-2 right-2 "
        >
          Copy
        </Button>
      </div>
      </section>
      )}
    </section>
  );
}
