import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Zap } from 'lucide-react';
import { useScroll, useMobileMenu } from '../hooks';
import { NAV_LINKS, APP_URL } from '../constants';
import { cn } from '../utils';
import { MobileMenu } from './navbar/MobileMenu';
import { MobileMenuButton } from './navbar/MobileMenuButton';
import { ThemeToggle } from './ui/ThemeToggle';

/**
 * Rubber grip end-cap — bikin navbar kebaca seperti stang motor.
 */
function Grip({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative hidden h-11 w-11 shrink-0 items-center justify-center gap-[3px] rounded-full sm:flex',
        'bg-gradient-to-b from-slate-500 to-slate-800',
        'shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35)]',
        className
      )}
    >
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="block h-5 w-[2px] rounded-full bg-white/20" />
      ))}
    </div>
  );
}

/**
 * Tuas rem — detail dekoratif di bawah grip (lg ke atas).
 */
function BrakeLever({ side = 'left' }) {
  return (
    <svg
      aria-hidden="true"
      width="54"
      height="20"
      viewBox="0 0 54 20"
      className={cn(
        'pointer-events-none absolute -bottom-3 hidden md:block',
        side === 'left' ? 'left-2 -scale-x-100' : 'right-2'
      )}
    >
      <path d="M50 4 C 32 6, 16 10, 5 17" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="4" r="3" fill="#64748b" />
    </svg>
  );
}

/**
 * Main navigation bar — handlebar pill (Soft UI)
 */
export default function Navbar() {
  const scrolled = useScroll(40);
  const mobileMenu = useMobileMenu();

  const handleLinkClick = useCallback(() => {
    mobileMenu.close();
  }, [mobileMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative flex h-16 items-center gap-2 rounded-full border border-line bg-panel/95 px-2 backdrop-blur transition-shadow duration-500',
            scrolled ? 'shadow-soft-lg' : 'shadow-soft'
          )}
        >
          <BrakeLever side="left" />
          <BrakeLever side="right" />

          <Grip />

          {/* Brand — clamp + nama */}
          <a href="#hero" className="group flex shrink-0 items-center gap-2.5 pl-1 pr-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-base text-accent shadow-soft-in transition-transform duration-500 group-hover:rotate-[60deg]">
              <Wrench size={18} strokeWidth={2.4} />
            </span>
            <span className="font-display text-[1.65rem] leading-none tracking-wide text-ink">
              Botak<span className="text-accent">.</span>
              <span className="hidden lg:inline"> Engine Speed</span>
            </span>
          </a>

          {/* Links di tengah bar */}
          <nav className="mx-auto hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink2 transition hover:bg-base hover:text-ink hover:shadow-soft-in-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme toggle + CTA */}
          <ThemeToggle className="hidden md:flex" />

          <motion.a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden h-11 items-center gap-1.5 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(224,70,59,0.35)] transition-colors hover:bg-accentDark md:inline-flex"
          >
            <Zap size={16} strokeWidth={2.6} />
            Login
          </motion.a>

          <Grip />

          {/* Mobile */}
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileMenuButton isOpen={mobileMenu.isOpen} onClick={mobileMenu.toggle} />
          </div>
        </motion.div>

        <MobileMenu
          isOpen={mobileMenu.isOpen}
          links={NAV_LINKS}
          onLinkClick={handleLinkClick}
        />
      </div>
    </header>
  );
}
