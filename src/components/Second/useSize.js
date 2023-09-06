import { useState, useEffect } from 'react';

export const original = {
  border: {
    x: 38,
    y: 46
  }
};

const useSize = ({ width, height }) => {
  const [state, setState] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  });
  const { innerWidth, innerHeight } = state;
  const ratio = innerWidth / width;
  const borderX = original.border.x * ratio;
  const borderY = original.border.y * ratio;
  const WIDTH = innerWidth - borderX * 2;
  const HEIGHT = innerHeight - borderY * 2;

  useEffect(() => {
    const onResize = () => {
      setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight })
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return [WIDTH, HEIGHT, ratio];
};

export default useSize;

