"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Expand, Copy, ChevronDown } from 'lucide-react'

export default function Picker() {
  const [color, setColor] = useState("#C2CB35")
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hue, setHue] = useState(0)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      setPosition({ x, y })
      setIsDragging(true)
      updateColor(x, y, hue)
    },
    [hue]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      setPosition({ x, y })
      updateColor(x, y, hue)
    },
    [isDragging, hue]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHue = parseInt(e.target.value)
      setHue(newHue)
      updateColor(position.x, position.y, newHue)
    },
    [position]
  )

  const updateColor = (x: number, y: number, hue: number) => {
    const h = hue
    const s = x * 100
    const v = (1 - y) * 100
    const color = HSVtoHex(h, s, v)
    setColor(color)
  }

  const HSVtoHex = (h: number, s: number, v: number) => {
    s /= 100
    v /= 100
    const hi = Math.floor(h / 60) % 6
    const f = h / 60 - Math.floor(h / 60)
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    let r = 0, g = 0, b = 0
    if (hi === 0) { [r, g, b] = [v, t, p] }
    else if (hi === 1) { [r, g, b] = [q, v, p] }
    else if (hi === 2) { [r, g, b] = [p, v, t] }
    else if (hi === 3) { [r, g, b] = [p, q, v] }
    else if (hi === 4) { [r, g, b] = [t, p, v] }
    else { [r, g, b] = [v, p, q] }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
  }

  return (
    <div className="p-4 w-full mx-auto">
      <Card className="relative overflow-hidden">
     
        <CardContent 
          className="h-40 flex items-center justify-center" 
          style={{ backgroundColor: color }}
        >
       
        </CardContent>
      </Card>

      <div className="mt-4 space-y-4">
        <div
          className="relative h-96 rounded-lg cursor-crosshair"
          style={{
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            backgroundImage: "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)"
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x * 100}%`,
              top: `${position.y * 100}%`,
              backgroundColor: color
            }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={handleHueChange}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)"
          }}
        />

        <div className="flex gap-2">
          <h3 className="font-inter text-3xl">
          {color}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                Picker
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy color
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

