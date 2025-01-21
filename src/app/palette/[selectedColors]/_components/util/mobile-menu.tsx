'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2Icon } from 'lucide-react';

export default function MobileMenu() {
  const generateColors = () => {};
  return (
    <div className="relative bottom-0  mt-2 w-full flex items-center  font-inter font-semibold text-2xl gap-2 xl:hidden p-3">
      <Button
        onClick={() => generateColors()}
        className="w-full  h-14 text-xl font-syne font-semibold rainbow-bg"
      >
        Generate
      </Button>
      <Button className="h-14 w-[25%]">
        <Share2Icon size={48} />
      </Button>
    </div>
  );
}
