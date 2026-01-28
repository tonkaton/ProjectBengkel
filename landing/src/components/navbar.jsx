import { useCallback } from 'react';
import { useScroll, useMobileMenu } from '../hooks';
import { NAV_LINKS, COMPANY, APP_URL } from '../constants';
import { cn } from '../utils';
import { Brand } from './navbar/Brand';
import { NavLinks } from './navbar/NavLinks';
import { MobileMenu } from './navbar/MobileMenu';
import { MobileMenuButton } from './navbar/MobileMenuButton';

/**
 * Main navigation bar component
 */
export default function Navbar() {
  const scrolled = useScroll(50);
  const mobileMenu = useMobileMenu();

  const handleLinkClick = useCallback(() => {
    mobileMenu.close();
  }, [mobileMenu]);

  const headerClasses = cn(
    'fixed top-0 left-0 w-full z-50 transition-all duration-500',
    scrolled
      ? 'bg-black/90 backdrop-blur-lg border-b border-yellow-500/20'
      : 'bg-gradient-to-r from-black/80 via-gray-900/70 to-black/80'
  );

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <Brand name={COMPANY.name} />
        
        <NavLinks links={NAV_LINKS} />
        
        <div className="hidden md:block">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:from-yellow-400 hover:to-yellow-300 hover:text-black transition"
          >
            Login
          </a>
        </div>
        
        <MobileMenuButton
          isOpen={mobileMenu.isOpen}
          onClick={mobileMenu.toggle}
        />
      </div>

      <MobileMenu
        isOpen={mobileMenu.isOpen}
        links={NAV_LINKS}
        onLinkClick={handleLinkClick}
      />
    </header>
  );
}