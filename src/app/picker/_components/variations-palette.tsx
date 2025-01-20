"use client"
import React,{useState} from 'react'

type PaletteColor = {
    hexcode: string;
    index: number;
}


export default function VariationsPalette({color, variation}: {color: string, variation: string}) {
    
    const [palette, setPalette] = useState<PaletteColor[]>([{
        hexcode: '#FFFFFF',
        index: 0
    },]);

    switch (variation) {
        case 'shades':
            // return shades palette
            break;
        case 'tints':
            // return tints palette
            break;
        case 'tones':
            // return tones palette
            break;
        case 'hues':
            // return hues palette
            break;
        case 'temperature':
            // return temperature palette
            break;
        default:
            break;
    }
  return (
    <section>
        
    </section>
  )
}
