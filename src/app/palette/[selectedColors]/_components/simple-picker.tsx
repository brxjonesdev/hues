"use client"

import { useState, useCallback, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils/utils"

interface ColorPickerProps {
  value: string
  onChange?: (color: string) => void
  className?: string
}

type ColorMode = "hex" | "rgb" | "hsl"

interface RGB {
  r: number
  g: number
  b: number
}

interface HSL {
  h: number
  s: number
  l: number
}

export default function EnhancedMiniColorPicker({ value = "#C2CB35", onChange, className }: ColorPickerProps) {
  const [color, setColor] = useState(value)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hue, setHue] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>("hex")
  const [rgb, setRgb] = useState<RGB>({ r: 0, g: 0, b: 0 })
  const [hsl, setHsl] = useState<HSL>({ h: 0, s: 0, l: 0 })

  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor)
      onChange?.(newColor)
    },
    [onChange],
  )

  useEffect(() => {
    const rgb = hexToRgb(color)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    setRgb(rgb)
    setHsl(hsl)
    setHue(hsl.h)
  }, [color])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      setPosition({ x, y })
      setIsDragging(true)
      updateColor(x, y, hue)
    },
    [hue],
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
    [isDragging, hue],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    
  }, [])

  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHue = Number.parseInt(e.target.value)
      setHue(newHue)
      updateColor(position.x, position.y, newHue)
    },
    [position],
  )

  const updateColor = (x: number, y: number, hue: number) => {
    const s = x * 100
    const v = (1 - y) * 100
    const newColor = HSVtoHex(hue, s, v)
    handleColorChange(newColor)
  }

  const handleRgbChange = (channel: keyof RGB, value: number) => {
    const newRgb = { ...rgb, [channel]: value }
    const newColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    handleColorChange(newColor)
  }

  const handleHslChange = (channel: keyof HSL, value: number) => {
    const newHsl = { ...hsl, [channel]: value }
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    const newColor = rgbToHex(rgb.r, rgb.g, rgb.b)
    handleColorChange(newColor)
  }

  // Color conversion functions
  function HSVtoHex(h: number, s: number, v: number): string {
    s /= 100
    v /= 100
    const hi = Math.floor(h / 60) % 6
    const f = h / 60 - Math.floor(h / 60)
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    let r = 0,
      g = 0,
      b = 0
    if (hi === 0) {
      ;[r, g, b] = [v, t, p]
    } else if (hi === 1) {
      ;[r, g, b] = [q, v, p]
    } else if (hi === 2) {
      ;[r, g, b] = [p, v, t]
    } else if (hi === 3) {
      ;[r, g, b] = [p, q, v]
    } else if (hi === 4) {
      ;[r, g, b] = [t, p, v]
    } else {
      ;[r, g, b] = [v, p, q]
    }

    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))
  }

  function hexToRgb(hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  function rgbToHex(r: number, g: number, b: number): string {
    return `${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
  }

  function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s,
      l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  function hslToRgb(h: number, s: number, l: number): RGB {
    s /= 100
    l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    }
  }

  return (

    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "",
            className,
          )}
        >
          {/* <div className="h-8 w-full rounded-full " style={{ backgroundColor: color }} /> */}
          <span className="text-3xl font-semibold text-black/60">{color}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent 
      style={{backgroundColor: `#${color}`}}
      className="w-64 border-black/20" align="center">
      <div
              className="relative h-40 rounded-lg cursor-crosshair mb-4"
              style={{
                backgroundColor: `hsl(${hue}, 100%, 50%)`,
                backgroundImage:
                  "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
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
                  backgroundColor: color,
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={handleHueChange}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer mb-4"
              style={{
                background:
                  "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
              }}
            />
      
      </PopoverContent>
    </Popover>
  )
}

