import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { APP_URL } from '../../constants';

/**
 * Mobile menu — kartu Soft UI di bawah handlebar
 */
export function MobileMenu({
  isOpen,
  links,
  onLinkClick,
  isLoggedIn = false,
  displayName = '',
  initial = '',
  dashboardUrl = APP_URL,
  onLogout,
  onLoginClick,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-2 rounded-4xl border border-line bg-panel p-3 shadow-soft md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink2 transition hover:bg-base hover:text-ink hover:shadow-soft-in-sm"
              onClick={onLinkClick}
            >
              {link.label}
            </a>
          ))}

          {isLoggedIn ? (
            <div className="mt-2 space-y-2 border-t border-line pt-2">
              {/* Session indicator */}
              <div className="flex items-center gap-3 rounded-2xl bg-base px-3 py-2.5 shadow-soft-in-sm">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {initial}
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-base bg-emerald-500" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-tight text-ink">{displayName}</p>
                  <p className="text-[11px] font-medium text-emerald-600">Sesi aktif</p>
                </div>
              </div>

              <a
                href={dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-center text-sm font-semibold text-white shadow-[0_8px_18px_rgba(224,70,59,0.35)] transition active:scale-[0.98]"
                onClick={onLinkClick}
              >
                <LayoutDashboard size={16} strokeWidth={2.6} />
                Buka Dashboard
              </a>

              <button
                type="button"
                onClick={() => {
                  onLogout?.();
                  onLinkClick?.();
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-base py-3 text-center text-sm font-semibold text-accent shadow-soft-in-sm transition active:scale-[0.98]"
              >
                <LogOut size={16} strokeWidth={2.4} />
                Keluar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="mt-2 block w-full rounded-full bg-accent py-3 text-center text-sm font-semibold text-white shadow-[0_8px_18px_rgba(224,70,59,0.35)] transition active:scale-[0.98]"
              onClick={onLoginClick}
            >
              Login
            </button>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLinkClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  displayName: PropTypes.string,
  initial: PropTypes.string,
  dashboardUrl: PropTypes.string,
  onLogout: PropTypes.func,
  onLoginClick: PropTypes.func,
};
