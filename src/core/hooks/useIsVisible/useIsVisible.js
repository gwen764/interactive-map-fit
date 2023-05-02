import { useState, useEffect } from "react";

/**
 * A hook that detects if a reference element is visible in the viewport using the Intersection Observer API.
 * Source: https://letsbuildui.dev/articles/how-to-lazy-load-react-components
 * @memberof Core.Hooks
 * @function
 * @param {React.RefObject} reference - A reference to the element to observe for visibility.
 * @returns {boolean} A boolean value indicating whether the reference element is visible in the viewport.
 */
export const useIsVisible = (reference) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleIntersect = (entries, observer) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entries[0].target);
        observer.disconnect();
      }
    }

    const observer = new IntersectionObserver(handleIntersect);

    if (reference) {
      observer.observe(reference.current);
    }

    return () => observer.disconnect();
  }, [reference]);

  return isVisible;
};