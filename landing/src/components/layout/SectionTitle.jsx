import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Animated section title component — Soft UI
 */
export function SectionTitle({
  eyebrow,
  title,
  highlight,
  subtitle,
  className = '',
  align = 'center',
}) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 ${alignments[align]} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-3 font-display text-5xl tracking-wide text-ink md:text-6xl"
      >
        {title} {highlight && <span className="text-accent">{highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-2xl text-lg text-slate-500"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

SectionTitle.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  highlight: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};
