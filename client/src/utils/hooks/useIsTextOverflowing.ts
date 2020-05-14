import { useEffect, useState, useRef, RefObject } from 'react';

export default function useIsTextOverflowing(): [boolean, RefObject<HTMLDivElement>] {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      if (textRef.current) {
        setIsTextOverflowing(textRef.current.clientHeight < textRef.current.scrollHeight);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [textRef]);

  return [isTextOverflowing, textRef];
}
