import '../../globals.css';
import { ColorNavMenu } from '@/app/palette/[selectedColors]/_components/util/navbar';
import History from '@/components/landing/history';
import { PaletteProvider } from '@/lib/generation/hooks/usePalette';
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
        <div className="font-syne  px-4 items-center hidden xl:flex gap-3 flex-row-reverse justify-between">
          <History /> 
          <ColorNavMenu colors={colors} />
        </div>
        {children}
        <MobileMenu />
      </div>
    </PaletteProvider>
  );
}
