import { motion } from 'framer-motion';
import { Zap, Star, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '../layout';
import { COMPANY } from '../../constants';
import { cn } from '../../utils';

const rise = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } };

function Stat({ num, label }) {
  return (
    <div>
      <p className="font-mono text-2xl font-semibold text-ink">{num}</p>
      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

function Step({ active, label }) {
  return (
    <div className="flex-1">
      <div className={cn('h-1.5 rounded-full', active ? 'bg-accent' : 'bg-slate-300')} />
      <p className={cn('mt-1.5 text-[11px] font-medium', active ? 'text-ink' : 'text-muted')}>{label}</p>
    </div>
  );
}

/**
 * Hero section — Soft UI
 */
export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28">
      {/* ambient lembut */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white/30 blur-3xl" />

      <Container size="lg" className="relative">
        <div className="grid items-center gap-14 md:grid-cols-2">
          {/* Kiri — teks */}
          <div>
            <motion.span
              {...rise}
              transition={{ duration: 0.5 }}
              className="eyebrow inline-flex items-center gap-2 rounded-full bg-panel px-3 py-1.5 shadow-soft-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {COMPANY.tagline}
            </motion.span>

            <motion.h1
              {...rise}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-display text-6xl leading-[0.92] tracking-wide text-ink md:text-8xl"
            >
              PERFORMA <span className="text-accent">MAKSIMAL</span>
              <br />
              UNTUK MOTORMU
            </motion.h1>

            <motion.p
              {...rise}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-slate-500"
            >
              {COMPANY.description}
            </motion.p>

            <motion.div
              {...rise}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-[0_10px_24px_rgba(224,70,59,0.35)] transition hover:bg-accentDark active:scale-[0.98]"
              >
                <Zap size={18} strokeWidth={2.6} />
                Booking sekarang
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full bg-panel px-7 py-3.5 font-semibold text-ink shadow-soft transition hover:shadow-soft-lg active:shadow-soft-in"
              >
                Lihat layanan
                <ArrowUpRight size={18} />
              </a>
            </motion.div>

            <motion.div
              {...rise}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-12 flex gap-10"
            >
              <Stat num="5+" label="Tahun" />
              <Stat num="2.000+" label="Motor" />
              <Stat num="4.9★" label="Rating" />
            </motion.div>
          </div>

          {/* Kanan — kartu Soft UI */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="rounded-4xl border border-white/70 bg-panel p-6 shadow-soft-lg">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Status servis</span>
                <span className="flex items-center gap-1.5 rounded-full bg-base px-3 py-1 text-xs font-semibold text-ok shadow-soft-in-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  Live
                </span>
              </div>

              <p className="mt-4 font-mono text-2xl font-semibold tracking-tight text-ink">20260210-005</p>
              <p className="text-sm text-slate-500">Honda Vario 160 · B 1234 XYZ</p>

              <div className="mt-6 flex items-center gap-2">
                <Step active label="Menunggu" />
                <Step active label="Proses" />
                <Step label="Selesai" />
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-base p-3.5 shadow-soft-in">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">Estimasi biaya</p>
                  <p className="font-mono font-semibold text-ink">Rp 185.000</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-[0_6px_14px_rgba(224,70,59,0.35)]">
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>

            {/* kartu poin mengambang */}
            <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-3xl border border-white/70 bg-panel px-4 py-3 shadow-soft sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-base text-warn shadow-soft-in">
                <Star size={18} />
              </span>
              <div>
                <p className="font-mono text-lg font-semibold leading-none text-ink">1.250</p>
                <p className="text-xs text-muted">poin loyalti</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
