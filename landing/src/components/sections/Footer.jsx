import { Wrench } from 'lucide-react';
import { COMPANY } from '../../constants';
import { getCurrentYear } from '../../utils';

/**
 * Footer — slate gelap untuk grounding
 */
export default function Footer() {
  return (
    <footer className="bg-footerInk px-6 py-12 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <a href="#hero" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-accent">
            <Wrench size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display text-2xl tracking-wide text-white">
            BOTAK<span className="text-accent">.</span> ENGINE SPEED
          </span>
        </a>

        <p className="max-w-md text-sm text-slate-400">{COMPANY.tagline}</p>

        <div className="h-px w-full max-w-xs bg-white/10" />

        <div className="text-sm">
          <p className="text-slate-400">
            © {getCurrentYear()}{' '}
            <span className="font-semibold text-white">{COMPANY.name}</span>. Semua hak dilindungi.
          </p>
          <p className="mt-1 text-xs text-ink2">
            Dibuat oleh <span className="font-semibold text-accent">Codiroom</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
