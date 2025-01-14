import '../../globals.css';
import { ColorNavMenu } from '@/app/palette/[selectedColors]/_components/util/navbar';
import History from '@/components/landing/history';
import ManualGeneration from '@/components/landing/manual-generate';
import { Share2Icon, TvMinimalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaletteProvider } from '@/lib/hooks/usePalette';

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
        <div className="border-b border-gray-200 font-nunito justify-between px-4 items-center hidden lg:flex">
          <div className="flex items-center gap-4">
            <History />
            <p className="text-sm hidden xl:block">
              Press Space to shuffle colors
            </p>
          </div>
          <ColorNavMenu colors={colors} />
        </div>

        {/* Main Content */}
        {children}

        {/* Mobile Footer */}
        <div className="relative bottom-0 w-full flex items-center justify-between font-nunito font-semibold text-2xl gap-2 lg:hidden p-3">
          <ManualGeneration />
          <div className="flex gap-4">
            <History />
            <Button>
              <Share2Icon />
            </Button>
            <Button>
              <TvMinimalIcon />
            </Button>
          </div>
        </div>
      </div>
    </PaletteProvider>
  );
}
