export function extractColors(url: string): string[] {
    const path = url.split('/pallete/')[1];
    if (!path) return [];
    return path.split('/').filter(color => color.match(/^[0-9A-Fa-f]{6}$/));
  }
  
  