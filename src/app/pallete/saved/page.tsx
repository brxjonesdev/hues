import React from 'react'
import PalleteCard from './components/pallete-card'
import { useId } from 'react'
  

export default function SavedPalletes() {
    const savedPalettes = [
        { id: useId(), name: 'Sunset', colors: ['#FDCB6E', '#6C5CE7'] },
        { id: useId(), name: 'Forest', colors: ['#2D3436', '#636E72', '#6AB04C'] },
        { id: useId(), name: 'Pastel', colors: ['#FFF0DB', '#FFB7B2', '#FFDAC1', '#E2F0CB'] },
        { id: useId(), name: 'Neon', colors: ['#FF00FF', '#00FFFF', '#FF00AA', '#AA00FF', '#01FFC3'] },
    ]
  return (
    <section className='p-8 font-raleway space-y-4'>
        <div>
            <p className="text-2xl font-bold">Your Palletes</p>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
            {savedPalettes.map((palette) => (
                <PalleteCard key={palette.id} palette={palette} />
            ))}
        </div>

    </section>
  )
}
