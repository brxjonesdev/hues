"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"

const rgbToHex = ({ r, g, b }: RGB) =>
  `#${[r, g, b]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`

const hexToRgb = (hex: string): RGB => {
  const match = hex.match(/[\da-f]{2}/gi)
  if (match && match.length === 3) {
    return {
      r: Number.parseInt(match[0], 16),
      g: Number.parseInt(match[1], 16),
      b: Number.parseInt(match[2], 16),
    }
  }
  return { r: 0, g: 0, b: 0 } // Default to black if parsing fails
}

type RGB = { r: number; g: number; b: number }
type HSV = { h: number; s: number; v: number }

const rgbToHsv = ({ r, g, b }: RGB): HSV => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
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

  return { h: h * 360, s: s * 100, v: v * 100 }
}

const hsvToRgb = ({ h, s, v }: HSV): RGB => {
  h /= 360
  s /= 100
  v /= 100
  let r, g, b
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }

  return {
    r: Math.round(r! * 255),
    g: Math.round(g! * 255),
    b: Math.round(b! * 255),
  }
}


export default function ColorPicker({ initColor, onChange }: { initColor: string; onChange: (color: string) => void }) {
  const router = useRouter()
  const [hsv, setHsv] = useState<HSV>(() => rgbToHsv(hexToRgb(initColor)))
  const pickerRef = useRef<HTMLDivElement>(null)

  const handleColorChange = (newColor: RGB) => {
    onChange(newColor)
    setHsv(rgbToHsv(newColor))
    console.log("colorchnage")
  }

  const handleHsvChange = (newHsv: HSV) => {
    setHsv(newHsv)
    const newRgb = hsvToRgb(newHsv)
    
  }

  const handlePickerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const updateColor = (clientX: number, clientY: number) => {
      if (pickerRef.current) {
        const rect = pickerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
        handleHsvChange({ ...hsv, s: x * 100, v: (1 - y) * 100 })
      }
    }

    updateColor(e.clientX, e.clientY)

    const handleMouseMove = (e: MouseEvent) => {
      updateColor(e.clientX, e.clientY)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      router.push(`/palette/${rgbToHex(initColor).replace("#", "")}`)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <section className="space-y-4">
      <div className="relative w-full h-40 mb-2" ref={pickerRef} onMouseDown={handlePickerMouseDown}>
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `
                linear-gradient(to top, #000, transparent),
                linear-gradient(to right, #fff, rgba(255,255,255,0)),
                hsl(${hsv.h}, 100%, 50%)
              `,
          }}
        />
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: rgbToHex(initColor),
          }}
        />
      </div>
      <Slider
        min={0}
        max={360}
        step={1}
        value={[hsv.h]}
        onValueChange={([h]) => handleHsvChange({ ...hsv, h })}
        className="h-4 rounded-xl bg-[linear-gradient(to_right,#f00_0%,#ff0_17%,#0f0_33%,#0ff_50%,#00f_67%,#f0f_83%,#f00_100%)]"
      />
      <Input
        value={rgbToHex(initColor)}
        onChange={(e) => handleColorChange(hexToRgb(e.target.value))}
        className="font-mono"
      />
    </section>
  )
}

