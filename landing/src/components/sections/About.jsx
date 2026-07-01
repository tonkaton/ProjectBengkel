import { motion } from 'framer-motion';
import { ArrowUpRight, Wrench, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Container } from '../layout';
import { COMPANY } from '../../constants';
import botakengineImage from '../../../assets/botakenginespeed.png';

const features = [
  { icon: Wrench, label: 'Mekanik ahli', cls: 'text-accent' },
  { icon: ShieldCheck, label: 'Sparepart ori', cls: 'text-ok' },
  { icon: BadgeCheck, label: 'Garansi servis', cls: 'text-warn' },
];

/**
 * About section — slate gelap
 */
export default function About() {
  return (
    <section id="about" className="bg-footerInk px-6 py-24 md:px-12">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-4xl border border-white/10 bg-card p-3 shadow-2xl shadow-black/40"
        >
          <img
            src={botakengineImage}
            alt="Botak Engine Speed"
            className="w-full rounded-3xl object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">Tentang kami</span>
          <h2 className="mt-3 font-display text-5xl tracking-wide text-white md:text-6xl">
            BUKAN SEKADAR <span className="text-accent">BENGKEL</span>
          </h2>

          <p className="mt-5 font-semibold text-white">{COMPANY.name}</p>
          <p className="mt-3 leading-relaxed text-slate-300">
            hadir untuk memberikan pelayanan terbaik bagi semua jenis motor. Kami
            menggunakan peralatan modern dan tenaga ahli berpengalaman untuk memastikan
            performa motor Anda selalu optimal di setiap perjalanan.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            Dengan fokus pada <span className="font-semibold text-accent">kualitas</span> dan{' '}
            <span className="font-semibold text-white">kepuasan pelanggan</span>, setiap motor
            layak mendapatkan perhatian terbaik.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {features.map(({ icon: Icon, label, cls }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white"
              >
                <Icon size={16} className={cls} />
                {label}
              </span>
            ))}
          </div>

          <a
            href="#services"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-[0_10px_24px_rgba(224,70,59,0.35)] transition hover:bg-accentDark active:scale-[0.98]"
          >
            Jelajahi layanan
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
