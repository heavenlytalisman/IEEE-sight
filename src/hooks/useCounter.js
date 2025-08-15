import { useEffect, useRef } from 'react';

export const useCounter = (target, duration = 2000) => {
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = target / (duration / 50);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              element.textContent = target + (target >= 100 ? '+' : '');
              clearInterval(timer);
            } else {
              element.textContent = Math.floor(start);
            }
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration]);

  return elementRef;
};
