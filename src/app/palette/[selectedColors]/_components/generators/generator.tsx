"use client"
import { ColorType } from '@/lib/generation/hooks/usePalette';
import React, { useEffect } from 'react'
import MethodGenerator from './method';
import MethodlessGenerator from './methodless';
import { usePalette } from '@/lib/generation/hooks/usePalette';

export default function Generator({
    colors,
    method
    }: {
    colors: ColorType[] | boolean;
    method: string | undefined;
}) {
    const { setColors } = usePalette();
    useEffect(() => {
        if (Array.isArray(colors)) {
            setColors(colors);
        }
    }, [colors, setColors]);
    
    if (method){
        return <MethodGenerator method={method} />
    } else {
        return <MethodlessGenerator/>
    }
}
