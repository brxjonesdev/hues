/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { PlusIcon, LockIcon, Trash2, UnlockIcon, GripHorizontalIcon } from "lucide-react"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { RGBToHEX } from "@/lib/utils/conversions"
import { useSearchParams, useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import useSpacebarEffect from "@/hooks/use-spacebar"
import { randomizePalette } from "@/lib/generation"
import SingleColor from "./single-color"
import EnhancedMiniColorPicker from "./simple-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RgbColorPicker } from "react-colorful";

{
  /*
  
  - Swapping colors won't reset locked colors
  - users can update the colors
  
*/
}

export type ColumnData = {
  id: string
  rgb: string
  isLocked: boolean
  isBaseColor: boolean
  length: number
  onDelete: () => void
  toggleLock: () => void
  onColorChange: (id: string, newColor: string) => void
}

export interface DraggableGridProps {
  palette: ColumnData[]
  method: string
}

const SortableItem = ({ id, rgb, isLocked, onDelete, toggleLock, onColorChange }: ColumnData) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [currentColor, setCurrentColor] = useState(rgb);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    if (rgb !== currentColor) {
      setCurrentColor(rgb); // Only update if the color is different
    }
  }, [rgb]);

  const handleColorChange = (newColor: { r: number; g: number; b: number }) => {
    const rgbString = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    setCurrentColor(rgbString);
  };

  const handleColorChangeEnd = () => {
    onColorChange(id, currentColor); // Update state only when done dragging
  };

  return (
    <section
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: currentColor,
      }}
      {...attributes}
      className="bg-card text-card-foreground rounded-lg flex flex-col items-center justify-end h-full gap-4"
    >
      <div className="flex-1 w-full rounded-t-lg p-4"></div>

      <div
        {...listeners}
        className="w-full p-2 flex justify-center cursor-grab active:cursor-grabbing hover:bg-black/10"
      >
        <GripHorizontalIcon />
      </div>

      {/* Content */}
      <div className="font-inter text-center mb-16">
        <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
          <PopoverTrigger asChild>
            <p className="text-3xl font-bold text-black/60 cursor-pointer hover:underline">{RGBToHEX(currentColor)}</p>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-xs p-4 shadow-md rounded-lg">
            <RgbColorPicker
              color={hexToRgb(currentColor)}
              onChange={handleColorChange}
              onMouseUp={handleColorChangeEnd} // ✅ Only updates on mouse up
              className="w-full"
            />
          </PopoverContent>
        </Popover>

        <div className="flex gap-2 mt-2 justify-center">
          <Button onClick={toggleLock} className="text-black/60" size="icon" variant="ghost">
            {!isLocked ? <UnlockIcon /> : <LockIcon />}
          </Button>
          <Button onClick={onDelete} className="text-black/60" size="icon" variant="ghost">
            <Trash2 />
          </Button>
        </div>
      </div>
    </section>
  );
};
function hexToRgb(hex: string) {
  const match = hex.match(/\d+/g)?.map(Number);
  return match ? { r: match[0], g: match[1], b: match[2] } : { r: 255, g: 255, b: 255 };
}

export default function DraggableGrid({ palette }: DraggableGridProps) {
  const router = useRouter()
  const { toast } = useToast()
  const method = useSearchParams().get("generation")
  const urlPalette = useParams().selectedColors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useSpacebarEffect(() => {
    const newPalette = randomizePalette(urlPalette as string)
    router.push(`/palette/${newPalette}`)
  })

  const [columns, setColumns] = useState<ColumnData[]>(
    palette.map((color) => ({
      ...color,
      id: nanoid(),
    })),
  )

  const onColorChange = (id: string, newColor: string) => {
    const newColumns = columns.map((column) => (column.id === id ? { ...column, rgb: newColor } : column))
    setColumns(newColumns)

    // Update the URL with the new colors
    const newPalette = newColumns
      .map((column) => {
        const hex = column.rgb.startsWith("#") ? column.rgb : RGBToHEX(column.rgb)
        return column.isLocked ? `${hex}_L` : hex
      })
      .join("-")
    router.push(`/palette/${newPalette}`)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex((item) => item.id === active.id)
      const newIndex = columns.findIndex((item) => item.id === over?.id)

      // console.log(urlPalette);
      // console.log(arrayMove(columns, oldIndex, newIndex)
      //     .map((color) => RGBToHEX(color.rgb))
      //     .join('-'));

      const newPalette = handleSwap(
        urlPalette as string,
        arrayMove(columns, oldIndex, newIndex)
          .map((color) => RGBToHEX(color.rgb))
          .join("-"),
      )

      console.log(newPalette, "newPalette")

      router.push(`/palette/${newPalette}`)
    }
  }

  function handleSwap(current: string, next: string) {
    const currentColors = current.split("-")
    const nextColors = next.split("-")

    const lockedColors = currentColors.filter((color) => color.includes("_L"))

    const unlockedColors = currentColors.filter((color) => !color.includes("_L"))

    const newColors = nextColors.map((color) => {
      if (lockedColors.includes(`${color}_L`)) {
        return `${color}_L`
      }
      return color
    })

    return newColors.join("-")
  }

  const addColumn = (insertIndex, prevColor, nextColor) => {
    if (columns.length >= 10) {
      toast({
        title: "Maximum colors reached",
        description: "Sorry, you can only have up to 10 colors in a palette.",
      })
      return
    }

    // Helper function to parse an RGB string into an object
    const parseRGB = (rgbString) => {
      const match = rgbString.match(/rgb$$(\d+),\s*(\d+),\s*(\d+)$$/)
      if (!match) return null
      return {
        r: Number.parseInt(match[1], 10),
        g: Number.parseInt(match[2], 10),
        b: Number.parseInt(match[3], 10),
      }
    }

    // Helper function to compute the middle color
    const middleColor = (color1, color2) => {
      return {
        r: Math.round((color1.r + color2.r) / 2),
        g: Math.round((color1.g + color2.g) / 2),
        b: Math.round((color1.b + color2.b) / 2),
      }
    }

    // If both prevColor and nextColor are provided, calculate the middle color
    if (prevColor && nextColor) {
      const color1 = parseRGB(prevColor)
      const color2 = parseRGB(nextColor)

      if (color1 && color2) {
        const middle = middleColor(color1, color2)
        const middleRGB = `rgb(${middle.r}, ${middle.g}, ${middle.b})`

        router.push(
          `/palette/${columns
            .slice(0, insertIndex)
            .map((color) => RGBToHEX(color.rgb))
            .join("-")}-${RGBToHEX(middleRGB)}-${columns
            .slice(insertIndex)
            .map((color) => RGBToHEX(color.rgb))
            .join("-")}`,
        )
        return middleRGB // Return the computed middle color
      } else {
        console.error("Invalid color format provided.")
        return null
      }
    }

    console.log("Not enough colors to calculate middle color.")
    return null
  }

  const removeColumn = (index: number, rgb: string) => {
    if (columns.length === 1) {
      return
    }
    const newPalette = columns
      .filter((color) => color.rgb !== rgb)
      .map((color) => RGBToHEX(color.rgb))
      .join("-")
    router.push(`/palette/${newPalette}`)
  }
  const toggleLock = (index: number, rgb: string) => {
    // Update the URL by toggling `_L` for the specific column
    const newUrl = `/palette/${columns
      .map((color, i) => {
        // Convert RGB to HEX
        const hex = RGBToHEX(color.rgb)

        // If it's the column being toggled, add or remove `_L`
        if (i === index) {
          return color.isLocked ? hex : `${hex}_L`
        }

        // For other columns, keep their current state
        return color.isLocked ? `${hex}_L` : hex
      })
      .join("-")}`

    router.push(newUrl)
  }

  if (palette.length === 1) {
    return <SingleColor color={palette[0].rgb} />
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        <div className="hidden xl:flex flex-1 relative px-8 gap-1 lg:pb-8 ">
          {columns.map((column, index) => (
            <React.Fragment key={column.id}>
              {index > 0 && (
                <div className="relative group z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all rotate-45 hover:rotate-90 rounded-full "
                    onClick={() => addColumn(index, columns[index - 1].rgb, columns[index].rgb)}
                    aria-label={`Add column before ${column.rgb}`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="w-full ">
                <SortableItem
                  id={column.id}
                  rgb={column.rgb}
                  isLocked={column.isLocked}
                  isBaseColor={column.isBaseColor}
                  length={palette.length}
                  onDelete={() => removeColumn(index, column.rgb)}
                  toggleLock={() => toggleLock(index, column.rgb)}
                  onColorChange={onColorChange}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

