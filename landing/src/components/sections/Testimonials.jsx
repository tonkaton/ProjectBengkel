import { motion } from 'framer-motion';
import { Container, GlowEffect, SectionTitle } from '../layout';
import { Card } from '../ui';
import { TESTIMONIALS, ANIMATION } from '../../constants';

/**
 * Testimonial card component
 */
function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={ANIMATION.fadeInUp.initial}
      whileInView={ANIMATION.fadeInUp.whileInView}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-yellow-500/30 transition"
    >
      <p className="text-gray-100 italic mb-4">"{testimonial.text}"</p>
      <p className="text-yellow-400 font-semibold">— {testimonial.name}</p>
    </motion.div>
  );
}

/**
 * Testimonials section component
 */
export default function Testimonials() {
  return (
    <section 
      id="testimonials"
      className="bg-gradient-to-b from-gray-900 to-black text-white py-20 px-6 relative overflow-hidden"
    >
      <GlowEffect variant="section" />

      <Container className="relative z-10 text-center">
        <SectionTitle
          title="Apa Kata"
          highlight="Pelanggan Kami"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
