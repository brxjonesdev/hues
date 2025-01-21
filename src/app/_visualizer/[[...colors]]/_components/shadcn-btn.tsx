import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function ShadcnUIToggle() {
  return (
    <Link href="/visualizer/shadcn">
      <Button
        className="bg-black absolute top-4 right-4  hover:text-black hover:rainbow-bg font-inter"
        variant={'outline'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path fill="none" d="M0 0h256v256H0z" />
          <path
            fill="none"
            stroke="#fafafa"
            strokeLinecap="round"
            stroke-linejoin="round"
            stroke-width="16"
            d="m208 128-80 80M192 40 40 192"
          />
        </svg>
        ShadcnUI Theme
      </Button>
    </Link>
  );
}
