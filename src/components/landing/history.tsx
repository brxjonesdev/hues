'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
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
    <div className="flex gap-2 lg:gap-4">
      <Button variant={'outline'} onClick={undo}>
        {' '}
        <ArrowLeft /> <span className="hidden lg:block">Undo</span>
      </Button>
      <Button variant={'outline'} onClick={redo}>
        <span className="hidden lg:block">Redo</span> <ArrowRight />
      </Button>
    </div>
  );
}
