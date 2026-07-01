import { useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import PropTypes from 'prop-types';
import { cn } from '../../utils';

export function useThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );
  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch (e) {
        /* ignore */
      }
      return next;
    });
  }, []);
  return { dark, toggle };
}

/**
 * Tombol ganti tema (Soft UI icon button)
 */
export function ThemeToggle({ className = '' }) {
  const { dark, toggle } = useThemeToggle();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Mode terang' : 'Mode gelap'}
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-base text-ink shadow-soft-in transition active:scale-95',
        className
      )}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
};
