import usePaletteGeneration from '@/features/palette-generation/hooks/usePaletteGeneration';
import MiniPalette from '@/shared/components/landing/mini-palette';
import { Button } from '@/shared/components/shadcn/button';
import { Brush } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const { generateRandomPalette } = usePaletteGeneration();
  return (
    <main className="flex-1 flex flex-col">
    <section className='flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 items-center justify-center bg-background/50 backdrop-blur-md'>
     <div className=' flex flex-col justify-center items-start p-8 rounded-xl gap-4'>
     <h1 className='text-6xl font-bold font-syne tracking-tight text-foreground'>
        Create <span>beautiful</span> palettes with ease.
      </h1>
      <p className='text-lg text-foreground/80 font-inter'>
        Generate beautiful color palettes with our easy-to-use palette generator.
        Choose from a variety of color generation methods and export your palette
        in various formats.
      </p>
      <Link href="/palette/generate" className='w-full'>
        <Button className='w-full font-syne h-12 text-md'>
          Start the Generator! <Brush />
        </Button>
      </Link>
     </div>
      <div className='space-y-4'>
        {generateRandomPalette(4).palettes.map((palette, index) => (
          <MiniPalette
            key={index}
            colors={palette.map((color) => ({
              hexcode: color.hexcode,
              index: color.index,
              isLocked: color.isLocked,
            }))}
          />
        ))}
      </div>
      
    </section>

  </main>
  
  );
}
