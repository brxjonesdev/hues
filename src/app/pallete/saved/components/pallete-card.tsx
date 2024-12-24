import React from 'react'
import {
    Card,
    CardContent,

    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
  

export default function PalleteCard({palette}: {palette: {id: string, name: string, colors: string[]}}) {
  return (
    <Card className='shadow-none font-raleway'>
  <CardHeader>
    <CardTitle className='text-2xl'>{palette.name}</CardTitle>
  </CardHeader>
  <CardContent>
    <div className='flex gap-1'>
      {palette.colors.map((color) => (
        <div key={color} className='h-20 w-full rounded-lg flex items-center justify-center' style={{backgroundColor: color}}>
            <Copy className='w-full h-full p-8 opacity-0 hover:opacity-65' />
        </div>
      ))}
    </div>
  </CardContent>
  <CardFooter className='w-full'>
    <Button className='w-full'>Export</Button>
  </CardFooter>
</Card>

  )
}
