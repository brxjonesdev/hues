"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

export default function RedirectToDefault() {
    const router = useRouter();
    React.useEffect(() => {
        router.push('/colors/picker/000000')
    }, [router])

  return null
}
