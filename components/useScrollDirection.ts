import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down';

export function useScrollDirection(options?: { topThreshold?: number; deltaThreshold?: number }) {
  const topThreshold = options?.topThreshold ?? 40;
  const deltaThreshold = options?.deltaThreshold ?? 6;

  const [direction, setDirection] = useState<ScrollDirection>('down');
  const [isAtTop, setIsAtTop] = useState(true);

  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    lastScrollYRef.current = window.scrollY ?? 0;
    setIsAtTop(lastScrollYRef.current < topThreshold);

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY ?? 0;
        const lastY = lastScrollYRef.current;
        const delta = currentY - lastY;

        const atTop = currentY < topThreshold;
        setIsAtTop(atTop);

        if (delta > deltaThreshold) setDirection('down');
        else if (delta < -deltaThreshold) setDirection('up');

        lastScrollYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [topThreshold, deltaThreshold]);

  return { direction, isAtTop };
}

