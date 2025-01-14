import { ColorType } from "../hooks/usePalette"
import { generateHexString } from "./generation-utils"

export function randomHexGeneration(currentColors? : ColorType[]) {
    if (currentColors) {
        currentColors.forEach(color => {
            if (!color.isLocked) {
                color.hexcode = generateHexString(1);
            }
        });
        return currentColors
    }
        // take in the amount of colors and the ones that are locked and thier indexes
        // generate the same amount of colors and take into account the locked colors.
        // generate new hex string with new and locked colors in the same index.
        // return the new hex string
        if (!currentColors){
            const length = Math.floor(Math.random() * 6) + 3
            const colors = generateHexString(length)
            return colors
        }
const colors = currentColors
    return colors
}