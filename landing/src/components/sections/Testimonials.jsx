import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Container, SectionTitle } from '../layout';
import { TESTIMONIALS } from '../../constants';

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-4xl border border-line bg-card p-6 text-left shadow-soft transition-all duration-300 hover:shadow-soft-lg"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-base text-accent shadow-soft-in-sm">
        <Quote className="h-5 w-5" />
      </div>
      <div className="mb-3 flex gap-0.5 text-warn">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="leading-relaxed text-ink2">"{testimonial.text}"</p>
      <p className="mt-4 font-semibold text-ink">— {testimonial.name}</p>
    </motion.div>
  );
}

/**
 * Testimonials section — Soft UI (tint lavender)
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-tintLav px-6 py-24">
      <Container>
        <SectionTitle eyebrow="Testimoni" title="APA KATA" highlight="PELANGGAN" />
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
