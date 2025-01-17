"use client"

import { useState, useCallback } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  value: string
  onChange?: (color: string) => void
  className?: string
}

export default function MiniColorPicker({ value = "#C2CB35", onChange, className }: ColorPickerProps) {
  const [color, setColor] = useState(value)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hue, setHue] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor)
    onChange?.(newColor)
  }, [onChange])

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
    handleColorChange(color)
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
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
            className
          )}
        >
          <span className="text-3xl lg:text-5xl font-bold uppercase text-black/70 border-black/10">{value}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 rounded-2xl" align="center">
        <div className="grid gap-4">
            <div className="h-12 rounded-xl" style={{ backgroundColor: color }}>

            </div>
          <div
            className="relative h-32 rounded-lg cursor-crosshair"
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
              className="absolute w-3 h-3 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                backgroundColor: color
              }}
            />
          </div>

          <div className="grid gap-2">
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
          </div>
          {/*
          Secondary color menu 
          
          */}

        
        </div>
      </PopoverContent>
    </Popover>
  )
}

