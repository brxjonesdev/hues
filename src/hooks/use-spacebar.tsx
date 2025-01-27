import { useEffect } from 'react';

const useSpacebarEffect = (callback: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent default spacebar scrolling behavior
        callback();
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [callback]); // Re-run the effect if the callback changes
};

export default useSpacebarEffect;
