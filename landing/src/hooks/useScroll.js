import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track scroll position
 * @param {number} threshold - Scroll position threshold to trigger scrolled state
 * @returns {boolean} - Whether the page has been scrolled past the threshold
 */
export function useScroll(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Custom hook to handle scroll to element functionality
 * @returns {Function} - Function to scroll to element by id
 */
export function useScrollTo() {
  const scrollTo = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return scrollTo;
}
