import { Button } from '@/components/ui/button';
import {
  CopyIcon,
  LockIcon,
  PlusSquare,
  Trash2,
  UnlockIcon,
} from 'lucide-react';
import React from 'react';

export default function MobileDisplay({
  palette,
}: {
  palette: {
    rgb: string;
    isLocked: boolean;
    isBaseColor: boolean;
  }[];
}) {
  return (
    <section className="flex-1 flex flex-col gap-1 p-4 xl:hidden">
      {palette.map(({ rgb, isLocked }) => (
        <div
          key={rgb}
          style={{ backgroundColor: rgb }}
          className="h-full rounded-lg flex items-center justify-center"
        >
          <div className="font-inter text-2xl font-bold uppercase flex items-center gap-2 justify-around w-full px-8">
            <h5 className="text-black/60">21gb2</h5>
            <div>
              <Button className="text-black/60" size="icon" variant={'ghost'}>
                <CopyIcon />
              </Button>
              {isLocked ? (
                <Button className="text-black/60" size="icon" variant={'ghost'}>
                  <LockIcon />
                </Button>
              ) : (
                <Button className="text-black/60" size="icon" variant={'ghost'}>
                  <UnlockIcon />
                </Button>
              )}
              <Button className="text-black/60" size="icon" variant={'ghost'}>
                <Trash2 />
              </Button>
            </div>
          </div>
        </div>
      ))}
      {palette.length < 10 && (
        <Button className="py-8 font-inter text-md" variant={'outline'}>
          <PlusSquare /> Add Color
        </Button>
      )}
    </section>
  );
}
