import { useEffect, useState } from 'react';

// Utility function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function AnimatedGrid() {
  const [colors, setColors] = useState(['#ccc', '#ccc', '#ccc', '#ccc']);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors(colors.map(() => getRandomColor()));
    }, 1000); // Change color every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [colors]);

  return (
    <div className="grid grid-cols-2 gap-8 ">
      {colors.map((color, index) => (
        <div
          key={index}
          className="animated-shape rounded-2xl aspect-square "
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
}
