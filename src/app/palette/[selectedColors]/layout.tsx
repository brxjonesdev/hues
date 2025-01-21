import '../../globals.css';
import { ColorNavMenu } from '@/app/palette/[selectedColors]/_components/util/navbar';
import History from '@/components/landing/history';
import ManualGeneration from '@/components/landing/manual-generate';
import { Share2Icon, TvMinimalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaletteProvider } from '@/lib/generation/hooks/usePalette';
import { Separator } from '@/components/ui/separator';
import MobileMenu from './_components/util/mobile-menu';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ selectedColors: string }>;
}>) {
  const colors = (await params).selectedColors;
  return (
    <PaletteProvider>
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <div className="font-syne  px-4 items-center hidden xl:flex gap-3 flex-row-reverse">
          <History />
          <Separator orientation="vertical" />
          <p className="text-sm hidden flex-1  text-center bg-white/15 p-0 h-[70%] rounded-2xl my-2 xl:flex items-center justify-center">
            Press Space to shuffle colors
          </p>
          <Separator orientation="vertical" />
          <ColorNavMenu colors={colors} />
        </div>

        {/* Main Content */}
        {children}

        {/* Mobile Footer */}
        <MobileMenu />
      </div>
    </PaletteProvider>
  );
}
