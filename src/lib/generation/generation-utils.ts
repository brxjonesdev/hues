
// Validate if a hex string represents valid hex colors and return it if valid
export function validateHexString(hexString: string): string | false {
    const hexColors = hexString.split('-');
    const hexColorRegex = /^[0-9a-fA-F]{6}$/;
  
    // Return hex string if all colors are valid, otherwise return false
    return hexColors.every(color => hexColorRegex.test(color)) ? hexString : false;
  }
  
  
  // Function to generate a hex string of a given length with valid hex colors
  export function generateHexString(length: number): string {
    const hexSegments = [];
  
    for (let i = 0; i < length; i++) {
      // Generate a random 6-character hex color
      const hexColor = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0'); // Ensure it is exactly 6 characters
      hexSegments.push(hexColor);
    }
  
    // Join hex colors with hyphens
    return hexSegments.join('-');
  }
  