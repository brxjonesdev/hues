import '../../globals.css';
import { ColorNavMenu } from '@/app/palette/[selectedColors]/_components/navbar';
import History from '@/shared/components/landing/history';
import MobileMenu from './_components/mobile-menu';
import { Toaster } from '@/shared/components/shadcn/toaster';
import SingleColor from './_components/single-color';
import { HexToRGB } from '@/lib/utils/conversions';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ selectedColors: string }>;
}>) {
  const { selectedColors } = await params;
  const colorParts = selectedColors.split('-');
  if (colorParts.length === 1)
    return <SingleColor color={HexToRGB(colorParts[0])} />;

  return (
    <div className="flex-1 flex flex-col">
      <div className="font-syne  px-4 items-center hidden xl:flex gap-3 flex-row-reverse justify-between">
        <History />
        <ColorNavMenu colors={selectedColors} />
      </div>
      {children}
      <Toaster />
      <MobileMenu />
    </div>
  );
}
