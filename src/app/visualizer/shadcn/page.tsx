"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"




type ColorKey =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "muted"
  | "muted-foreground"

const defaultColors: Record<ColorKey, string> = {
  background: "#ffffff",
  foreground: "#020817",
  card: "#ffffff",
  "card-foreground": "#020817",
  primary: "#0f172a",
  "primary-foreground": "#f8fafc",
  secondary: "#f1f5f9",
  "secondary-foreground": "#0f172a",
  accent: "#f1f5f9",
  "accent-foreground": "#0f172a",
  destructive: "#ef4444",
  "destructive-foreground": "#f8fafc",
  muted: "#f1f5f9",
  "muted-foreground": "#64748b",
}

export default function ThemeGenerator() {
  const [colors, setColors] = useState<Record<ColorKey, string>>(defaultColors)
  const [activeColor, setActiveColor] = useState<ColorKey | null>(null)

  const handleColorChange = (color: string) => {
    if (activeColor) {
      setColors((prevColors) => ({
        ...prevColors,
        [activeColor]: color,
      }))
    }
  }

  const generateThemeCSS = () => {
    return `
:root {
  --background: ${colors.background};
  --foreground: ${colors.foreground};
  --card: ${colors.card};
  --card-foreground: ${colors["card-foreground"]};
  --primary: ${colors.primary};
  --primary-foreground: ${colors["primary-foreground"]};
  --secondary: ${colors.secondary};
  --secondary-foreground: ${colors["secondary-foreground"]};
  --accent: ${colors.accent};
  --accent-foreground: ${colors["accent-foreground"]};
  --destructive: ${colors.destructive};
  --destructive-foreground: ${colors["destructive-foreground"]};
  --muted: ${colors.muted};
  --muted-foreground: ${colors["muted-foreground"]};
}
    `
  }

  const handleExport = () => {
    const css = generateThemeCSS()
    const blob = new Blob([css], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "shadcn-theme.css"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">shadcn Theme Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Theme Colors</CardTitle>
            <CardDescription>Adjust the colors for your theme</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {(Object.keys(colors) as ColorKey[]).map((colorKey) => (
                <AccordionItem value={colorKey} key={colorKey}>
                  <AccordionTrigger>{colorKey}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: colors[colorKey] }} />
                      <Input
                        value={colors[colorKey]}
                        onChange={(e) => handleColorChange(e.target.value)}
                        onClick={() => setActiveColor(colorKey)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button onClick={handleExport}>Export Theme</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Color Picker</CardTitle>
            <CardDescription>Pick a color for the selected theme variable</CardDescription>
          </CardHeader>
         
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your theme looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-muted-foreground">Muted text</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

