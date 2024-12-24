import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <section className="p-4 lg:px-8 border-b border-gray-200 flex justify-between items-center font-raleway">
      <div>
        <p className="text-2xl font-bold">Palettr</p>
      </div>
      <div className='flex gap-4'>
        <Link href={"/pallete/saved"}><Button className=''>View Saved Palletes</Button></Link>
      </div>
      
    </section>
  );
}
