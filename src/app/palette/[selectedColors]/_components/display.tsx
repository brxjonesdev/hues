/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from "react"
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
import { PlusIcon, LockIcon, Trash2, UnlockIcon, GripHorizontalIcon, } from "lucide-react"
import {nanoid} from 'nanoid'
import { useRouter } from "next/navigation"
import { RGBToHEX } from "@/lib/utils/conversions"
import { useSearchParams, useParams } from "next/navigation"

export type ColumnData = {
    id: string;
    rgb: string;
    isLocked: boolean;
    isBaseColor: boolean;
    length: number;
    onDelete: () => void;
    toggleLock: () => void;
}
  
export interface DraggableGridProps {
    palette: ColumnData[];
    method: string;
  }
    
const SortableItem = ({ id, rgb, isLocked, length, onDelete, toggleLock}: ColumnData) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <section
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: rgb,
      }}
      {...attributes}
      className="bg-card text-card-foreground rounded-lg flex flex-col items-center justify-end h-full gap-4"
    >

      <div
        {...listeners}
        className="w-full p-2 flex justify-center cursor-grab active:cursor-grabbing hover:bg-black/10"
      >
        <GripHorizontalIcon/>
      </div>

      {/* Content */}
      <div className="font-inter text-center mb-16">
        <p className={`uppercase 
          ${length <= 4 ? "text-4xl" : length <= 8 ? "text-2xl" : "text-lg"}
          font-bold text-black/60`}>{RGBToHEX(rgb)}</p>
          <p className="text-xs text-black/60">{rgb}</p>
          
        <div>
          
          <Button
          onClick={() => toggleLock()}
          className="text-black/60" size="icon" variant={"ghost"}>
              {!isLocked ? <UnlockIcon /> : <LockIcon />}
            </Button>
          <Button 
          onClick={() => onDelete()}
          className="text-black/60" size="icon" variant={"ghost"}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </section>
  )
}

// Handle Locking
// Handle Randomize from Spacebar
// Handle Transition from Random to Theory and back
// Handle Setting Base Color
// Handle Color Theory Generation
export default function DraggableGrid({palette}: DraggableGridProps) {
  const router = useRouter()
  const [columns, setColumns] = useState<ColumnData[]>(
    palette.map((color) => ({
      ...color,
      id: nanoid(),
    })),
  )
  const method = useSearchParams().get('generation');
  const urlPalette = useParams().selectedColors;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex((item) => item.id === active.id)
        const newIndex = columns.findIndex((item) => item.id === over?.id)
        router.push(`/palette/${arrayMove(columns, oldIndex, newIndex).map((color)=> RGBToHEX(color.rgb)).join("-")}`)
    }
  }

  const addColumn = (insertIndex, prevColor, nextColor) => {
    console.log(insertIndex, prevColor, nextColor, "adding");
  
    // Helper function to parse an RGB string into an object
    const parseRGB = (rgbString) => {
      const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!match) return null;
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      };
    };
  
    // Helper function to compute the middle color
    const middleColor = (color1, color2) => {
      return {
        r: Math.round((color1.r + color2.r) / 2),
        g: Math.round((color1.g + color2.g) / 2),
        b: Math.round((color1.b + color2.b) / 2),
      };
    };
  
    // If both prevColor and nextColor are provided, calculate the middle color
    if (prevColor && nextColor) {
      const color1 = parseRGB(prevColor);
      const color2 = parseRGB(nextColor);
  
      if (color1 && color2) {
        const middle = middleColor(color1, color2);
        const middleRGB = `rgb(${middle.r}, ${middle.g}, ${middle.b})`;
  
        console.log(`Middle color: ${RGBToHEX(middleRGB)}`);
        // Add the middle color to the palette
        router.push(`/palette/${columns.slice(0, insertIndex).map((color)=> RGBToHEX(color.rgb)).join("-")}-${RGBToHEX(middleRGB)}-${columns.slice(insertIndex).map((color)=> RGBToHEX(color.rgb)).join("-")}`)
        return middleRGB; // Return the computed middle color
      } else {
        console.error("Invalid color format provided.");
        return null;
      }
    }
  
    console.log("Not enough colors to calculate middle color.");
    return null;
  };
  
  const removeColumn = (index: number, rgb: string) => {
    if (columns.length === 1) {
      return
    }
    const newPalette = columns
      .filter((color) => color.rgb !== rgb)
      .map((color => RGBToHEX(color.rgb)))
      .join("-")
    router.push(`/palette/${newPalette}`)
  }

  // const toggleLock = (index: number, rgb: string) => {
  //   console.log(index, RGBToHEX(rgb), "locking")
  //   // updating FF6F61-FF69B4-8A2BE2-00CED1 to FF6F61_L-FF69B4-8A2BE2-00CED1
  //   router.push(`/palette/${columns.map((color, i) => i === index ? `${RGBToHEX(color.rgb)}${color.isLocked ? "" : "_L"}` : RGBToHEX(color.rgb)).join("-")}`)
   
  // }

  const toggleLock = (index: number, rgb: string) => {
    console.log(index, RGBToHEX(rgb), "locking");

    // Toggle the locked state for the selected color
    columns[index].isLocked = !columns[index].isLocked;

    // Update the URL to reflect the current locked states of all colors
    router.push(`/palette/${columns.map((color, i) => 
        i === index 
            ? `${RGBToHEX(color.rgb)}${color.isLocked ? "" : "_L"}`
            : `${RGBToHEX(color.rgb)}${color.isLocked ? "" : "_L"}`
    ).join("-")}`);
};


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
                      onClick={() => addColumn(
                        index,
                        columns[index - 1].rgb,
                        columns[index].rgb
                      )}
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
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>
  )
}

