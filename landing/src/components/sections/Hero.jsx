import { motion } from 'framer-motion';
import { GlowEffect } from '../layout';
import { Button } from '../ui';
import { COMPANY, ANIMATION } from '../../constants';

/**
 * Hero section component
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-black via-gray-900 to-red-900 text-white min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Background texture */}
      <GlowEffect variant="texture" />
      
      {/* Glow layers */}
      <GlowEffect variant="hero" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          initial={ANIMATION.fadeInDown.initial}
          animate={ANIMATION.fadeInDown.animate}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
        >
          <span className="text-yellow-400">Sintink Garage</span>{' '}
          <span className="text-red-500">Performance</span>
          <br />
          <span className="text-white">{COMPANY.tagline}</span>
        </motion.h1>

        <motion.p
          initial={ANIMATION.fadeInUp.initial}
          animate={ANIMATION.fadeInUp.animate}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed"
        >
          {COMPANY.description}
        </motion.p>

        <motion.div
          initial={ANIMATION.scaleIn.initial}
          animate={ANIMATION.scaleIn.animate}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center gap-4"
        >
          <Button href="#services" variant="primary" size="lg">
            ⚙️ Lihat Layanan
          </Button>
          <Button href="#contact" variant="primary" size="lg">
            🚀 Hubungi Kami
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
