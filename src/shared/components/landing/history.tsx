'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '../shadcn/button';
import { useRouter } from 'next/navigation';

export default function History() {
  const router = useRouter();

  const undo = () => {
    router.back();
  };

  const redo = () => {
    router.forward();
  };
  return (
    <div className="flex gap-2 lg:gap-4 min-w-[500px] pr-4">
      <Button variant={'outline'} onClick={undo} className="w-full">
        {' '}
        <ArrowLeft /> <span className="hidden lg:block">Undo</span>
      </Button>
      <Button variant={'outline'} onClick={redo} className="w-full">
        <span className="hidden lg:block">Redo</span> <ArrowRight />
      </Button>
    </div>
  );
}
