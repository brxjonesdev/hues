'use client';

import { useState } from 'react';
import { ColorPalette } from '@/components/ColorPalette';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for color palettes
const colorPalettes = [
  {
    id: 1,
    name: 'Sunset',
    colors: ['#FF4E50', '#FC913A', '#F9D62E', '#ECE473', '#E1F5C4'],
  },
  {
    id: 2,
    name: 'Ocean',
    colors: ['#004E66', '#007BA7', '#2E9CCA', '#00DFFC', '#89E8FF'],
  },
  {
    id: 3,
    name: 'Forest',
    colors: ['#1A4314', '#3E8914', '#6CD025', '#B5E655', '#EAFEC5'],
  },
  {
    id: 4,
    name: 'Lavender',
    colors: ['#4A0E4E', '#81267B', '#B24592', '#E16B8C', '#EFBBCC'],
  },
  {
    id: 5,
    name: 'Autumn',
    colors: ['#8C2703', '#BF4904', '#F2A413', '#F2C641', '#F2E0C9'],
  },
];

const categories = ['All', 'Warm', 'Cool', 'Pastel', 'Vibrant'];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPalettes = colorPalettes.filter((palette) =>
    palette.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen font-nunito">
      <div className="w-full md:w-2/12 p-4 border-b-2 md:border-b-0 md:border-r-2">
        <h2 className="text-2xl font-bold mb-4">Explore Palettes</h2>
        <Input
          type="search"
          placeholder="Search palettes..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <ScrollArea className="w-full md:w-10/12 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {filteredPalettes.map((palette) => (
            <ColorPalette key={palette.id} name={palette.name} colors={palette.colors} />
          ))} */}
        </div>
      </ScrollArea>
    </section>
  );
}
